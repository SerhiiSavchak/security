"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "@/hooks/use-in-view";
import type { Dictionary } from "@/lib/get-dictionary";

interface CameraFeed {
  id: string;
  label: string;
  location: string;
  status: "online" | "alert";
}

const cameras: CameraFeed[] = [
  { id: "CAM-01", label: "Main Entrance", location: "Building A", status: "online" },
  { id: "CAM-02", label: "Parking Level B1", location: "Underground", status: "online" },
  { id: "CAM-03", label: "Server Room", location: "Floor 3", status: "alert" },
  { id: "CAM-04", label: "Perimeter East", location: "Exterior", status: "online" },
  { id: "CAM-05", label: "Lobby", location: "Building A", status: "online" },
  { id: "CAM-06", label: "Rooftop", location: "Building B", status: "online" },
];

interface LogEntry {
  time: string;
  type: "info" | "warning" | "success";
  message: string;
}

function useActivityLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const messagesInfo = useRef([
    "Perimeter scan completed - all clear",
    "System health check passed",
    "Backup verification complete",
    "Network heartbeat OK",
    "Credential rotation scheduled",
    "Firewall rules updated",
  ]);
  const messagesWarn = useRef([
    "Motion detected - Zone C",
    "Badge scan rejected - Entrance B",
    "Unusual traffic pattern flagged",
  ]);
  const messagesSuccess = useRef([
    "Threat neutralized - Zone A",
    "Access granted - VIP clearance",
    "Patrol team checked in",
  ]);

  useEffect(() => {
    function addLog() {
      const types: LogEntry["type"][] = ["info", "info", "info", "warning", "success"];
      const type = types[Math.floor(Math.random() * types.length)];
      const pool =
        type === "info"
          ? messagesInfo.current
          : type === "warning"
          ? messagesWarn.current
          : messagesSuccess.current;
      const message = pool[Math.floor(Math.random() * pool.length)];
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      setLogs((prev) => [{ time, type, message }, ...prev].slice(0, 8));
    }

    addLog();
    const interval = setInterval(addLog, 3000);
    return () => clearInterval(interval);
  }, []);

  return logs;
}

function MiniRadar() {
  return (
    <div className="relative h-full w-full">
      {/* Rings */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            inset: `${i * 12 + 2}%`,
            borderColor: `hsl(var(--glow) / ${0.2 - i * 0.04})`,
          }}
        />
      ))}
      {/* Sweep */}
      <div className="absolute inset-0 animate-radar-sweep origin-center">
        <div
          className="mx-auto h-1/2 w-0.5"
          style={{ background: "linear-gradient(to top, hsl(var(--glow) / 0.9), transparent)" }}
        />
      </div>
      <div
        className="absolute inset-0 animate-radar-sweep origin-center rounded-full"
        style={{ background: "conic-gradient(from 0deg, transparent 0deg, hsl(var(--glow) / 0.12) 30deg, transparent 60deg)" }}
      />
      {/* Blips */}
      <div className="absolute left-[35%] top-[25%] h-1.5 w-1.5 rounded-full bg-emerald animate-glow-pulse" />
      <div className="absolute left-[60%] top-[45%] h-1 w-1 rounded-full bg-glow animate-glow-pulse" style={{ animationDelay: "0.8s" }} />
      <div className="absolute left-[28%] top-[65%] h-1.5 w-1.5 rounded-full bg-glow animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute left-[70%] top-[30%] h-1 w-1 rounded-full bg-emerald animate-glow-pulse" style={{ animationDelay: "2s" }} />
    </div>
  );
}

