"use client";

import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="hero-visual-wrapper">
      <div className="hero-visual-inner animate-hero-float">
        <div className="hero-visual-glow" />
        <div className="hero-visual-mask hero-visual-image-wrap">
          <Image
            src="/images/hero-cctv.jpg"
            alt=""
            width={640}
            height={480}
            className="hero-visual-img"
            priority
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 420px"
          />
        </div>
        {/* Scanning sweep overlay - имитация слежения */}
        <div className="hero-scan-sweep" aria-hidden />
        {/* Recording indicator pulse */}
        <div className="hero-recording-pulse" aria-hidden />
      </div>
    </div>
  );
}
