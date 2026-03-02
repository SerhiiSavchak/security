"use client";

import { useInView } from "@/hooks/use-in-view";
import {
  Zap,
  Cpu,
  BadgeCheck,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";
import type { Dictionary } from "@/lib/get-dictionary";

const icons = [Zap, Cpu, BadgeCheck, Users, Settings, BarChart3];

export function WhyUs({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();

  return (
    <section id="why-us" className="relative py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Badge */}
        <div
          className={`mb-4 flex items-center gap-2 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {dict.whyUs.badge}
          </span>
        </div>

        <h2
          className={`mb-12 text-3xl font-bold tracking-tight text-foreground sm:text-4xl transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {dict.whyUs.title}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dict.whyUs.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                className={`group flex items-start gap-4 rounded-lg border border-border bg-card/30 p-5 transition-all duration-700 hover:border-primary/20 hover:bg-card/60 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
