"use client";

import { useInView } from "@/hooks/use-in-view";
import type { Dictionary } from "@/lib/get-dictionary";

export function Process({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();

  return (
    <section id="process" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Badge */}
        <div
          className={`mb-4 flex items-center gap-2 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {dict.process.badge}
          </span>
        </div>

        <h2
          className={`mb-16 text-3xl font-bold tracking-tight text-foreground sm:text-4xl transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {dict.process.title}
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 hidden h-full w-px bg-border md:block lg:left-1/2">
            {inView && (
              <div className="h-full w-full bg-primary/40 animate-count-line" />
            )}
          </div>

          <div className="flex flex-col gap-12">
            {dict.process.steps.map((step, i) => (
              <div
                key={step.title}
                className={`relative flex flex-col gap-4 md:flex-row md:items-center transition-all duration-700 ${
                  i % 2 === 0
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse lg:text-right"
                } ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${300 + i * 200}ms` }}
              >
                {/* Step number */}
                <div className="flex items-center gap-4 md:w-10 lg:w-1/2 lg:justify-center">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <span className="font-mono text-sm font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:hidden">
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="ml-14 md:ml-8 lg:ml-0 lg:w-1/2">
                  <div className="tactical-card rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
                    <h3 className="mb-2 hidden text-lg font-semibold text-foreground md:block">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
