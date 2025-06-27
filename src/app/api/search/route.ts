import type { NextRequest } from "next/server";
import { apiClient } from "@/lib/apiClient";

export async function GET(req: NextRequest) {
  const { keywords } = Object.fromEntries(new URL(req.url).searchParams);
  if (!keywords)
    return new Response(JSON.stringify({ error: "Missing keywords" }), {
      status: 400,
    });

  const apikey = process.env.ALPHA_VANTAGE_KEY;
  if (!apikey)
    return new Response(JSON.stringify({ error: "API key not set" }), {
      status: 500,
    });

  try {
    const resp = await apiClient.get("", {
      params: { function: "SYMBOL_SEARCH", keywords, apikey },
    });
    return new Response(JSON.stringify(resp.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    const msg =
      err.response?.data?.Note ||
      err.response?.data?.ErrorMessage ||
      "External API error";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
}
