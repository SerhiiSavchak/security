"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1800);
    const remove = setTimeout(() => setVisible(false), 2400);
    return () => {
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-600 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Radar rings */}
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-radar-pulse" />
          <div
            className="absolute inset-3 rounded-full border border-primary/30 animate-radar-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute inset-6 rounded-full border border-primary/40 animate-radar-pulse"
            style={{ animationDelay: "1s" }}
          />
          {/* Center shield */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/40">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          {/* Sweep line */}
          <div className="absolute inset-0 animate-radar-sweep origin-center">
            <div
              className="mx-auto h-1/2 w-px"
              style={{
                background:
                  "linear-gradient(to top, hsl(var(--primary)), transparent)",
              }}
            />
          </div>
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Initializing...
        </div>
      </div>
    </div>
  );
}
