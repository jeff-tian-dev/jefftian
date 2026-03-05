"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/data/portfolio";

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="glass group relative cursor-pointer overflow-hidden rounded-2xl transition-all hover:border-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/5"
        onClick={() => onSelect(project)}
      >
        {/* Gradient header area */}
        <div
          className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.gradient} p-6 opacity-80`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
              {project.date}
            </span>
          </div>

          {/* Decorative shapes */}
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
          <div className="absolute -top-4 right-12 h-16 w-16 rounded-full bg-white/5 blur-lg" />

          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 rounded-full bg-white/10 p-2 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100">
            <FiArrowUpRight size={18} className="text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-indigo-300">
            {project.title}
          </h3>
          <p className="mb-1 text-sm font-medium text-indigo-400/80">
            {project.subtitle}
          </p>
          <p className="mb-5 mt-3 line-clamp-2 text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-400 ring-1 ring-white/5"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-white/5">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-indigo-400"
              >
                <FiGithub size={14} />
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-indigo-400"
              >
                <FiExternalLink size={14} />
                Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Projects"
          subtitle="A selection of things I've built that I'm proud of."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
