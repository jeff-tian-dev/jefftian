"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";
import type { Project } from "@/data/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="surface-raised relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-text-muted transition-colors hover:bg-surface hover:text-text"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>

          <div className="mb-6 h-1 w-16 rounded-full bg-accent" />

          <h3 className="font-display mb-1 text-2xl font-bold text-text">
            {project.title}
          </h3>
          <p className="mb-2 text-sm font-medium text-accent">{project.subtitle}</p>
          <p className="mb-6 text-xs text-text-muted">{project.date}</p>

          <p className="mb-6 leading-relaxed text-text-muted">
            {project.longDescription}
          </p>

          <div className="mb-6">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-text-muted"
                >
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text-muted transition-all hover:border-accent/30 hover:text-text"
              >
                <FiGithub size={16} />
                Source Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-all hover:bg-accent-warm"
              >
                <FiExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
