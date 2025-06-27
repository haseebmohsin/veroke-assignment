import { updatePrices } from "@/features/pricesSlice";
import { Middleware } from "@reduxjs/toolkit";
import { fetchQuote } from "../lib/api";

let timer: ReturnType<typeof setInterval> | null = null;
type WatchListItem = { "1. symbol": string };

const pricesMiddleware: Middleware = (store) => (next) => (action) => {
  const res = next(action);
  if (
    (typeof action === "object" &&
      action !== null &&
      "type" in action &&
      (action as { type: string }).type === "watchList/add") ||
    (action as { type: string }).type === "watchList/remove"
  ) {
    if (timer) clearInterval(timer);

    const poll = async () => {
      const state = store.getState();
      const ws = state.watchList;
      const quotes = await Promise.all(
        ws.map((item: WatchListItem) => fetchQuote(item["1. symbol"]))
      );

      store.dispatch(updatePrices(quotes));
    };

    poll();
    timer = setInterval(poll, 30000);
  }

  return res;
};

export default pricesMiddleware;
