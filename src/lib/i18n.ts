export const defaultLocale = "en" as const;

export type Locale = string;

export function isValidLocale(locale: string): boolean {
  return (
    typeof locale === "string" &&
    locale.length >= 2 &&
    /^[a-z]{2,}$/.test(locale)
  );
}
