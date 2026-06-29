import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  const url = process.env.MAP_REVIEW_API_URL;
  const token = process.env.MAP_REVIEW_API_TOKEN;

  if (!url || !token) {
    return NextResponse.json(
      { error: "Map review API not configured" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.status}` },
        { status: res.status },
      );
    }

    const json = await res.json();
    // API returns { success, data: { summary, reviews } } — unwrap data
    const payload = json?.data ?? json;
    return NextResponse.json(payload);
  } catch (err) {
    console.error("[map-reviews] fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}
