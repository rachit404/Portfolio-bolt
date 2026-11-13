import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "../data";
import { Section } from "../components/Section";
import { staggerContainer } from "../components/Reveal";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <Section id="projects" eyebrow="Projects" title="Things I have built.">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}
      </AnimatePresence>
    </Section>
  );
}
