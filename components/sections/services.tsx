"use client";

import { useInView, useMouseGlow } from "@/hooks/use-in-view";
import type { Dictionary } from "@/lib/get-dictionary";

function IconShield() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
      <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
      <rect x="2" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      <path d="M18 10l4-2v8l-4-2V10z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      <circle cx="10" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconRadar() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="12" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function IconConsult() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      <path d="M8 8h8M8 12h6M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const icons = [IconShield, IconCamera, IconAlert, IconLock, IconRadar, IconConsult];

export function Services({ dict }: { dict: Dictionary }) {
  const { ref: viewRef, inView } = useInView();
  const { ref: glowRef, handleMouseMove } = useMouseGlow();

  return (
    <section id="services" className="relative py-32 lg:py-44" ref={viewRef}>
      {/* Diagonal top overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Badge */}
        <div
          className={`mb-6 flex items-center gap-4 transition-all duration-800 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="h-px w-12 bg-primary/50" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            {dict.services.badge}
          </span>
        </div>

        <h2
          className={`mb-16 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl transition-all duration-800 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {dict.services.title}
        </h2>

        {/* Cards grid with mouse glow tracking */}
        <div
          ref={glowRef}
          onMouseMove={handleMouseMove}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {dict.services.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <div
                key={service.title}
                className={`tactical-card glass-panel glow-border group relative overflow-hidden rounded-xl p-7 lg:p-8 transition-all duration-800 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/[0.07] transition-all duration-300 group-hover:bg-primary/[0.12] group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]">
                  <Icon />
                </div>

                <h3
                  className="mb-3 text-xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-2/3" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 h-8 w-8 border-t border-r border-primary/0 transition-all duration-500 group-hover:border-primary/20 rounded-tr-xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
