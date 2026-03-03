"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const HOVER_SELECTOR = "a, button, [role='button'], input, select, textarea, [data-cursor-hover]";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => {
      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const narrow = window.matchMedia("(max-width: 767px)").matches;
      setIsDesktop(!touch && !narrow);
    };
    check();
    const mq = window.matchMedia("(max-width: 767px)");
    mq.addEventListener("change", check);
    return () => mq.removeEventListener("change", check);
  }, []);

  return isDesktop;
}

export function CustomCursor() {
  const isDesktop = useIsDesktop();
  const [visible, setVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const scaleRef = useRef({ dot: 1, ring: 1 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    scaleRef.current = {
      dot: isClick ? 0.5 : 1,
      ring: isClick ? 0.9 : isHover ? 1.5 : 1,
    };
  }, [isHover, isClick]);

  useEffect(() => {
    if (!isDesktop) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => setIsClick(true);
    const onUp = () => setIsClick(false);
    const onOver = (e: MouseEvent) => {
      setIsHover(!!(e.target as HTMLElement).closest(HOVER_SELECTOR));
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, [isDesktop]);

  const animate = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const { x, y } = pos.current;
    const { dot: ds, ring: rs } = scaleRef.current;
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${ds})`;
    ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${rs})`;

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (visible) document.body.classList.add("custom-cursor-active");
    else document.body.classList.remove("custom-cursor-active");
    return () => document.body.classList.remove("custom-cursor-active");
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, animate]);

  if (!isDesktop || !visible) return null;

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[10001] select-none" aria-hidden>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary will-change-transform"
        style={{ boxShadow: "0 0 8px hsl(var(--glow) / 0.6), 0 0 16px hsl(var(--glow) / 0.3)" }}
      />
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 h-8 w-8 rounded-full border-2 will-change-transform ${
          isHover ? "border-primary/60" : "border-primary/40"
        }`}
        style={{ boxShadow: "0 0 12px hsl(var(--glow) / 0.2)" }}
      />
    </div>
  );
}
