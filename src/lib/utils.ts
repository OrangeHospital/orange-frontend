import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SettingItem = { key: string; value: string };

export function getSettingValue(
  settings: SettingItem[] | undefined,
  key: string,
  fallback = "",
) {
  return settings?.find((s) => s.key === key)?.value || fallback;
}

export function isValidImageUrl(url?: string) {
  if (!url) return false;
  return (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    !url.includes(":")
  );
}

export function getImageUrl(url?: string) {
  if (!url) return "";
  if (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }
  const fileBase =
    process.env.NEXT_PUBLIC_FILE_BASE_URL || "http://3.111.240.196:7071/share/";
  const base = fileBase.endsWith("/") ? fileBase : `${fileBase}/`;
  return `${base}${url}`;
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit & { timeout?: number },
): Promise<Response> {
  const { timeout = 5000, ...options } = init || {};

  return new Promise<Response>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timeout"));
    }, timeout);

    fetch(input, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
