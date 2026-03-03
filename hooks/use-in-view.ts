"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const IO_OPTIONS = { threshold: 0.1, rootMargin: "0px 0px -60px 0px" } as const;

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { ...IO_OPTIONS, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cards = el.querySelectorAll<HTMLElement>(".tactical-card");
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - cardRect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - cardRect.top}px`);
    });
  }, []);

  return { ref, handleMouseMove };
}
