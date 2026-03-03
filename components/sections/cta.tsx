"use client";

import { useInView } from "@/hooks/use-in-view";
import { Phone, Send, MapPin } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Section, Container, SectionHeading, revealClass } from "@/components/section";
import { cn } from "@/lib/utils";

export function CTA() {
  const { dict } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <Section ref={ref}>
      <Container>
        {/* CTA Panel */}
        <div className="relative overflow-hidden rounded-2xl border border-border/50">
          {/* Animated background */}
          <div
            className="absolute inset-0 animate-gradient-drift"
            style={{
              background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--primary) / 0.05) 30%, hsl(var(--card)) 50%, hsl(var(--emerald) / 0.03) 70%, hsl(var(--card)) 100%)",
              backgroundSize: "200% 200%",
            }}
          />

          {/* Grid overlay */}
          <div className="grid-tactical absolute inset-0 opacity-40" />

          {/* Glow orbs */}
          <div
            className="absolute left-1/4 top-0 h-64 w-64 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl animate-float-slow"
            style={{ background: "hsl(var(--glow))" }}
          />
          <div
            className="absolute right-1/4 bottom-0 h-48 w-48 translate-y-1/2 rounded-full opacity-[0.06] blur-3xl animate-float-reverse"
            style={{ background: "hsl(var(--emerald))" }}
          />

          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-px opacity-[0.08] animate-scan-line"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--glow)), transparent)" }}
          />

          <div className="relative flex flex-col items-center px-6 py-20 text-center sm:px-12 lg:py-28">
            <SectionHeading className={cn("mb-6 sm:text-5xl lg:text-6xl transition-all duration-800", revealClass(inView))}>
              <span className="text-balance">{dict.cta.title}</span>
            </SectionHeading>
            <p className={cn("mb-12 max-w-xl text-lg text-muted-foreground transition-all duration-800 delay-100", revealClass(inView))}>
              {dict.cta.subtitle}
            </p>

            <a
              href="tel:+380321234567"
              className={cn(
                "mb-12 text-3xl font-bold tracking-tight text-primary transition-all duration-800 delay-200 sm:text-4xl lg:text-5xl hover:text-foreground",
                revealClass(inView)
              )}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.cta.phone}
            </a>

            <div className={cn("flex flex-col gap-4 sm:flex-row transition-all duration-800 delay-300", revealClass(inView))}>
              <a
                href="tel:+380321234567"
                className="btn-primary flex items-center gap-3 rounded-lg px-10 py-4 text-sm"
              >
                <Phone className="h-4 w-4" />
                {dict.cta.call}
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center gap-3 rounded-lg px-10 py-4 text-sm"
              >
                <Send className="h-4 w-4" />
                {dict.cta.telegram}
              </a>
            </div>
          </div>

          {/* Corner HUD marks */}
          <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-primary/15" />
          <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-primary/15" />
          <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-primary/15" />
          <div className="absolute bottom-4 right-4 h-6 w-6 border-r border-b border-primary/15" />
        </div>

        <div className={cn("mt-8 transition-all duration-800 delay-400", revealClass(inView))}>
          <div className="mb-4 flex items-center gap-3">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Lviv, Ukraine
            </span>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.0!2d24.0315!3d49.8421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7c09109a57%3A0x4223c517012378e2!2sLviv%2C%20Lviv%20Oblast%2C%20Ukraine!5e0!3m2!1sen!2sua!4v1700000000000!5m2!1sen!2sua"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AEGIS Security office location"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
