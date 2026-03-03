"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { HeroVisual } from "@/components/hero-visual";
import type { Dictionary } from "@/lib/get-dictionary";

export function Hero({ dict }: { dict: Dictionary }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* === BACKGROUND LAYERS === */}

      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-drift"
        style={{
          background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(225,30%,5%) 30%, hsl(225,25%,8%) 60%, hsl(var(--background)) 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Grid overlay */}
      <div className="grid-tactical absolute inset-0 animate-grid-breathe" />

      {/* Light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-0 top-0 h-full w-[200px] opacity-[0.03] animate-light-beam"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--glow)), transparent)" }}
        />
        <div
          className="absolute left-0 top-0 h-full w-[120px] opacity-[0.02] animate-light-beam"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--glow)), transparent)", animationDelay: "2s", animationDuration: "6s" }}
        />
      </div>

      {/* Large radar - right */}
      <div className="absolute -right-[10%] top-[5%] h-[700px] w-[700px] opacity-10 lg:opacity-[0.15] pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              inset: `${i * 10}%`,
              borderColor: `hsl(var(--glow) / ${0.15 - i * 0.025})`,
            }}
          />
        ))}
        <div className="absolute inset-0 animate-radar-sweep origin-center">
          <div
            className="mx-auto h-1/2 w-0.5"
            style={{
              background: "linear-gradient(to top, hsl(var(--glow) / 0.7), transparent)",
              boxShadow: "0 0 15px hsl(var(--glow) / 0.2)",
            }}
          />
        </div>
        <div
          className="absolute inset-0 animate-radar-sweep origin-center rounded-full"
          style={{ background: "conic-gradient(from 0deg, transparent 0deg, hsl(var(--glow) / 0.06) 40deg, transparent 120deg)" }}
        />
        <div className="absolute left-[30%] top-[22%] h-2 w-2 rounded-full bg-glow animate-glow-pulse" style={{ animationDelay: "0.3s" }} />
        <div className="absolute left-[62%] top-[38%] h-1.5 w-1.5 rounded-full bg-emerald animate-glow-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute left-[45%] top-[68%] h-2 w-2 rounded-full bg-glow animate-glow-pulse" style={{ animationDelay: "1.8s" }} />
      </div>

      {/* Smaller radar - bottom left */}
      <div className="absolute -left-[12%] bottom-[0%] hidden h-[400px] w-[400px] opacity-10 lg:block pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              inset: `${i * 15}%`,
              borderColor: `hsl(var(--glow) / ${0.1 - i * 0.025})`,
            }}
          />
        ))}
        <div className="absolute inset-0 animate-radar-sweep origin-center" style={{ animationDirection: "reverse", animationDuration: "7s" }}>
          <div
            className="mx-auto h-1/2 w-0.5"
            style={{ background: "linear-gradient(to top, hsl(var(--glow) / 0.4), transparent)" }}
          />
        </div>
      </div>

      {/* Floating glow orbs */}
      <div
        className="absolute left-[15%] top-[20%] h-96 w-96 rounded-full opacity-[0.04] blur-3xl animate-float-slow pointer-events-none"
        style={{ background: "hsl(var(--glow))" }}
      />
      <div
        className="absolute right-[25%] bottom-[15%] h-72 w-72 rounded-full opacity-[0.03] blur-3xl animate-float-reverse pointer-events-none"
        style={{ background: "hsl(var(--emerald))" }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px opacity-[0.06] animate-scan-line pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--glow)), transparent)" }}
      />

      {/* === CONTENT === */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-28 pb-20 lg:px-10 lg:pt-0 lg:pb-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
          {/* Left content */}
          <div className="flex-1 max-w-2xl">
            <div
              className={`mb-11 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 transition-all duration-1000 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                {dict.hero.badge}
              </span>
            </div>

            <h1
              className={`mb-8 text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight transition-all duration-1000 delay-200 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-foreground">{dict.hero.title}</span>{" "}
              <span className="text-primary whitespace-nowrap">{dict.hero.titleAccent}</span>
            </h1>

            <p
              className={`mb-12 max-w-lg text-lg leading-relaxed text-muted-foreground transition-all duration-1000 delay-500 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {dict.hero.subtitle}
            </p>

            <div
              className={`flex flex-col gap-4 sm:flex-row transition-all duration-1000 delay-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <a
                href="tel:+380321234567"
                className="btn-primary flex items-center justify-center gap-3 rounded-lg px-8 py-4 text-sm"
              >
                <Phone className="h-4 w-4" />
                {dict.hero.cta}
              </a>
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost rounded-lg px-8 py-4 text-sm"
              >
                {dict.hero.cta_secondary}
              </button>
            </div>
          </div>

          {/* Right: Hero Visual (CCTV cameras) */}
          <div
            className={`mt-16 lg:mt-0 flex-1 flex justify-end min-w-0 transition-all duration-1200 delay-600 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(var(--background)), hsl(var(--background) / 0.7) 40%, transparent)" }} />

      {/* HUD corners */}
      <div className="absolute left-5 top-24 h-12 w-12 border-l border-t border-primary/10 hidden lg:block pointer-events-none" />
      <div className="absolute right-5 bottom-10 h-12 w-12 border-r border-b border-primary/10 hidden lg:block pointer-events-none" />
    </section>
  );
}
