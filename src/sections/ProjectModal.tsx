import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "../data";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="relative flex max-h-[90svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-primary/50 bg-bg text-fg shadow-[0_0_60px_-10px_rgb(var(--primary-rgb)/0.5)] sm:rounded-3xl"
      >
        <div aria-hidden="true" className="halftone absolute inset-0 opacity-30" />
        <header className="relative flex items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Project</p>
            <h3 id="project-modal-title" className="mt-1 font-display text-2xl sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-2 text-sm text-muted">{project.tagline}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-primary hover:text-primary"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="relative flex-1 space-y-7 overflow-y-auto px-6 py-6 sm:px-8">
          <p className="leading-relaxed text-muted">{project.description}</p>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Highlights</h4>
            <ul className="space-y-3">
              {project.highlights.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.07 }}
                  className="flex gap-3 text-sm leading-relaxed sm:text-base"
                >
                  <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Tech stack</h4>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-fg">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="relative flex flex-col gap-3 border-t border-border px-6 py-5 sm:flex-row sm:px-8">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            <Github size={16} aria-hidden="true" />
            View on GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-fg transition-transform hover:scale-[1.02]"
          >
            <ArrowUpRight size={16} aria-hidden="true" />
            Live demo
          </a>
        </footer>
      </motion.div>
    </motion.div>
  );
}
