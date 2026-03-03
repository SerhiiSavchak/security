"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type Language,
  getDictionary,
  getStoredLanguage,
  STORAGE_KEY,
  defaultLanguage,
} from "@/lib/translations";

type Dictionary = ReturnType<typeof getDictionary>;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: Dictionary;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredLanguage();
    setLanguageState(stored ?? defaultLanguage);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const langAttr = language === "uk" ? "uk" : language === "ru" ? "ru" : "en";
      document.documentElement.lang = langAttr;
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }, []);

  const dict = getDictionary(language);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    dict,
    mounted,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
