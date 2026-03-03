"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "@/hooks/use-in-view";
import type { Dictionary } from "@/lib/get-dictionary";

interface Zone {
  id: string;
  label: string;
  cx: number;
  cy: number;
  r: number;
  delay: number;
}

const zones: Zone[] = [
  { id: "z1", label: "PECHERSK", cx: 52, cy: 38, r: 14, delay: 0 },
  { id: "z2", label: "PODIL", cx: 35, cy: 22, r: 11, delay: 0.3 },
  { id: "z3", label: "OBOLON", cx: 48, cy: 12, r: 10, delay: 0.6 },
  { id: "z4", label: "HOLOSIIV", cx: 40, cy: 60, r: 13, delay: 0.9 },
  { id: "z5", label: "DARNYTSIA", cx: 72, cy: 45, r: 12, delay: 1.2 },
  { id: "z6", label: "SVIATOSHYN", cx: 18, cy: 42, r: 11, delay: 1.5 },
];

interface Marker {
  x: number;
  y: number;
  type: "patrol" | "camera" | "station";
  delay: number;
}

const markers: Marker[] = [
  { x: 50, y: 35, type: "station", delay: 0 },
  { x: 33, y: 20, type: "patrol", delay: 0.2 },
  { x: 68, y: 42, type: "camera", delay: 0.4 },
  { x: 22, y: 50, type: "patrol", delay: 0.6 },
  { x: 55, y: 18, type: "camera", delay: 0.8 },
  { x: 42, y: 55, type: "patrol", delay: 1.0 },
  { x: 60, y: 28, type: "camera", delay: 1.2 },
  { x: 30, y: 38, type: "station", delay: 1.4 },
  { x: 75, y: 55, type: "patrol", delay: 0.3 },
  { x: 15, y: 30, type: "camera", delay: 0.7 },
  { x: 46, y: 70, type: "station", delay: 1.1 },
  { x: 62, y: 15, type: "patrol", delay: 0.5 },
];

function CityGrid() {
  return (
    <g stroke="hsl(var(--glow) / 0.06)" strokeWidth="0.3" fill="none">
      {/* Horizontal streets */}
      <line x1="5" y1="15" x2="95" y2="15" />
      <line x1="10" y1="30" x2="90" y2="30" />
      <line x1="5" y1="45" x2="95" y2="45" />
      <line x1="10" y1="60" x2="90" y2="60" />
      <line x1="15" y1="75" x2="85" y2="75" />
      {/* Vertical streets */}
      <line x1="20" y1="5" x2="20" y2="80" />
      <line x1="35" y1="8" x2="35" y2="78" />
      <line x1="50" y1="5" x2="50" y2="82" />
      <line x1="65" y1="8" x2="65" y2="78" />
      <line x1="80" y1="10" x2="80" y2="75" />
      {/* Diagonal -- river */}
      <path
        d="M5 25 Q25 30, 40 20 Q55 10, 70 18 Q85 26, 95 22"
        stroke="hsl(var(--primary) / 0.12)"
        strokeWidth="2.5"
        fill="none"
      />
    </g>
  );
}

