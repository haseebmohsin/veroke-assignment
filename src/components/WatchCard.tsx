"use client";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { WatchListItem } from "@/features/watchListSlice";
import { remove } from "@/features/watchListSlice";

interface Props {
  item: WatchListItem;
}

const WatchCardComponent = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const quote = useAppSelector(
    (store) => store.prices.bySymbol[item["1. symbol"]]
  );

  const time = quote?.timestamp;

  return (
    <div className="bg-gray-100 rounded-xl shadow p-5 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold">{item["1. symbol"]}</h3>
          <p className="text-gray-500 text-sm">{item["2. name"]}</p>
        </div>
        <button
          aria-label={`Remove ${item["1. symbol"]}`}
          className="text-red-500 hover:text-red-700"
          onClick={() => dispatch(remove(item["1. symbol"]))}
        >
          ✕
        </button>
      </div>

      {/* Real-time Price */}
      <div className="flex items-baseline space-x-2 mb-4">
        {quote ? (
          <span className="text-xl font-semibold text-green-600">
            {item["8. currency"]} {item["9. matchScore"]}
          </span>
        ) : (
          <span className="text-gray-400">Loading real-time price…</span>
        )}

        {time && (
          <span className="text-sm text-gray-400">
            Realtime: (as of {new Date(time).toLocaleTimeString()})
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
        <div>
          <strong>Region:</strong> {item["4. region"]}
        </div>
        <div>
          <strong>Currency:</strong> {item["8. currency"]}
        </div>
        <div>
          <strong>Market Open:</strong> {item["5. marketOpen"]}
        </div>
        <div>
          <strong>Market Close:</strong> {item["6. marketClose"]}
        </div>
      </div>
    </div>
  );
};

WatchCardComponent.displayName = "WatchCard";
export const WatchCard = memo(WatchCardComponent);
