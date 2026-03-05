"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 text-center"
    >
      <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="gradient-text">{title}</span>
      </h2>
      <p className="mx-auto max-w-lg text-slate-400">{subtitle}</p>
      <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </motion.div>
  );
}
