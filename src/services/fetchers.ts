import { WatchListItem } from "@/features/watchListSlice";

export async function getSearchedStocks(
  term: string
): Promise<WatchListItem[]> {
  const res = await fetch(`/api/search?keywords=${encodeURIComponent(term)}`);
  const json = await res.json();

  if (!res.ok) {
    const msg = json.error || `Unexpected error (${res.status})`;
    throw new Error(msg);
  }

  return Array.isArray(json.bestMatches) ? json.bestMatches : [];
}
