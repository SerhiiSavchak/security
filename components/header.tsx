"use client";

import { useState, useEffect } from "react";
import { Shield, Phone, Menu, X } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <a href={`/${locale}`} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
            AEGIS
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navIds.map((id, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {navLabels[i]}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />
          <a
            href="tel:+380441234567"
            className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:flex"
          >
            <Phone className="h-4 w-4" />
            <span>{dict.header.call}</span>
          </a>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4" aria-label="Mobile navigation">
            {navIds.map((id, i) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="rounded-md px-3 py-3 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {navLabels[i]}
              </button>
            ))}
            <a
              href="tel:+380441234567"
              className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              {dict.header.call}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
