import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { skillGroups, softSkills } from "../data";
import { Section } from "../components/Section";
import { fadeUp, staggerContainer } from "../components/Reveal";

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I use to build.">
      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <motion.div
            key={group.title}
            variants={fadeUp}
            className="glow-hover rounded-2xl border border-border bg-surface p-6 sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Code2 size={18} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg">{group.title}</h3>
            </div>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="flex flex-wrap gap-2.5"
            >
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  variants={chipVariants}
                  whileHover={{ y: -3 }}
                  className="cursor-default rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-primary hover:text-primary hover:shadow-[0_0_18px_-2px_rgb(var(--primary-rgb)/0.6)]"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-6 rounded-2xl border border-dashed border-primary/50 p-6 sm:p-8">
        <h3 className="mb-4 font-display text-lg">Soft skills</h3>
        <ul className="flex flex-wrap gap-2.5">
          {softSkills.map((skill) => (
            <li key={skill} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg">
              {skill}
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}
