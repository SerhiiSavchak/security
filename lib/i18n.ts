export const locales = ["ua", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ua";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
