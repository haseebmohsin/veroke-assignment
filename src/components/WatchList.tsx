"use client";
import { WatchCard } from "./WatchCard";
import { useAppSelector } from "@/lib/store";

export default function WatchList() {
  const items = useAppSelector((store) => store.watchList);

  if (!items.length) {
    return (
      <p className="p-6 text-center text-gray-500 italic">
        Your watchList is empty — search and add some stocks to track in
        real-time.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <WatchCard key={item["1. symbol"]} item={item} />
      ))}
    </div>
  );
}
