import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});

// Draft-preview client — server-side only, never ship token to browser
export const sanityPreviewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
});

export function isSanityConfigured(): boolean {
  return !!(projectId && dataset);
}

// Build a Sanity CDN image URL from an asset reference or plain URL string.
// Returns the URL as-is if it already starts with http.
export function resolveSanityImageUrl(
  asset: { _ref?: string; url?: string } | string | null | undefined,
): string {
  if (!asset) return "";
  if (typeof asset === "string") {
    if (asset.startsWith("http")) return asset;
    return "";
  }
  if (asset.url) return asset.url;
  return "";
}
