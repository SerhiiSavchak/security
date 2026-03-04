"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "./language-provider";
import { useLenis } from "./lenis-provider";

const navIds = ["about", "services", "why-us", "process", "testimonials"] as const;

const MENU_CLOSE_DURATION = 250;

export function Header() {
  const { dict } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.classList.add("menu-open");
      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.classList.remove("menu-open");
      document.body.style.top = "";
      document.body.style.position = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.top = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [mobileOpen]);

  const navLabels = [
    dict.header.about,
    dict.header.services,
    dict.header.why_us,
    dict.header.process,
    dict.header.reviews,
  ];

  function closeMenu(onDone?: () => void) {
    if (!mobileOpen || menuClosing) return;
    setMenuClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setMenuClosing(false);
      onDone?.();
    }, MENU_CLOSE_DURATION);
  }

  const lenis = useLenis();

  function scrollTo(id: string) {
    const doScroll = () => {
      if (lenis) {
        lenis.scrollTo(`#${id}`, { offset: -80 });
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    if (mobileOpen || menuClosing) {
      closeMenu(doScroll);
    } else {
      doScroll();
    }
  }

  function handleLogoClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "glass-panel-strong py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]" />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative text-primary">
                <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
              </svg>
            </div>
            <span className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              AEGIS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navIds.map((id, i) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="group relative rounded-lg px-5 py-3 text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground min-h-[44px]"
              >
                {navLabels[i]}
                <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-3/4" />
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="tel:+380321234567"
              className="btn-primary hidden items-center gap-2 rounded-lg px-5 py-2.5 text-xs sm:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{dict.header.call}</span>
            </a>
            <button
              onClick={() => (mobileOpen ? closeMenu() : setMobileOpen(true))}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-primary/30 hover:text-primary lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* === FULLSCREEN MOBILE MENU === */}
      {mobileOpen && (
        <div
          className={`mobile-menu-overlay lg:hidden ${menuClosing ? "mobile-menu-closing" : ""}`}
          aria-modal="true"
          role="dialog"
          data-lenis-prevent
        >
          {/* Close button */}
          <div className="flex justify-end px-5 pt-5">
            <button
              onClick={() => closeMenu()}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:border-primary/30 hover:text-primary"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu content */}
          <nav className="flex flex-col items-center justify-center px-8 pt-8" aria-label="Mobile navigation">
            {/* Logo */}
            <div className="mb-12 flex items-center gap-3 mobile-menu-item" style={{ animationDelay: "0ms" }}>
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-primary/10" />
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="relative text-primary">
                  <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
                </svg>
              </div>
              <span className="font-mono text-lg font-bold uppercase tracking-[0.2em] text-foreground">
                AEGIS
              </span>
            </div>

            {/* Nav items */}
            {navIds.map((id, i) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="mobile-menu-item w-full max-w-sm rounded-xl px-6 py-5 text-center text-xl font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
              >
                {navLabels[i]}
              </button>
            ))}

            {/* CTA */}
            <a
              href="tel:+380321234567"
              className="mobile-menu-item btn-primary mt-8 flex w-full max-w-sm items-center justify-center gap-3 rounded-xl px-8 py-5 text-base"
              style={{ animationDelay: `${(navIds.length + 1) * 80}ms` }}
            >
              <Phone className="h-5 w-5" />
              {dict.header.call}
            </a>
          </nav>

          {/* Corner HUD marks */}
          <div className="absolute left-6 bottom-6 h-8 w-8 border-l border-b border-primary/10" />
          <div className="absolute right-6 bottom-6 h-8 w-8 border-r border-b border-primary/10" />
        </div>
      )}
    </>
  );
}
