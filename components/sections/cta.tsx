"use client";

import { useInView } from "@/hooks/use-in-view";
import { Phone, Send } from "lucide-react";
import type { Dictionary } from "@/lib/get-dictionary";

export function CTA({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();

  return (
    <section className="relative py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
          {/* Animated background pulse */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-glow-pulse" />

          {/* Grid overlay */}
          <div className="grid-overlay absolute inset-0 opacity-50" />

          <div className="relative flex flex-col items-center px-6 py-16 text-center sm:px-12 lg:py-24">
            <h2
              className={`mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="text-balance">{dict.cta.title}</span>
            </h2>
            <p
              className={`mb-10 max-w-xl text-base text-muted-foreground transition-all duration-700 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {dict.cta.subtitle}
            </p>

            {/* Phone number */}
            <a
              href="tel:+380441234567"
              className={`mb-8 font-mono text-2xl font-bold text-primary transition-all duration-700 delay-200 hover:underline sm:text-3xl lg:text-4xl ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {dict.cta.phone}
            </a>

            {/* Buttons */}
            <div
              className={`flex flex-col gap-4 sm:flex-row transition-all duration-700 delay-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href="tel:+380441234567"
                className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
              >
                <Phone className="h-4 w-4" />
                {dict.cta.call}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-secondary/50"
              >
                <Send className="h-4 w-4" />
                {dict.cta.telegram}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
