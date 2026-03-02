import { Shield } from "lucide-react";
import type { Dictionary } from "@/lib/get-dictionary";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
            AEGIS
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 sm:items-end">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AEGIS. {dict.footer.rights}.
          </p>
          <p className="font-mono text-xs text-muted-foreground/70">
            {dict.footer.license}
          </p>
        </div>
      </div>
    </footer>
  );
}
