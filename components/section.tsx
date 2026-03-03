import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const CONTAINER_CLASS = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
export const SECTION_PADDING = "py-16 sm:py-20 lg:py-24";

export const revealClass = (inView: boolean) =>
  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(CONTAINER_CLASS, className)}>{children}</div>;
}

export const Section = forwardRef<
  HTMLElement,
  {
    id?: string;
    children: React.ReactNode;
    className?: string;
  }
>(function Section({ id, children, className }, ref) {
  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative overflow-hidden", SECTION_PADDING, className)}
    >
      {children}
    </section>
  );
});

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="h-px w-12 bg-primary/50" />
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl",
        className
      )}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h2>
  );
}
