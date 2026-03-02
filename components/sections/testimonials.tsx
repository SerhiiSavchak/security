"use client";

import { useInView } from "@/hooks/use-in-view";
import type { Dictionary } from "@/lib/get-dictionary";

export function Testimonials({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();

  return (
    <section id="testimonials" className="relative py-32 lg:py-44" ref={ref}>
      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Badge */}
        <div
          className={`mb-6 flex items-center gap-4 transition-all duration-800 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="h-px w-12 bg-primary/50" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            {dict.testimonials.badge}
          </span>
        </div>

        <h2
          className={`mb-16 text-4xl font-bold tracking-tight text-foreground sm:text-5xl transition-all duration-800 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {dict.testimonials.title}
        </h2>

        {/* Cards - offset layout */}
        <div className="grid gap-5 md:grid-cols-3">
          {dict.testimonials.items.map((item, i) => (
            <div
              key={item.name}
              className={`tactical-card glass-panel glow-border group relative overflow-hidden rounded-xl p-7 lg:p-8 transition-all duration-800 ${
                i === 1 ? "md:translate-y-8" : ""
              } ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Large quote mark */}
              <div className="mb-5 font-serif text-5xl leading-none text-primary/15">{'"'}</div>

              <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                {item.text}
              </p>

              <div className="flex items-center gap-4 border-t border-border/40 pt-5">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-mono text-xs font-bold text-primary">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.name}</div>
                  <div className="font-mono text-[11px] text-muted-foreground/60">{item.role}</div>
                </div>
              </div>

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
