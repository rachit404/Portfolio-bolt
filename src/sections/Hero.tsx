import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { profile } from "../data";
import { useTypewriter } from "../hooks/useTypewriter";
import { SpiderWeb } from "../components/SpiderWeb";

export function Hero() {
  const role = useTypewriter(profile.roles);
  const { scrollY } = useScroll();
  const webY = useTransform(scrollY, [0, 900], [0, 260]);
  const webRotate = useTransform(scrollY, [0, 900], [0, 12]);
  const textY = useTransform(scrollY, [0, 700], [0, 90]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 pb-20 sm:px-8">
      <motion.div aria-hidden="true" style={{ y: webY, rotate: webRotate }} className="pointer-events-none absolute -top-1/4 -right-1/4 h-[140%] w-[140%] opacity-20 sm:-right-1/6 sm:w-[80%]">
        <svg viewBox="0 0 400 400" className="h-full w-full text-primary">
          <g fill="none" stroke="currentColor" strokeWidth="0.6">
            {Array.from({ length: 10 }, (_, i) => (
              <circle key={i} cx="200" cy="200" r={20 + i * 20} />
            ))}
            {Array.from({ length: 24 }, (_, i) => {
              const rad = (i * 15 * Math.PI) / 180;
              return <line key={i} x1="200" y1="200" x2={200 + Math.cos(rad) * 400} y2={200 + Math.sin(rad) * 400} />;
            })}
          </g>
        </svg>
      </motion.div>
      <div aria-hidden="true" className="halftone absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <SpiderWeb corner="bl" className="hidden sm:block" />

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary"
        >
          Hello, I am
        </motion.p>
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 2.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl leading-[1.05] sm:text-7xl lg:text-8xl"
        >
          Rachit <span className="text-primary text-glow">Doshi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="mt-6 flex h-10 items-center text-xl font-semibold text-fg sm:text-3xl"
          aria-live="polite"
        >
          <span>{role}</span>
          <span aria-hidden="true" className="ml-1 inline-block h-7 w-0.5 animate-pulse bg-primary sm:h-9" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.6 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {profile.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.6 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="glow-hover inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-fg"
          >
            <Mail size={18} aria-hidden="true" />
            Contact Me
          </a>
          <a
            href={profile.resumePath}
            download
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-semibold text-fg transition-colors hover:border-primary hover:text-primary"
          >
            <Download size={18} aria-hidden="true" />
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-primary"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-current pt-2">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-primary"
          />
        </span>
        <ArrowDown size={14} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
