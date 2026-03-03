"use client";

import { useInView } from "@/hooks/use-in-view";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { Section, Container, SectionBadge, SectionHeading, revealClass } from "@/components/section";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { dict } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <Section id="testimonials" ref={ref}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/surveillance.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.04] dark:opacity-[0.06]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/97 dark:bg-background/95" />
      </div>

      <Container className="relative">
        <div className={cn("transition-all duration-800", revealClass(inView))}>
          <SectionBadge>{dict.testimonials.badge}</SectionBadge>
        </div>

        <SectionHeading className={cn("mb-16 transition-all duration-800 delay-100", revealClass(inView))}>
          {dict.testimonials.title}
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-3">
          {dict.testimonials.items.map((item, i) => (
            <div
              key={item.name}
              className={cn(
                "tactical-card glass-panel glow-border group relative overflow-hidden rounded-xl p-7 lg:p-8 transition-all duration-800",
                i === 1 && "md:translate-y-8",
                revealClass(inView)
              )}
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
      </Container>
    </Section>
  );
}
