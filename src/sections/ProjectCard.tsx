import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../data";
import { fadeUp } from "../components/Reveal";

type ProjectCardProps = {
  project: Project;
  onOpen: () => void;
};

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const spotlight = useTransform(
    [px, py],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(var(--primary-rgb) / 0.22), transparent 55%)`,
  );

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,box-shadow] duration-500 hover:border-primary hover:shadow-[0_0_40px_-8px_rgb(var(--primary-rgb)/0.55)]"
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div aria-hidden="true" className="halftone absolute inset-0 opacity-20" />

      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="relative flex flex-1 flex-col p-6 text-left sm:p-7"
      >
        <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Project</span>
        <h3 className="font-display text-2xl leading-tight text-fg transition-colors group-hover:text-primary">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.tech.slice(0, 5).map((tech) => (
            <li key={tech} className="rounded-full border border-border bg-bg/60 px-3 py-1 text-xs font-medium text-fg">
              {tech}
            </li>
          ))}
          {project.tech.length > 5 && (
            <li className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              +{project.tech.length - 5}
            </li>
          )}
        </ul>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          View details
          <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </button>

      <div className="relative flex gap-3 border-t border-border px-6 py-4 sm:px-7">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-primary"
        >
          <Github size={16} aria-hidden="true" />
          GitHub
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg transition-transform hover:scale-[1.03]"
        >
          <ArrowUpRight size={16} aria-hidden="true" />
          Live
        </a>
      </div>
    </motion.article>
  );
}
