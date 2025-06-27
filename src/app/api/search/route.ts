import type { NextRequest } from "next/server";
import { apiClient } from "@/lib/apiClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keywords = searchParams.get("keywords");

  if (!keywords) return new Response("Missing keywords", { status: 400 });

  try {
    const resp = await apiClient.get("", {
      params: {
        function: "SYMBOL_SEARCH",
        keywords,
        apikey: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY,
      },
    });

    return new Response(JSON.stringify(resp.data));
  } catch {
    return new Response("Failed to search", { status: 500 });
  }
}
