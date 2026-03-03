"use client";

import Image from "next/image";
import { useLanguage } from "./language-provider";
import { Container } from "@/components/section";

export function Footer() {
  const { dict } = useLanguage();
  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/city-night.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.04] dark:opacity-[0.06]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/97 dark:bg-background/95" />
      </div>

      <Container className="relative flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-primary/10" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative text-primary">
              <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
            </svg>
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
            AEGIS
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 sm:items-end">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AEGIS. {dict.footer.rights}.
          </p>
          <p className="font-mono text-[11px] text-muted-foreground/50">
            {dict.footer.license}
          </p>
        </div>
      </Container>
    </footer>
  );
}
