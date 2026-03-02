"use client";

import { useInView } from "@/hooks/use-in-view";
import { Clock, ShieldCheck, Building } from "lucide-react";
import type { Dictionary } from "@/lib/get-dictionary";

export function About({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();

  const stats = [
    {
      value: dict.about.stats.years,
      label: dict.about.stats.yearsLabel,
      icon: Clock,
    },
    {
      value: dict.about.stats.response,
      label: dict.about.stats.responseLabel,
      icon: ShieldCheck,
    },
    {
      value: dict.about.stats.objects,
      label: dict.about.stats.objectsLabel,
      icon: Building,
    },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Badge */}
        <div
          className={`mb-4 flex items-center gap-2 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {dict.about.badge}
          </span>
        </div>

        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Left: text */}
          <div className="flex-1">
            <h2
              className={`mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl transition-all duration-700 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {dict.about.title}
            </h2>
            <p
              className={`max-w-xl text-base leading-relaxed text-muted-foreground transition-all duration-700 delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {dict.about.description}
            </p>
          </div>

          {/* Right: stats */}
          <div className="flex flex-col gap-6 sm:flex-row lg:flex-col lg:gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`tactical-card flex items-center gap-5 rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
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
