"use client";
import { remove, WatchListItem } from "@/features/watchListSlice";
import { useAppSelector, useAppDispatch } from "@/lib/store";

export default function WatchList() {
  const dispatch = useAppDispatch();
  const watchList = useAppSelector((s) => s.watchList) as WatchListItem[];
  const prices = useAppSelector((s) => s.prices.bySymbol);

  if (watchList.length === 0) {
    return (
      <p className="p-4 text-gray-500">
        Your watchList is empty. Search and add stocks above.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {watchList.map((item) => {
        const symbol = item["1. symbol"];
        const quote = prices[symbol];
        const price = quote?.price?.toFixed(2);
        const time = quote?.timestamp;

        return (
          <div
            key={symbol}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-xl font-bold">{symbol}</h3>
                  <p className="text-gray-600">{item["2. name"]}</p>
                </div>

                {quote ? (
                  <span className="text-green-600 text-lg">
                    {item["8. currency"]} {price}
                  </span>
                ) : (
                  <span className="text-gray-400">Loading price…</span>
                )}

                <button
                  className="ml-auto text-red-500 hover:underline"
                  onClick={() => dispatch(remove(symbol))}
                >
                  Remove
                </button>
              </div>

              <div className="mt-1 text-sm text-gray-500">
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <div>
                    <span className="font-semibold">Region:</span>{" "}
                    {item["4. region"]}
                  </div>
                  <div>
                    <span className="font-semibold">Currency:</span>{" "}
                    {item["8. currency"]}
                  </div>
                  <div>
                    <span className="font-semibold">Market Open:</span>{" "}
                    {item["5. marketOpen"]}
                  </div>
                  <div>
                    <span className="font-semibold">Market Close:</span>{" "}
                    {item["6. marketClose"]}
                  </div>
                </div>
              </div>

              {time && (
                <p className="mt-2 text-md text-blue-500">
                  Updated: {new Date(time).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
