"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [phase, setPhase] = useState<"loading" | "done" | "hidden">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 120);

    const fadeTimer = setTimeout(() => setPhase("done"), 2200);
    const removeTimer = setTimeout(() => setPhase("hidden"), 2900);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-700 ${
        phase === "done" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{ background: "hsl(225, 30%, 3%)" }}
      aria-hidden="true"
    >
      {/* Background grid */}
      <div className="grid-tactical absolute inset-0 animate-grid-breathe" />

      {/* Radial glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(195, 100%, 50%, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-10">
        {/* Radar assembly */}
        <div className="relative h-40 w-40">
          {/* Outer rings */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border animate-radar-pulse"
              style={{
                inset: `${i * 12}%`,
                borderColor: `hsl(195, 100%, 50%, ${0.12 - i * 0.02})`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}

          {/* Sweep arm */}
          <div className="absolute inset-0 animate-radar-sweep origin-center">
            <div
              className="mx-auto h-1/2 w-1"
              style={{
                background: "linear-gradient(to top, hsl(195, 100%, 50%, 0.8), transparent)",
                boxShadow: "0 0 10px hsl(195, 100%, 50%, 0.3)",
              }}
            />
          </div>

          {/* Conic sweep trail */}
          <div
            className="absolute inset-0 animate-radar-sweep origin-center rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent 0deg, hsl(195, 100%, 50%, 0.08) 30deg, transparent 90deg)",
            }}
          />

          {/* Center core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 h-14 w-14 rounded-full animate-glow-pulse" style={{ boxShadow: "0 0 40px hsl(195, 100%, 50%, 0.3)" }} />
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[hsl(195,100%,50%,0.4)] bg-[hsl(225,30%,6%)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[hsl(195,100%,50%)]">
                  <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Blips */}
          <div className="absolute left-[28%] top-[20%] h-1.5 w-1.5 rounded-full bg-[hsl(195,100%,50%)] animate-glow-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute left-[65%] top-[35%] h-1 w-1 rounded-full bg-[hsl(160,70%,50%)] animate-glow-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute left-[40%] top-[72%] h-1.5 w-1.5 rounded-full bg-[hsl(195,100%,50%)] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Progress bar */}
        <div className="flex w-48 flex-col items-center gap-3">
          <div className="h-px w-full overflow-hidden rounded-full bg-[hsl(195,100%,50%,0.1)]">
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: "linear-gradient(90deg, hsl(195, 100%, 50%), hsl(160, 70%, 50%))",
                boxShadow: "0 0 10px hsl(195, 100%, 50%, 0.5)",
              }}
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[hsl(195,100%,50%,0.6)]">
              INITIALIZING
            </span>
            <span className="font-mono text-[10px] text-[hsl(195,100%,50%,0.4)]">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Corner HUD marks */}
      <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-[hsl(195,100%,50%,0.15)]" />
      <div className="absolute right-6 top-6 h-8 w-8 border-r border-t border-[hsl(195,100%,50%,0.15)]" />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-[hsl(195,100%,50%,0.15)]" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-[hsl(195,100%,50%,0.15)]" />
    </div>
  );
}
