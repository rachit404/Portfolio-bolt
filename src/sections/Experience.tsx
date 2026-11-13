import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin, CalendarDays } from "lucide-react";
import { experience } from "../data";
import { fadeUp } from "../components/Reveal";
import { Section } from "../components/Section";

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="experience" eyebrow="Experience" title="Where I have worked and learned.">
      <div ref={listRef} className="relative">
        <div aria-hidden="true" className="absolute top-0 bottom-0 left-4 w-px bg-border md:left-1/2 md:-translate-x-1/2">
          <motion.div style={{ scaleY: lineScale }} className="h-full w-full origin-top bg-primary shadow-[0_0_12px_rgb(var(--primary-rgb)/0.8)]" />
        </div>
        <ol className="space-y-10 md:space-y-14">

        {experience.map((job, index) => {
          const isRight = index % 2 === 0;
          return (
            <motion.li
              key={`${job.company}-${job.role}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${isRight ? "md:pr-12" : "md:ml-auto md:pl-12"}`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-6 left-4 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-primary bg-bg shadow-[0_0_14px_rgb(var(--primary-rgb)/0.9)] md:top-7 ${
                  isRight ? "md:right-0 md:left-auto md:translate-x-1/2" : "md:left-0"
                }`}
              />
              <article className="glow-hover rounded-2xl border border-border bg-surface p-6 sm:p-8">
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
    </Section>
  );
}
