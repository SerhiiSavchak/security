"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";
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
      <div className="absolute inset-0">
        <Image src="/images/hero-bg.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-background/80 dark:bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald/5" />
      </div>

      {/* Grid overlay */}
      <div className="grid-tactical absolute inset-0 animate-grid-breathe" />

      {/* Light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 h-full w-[200px] opacity-[0.03] animate-light-beam" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--glow)), transparent)" }} />
        <div className="absolute left-0 top-0 h-full w-[120px] opacity-[0.02] animate-light-beam" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--glow)), transparent)", animationDelay: "2s", animationDuration: "6s" }} />
      </div>

      {/* Large radar */}
      <div className="absolute -right-[10%] top-[5%] h-[700px] w-[700px] opacity-10 lg:opacity-[0.15] pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="absolute rounded-full border" style={{ inset: `${i * 10}%`, borderColor: `hsl(var(--glow) / ${0.15 - i * 0.025})` }} />
        ))}
        <div className="absolute inset-0 animate-radar-sweep origin-center">
          <div className="mx-auto h-1/2 w-0.5" style={{ background: "linear-gradient(to top, hsl(var(--glow) / 0.7), transparent)", boxShadow: "0 0 15px hsl(var(--glow) / 0.2)" }} />
        </div>
        <div className="absolute inset-0 animate-radar-sweep origin-center rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 0deg, hsl(var(--glow) / 0.06) 40deg, transparent 120deg)" }} />
        <div className="absolute left-[30%] top-[22%] h-2 w-2 rounded-full bg-glow animate-glow-pulse" style={{ animationDelay: "0.3s" }} />
        <div className="absolute left-[62%] top-[38%] h-1.5 w-1.5 rounded-full bg-emerald animate-glow-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute left-[45%] top-[68%] h-2 w-2 rounded-full bg-glow animate-glow-pulse" style={{ animationDelay: "1.8s" }} />
      </div>

      {/* Floating glow orbs */}
      <div className="absolute left-[15%] top-[20%] h-96 w-96 rounded-full opacity-[0.04] blur-3xl animate-float-slow pointer-events-none" style={{ background: "hsl(var(--glow))" }} />
      <div className="absolute right-[25%] bottom-[15%] h-72 w-72 rounded-full opacity-[0.03] blur-3xl animate-float-reverse pointer-events-none" style={{ background: "hsl(var(--emerald))" }} />

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-px opacity-[0.06] animate-scan-line pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--glow)), transparent)" }} />

      {/* === CONTENT === */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-28 pb-20 lg:px-10 lg:pt-0 lg:pb-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left: text */}
          <div className="flex-1 max-w-2xl">
            <div className={`mb-10 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{dict.hero.badge}</span>
            </div>

            <h1 className={`mb-2 text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ fontFamily: "var(--font-display)" }}>
              <span className="block text-foreground">{dict.hero.title}</span>
            </h1>
            <h1 className={`mb-8 text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-primary transition-all duration-1000 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ fontFamily: "var(--font-display)" }}>
              <span className="block">{dict.hero.titleAccent}</span>
            </h1>

            <p className={`mb-12 max-w-lg text-lg leading-relaxed text-muted-foreground transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {dict.hero.subtitle}
            </p>

            <div className={`flex flex-col gap-4 sm:flex-row transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <a href="tel:+380441234567" className="btn-primary flex items-center justify-center gap-3 rounded-lg px-8 py-4 text-sm">
                <Phone className="h-4 w-4" />
                {dict.hero.cta}
              </a>
              <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="btn-ghost rounded-lg px-8 py-4 text-sm">
                {dict.hero.cta_secondary}
              </button>
            </div>
          </div>

          {/* Right: CCTV cinematic image replacing the old HUD card */}
          <div className={`mt-16 lg:mt-0 lg:flex-1 lg:max-w-[520px] transition-all duration-1200 delay-600 ${loaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}`}>
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute -inset-8 rounded-3xl opacity-[0.15] blur-3xl animate-float-slow pointer-events-none" style={{ background: "linear-gradient(135deg, hsl(var(--glow)), hsl(var(--primary) / 0.5))" }} />

              {/* Main image with floating animation */}
              <div className="relative overflow-hidden rounded-2xl animate-float-slow" style={{ animationDuration: "8s" }}>
                <div className="relative aspect-[4/5] lg:aspect-[3/4]">
                  <Image src="/images/hero-cctv.jpg" alt="Security surveillance cameras monitoring city" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 520px" />
                  {/* Gradient blending overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-transparent to-background/30" />
                  <div className="absolute inset-0 bg-primary/[0.08] mix-blend-overlay" />
                  {/* Scan line across image */}
                  <div className="absolute left-0 right-0 h-[2px] opacity-20 animate-scan-line" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--glow)), transparent)", animationDuration: "3s" }} />
                  {/* Light sweep */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute left-0 top-0 h-full w-[160px] opacity-[0.06] animate-light-beam" style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100%), transparent)", animationDuration: "5s" }} />
                  </div>
                  {/* Perimeter glow border */}
                  <div className="absolute inset-0 rounded-2xl border border-primary/10 shadow-[inset_0_0_30px_hsl(var(--primary)/0.05)]" />
                </div>
              </div>

              {/* Corner HUD accents */}
              <div className="absolute left-2 top-2 h-8 w-8 border-l-2 border-t-2 border-primary/25 rounded-tl-lg pointer-events-none" />
              <div className="absolute right-2 top-2 h-8 w-8 border-r-2 border-t-2 border-primary/25 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-2 left-2 h-8 w-8 border-l-2 border-b-2 border-primary/25 rounded-bl-lg pointer-events-none" />
              <div className="absolute right-2 bottom-2 h-8 w-8 border-r-2 border-b-2 border-primary/25 rounded-br-lg pointer-events-none" />

              {/* LIVE badge */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-background/70 backdrop-blur-md border border-primary/20 px-3 py-1.5 pointer-events-none">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/80">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(var(--background)), hsl(var(--background) / 0.7) 40%, transparent)" }} />

      {/* HUD corners */}
      <div className="absolute left-5 top-24 h-12 w-12 border-l border-t border-primary/10 hidden lg:block pointer-events-none" />
      <div className="absolute right-5 bottom-10 h-12 w-12 border-r border-b border-primary/10 hidden lg:block pointer-events-none" />
    </section>
  );
}
