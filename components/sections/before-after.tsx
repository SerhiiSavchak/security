"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import Image from "next/image";
import type { Dictionary } from "@/lib/get-dictionary";

export function BeforeAfter({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />

      <div className="relative mx-auto max-w-[1200px] px-5 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div
            className={`mb-6 inline-flex items-center gap-4 transition-all duration-800 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="h-px w-12 bg-primary/50" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
              {dict.beforeAfter?.badge ?? "VISUAL PROOF"}
            </span>
            <div className="h-px w-12 bg-primary/50" />
          </div>

          <h2
            className={`mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl transition-all duration-800 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {dict.beforeAfter?.title ?? "Before & After Security"}
          </h2>
          <p
            className={`mx-auto max-w-lg text-muted-foreground transition-all duration-800 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {dict.beforeAfter?.subtitle ?? "Drag the slider to see the difference professional security makes."}
          </p>
        </div>

        {/* Slider container */}
        <div
          className={`transition-all duration-800 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            ref={containerRef}
            className="relative mx-auto aspect-[16/9] w-full cursor-ew-resize overflow-hidden rounded-2xl select-none touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            role="slider"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Before and after comparison slider"
            tabIndex={0}
          >
            {/* AFTER image -- full background (right side = "with security") */}
            <div className="absolute inset-0">
              <Image
                src="/images/after-security.jpg"
                alt="With professional security: well-lit, monitored, safe"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              {/* Calm blue-green overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald/10" />
            </div>

            {/* BEFORE image -- clipped to left portion */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src="/images/before-security.jpg"
                alt="Without security: dark, unsafe, unmonitored"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              {/* Dark red overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-red-900/20" />
              {/* Slight noise / unease */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(0 0% 0% / 0.3) 3px, transparent 4px)",
                }}
              />
            </div>

            {/* Labels */}
            <div
              className="absolute left-6 top-6 z-10 rounded-md bg-red-950/70 backdrop-blur-sm px-3 py-1.5 transition-opacity duration-300"
              style={{ opacity: position > 15 ? 1 : 0 }}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-red-300">
                {dict.beforeAfter?.labelBefore ?? "Without Security"}
              </span>
            </div>
            <div
              className="absolute right-6 top-6 z-10 rounded-md bg-primary/20 backdrop-blur-sm px-3 py-1.5 transition-opacity duration-300"
              style={{ opacity: position < 85 ? 1 : 0 }}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                {dict.beforeAfter?.labelAfter ?? "With Security"}
              </span>
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-px"
              style={{
                left: `${position}%`,
                background: "hsl(0 0% 100% / 0.8)",
                boxShadow: "0 0 12px hsl(0 0% 100% / 0.3), 0 0 30px hsl(var(--glow) / 0.2)",
              }}
            />

            {/* Drag handle */}
            <div
              className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${position}%` }}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  isDragging
                    ? "border-primary bg-primary/20 scale-110 shadow-[0_0_25px_hsl(var(--primary)/0.4)]"
                    : "border-white/80 bg-background/80 shadow-[0_0_15px_hsl(0_0%_0%/0.3)]"
                } backdrop-blur-md`}
              >
                {/* Arrows */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
                  <path d="M8 12H4m0 0l3-3m-3 3l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 12h4m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Corner brackets */}
            <div className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-white/20 z-10" />
            <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-white/20 z-10" />
            <div className="absolute left-3 bottom-3 h-6 w-6 border-l-2 border-b-2 border-white/20 z-10" />
            <div className="absolute right-3 bottom-3 h-6 w-6 border-r-2 border-b-2 border-white/20 z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
