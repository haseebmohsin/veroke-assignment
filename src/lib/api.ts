import { PriceQuote } from "@/features/pricesSlice";
import axios from "axios";

const BASE_URL = "https://www.alphavantage.co/query";
const KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY || "demo";
const cache = new Map<string, unknown>();

export async function searchSymbols(keywords: string) {
  const k = `search:${keywords}`;
  if (cache.has(k)) return cache.get(k);

  const { data } = await axios.get(BASE_URL, {
    params: { function: "SYMBOL_SEARCH", keywords, apikey: KEY },
  });

  cache.set(k, data);
  return data;
}

export async function fetchQuote(symbol: string): Promise<PriceQuote> {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { function: "GLOBAL_QUOTE", symbol, apikey: KEY },
    });

    const q = data["Global Quote"];
    if (!q || !q["05. price"]) {
      return {
        symbol,
        price: 0,
        timestamp: new Date().toISOString(),
        error: true,
      };
    }

    return {
      symbol: q["01. symbol"],
      price: parseFloat(q["05. price"]),
      timestamp: new Date().toISOString(),
      error: false,
    };
  } catch {
    return {
      symbol,
      price: 0,
      timestamp: new Date().toISOString(),
      error: true,
    };
  }
}
