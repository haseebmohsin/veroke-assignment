import type { NextRequest } from "next/server";
import { apiClient } from "@/lib/apiClient";

export async function GET(req: NextRequest) {
  const { symbol } = Object.fromEntries(new URL(req.url).searchParams);
  if (!symbol) return new Response("Missing symbol", { status: 400 });

  const apikey = process.env.ALPHA_VANTAGE_KEY;
  if (!apikey) return new Response("API key not set", { status: 500 });

  try {
    const resp = await apiClient.get("", {
      params: {
        function: "GLOBAL_QUOTE",
        symbol,
        apikey,
      },
    });

    return new Response(JSON.stringify(resp.data));
  } catch {
    return new Response("Failed to fetch quote", { status: 500 });
  }
}
