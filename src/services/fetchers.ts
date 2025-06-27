import { WatchListItem } from "@/features/watchListSlice";

export async function getSearchedStocks(
  term: string
): Promise<WatchListItem[]> {
  const res = await fetch(`/api/search?keywords=${encodeURIComponent(term)}`);
  const json = await res.json();

  if (!res.ok) throw new Error(json.error || "API error");
  return Array.isArray(json.bestMatches) ? json.bestMatches : [];
}
