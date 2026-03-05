"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { personalInfo, skillCategories } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="About Me" subtitle="A snapshot of who I am and what I work with." />

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <p className="mb-6 leading-relaxed text-slate-300">
                {personalInfo.bio}
              </p>
              <div className="flex flex-col gap-3 text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  University of Toronto Mississauga
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-400" />
                  B.Sc. Computer Science — Class of 2028
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  CCC Senior Honour Roll — Top 100 in Canada
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="space-y-8">
              {skillCategories.map((category, catIdx) => (
                <div key={category.title}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: catIdx * 0.1 + skillIdx * 0.03,
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="glass group flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/5"
                      >
                        <skill.icon
                          size={16}
                          className="text-slate-400 transition-colors group-hover:text-indigo-400"
                        />
                        <span className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
