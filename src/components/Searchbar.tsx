"use client";
import { useState, useRef } from "react";
import { useAppDispatch } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getSearchedStocks } from "@/services/fetchers";
import { add, WatchListItem } from "@/features/watchListSlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 1000) || "";
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    data: results = [],
    isFetching,
    error,
  } = useQuery<WatchListItem[], Error>({
    queryKey: ["search", debouncedTerm],
    queryFn: () => getSearchedStocks(debouncedTerm),
    enabled: debouncedTerm.trim().length > 0,
    placeholderData: [],
  });

  const onAdd = (item: WatchListItem) => {
    dispatch(add(item));
    setTerm("");
  };

  return (
    <div className="relative mb-4" ref={wrapperRef}>
      <div className="flex">
        <input
          className="flex-grow border rounded-l px-3 py-2 focus:outline-none"
          placeholder="Search symbol..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Search
        </button>
      </div>

      {error && <div className="mt-2 text-red-500">Error: {error.message}</div>}

      {debouncedTerm && (
        <ul className="absolute z-10 left-0 right-0 bg-white border rounded mt-1 max-h-60 overflow-auto shadow-lg">
          {isFetching && <li className="px-3 py-2">Loading...</li>}
          {results?.map?.((item) => (
            <li
              key={item["1. symbol"]}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onClick={() => onAdd(item)}
            >
              <div className="flex justify-between">
                <span className="font-mono font-bold">{item["1. symbol"]}</span>
                <span className="text-blue-500">+ Watch</span>
              </div>
              <div className="text-sm text-gray-600">
                {item["2. name"]} • {item["4. region"]}
              </div>
            </li>
          ))}

          {!isFetching && results.length === 0 && (
            <li className="px-3 py-2 text-gray-500">No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
}
