import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setVisible(false), reduced ? 200 : 1900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <div className="halftone absolute inset-0 opacity-60" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-0 h-px w-full origin-left bg-primary shadow-[0_0_18px_rgb(var(--primary-rgb)/0.9)]"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.08em" }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-display text-3xl text-fg sm:text-5xl"
          >
            {profile.name.toUpperCase()}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="relative mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
          >
            Loading portfolio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
