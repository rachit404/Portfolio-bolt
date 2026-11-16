import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin, CalendarDays } from "lucide-react";
import { experience } from "../data";
import { fadeUp } from "../components/Reveal";
import { Section } from "../components/Section";

const pad = (n: number) => String(n).padStart(2, "0");

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.floor(progress * experience.length);
    setActive(Math.min(experience.length - 1, Math.max(0, index)));
  });

  const current = experience[active];

  return (
    <Section id="experience" eyebrow="Experience" title="Where I have worked and learned.">
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-12">
        <div className="hidden md:block">
          <div className="sticky top-28 h-[60vh] overflow-hidden rounded-2xl border border-border bg-surface">
            <AnimatePresence initial={false}>
              <motion.img
                key={current.image}
                src={current.image}
                alt=""
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 60%)" }}
            />
            <div aria-live="polite" className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-sm tracking-widest text-primary">
                {pad(active + 1)} / {pad(experience.length)}
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.company}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="mt-2 font-display text-2xl text-fg"
                >
                  {current.company}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div ref={listRef} className="relative">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-4 w-px bg-border">
            <motion.div style={{ scaleY: lineScale }} className="h-full w-full origin-top bg-primary shadow-[0_0_12px_rgb(var(--primary-rgb)/0.8)]" />
          </div>
          <ol className="space-y-10 md:space-y-16">
            {experience.map((job, index) => {
              const isActive = index === active;
              return (
                <motion.li
                  key={`${job.company}-${job.role}`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="relative pl-12"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-6 left-4 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-primary shadow-[0_0_14px_rgb(var(--primary-rgb)/0.9)] transition-colors duration-500 ${
                      index <= active ? "bg-primary" : "bg-bg"
                    }`}
                  />
                  <article
                    className={`glow-hover rounded-2xl border bg-surface p-6 transition-colors duration-500 sm:p-8 ${
                      isActive ? "border-primary/60" : "border-border"
                    }`}
                  >
                    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-wider text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} aria-hidden="true" className="text-primary" />
                        {job.period}
                      </span>
                      {job.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} aria-hidden="true" className="text-primary" />
                          {job.location}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl leading-snug sm:text-2xl">{job.role}</h3>
                    <p className="mt-1 inline-flex items-center gap-2 text-base font-semibold text-primary">
                      <Briefcase size={16} aria-hidden="true" />
                      {job.company}
                    </p>
                    <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted sm:text-base">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
