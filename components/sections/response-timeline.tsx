"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Dictionary } from "@/lib/get-dictionary";

/* Animated SVG icons for each timeline step */
function SignalIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={`transition-all duration-700 ${active ? "text-primary" : "text-muted-foreground/30"}`}>
      <circle cx="16" cy="16" r="4" fill="currentColor" className={active ? "animate-glow-pulse" : ""} />
      <path d="M8 8a12 12 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-30"}`} />
      <path d="M5 5a16 16 0 0 1 22 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`transition-opacity duration-700 ${active ? "opacity-80" : "opacity-20"}`} />
      <path d="M24 24a12 12 0 0 1-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-30"}`} />
    </svg>
  );
}

function OperatorIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={`transition-all duration-700 ${active ? "text-primary" : "text-muted-foreground/30"}`}>
      <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8l1 3h6l1-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={active ? "animate-blink-dot" : ""} />
    </svg>
  );
}

function PatrolIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={`transition-all duration-700 ${active ? "text-primary" : "text-muted-foreground/30"}`}>
      <rect x="5" y="14" width="22" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="26" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="26" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 18h22" stroke="currentColor" strokeWidth="1" strokeDasharray={active ? "0" : "3 2"} className="transition-all duration-500" />
      <path d="M12 14V10l4-3 4 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {active && <circle cx="27" cy="12" r="3" fill="hsl(var(--emerald))" className="animate-glow-pulse" />}
    </svg>
  );
}

function ArrivalIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={`transition-all duration-700 ${active ? "text-emerald" : "text-muted-foreground/30"}`}>
      <path d="M16 4l-2 8h-8l6.5 5-2.5 8L16 20l6 5-2.5-8L26 12h-8L16 4z" stroke="currentColor" strokeWidth="2" fill={active ? "currentColor" : "none"} strokeLinejoin="round" className="transition-all duration-700" />
      {active && (
        <>
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" className="animate-radar-sweep origin-center" />
        </>
      )}
    </svg>
  );
}

export function ResponseTimeline({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const scrolledInto = viewportHeight - rect.top;
    const totalScrollRange = sectionHeight + viewportHeight * 0.5;
    const p = Math.max(0, Math.min(1, scrolledInto / totalScrollRange));
    setProgress(p);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const icons = [SignalIcon, OperatorIcon, PatrolIcon, ArrivalIcon];
  const steps = dict.response?.steps ?? [
    { time: "0", label: "Signal received" },
    { time: "15", label: "Operator accepted the call" },
    { time: "30", label: "Patrol dispatched" },
    { time: "5-7 min", label: "Arrival on site" },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-44 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="grid-tactical absolute inset-0 opacity-20" />

      <div className="relative mx-auto w-full max-w-[900px] px-5 lg:px-10 overflow-x-hidden">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px w-12 bg-primary/50" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            {dict.response?.badge ?? "RESPONSE PROTOCOL"}
          </span>
        </div>

        <h2
          className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {dict.response?.title ?? "Response Scenario in 60 Seconds"}
        </h2>
        <p className="mb-20 max-w-lg text-muted-foreground">
          {dict.response?.subtitle ?? "From signal to on-site response -- precision-timed protocol."}
        </p>

        {/* Timeline */}
        <div className="relative flex justify-center">
          {/* Vertical glowing line */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-px bg-border/30">
            {/* Filled glow progress */}
            <div
              className="w-full origin-top transition-[height] duration-100 ease-linear"
              style={{
                height: `${progress * 100}%`,
                background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--emerald)))",
                boxShadow: "0 0 12px hsl(var(--primary) / 0.4), 0 0 30px hsl(var(--primary) / 0.15)",
              }}
            />
            {/* Traveling light dot */}
            <div
              className="absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full transition-all duration-100"
              style={{
                top: `${progress * 100}%`,
                background: "hsl(var(--glow))",
                boxShadow: "0 0 16px hsl(var(--glow) / 0.6), 0 0 40px hsl(var(--glow) / 0.3)",
                opacity: progress > 0.02 && progress < 0.98 ? 1 : 0,
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-24 lg:gap-32">
            {steps.map((step, i) => {
              const stepThreshold = (i + 0.5) / steps.length;
              const isActive = progress >= stepThreshold;
              const IconComp = icons[i] ?? icons[0];
              const isEven = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`relative flex items-start justify-center gap-6 md:gap-0 md:justify-start ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content side */}
                  <div className={`flex-1 min-w-0 text-center md:flex-none md:w-1/2 md:text-left ${isEven ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div
                      className={`transition-all duration-700 ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                      style={{ transitionDelay: isActive ? "200ms" : "0ms" }}
                    >
                      {/* Time label */}
                      <div className={`mb-3 flex items-center justify-center gap-3 md:justify-start ${isEven ? "md:justify-end" : ""}`}>
                        <span
                          className={`font-mono text-2xl font-bold tracking-tight transition-colors duration-500 ${
                            isActive ? "text-primary" : "text-muted-foreground/30"
                          }`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {step.time}
                          {!step.time.includes("min") && (
                            <span className="ml-1 text-sm font-normal text-muted-foreground/50">sec</span>
                          )}
                        </span>
                      </div>
                      <p className={`text-lg transition-colors duration-500 ${isActive ? "text-foreground" : "text-muted-foreground/40"}`}>
                        {step.label}
                      </p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex-shrink-0">
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-700 ${
                        isActive
                          ? "border-primary/60 bg-primary/10 shadow-[0_0_25px_hsl(var(--primary)/0.2)]"
                          : "border-border/30 bg-card/50"
                      }`}
                    >
                      <IconComp active={isActive} />
                      {/* Pulse ring on activation */}
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-ring"
                        />
                      )}
                    </div>
                  </div>

                  {/* Empty side (for layout balance) */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
