import { motion } from "framer-motion";
import { Award, BookOpen, GraduationCap } from "lucide-react";
import { certifications, education } from "../data";
import { Section } from "../components/Section";
import { fadeUp, staggerContainer } from "../components/Reveal";

export function Education() {
  return (
    <Section id="education" eyebrow="Education & certifications" title="Where I studied and what I have earned.">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {education.map((item) => (
          <motion.article
            key={item.school}
            variants={fadeUp}
            className={`glow-hover flex flex-col rounded-2xl border bg-surface p-6 sm:p-7 ${
              item.courses.length > 0 ? "border-primary/60 lg:col-span-3" : "border-border"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg leading-snug">{item.school}</h3>
                  <p className="text-sm text-muted">{item.degree}</p>
                </div>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">{item.period}</span>
            </div>
            <p className="mt-5 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-fg">
              {item.score}
            </p>
            {item.courses.length > 0 && (
              <div className="mt-6 border-t border-border pt-5">
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted">
                  <BookOpen size={14} aria-hidden="true" className="text-primary" />
                  Relevant courses
                </p>
                <ul className="flex flex-wrap gap-2">
                  {item.courses.map((course) => (
                    <li key={course} className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10"
      >
        <motion.h3 variants={fadeUp} className="mb-5 inline-flex items-center gap-2 font-display text-xl">
          <Award size={20} className="text-primary" aria-hidden="true" />
          Courses and certificates
        </motion.h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <motion.li
              key={cert.title}
              variants={fadeUp}
              className="glow-hover flex gap-4 rounded-2xl border border-border bg-surface p-5"
            >
              <span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-full bg-primary shadow-[0_0_12px_rgb(var(--primary-rgb)/0.9)]" />
              <div>
                <p className="font-semibold leading-snug">{cert.title}</p>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}
