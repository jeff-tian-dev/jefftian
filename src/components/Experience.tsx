"use client";

import { motion } from "framer-motion";
import { FiAward, FiBookOpen } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { timeline } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Experience"
          subtitle="Education, leadership, and milestones along the way."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent sm:left-1/2 sm:-translate-x-px" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative mb-12 pl-12 sm:w-1/2 sm:pl-0 ${
                index % 2 === 0
                  ? "sm:pr-12 sm:text-right"
                  : "sm:ml-auto sm:pl-12"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-[12px] top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-indigo-500 bg-background sm:top-1 ${
                  index % 2 === 0
                    ? "sm:left-auto sm:-right-[8px]"
                    : "sm:-left-[8px]"
                }`}
              >
                <div className="h-2 w-2 rounded-full bg-indigo-400" />
              </div>

              {/* Card */}
              <div className="glass rounded-2xl p-6 transition-all hover:border-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/5">
                <div
                  className={`mb-3 flex items-center gap-2 ${
                    index % 2 === 0 ? "sm:justify-end" : ""
                  }`}
                >
                  {item.badge ? (
                    <FiAward className="text-amber-400" size={18} />
                  ) : (
                    <FiBookOpen className="text-indigo-400" size={18} />
                  )}
                  <span className="text-xs font-medium text-indigo-400">
                    {item.date}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 ring-1 ring-amber-400/20">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="mb-1 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mb-3 text-sm font-medium text-slate-400">
                  {item.organization}
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
