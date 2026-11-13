import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SpiderWeb } from "./SpiderWeb";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative scroll-mt-20 overflow-hidden px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      <SpiderWeb corner="tr" className="hidden md:block" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-12 sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
          <h2 id={`${id}-heading`} className="font-display text-3xl leading-tight sm:text-5xl">
            {title}
          </h2>
          <span className="mt-5 block h-1 w-16 rounded-full bg-primary shadow-[0_0_16px_rgb(var(--primary-rgb)/0.7)]" />
        </Reveal>
        {children}
      </div>
    </section>
  );
}