export function SecurityDashboard({ dict }: { dict: Dictionary }) {
  const { ref, inView } = useInView();
  const logs = useActivityLog();
  const [selectedCam, setSelectedCam] = useState(0);
  const [systemUptime, setSystemUptime] = useState(99.97);
  const [threatLevel, setThreatLevel] = useState(12);

  // Simulated metric fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemUptime((prev) => {
        const delta = (Math.random() - 0.5) * 0.02;
        return Math.min(99.99, Math.max(99.9, prev + delta));
      });
      setThreatLevel((prev) => {
        const delta = Math.floor((Math.random() - 0.45) * 5);
        return Math.min(30, Math.max(5, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent" />
      <div className="grid-tactical absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Badge */}
        <div
          className={`mb-6 flex items-center gap-4 transition-all duration-800 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="h-px w-12 bg-primary/50" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            COMMAND CENTER
          </span>
        </div>

        <h2
          className={`mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl transition-all duration-800 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          Security Dashboard
        </h2>
        <p
          className={`mb-16 max-w-xl text-muted-foreground transition-all duration-800 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Real-time monitoring interface. Interactive overview of active security systems.
        </p>

        {/* Dashboard grid */}
        <div
          className={`grid gap-4 lg:grid-cols-3 transition-all duration-800 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* LEFT COLUMN: Camera feeds */}
          <div className="lg:col-span-2 glass-panel rounded-xl overflow-hidden">
            {/* Camera grid header */}
            <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald animate-blink-dot" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald">LIVE FEEDS</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground/50">{cameras.length} CAMERAS ONLINE</span>
            </div>

            {/* Camera grid */}
            <div className="grid grid-cols-2 gap-px bg-border/20 sm:grid-cols-3">
              {cameras.map((cam, i) => (
                <button
                  key={cam.id}
                  onClick={() => setSelectedCam(i)}
                  className={`group relative flex flex-col justify-end p-4 h-32 sm:h-36 transition-all duration-300 ${
                    selectedCam === i
                      ? "bg-primary/[0.08]"
                      : "bg-card/40 hover:bg-card/60"
                  }`}
                >
                  {/* Camera icon */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${cam.status === "alert" ? "bg-red-500 animate-blink-dot" : "bg-emerald"}`} />
                    <span className="font-mono text-[9px] text-muted-foreground/50">{cam.id}</span>
                  </div>

                  {/* Scan lines overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground)) 2px, hsl(var(--foreground)) 3px)",
                    }}
                  />

                  {/* Selection border */}
                  {selectedCam === i && (
                    <div className="absolute inset-0 border border-primary/30 pointer-events-none" />
                  )}

                  <div>
                    <div className="text-xs font-medium text-foreground">{cam.label}</div>
                    <div className="font-mono text-[10px] text-muted-foreground/50">{cam.location}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected camera details bar */}
            <div className="flex items-center justify-between border-t border-border/50 px-5 py-3 bg-card/30">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-primary">{cameras[selectedCam].id}</span>
                <span className="text-xs text-muted-foreground">{cameras[selectedCam].label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${cameras[selectedCam].status === "alert" ? "bg-red-500" : "bg-emerald"}`} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {cameras[selectedCam].status}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Radar widget */}
            <div className="glass-panel rounded-xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-primary">RADAR SCAN</span>
                <span className="font-mono text-[10px] text-muted-foreground/40">360&deg;</span>
              </div>
              <div className="relative mx-auto h-36 w-36">
                <MiniRadar />
              </div>
            </div>

            {/* Metrics */}
            <div className="glass-panel rounded-xl p-5">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-wider text-primary">SYSTEM STATUS</div>
              <div className="flex flex-col gap-4">
                {/* Uptime */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-muted-foreground/60">UPTIME</span>
                    <span className="font-mono text-sm font-bold text-emerald">{systemUptime.toFixed(2)}%</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-muted/50">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${systemUptime}%`,
                        background: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--primary)))",
                      }}
                    />
                  </div>
                </div>

                {/* Threat level */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-muted-foreground/60">THREAT INDEX</span>
                    <span className={`font-mono text-sm font-bold ${threatLevel > 20 ? "text-yellow-500" : "text-emerald"}`}>
                      {threatLevel}%
                    </span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-muted/50">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${threatLevel}%`,
                        background: threatLevel > 20
                          ? "linear-gradient(90deg, hsl(40, 90%, 50%), hsl(20, 90%, 50%))"
                          : "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--primary)))",
                      }}
                    />
                  </div>
                </div>

                {/* Active zones */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground/60">ACTIVE ZONES</span>
                  <span className="font-mono text-sm font-bold text-primary">24 / 24</span>
                </div>

                {/* Alerts today */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground/60">ALERTS TODAY</span>
                  <span className="font-mono text-sm font-bold text-foreground">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity log -- full width below */}
        <div
          className={`mt-4 glass-panel rounded-xl overflow-hidden transition-all duration-800 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-primary">ACTIVITY LOG</span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/50">LIVE</span>
          </div>
          <div className="max-h-48 overflow-y-auto px-5 py-3">
            {logs.map((log, i) => (
              <div
                key={`${log.time}-${i}`}
                className="flex items-start gap-3 border-b border-border/20 py-2.5 last:border-0"
              >
                <span className="font-mono text-[10px] text-muted-foreground/40 shrink-0 pt-0.5">{log.time}</span>
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full mt-1.5 ${
                    log.type === "warning"
                      ? "bg-yellow-500"
                      : log.type === "success"
                      ? "bg-emerald"
                      : "bg-primary/50"
                  }`}
                />
                <span className="text-xs text-muted-foreground">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
