"use client";

import { useInView } from "@/hooks/use-in-view";
import {
  ShieldCheck,
  Video,
  AlertTriangle,
  Lock,
  Radio,
  BookOpen,
} from "lucide-react";
import type { Dictionary } from "@/lib/get-dictionary";

const icons = [ShieldCheck, Video, AlertTriangle, Lock, Radio, BookOpen];

export function Services({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();

  return (
    <section id="services" className="relative py-24 lg:py-32" ref={ref}>
      {/* Subtle background accent */}
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
            {dict.services.badge}
          </span>
        </div>

        <h2
          className={`mb-12 text-3xl font-bold tracking-tight text-foreground sm:text-4xl transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {dict.services.title}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dict.services.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <div
                key={service.title}
                className={`tactical-card group rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-700 hover:border-primary/30 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                {/* Bottom glow line */}
                <div className="mt-4 h-px w-0 bg-primary/50 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
