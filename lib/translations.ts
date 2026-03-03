import ua from "./dictionaries/ua.json";
import en from "./dictionaries/en.json";
import ru from "./dictionaries/ru.json";

export type Language = "uk" | "en" | "ru";

// Map "uk" to ua dictionary (Ukrainian)
const dictionaries = {
  uk: ua,
  en,
  ru,
} as const;

export type Dictionary = (typeof dictionaries)["uk"];

export const translations = dictionaries;

export function getDictionary(lang: Language): Dictionary {
  return dictionaries[lang];
}

export const languages: Language[] = ["uk", "en", "ru"];
export const defaultLanguage: Language = "uk";

export const STORAGE_KEY = "lang";

export function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "uk" || stored === "en" || stored === "ru") return stored;
  return null;
}

export function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") return defaultLanguage;
  const lang = navigator.language?.toLowerCase().slice(0, 2);
  if (lang === "uk" || lang === "ua") return "uk";
  if (lang === "ru") return "ru";
  if (lang === "en") return "en";
  return defaultLanguage;
}

/** Get nested value from dictionary by dot path (e.g. "hero.title") */
export function t(dict: Dictionary, key: string): unknown {
  const keys = key.split(".");
  let val: unknown = dict;
  for (const k of keys) {
    val = (val as Record<string, unknown>)?.[k];
  }
  return val ?? key;
}
