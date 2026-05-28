"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { personalInfo, skillCategories } from "@/data/portfolio";

const bioSentences = personalInfo.bio.trim().split(/\.\s+/);
const pullQuote = bioSentences[0] + ".";
const restOfBio = bioSentences.slice(1).join(". ").trim();
const bodyBio = restOfBio ? restOfBio + (restOfBio.endsWith(".") ? "" : ".") : "";

const FEATURED_SKILLS = new Set([
  "Python",
  "TypeScript",
  "JavaScript",
  "React",
  "FastAPI",
  "PyTorch",
  "Git",
  "Docker",
  "PostgreSQL",
]);

export default function About() {
  return (
    <section id="about" className="relative px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="About Me"
          subtitle="A snapshot of who I am and what I work with."
        />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-0">
          {/* Bio — left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 lg:pr-12"
          >
            <blockquote className="font-display mb-6 text-xl font-medium leading-relaxed text-text sm:text-2xl">
              {pullQuote}
            </blockquote>
            {bodyBio && (
              <p className="mb-8 leading-relaxed text-text-muted">{bodyBio}</p>
            )}
            <ul className="space-y-3 text-sm text-text-muted">
              <li className="flex items-center gap-3">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                University of Toronto Mississauga
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                B.Sc. Computer Science — Class of 2028
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                CCC Senior Honour Roll — Top 100 in Canada
              </li>
            </ul>
          </motion.div>

          {/* Amber vertical rule */}
          <div className="hidden w-px bg-accent/20 lg:block" />

          {/* Skills — right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            className="lg:col-span-2 lg:pl-12"
          >
            <div className="space-y-8">
              {skillCategories.map((category) => {
                const sorted = [...category.skills].sort((a, b) => {
                  const aFeatured = FEATURED_SKILLS.has(a.name) ? 0 : 1;
                  const bFeatured = FEATURED_SKILLS.has(b.name) ? 0 : 1;
                  return aFeatured - bFeatured;
                });

                return (
                  <div key={category.title}>
                    <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sorted.map((skill) => {
                        const isElectric = FEATURED_SKILLS.has(skill.name);
                        return (
                          <div
                            key={skill.name}
                            className={`skill-chip surface flex items-center gap-2.5 rounded-xl px-4 py-2.5 ${
                              isElectric ? "skill-chip-electric" : ""
                            }`}
                          >
                            <skill.icon
                              size={16}
                              className="text-text-muted transition-colors"
                            />
                            <span className="text-sm font-medium text-text">
                              {skill.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
