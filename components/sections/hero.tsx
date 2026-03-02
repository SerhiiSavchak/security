"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
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
      <div className="absolute inset-0 overflow-hidden">
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
      <div className="absolute -right-[10%] top-[5%] h-[700px] w-[700px] opacity-15 lg:opacity-25">
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
        {/* Sweep arm */}
        <div className="absolute inset-0 animate-radar-sweep origin-center">
          <div
            className="mx-auto h-1/2 w-0.5"
            style={{
              background: "linear-gradient(to top, hsl(var(--glow) / 0.7), transparent)",
              boxShadow: "0 0 15px hsl(var(--glow) / 0.2)",
            }}
          />
        </div>
        {/* Conic trail */}
        <div
          className="absolute inset-0 animate-radar-sweep origin-center rounded-full"
          style={{ background: "conic-gradient(from 0deg, transparent 0deg, hsl(var(--glow) / 0.06) 40deg, transparent 120deg)" }}
        />
        {/* Blips */}
        <div className="absolute left-[30%] top-[22%] h-2 w-2 rounded-full bg-glow animate-glow-pulse" style={{ animationDelay: "0.3s" }} />
        <div className="absolute left-[62%] top-[38%] h-1.5 w-1.5 rounded-full bg-emerald animate-glow-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute left-[45%] top-[68%] h-2 w-2 rounded-full bg-glow animate-glow-pulse" style={{ animationDelay: "1.8s" }} />
        <div className="absolute left-[72%] top-[55%] h-1 w-1 rounded-full bg-glow animate-glow-pulse" style={{ animationDelay: "2.5s" }} />
      </div>

      {/* Smaller radar - bottom left */}
      <div className="absolute -left-[12%] bottom-[0%] hidden h-[400px] w-[400px] opacity-10 lg:block">
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
        className="absolute left-[15%] top-[20%] h-96 w-96 rounded-full opacity-[0.04] blur-3xl animate-float-slow"
        style={{ background: "hsl(var(--glow))" }}
      />
      <div
        className="absolute right-[25%] bottom-[15%] h-72 w-72 rounded-full opacity-[0.03] blur-3xl animate-float-reverse"
        style={{ background: "hsl(var(--emerald))" }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px opacity-[0.06] animate-scan-line"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--glow)), transparent)" }}
      />

      {/* === CONTENT === */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-28 pb-20 lg:px-10 lg:pt-0 lg:pb-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
          {/* Left content */}
          <div className="flex-1">
            {/* Status badge */}
            <div
              className={`mb-10 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 transition-all duration-1000 ${
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

            {/* Headline */}
            <h1
              className={`mb-2 text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight transition-all duration-1000 delay-200 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block text-foreground">{dict.hero.title}</span>
            </h1>
            <h1
              className={`mb-8 text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-primary transition-all duration-1000 delay-400 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block">{dict.hero.titleAccent}</span>
            </h1>

            {/* Subtitle */}
            <p
              className={`mb-12 max-w-lg text-lg leading-relaxed text-muted-foreground transition-all duration-1000 delay-500 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {dict.hero.subtitle}
            </p>

            {/* CTA buttons */}
            <div
              className={`flex flex-col gap-4 sm:flex-row transition-all duration-1000 delay-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <a
                href="tel:+380441234567"
                className="btn-primary flex items-center justify-center gap-3 rounded-lg px-8 py-4 text-sm"
              >
                <Phone className="h-4 w-4" />
                {dict.hero.cta}
              </a>
              <button
                onClick={() =>
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-ghost rounded-lg px-8 py-4 text-sm"
              >
                {dict.hero.cta_secondary}
              </button>
            </div>
          </div>

          {/* Right: HUD Panel */}
          <div
            className={`mt-16 lg:mt-0 lg:w-[440px] transition-all duration-1000 delay-900 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="glass-panel rounded-xl p-px">
              <div className="rounded-xl bg-card/60 p-6 lg:p-8">
                {/* HUD header */}
                <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald">SYSTEM ACTIVE</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/50">v4.2.1</span>
                </div>

                {/* Metrics */}
                <div className="flex flex-col gap-5">
                  {[
                    { label: "THREAT LEVEL", value: "NOMINAL", color: "text-emerald" },
                    { label: "UPTIME", value: "99.97%", color: "text-primary" },
                    { label: "ACTIVE SHIELDS", value: "1,247", color: "text-primary" },
                    { label: "RESPONSE TIME", value: "< 180s", color: "text-emerald" },
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/60">{item.label}</span>
                      <span className={`font-mono text-sm font-semibold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Visual bar */}
                <div className="mt-6 pt-4 border-t border-border/50">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">DEFENSE CAPACITY</span>
                    <span className="font-mono text-[10px] text-primary">94%</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-muted/50 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "94%",
                        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--emerald)))",
                        boxShadow: "0 0 8px hsl(var(--primary) / 0.3)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* HUD corners */}
      <div className="absolute left-5 top-24 h-12 w-12 border-l border-t border-primary/10 hidden lg:block" />
      <div className="absolute right-5 bottom-10 h-12 w-12 border-r border-b border-primary/10 hidden lg:block" />
    </section>
  );
}
