"use client";

import { useInView } from "@/hooks/use-in-view";
import type { Dictionary } from "@/lib/get-dictionary";

export function About({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();

  const stats = [
    { value: dict.about.stats.years, label: dict.about.stats.yearsLabel },
    { value: dict.about.stats.response, label: dict.about.stats.responseLabel },
    { value: dict.about.stats.objects, label: dict.about.stats.objectsLabel },
  ];

  return (
    <section id="about" className="relative py-32 lg:py-44" ref={ref}>
      {/* Background accent */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-[0.03] blur-3xl"
        style={{ background: "hsl(var(--glow))" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Section label */}
        <div
          className={`mb-6 flex items-center gap-4 transition-all duration-800 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="h-px w-12 bg-primary/50" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            {dict.about.badge}
          </span>
        </div>

        {/* Split layout */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          {/* Left: text block */}
          <div className="lg:flex-1 lg:max-w-xl">
            <h2
              className={`mb-8 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl transition-all duration-800 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.about.title}
            </h2>
            <p
              className={`text-lg leading-relaxed text-muted-foreground transition-all duration-800 delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {dict.about.description}
            </p>
          </div>

          {/* Right: dramatic stat blocks */}
          <div className="flex flex-col gap-4 lg:w-[380px]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`tactical-card glass-panel glow-border rounded-xl px-7 py-6 transition-all duration-800 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div
                  className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
                {/* Decorative line */}
                <div
                  className="mt-4 h-px w-16"
                  style={{ background: "linear-gradient(90deg, hsl(var(--primary)), transparent)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
