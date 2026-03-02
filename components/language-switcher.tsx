"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const labels: Record<Locale, string> = {
  ua: "UA",
  en: "EN",
  ru: "RU",
};

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
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

  function switchLocale(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="font-mono text-xs">{labels[currentLocale]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`flex w-full items-center px-4 py-2 text-sm transition-colors hover:bg-secondary ${
                locale === currentLocale
                  ? "text-primary font-semibold"
                  : "text-foreground"
              }`}
            >
              <span className="font-mono">{labels[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