export function CoverageMap({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [activatedCount, setActivatedCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  // Progressively activate zones
  useEffect(() => {
    if (!inView) return;
    let count = 0;
    timerRef.current = setInterval(() => {
      count++;
      setActivatedCount(count);
      if (count >= zones.length) clearInterval(timerRef.current);
    }, 400);
    return () => clearInterval(timerRef.current);
  }, [inView]);

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Left info */}
          <div className="lg:w-[380px] lg:sticky lg:top-32 shrink-0">
            <div
              className={`mb-6 flex items-center gap-4 transition-all duration-800 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="h-px w-12 bg-primary/50" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                {dict.coverage?.badge ?? "COVERAGE AREA"}
              </span>
            </div>

            <h2
              className={`mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl transition-all duration-800 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.coverage?.title ?? "Security Coverage Map"}
            </h2>
            <p
              className={`mb-10 text-muted-foreground leading-relaxed transition-all duration-800 delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {dict.coverage?.subtitle ?? "Real-time overview of protected zones, patrol routes, and surveillance points across the city."}
            </p>

            {/* Legend */}
            <div
              className={`flex flex-col gap-3 transition-all duration-800 delay-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { color: "bg-primary", label: dict.coverage?.legend_patrol ?? "Patrol Unit" },
                { color: "bg-emerald", label: dict.coverage?.legend_camera ?? "Camera Point" },
                { color: "bg-glow", label: dict.coverage?.legend_station ?? "Control Station" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="font-mono text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              className={`mt-10 grid grid-cols-2 gap-4 transition-all duration-800 delay-400 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { value: "6", label: dict.coverage?.stat_zones ?? "Protected Zones" },
                { value: "12", label: dict.coverage?.stat_points ?? "Active Points" },
                { value: "<5", label: dict.coverage?.stat_response ?? "Min Response" },
                { value: "24/7", label: dict.coverage?.stat_monitoring ?? "Monitoring" },
              ].map((s) => (
                <div key={s.label} className="glass-panel rounded-lg px-4 py-3">
                  <div className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map */}
          <div
            className={`flex-1 transition-all duration-800 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="glass-panel rounded-2xl p-4 lg:p-6">
              {/* Map header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald animate-blink-dot" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-emerald">LIVE MAP</span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/40">KYIV REGION</span>
              </div>

              {/* SVG Map */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-card/60">
                <svg viewBox="0 0 100 85" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                  <CityGrid />

                  {/* Protected zones */}
                  {zones.map((zone, i) => {
                    const isActivated = i < activatedCount;
                    return (
                      <g
                        key={zone.id}
                        onMouseEnter={() => setActiveZone(zone.id)}
                        onMouseLeave={() => setActiveZone(null)}
                        className="cursor-pointer"
                      >
                        {/* Zone circle */}
                        <circle
                          cx={zone.cx}
                          cy={zone.cy}
                          r={zone.r}
                          fill={isActivated ? "hsl(var(--primary) / 0.08)" : "transparent"}
                          stroke={isActivated ? "hsl(var(--primary) / 0.3)" : "hsl(var(--border) / 0.15)"}
                          strokeWidth="0.5"
                          strokeDasharray={isActivated ? "0" : "2 2"}
                          className="transition-all duration-700"
                        />
                        {/* Hover expand */}
                        {activeZone === zone.id && (
                          <circle
                            cx={zone.cx}
                            cy={zone.cy}
                            r={zone.r + 1.5}
                            fill="none"
                            stroke="hsl(var(--glow) / 0.2)"
                            strokeWidth="0.5"
                            className="animate-pulse-ring"
                          />
                        )}
                        {/* Label */}
                        {isActivated && (
                          <text
                            x={zone.cx}
                            y={zone.cy + zone.r + 4}
                            textAnchor="middle"
                            fill="hsl(var(--muted-foreground) / 0.5)"
                            fontSize="2.2"
                            fontFamily="var(--font-mono)"
                            letterSpacing="0.1"
                          >
                            {zone.label}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Markers */}
                  {markers.map((marker, i) => {
                    const isShown = inView;
                    const color =
                      marker.type === "station"
                        ? "hsl(var(--glow))"
                        : marker.type === "camera"
                        ? "hsl(var(--emerald))"
                        : "hsl(var(--primary))";
                    return (
                      <g key={i}>
                        {/* Pulse ring */}
                        <circle
                          cx={marker.x}
                          cy={marker.y}
                          r={marker.type === "station" ? 2.5 : 1.5}
                          fill="none"
                          stroke={color}
                          strokeWidth="0.3"
                          opacity={isShown ? 0.4 : 0}
                          className="transition-opacity duration-700"
                          style={{ transitionDelay: `${marker.delay * 1000 + 800}ms` }}
                        >
                          <animate
                            attributeName="r"
                            from={marker.type === "station" ? "2.5" : "1.5"}
                            to={marker.type === "station" ? "5" : "3.5"}
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${marker.delay}s`}
                          />
                          <animate
                            attributeName="opacity"
                            from="0.5"
                            to="0"
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${marker.delay}s`}
                          />
                        </circle>
                        {/* Dot */}
                        <circle
                          cx={marker.x}
                          cy={marker.y}
                          r={marker.type === "station" ? 1.2 : 0.8}
                          fill={color}
                          opacity={isShown ? 1 : 0}
                          className="transition-opacity duration-500"
                          style={{ transitionDelay: `${marker.delay * 1000 + 600}ms` }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Corner brackets */}
                <div className="absolute left-2 top-2 h-5 w-5 border-l border-t border-primary/20" />
                <div className="absolute right-2 top-2 h-5 w-5 border-r border-t border-primary/20" />
                <div className="absolute left-2 bottom-2 h-5 w-5 border-l border-b border-primary/20" />
                <div className="absolute right-2 bottom-2 h-5 w-5 border-r border-b border-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
