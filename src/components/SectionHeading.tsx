"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 text-left"
    >
      <div className="accent-rule mb-5" />
      <h2 className="font-display mb-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-lg text-sm text-text-muted">{subtitle}</p>
    </motion.div>
  );
}
