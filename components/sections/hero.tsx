"use client";

import { Shield, ChevronDown } from "lucide-react";
import type { Dictionary } from "@/lib/get-dictionary";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background grid overlay */}
      <div className="grid-overlay animate-grid-fade absolute inset-0" />

      {/* Radar effect */}
      <div className="absolute right-[-10%] top-[10%] h-[500px] w-[500px] opacity-20 lg:opacity-30">
        <div className="absolute inset-0 rounded-full border border-primary/20" />
        <div className="absolute inset-[15%] rounded-full border border-primary/15" />
        <div className="absolute inset-[30%] rounded-full border border-primary/10" />
        <div className="absolute inset-[45%] rounded-full border border-primary/5" />
        {/* Sweep */}
        <div className="absolute inset-0 animate-radar-sweep origin-center">
          <div
            className="mx-auto h-1/2 w-0.5"
            style={{
              background:
                "linear-gradient(to top, hsl(var(--primary) / 0.6), transparent)",
            }}
          />
        </div>
        {/* Radar dots */}
        <div
          className="absolute left-[35%] top-[25%] h-2 w-2 rounded-full bg-primary animate-glow-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute left-[60%] top-[40%] h-1.5 w-1.5 rounded-full bg-tactical-green animate-glow-pulse"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="absolute left-[45%] top-[65%] h-2 w-2 rounded-full bg-primary animate-glow-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Second radar - left side, mobile hidden */}
      <div className="absolute left-[-15%] bottom-[5%] hidden h-[350px] w-[350px] opacity-10 lg:block">
        <div className="absolute inset-0 rounded-full border border-primary/15" />
        <div className="absolute inset-[20%] rounded-full border border-primary/10" />
        <div className="absolute inset-0 animate-radar-sweep origin-center" style={{ animationDirection: "reverse", animationDuration: "6s" }}>
          <div
            className="mx-auto h-1/2 w-0.5"
            style={{
              background:
                "linear-gradient(to top, hsl(var(--primary) / 0.4), transparent)",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Badge */}
          <div className="mb-8 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 animate-fade-in-up">
            <div className="h-2 w-2 rounded-full bg-tactical-green animate-glow-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {dict.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mb-2 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-balance">{dict.hero.title}</span>
          </h1>
          <h1
            className="mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-balance">{dict.hero.titleAccent}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {dict.hero.subtitle}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col gap-4 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            {/* Primary CTA with light sweep */}
            <a
              href="tel:+380441234567"
              className="group relative overflow-hidden rounded-lg bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {dict.hero.cta}
              </span>
              {/* Sweep effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-lg border border-border bg-secondary/30 px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-secondary/50"
            >
              {dict.hero.cta_secondary}
            </button>
          </div>

          {/* HUD-style decorative corners */}
          <div
            className="mt-16 hidden w-full max-w-3xl lg:block animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            <div className="rounded-lg border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-tactical-green animate-glow-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    SYS.STATUS: ONLINE
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground/60">
                    THREAT.LEVEL:
                  </span>
                  <span className="font-mono text-xs text-tactical-green">
                    NOMINAL
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground/60">
                    UPTIME:
                  </span>
                  <span className="font-mono text-xs text-primary">
                    99.97%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground/50" />
      </div>
    </section>
  );
}
