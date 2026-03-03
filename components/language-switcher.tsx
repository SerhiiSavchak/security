"use client";

import { useLanguage } from "./language-provider";
import type { Language } from "@/lib/translations";
import { useState, useRef, useEffect } from "react";

const labels: Record<Language, string> = {
  uk: "UA",
  en: "EN",
  ru: "RU",
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLanguage(lang: Language) {
    setLanguage(lang);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="group flex h-9 items-center gap-2 rounded-lg border border-border bg-card/50 px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        aria-label="Switch language"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-current">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="font-mono text-[11px] tracking-wider">{labels[language]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[80px] overflow-hidden rounded-lg border border-border bg-background/95 shadow-2xl backdrop-blur-xl dark:bg-card/98 dark:border-primary/20">
          {(["uk", "en", "ru"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => switchLanguage(lang)}
              className={`flex w-full items-center px-4 py-2.5 font-mono text-xs tracking-wider transition-colors hover:bg-primary/5 ${
                lang === language
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {labels[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
