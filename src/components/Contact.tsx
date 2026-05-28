"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 py-32 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-[clamp(4rem,10vw,10rem)] font-black leading-[0.9] tracking-tight text-text">
            LET&apos;S BUILD.
          </h2>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="link-underline font-display text-xl text-text sm:text-2xl"
              >
                {personalInfo.email}
              </a>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted">
                Open to internship opportunities in full-stack development and
                AI engineering. Whether you have a role in mind or just want to
                connect — reach out.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
