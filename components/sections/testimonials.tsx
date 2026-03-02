"use client";

import { useInView } from "@/hooks/use-in-view";
import { Quote } from "lucide-react";
import type { Dictionary } from "@/lib/get-dictionary";

export function Testimonials({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();

  return (
    <section id="testimonials" className="relative py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Badge */}
        <div
          className={`mb-4 flex items-center gap-2 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {dict.testimonials.badge}
          </span>
        </div>

        <h2
          className={`mb-12 text-3xl font-bold tracking-tight text-foreground sm:text-4xl transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {dict.testimonials.title}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {dict.testimonials.items.map((item, i) => (
            <div
              key={item.name}
              className={`tactical-card relative rounded-lg border border-border bg-card/40 p-6 backdrop-blur-sm transition-all duration-700 hover:border-primary/20 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <Quote className="mb-4 h-5 w-5 text-primary/40" />
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {`"${item.text}"`}
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-foreground">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
