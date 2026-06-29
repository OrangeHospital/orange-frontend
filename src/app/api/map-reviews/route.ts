import { NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/utils";

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  const url = process.env.MAP_REVIEW_API_URL;
  const token = process.env.MAP_REVIEW_API_TOKEN;

  if (!url || !token) {
    return NextResponse.json({
      reviews: [],
      summary: null,
      message: "Map review API not configured",
    });
  }

  try {
    const res = await fetchWithTimeout(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
      timeout: 5000,
    });

    if (!res.ok) {
      console.warn(
        `[map-reviews] Upstream returned error status: ${res.status}`,
      );
      return NextResponse.json({
        reviews: [],
        summary: null,
        error: `Upstream error: ${res.status}`,
      });
    }

    const json = await res.json();
    // API returns { success, data: { summary, reviews } } — unwrap data
    const payload = json?.data ?? json;
    return NextResponse.json(payload);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.warn("[map-reviews] fetch error:", err.message || err);
    return NextResponse.json({
      reviews: [],
      summary: null,
      error: err.message || "Failed to fetch reviews",
    });
  }
}
