"use client";

import { useInView } from "@/hooks/use-in-view";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { Section, Container, SectionBadge, SectionHeading, revealClass } from "@/components/section";
import { cn } from "@/lib/utils";

export function About() {
  const { dict } = useLanguage();
  const { ref, inView } = useInView();

  const stats = [
    { value: dict.about.stats.years, label: dict.about.stats.yearsLabel },
    { value: dict.about.stats.response, label: dict.about.stats.responseLabel },
    { value: dict.about.stats.objects, label: dict.about.stats.objectsLabel },
  ];

  const r = (d?: string) => cn("transition-all duration-800", revealClass(inView), d);

  return (
    <Section id="about" ref={ref}>
      <div
        className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-[0.03] blur-3xl"
        style={{ background: "hsl(var(--glow))" }}
      />

      <Container className="relative">
        <div className={r()}>
          <SectionBadge>{dict.about.badge}</SectionBadge>
        </div>

        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          <div className="lg:flex-1">
            <SectionHeading className={cn("mb-8", r("delay-100"))}>{dict.about.title}</SectionHeading>
            <p className={cn("mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground", r("delay-200"))}>
              {dict.about.description}
            </p>

            <div className={cn("relative overflow-hidden rounded-xl h-64 lg:h-80 img-overlay", r("delay-300"))}>
              <Image
                src="/images/about-team.jpg"
                alt="Security team professionals"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Corner accents */}
              <div className="absolute left-3 top-3 h-6 w-6 border-l border-t border-primary/30 rounded-tl-sm z-10" />
              <div className="absolute right-3 bottom-3 h-6 w-6 border-r border-b border-primary/30 rounded-br-sm z-10" />
            </div>
          </div>

          {/* Right: dramatic stat blocks */}
          <div className="flex flex-col gap-4 lg:w-[380px]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn("tactical-card glass-panel glow-border rounded-xl px-7 py-6", r())}
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
                <div
                  className="mt-4 h-px w-16"
                  style={{ background: "linear-gradient(90deg, hsl(var(--primary)), transparent)" }}
                />
              </div>
            ))}

            <div className={cn("relative overflow-hidden rounded-xl h-48 img-overlay", r())} style={{ transitionDelay: "600ms" }}>
              <Image
                src="/images/guard-patrol.jpg"
                alt="Security guard on patrol"
                fill
                className="object-cover"
                sizes="380px"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
