"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/data/portfolio";

function ProjectRow({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b border-accent/15"
    >
      <button
        onClick={() => onSelect(project)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-full cursor-pointer overflow-hidden py-8 text-left sm:py-10"
      >
        {/* Subtle background tint */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(249,115,22,0.07)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />

        {/* Left border that grows in height */}
        <motion.div
          className="absolute left-0 top-0 w-[2px] origin-top bg-accent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8">
          <span
            className={`font-display text-4xl font-light tabular-nums transition-colors sm:text-6xl ${
              isHovered ? "text-accent/40" : "text-text-muted/30"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <h3
              className={`font-display text-xl font-bold transition-colors sm:text-3xl ${
                isHovered ? "text-text" : "text-text"
              }`}
            >
              {project.title}
            </h3>
            <p
              className={`mt-1 text-sm transition-colors ${
                isHovered ? "text-accent" : "text-text-muted"
              }`}
            >
              {project.subtitle}
            </p>
          </div>

          <div
            className={`hidden items-center gap-3 text-right transition-colors sm:flex ${
              isHovered ? "text-accent" : "text-text-muted"
            }`}
          >
            <span className="text-xs uppercase tracking-wider">{project.date}</span>
            <FiArrowUpRight
              size={20}
              className={`transition-transform ${isHovered ? "translate-x-0.5 -translate-y-0.5" : ""}`}
            />
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Projects"
          subtitle="A selection of things I've built that I'm proud of."
        />

        <div>
          {projects.map((project, i) => (
            <ProjectRow
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
