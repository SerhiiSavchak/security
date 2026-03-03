"use client";

import { useInView } from "@/hooks/use-in-view";
import type { Dictionary } from "@/lib/get-dictionary";

export function Process({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();

  return (
    <section id="process" className="relative py-32 lg:py-44 overflow-hidden" ref={ref}>
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Badge */}
        <div
          className={`mb-6 flex items-center gap-4 transition-all duration-800 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="h-px w-12 bg-primary/50" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            {dict.process.badge}
          </span>
        </div>

        <h2
          className={`mb-20 text-4xl font-bold tracking-tight text-foreground sm:text-5xl transition-all duration-800 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {dict.process.title}
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-0 hidden h-full w-px bg-border/50 lg:left-1/2 lg:-translate-x-px md:block">
            {inView && (
              <div
                className="w-full animate-count-grow origin-top"
                style={{ background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--emerald)), hsl(var(--primary) / 0.2))" }}
              />
            )}
          </div>

          <div className="flex flex-col gap-16 lg:gap-24">
            {dict.process.steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`relative flex flex-col gap-6 md:flex-row md:items-center transition-all duration-800 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  style={{ transitionDelay: `${300 + i * 200}ms` }}
                >
                  {/* Number node */}
                  <div className={`flex items-center gap-5 md:w-12 lg:w-1/2 ${isEven ? "lg:justify-end lg:pr-12" : "lg:justify-start lg:pl-12"}`}>
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                      <span
                        className="font-mono text-lg font-bold text-primary"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full border border-primary/20 animate-radar-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground md:hidden" style={{ fontFamily: "var(--font-display)" }}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Content card */}
                  <div className={`ml-[68px] md:ml-0 lg:w-1/2 ${isEven ? "lg:pl-12" : "lg:pr-12"}`}>
                    <div className="tactical-card glass-panel rounded-xl p-7 lg:p-8">
                      <h3
                        className="mb-3 hidden text-xl font-bold text-foreground md:block"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      {/* Decorative corner */}
                      <div className={`absolute top-0 h-6 w-6 border-t border-primary/10 ${isEven ? "right-0 border-r rounded-tr-xl" : "left-0 border-l rounded-tl-xl"}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
