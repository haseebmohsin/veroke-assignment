import type { PriceQuote } from "@/features/pricesSlice";
import { add, remove } from "@/features/watchListSlice";
import { updatePrices } from "@/features/pricesSlice";
import type { Middleware } from "@reduxjs/toolkit";

let timer: ReturnType<typeof setInterval> | null = null;

const pricesMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Trigger polling when a symbol is added or removed
  if (add.match(action) || remove.match(action)) {
    if (timer) clearInterval(timer);

    const poll = async () => {
      const state = store.getState();
      const items = state.watchList as { "1. symbol": string }[];

      const quotes: PriceQuote[] = await Promise.all(
        items.map(async (item) => {
          try {
            const resp = await fetch(
              `/api/quote?symbol=${encodeURIComponent(item["1. symbol"])}`
            );

            if (!resp.ok) throw new Error(`Status ${resp.status}`);
            return (await resp.json()) as PriceQuote;
          } catch {
            return {
              symbol: item["1. symbol"],
              price: 0,
              timestamp: new Date().toISOString(),
              error: true,
            };
          }
        })
      );

      store.dispatch(updatePrices(quotes));
    };

    poll();
    timer = setInterval(poll, 30_000);
  }

  return result;
};

export default pricesMiddleware;
