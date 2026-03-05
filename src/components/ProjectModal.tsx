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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>

          {/* Gradient header */}
          <div
            className={`mb-6 h-2 w-20 rounded-full bg-gradient-to-r ${project.gradient}`}
          />

          {/* Title */}
          <h3 className="mb-1 text-2xl font-bold text-white">
            {project.title}
          </h3>
          <p className="mb-2 text-sm font-medium text-indigo-400">
            {project.subtitle}
          </p>
          <p className="mb-6 text-xs text-slate-500">{project.date}</p>

          {/* Description */}
          <p className="mb-6 leading-relaxed text-slate-300">
            {project.longDescription}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-white"
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
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
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
