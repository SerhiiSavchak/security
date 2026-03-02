"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/get-dictionary";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

const navIds = ["about", "services", "why-us", "process", "testimonials"] as const;

export function Header({ locale, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLabels = [
    dict.header.about,
    dict.header.services,
    dict.header.why_us,
    dict.header.process,
    dict.header.reviews,
  ];

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "glass-panel-strong py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 lg:px-10">
        {/* Logo */}
        <a href={`/${locale}`} className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative text-primary">
              <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
            </svg>
          </div>
          <span className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
            AEGIS
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {navIds.map((id, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group relative rounded-md px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {navLabels[i]}
              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-3/4" />
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />
          <a
            href="tel:+380441234567"
            className="btn-primary hidden items-center gap-2 rounded-lg px-5 py-2.5 text-xs sm:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{dict.header.call}</span>
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-primary/30 hover:text-primary lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-panel-strong mt-2 mx-5 rounded-xl lg:hidden">
          <nav className="flex flex-col p-4" aria-label="Mobile navigation">
            {navIds.map((id, i) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="rounded-lg px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
              >
                {navLabels[i]}
              </button>
            ))}
            <a
              href="tel:+380441234567"
              className="btn-primary mt-3 flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-xs"
            >
              <Phone className="h-3.5 w-3.5" />
              {dict.header.call}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
