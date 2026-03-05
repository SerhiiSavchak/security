"use client";

import { useEffect, useRef, createContext, useContext, useCallback, useState, useMemo } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

type LenisContextValue = {
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number }) => void;
  progress: number;
  getScrollY: () => number;
};

const LenisContext = createContext<LenisContextValue | null>(null);

const LENIS_OPTIONS = {
  lerp: 0.08,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.2,
  autoRaf: true,
  anchors: true,
  allowNestedScroll: true,
} as const;

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [progress, setProgress] = useState(0);

  const getScrollY = useCallback(() => {
    const lenis = lenisRef.current;
    return lenis ? lenis.scroll : window.scrollY;
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement | number, options?: { offset?: number }) => {
    const lenis = lenisRef.current;
    if (lenis) {
      if (typeof target === "number") {
        lenis.scrollTo(target, { immediate: false });
      } else {
        lenis.scrollTo(target, { offset: options?.offset ?? -80, duration: 1.2 });
      }
    } else {
      if (typeof target === "string" && target.startsWith("#")) {
        const el = document.getElementById(target.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis(LENIS_OPTIONS);
    lenisRef.current = lenis;
    lenis.on("scroll", () => setProgress(lenis.progress));
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = useMemo(() => ({ scrollTo, progress, getScrollY }), [scrollTo, progress, getScrollY]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
