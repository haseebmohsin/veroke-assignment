"use client";
import React, { useState, useEffect, useRef } from "react";
import type { WatchListItem } from "@/features/watchListSlice";
import { add } from "@/features/watchListSlice";
import { useAppDispatch } from "@/lib/store";
import { searchSymbols } from "@/lib/api";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WatchListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when query is cleared
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setOpen(false);
    }
  }, [query]);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) {
      setOpen(false);
      return;
    }

    setLoading(true);
    setError(null);
    setApiError(null);

    try {
      const data = await searchSymbols(term);
      if (data.Information) {
        setApiError(data.Information);
      }

      setResults(data?.bestMatches ?? []);
      setOpen(true);
    } catch {
      setError("Search failed. Try again.");
      setResults([]);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const onAdd = (item: WatchListItem) => {
    dispatch(add(item));
    setQuery("");
  };

  return (
    <div className="relative mb-4" ref={wrapperRef}>
      <form onSubmit={onSearch} className="flex">
        <input
          type="text"
          className="flex-grow border rounded-l px-3 py-2 focus:outline-none"
          placeholder="Search symbol or company... e.g. Tesco, IBM."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setOpen(true);
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {apiError && results.length === 0 && (
        <div className="mt-2 text-red-500">
          <strong>Error:</strong> {apiError}
        </div>
      )}

      {open && (
        <ul className="absolute z-10 left-0 right-0 bg-white border rounded mt-1 max-h-60 overflow-auto shadow-lg">
          {error && <li className="px-3 py-2 text-red-500">{error}</li>}

          {results.map((r) => (
            <li
              key={r["1. symbol"]}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex flex-col"
              onClick={() => onAdd(r)}
            >
              <div className="flex justify-between">
                <span className="font-mono font-bold">{r["1. symbol"]}</span>
                <span className="text-blue-500 hover:underline">+ Watch</span>
              </div>
              <div className="text-sm text-gray-600">
                {r["2. name"]} • {r["4. region"]} • {r["8. currency"]}
              </div>
            </li>
          ))}

          {!loading && !error && !apiError && results.length === 0 && (
            <li className="px-3 py-2 text-gray-500">No matches found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
