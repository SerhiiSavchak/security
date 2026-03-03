"use client";

import { useInView, useMouseGlow } from "@/hooks/use-in-view";
import { Zap, Cpu, BadgeCheck, Users, Settings, BarChart3 } from "lucide-react";
import type { Dictionary } from "@/lib/get-dictionary";

const icons = [Zap, Cpu, BadgeCheck, Users, Settings, BarChart3];

export function WhyUs({ dict }: { dict: Dictionary }) {
  const { ref: viewRef, inView } = useInView();
  const { ref: glowRef, handleMouseMove } = useMouseGlow();

  return (
    <section id="why-us" className="relative py-32 lg:py-44 overflow-hidden" ref={viewRef}>
      {/* Background glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-[0.025] blur-3xl"
        style={{ background: "hsl(var(--emerald))" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Badge */}
        <div
          className={`mb-6 flex items-center gap-4 transition-all duration-800 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="h-px w-12 bg-primary/50" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            {dict.whyUs.badge}
          </span>
        </div>

        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          {/* Left: Heading */}
          <div className="lg:w-[400px] lg:sticky lg:top-32">
            <h2
              className={`text-4xl font-bold tracking-tight text-foreground sm:text-5xl transition-all duration-800 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.whyUs.title}
            </h2>
            {/* Decorative element */}
            <div
              className={`mt-8 hidden lg:block transition-all duration-800 delay-300 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-full border border-primary/10" />
                <div className="absolute inset-[20%] rounded-full border border-primary/15" />
                <div className="absolute inset-[40%] rounded-full border border-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-primary/30 animate-glow-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Cards grid */}
          <div
            ref={glowRef}
            onMouseMove={handleMouseMove}
            className="flex-1 grid gap-4 sm:grid-cols-2"
          >
            {dict.whyUs.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <div
                  key={item.title}
                  className={`tactical-card glass-panel group overflow-hidden rounded-xl p-6 transition-all duration-800 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/[0.07] transition-all duration-300 group-hover:bg-primary/[0.12]">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
