"use client";

import { motion } from "framer-motion";
import { FiAward, FiBookOpen } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { timeline } from "@/data/portfolio";

function getStartYear(date: string): string {
  const startPart = date.split(/\s*[—–-]\s*/)[0].trim();
  const match = startPart.match(/\d{4}/);
  return match ? match[0] : startPart;
}

function parseStartDate(date: string): Date {
  const startPart = date.split(/\s*[—–-]\s*/)[0].trim();

  const monthYear = startPart.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYear) {
    return new Date(`${monthYear[1]} 1, ${monthYear[2]}`);
  }

  const yearOnly = startPart.match(/(\d{4})/);
  if (yearOnly) {
    return new Date(Number(yearOnly[1]), 0, 1);
  }

  return new Date(0);
}

export default function Experience() {
  const sortedTimeline = [...timeline].sort(
    (a, b) => parseStartDate(b.date).getTime() - parseStartDate(a.date).getTime()
  );

  return (
    <section id="experience" className="relative px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Experience"
          subtitle="Internships, club leadership, education, and competition highlights."
        />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-accent/40 sm:left-1/2 sm:-translate-x-px" />

          {sortedTimeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative mb-16 w-full"
              >
                {/* Year — on empty side of timeline (opposite the card) on desktop */}
                <span
                  className={`font-display pointer-events-none absolute top-4 z-0 hidden select-none text-6xl font-black leading-none text-accent/15 sm:block ${
                    isLeft ? "left-[calc(50%+2rem)]" : "right-[calc(50%+2rem)]"
                  }`}
                  aria-hidden="true"
                >
                  {getStartYear(item.date)}
                </span>

                {/* Timeline dot — anchored to center line */}
                <div className="absolute left-[19px] top-6 z-20 flex h-[15px] w-[15px] -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-bg sm:left-1/2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>

                {/* Card container — half-width on desktop, alternating sides */}
                <div
                  className={`pl-12 sm:w-1/2 sm:pl-0 ${
                    isLeft ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
                  }`}
                >
                  <div className="surface relative z-10 rounded-2xl p-6 transition-all hover:border-accent/25">
                    <p className="font-display mb-3 text-2xl font-black text-accent/25 sm:hidden">
                      {getStartYear(item.date)}
                    </p>

                    <div
                      className={`mb-3 flex flex-wrap items-center gap-2 ${
                        isLeft ? "sm:justify-end" : ""
                      }`}
                    >
                      {item.badge ? (
                        <FiAward className="text-accent-warm" size={18} />
                      ) : (
                        <FiBookOpen className="text-accent" size={18} />
                      )}
                      <span className="text-xs font-medium text-accent">
                        {item.date}
                      </span>
                      {item.badge && (
                        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-warm ring-1 ring-accent/25">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display mb-1 text-lg font-bold text-text">
                      {item.title}
                    </h3>
                    <p className="mb-3 text-sm font-medium text-text-muted">
                      {item.organization}
                    </p>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
