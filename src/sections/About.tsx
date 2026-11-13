import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { about, profile, stats } from "../data";
import { Reveal, staggerContainer, fadeUp } from "../components/Reveal";
import { Section } from "../components/Section";

function StatCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="glow-hover rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <p className="font-display text-4xl text-primary sm:text-5xl" aria-label={`${value}${suffix} ${label}`}>
        <span aria-hidden="true">
          {display}
          {suffix}
        </span>
      </p>
      <p className="mt-2 text-sm font-medium text-muted sm:text-base">{label}</p>
    </motion.div>
  );
}

export function About() {
  return (
    <Section id="about" eyebrow="About me" title="Building for the web, learning from data.">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:col-span-3">
          {about.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <div className="space-y-6 lg:col-span-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-primary/60 bg-surface p-6 sm:p-8">
              <div aria-hidden="true" className="halftone absolute inset-0 opacity-40" />
              <div className="relative flex items-center gap-4">
                <GraduationCap size={36} className="text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-muted">CGPA, {profile.name.split(" ")[0]}&apos;s BTech</p>
                  <p className="font-display text-5xl text-fg">{profile.cgpa}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
