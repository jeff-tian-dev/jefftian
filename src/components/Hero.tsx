"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { personalInfo } from "@/data/portfolio";

const reveal = (delay: number) => ({
  hidden: {
    opacity: 0,
    y: 40,
    clipPath: "inset(100% 0 0 0)",
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-end px-6 pb-16 pt-32 sm:px-10 lg:px-16"
    >
      {/* Circle outline — right of center, partially clipped */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="pointer-events-none absolute right-[-10vw] top-[15%] h-[40vw] w-[40vw] min-h-[280px] min-w-[280px] text-accent/20"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="48"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="overflow-hidden">
          <motion.h1
            variants={reveal(0.1)}
            initial="hidden"
            animate="show"
            className="font-display text-[clamp(4rem,14vw,14rem)] font-black leading-[0.85] tracking-tight text-text"
          >
            JEFF
          </motion.h1>
          <motion.h1
            variants={reveal(0.25)}
            initial="hidden"
            animate="show"
            className="font-display text-[clamp(4rem,14vw,14rem)] font-black leading-[0.85] tracking-tight text-accent"
          >
            TIAN
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="my-6 h-px w-16 origin-left bg-accent"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-md text-base italic text-text-muted sm:text-lg"
        >
          ML engineer &amp; full-stack developer · CS @ UofT
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-8 text-sm font-medium"
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-text transition-colors hover:text-accent"
          >
            View Work ↓
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-text-muted transition-colors hover:text-accent-warm"
          >
            Get in Touch →
          </button>
        </motion.div>
      </div>

      {/* Social links — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-10 right-6 flex items-center gap-5 sm:right-10 lg:right-16"
      >
        {[
          { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
          { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
          {
            icon: FiMail,
            href: `mailto:${personalInfo.email}`,
            label: "Email",
          },
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-text-muted transition-colors hover:text-accent"
          >
            <social.icon size={20} />
          </a>
        ))}
      </motion.div>
    </section>
  );
}
