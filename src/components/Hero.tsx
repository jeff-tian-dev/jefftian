"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import { personalInfo } from "@/data/portfolio";

function TypingEffect({ words }: { words: string[] }) {
  const [displayText, setDisplayText] = useState("");
  const phase = useRef<"typing" | "pausing" | "deleting">("typing");
  const wordIndex = useRef(0);
  const charIndex = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentWord = words[wordIndex.current];

      if (phase.current === "typing") {
        charIndex.current++;
        setDisplayText(currentWord.slice(0, charIndex.current));
        if (charIndex.current === currentWord.length) {
          phase.current = "pausing";
          timeout = setTimeout(tick, 1800);
        } else {
          timeout = setTimeout(tick, 80);
        }
      } else if (phase.current === "pausing") {
        phase.current = "deleting";
        timeout = setTimeout(tick, 40);
      } else {
        charIndex.current--;
        setDisplayText(currentWord.slice(0, charIndex.current));
        if (charIndex.current === 0) {
          phase.current = "typing";
          wordIndex.current = (wordIndex.current + 1) % words.length;
          timeout = setTimeout(tick, 200);
        } else {
          timeout = setTimeout(tick, 40);
        }
      }
    };

    timeout = setTimeout(tick, 80);
    return () => clearTimeout(timeout);
  }, [words]);

  return (
    <span className="gradient-text">
      {displayText}
      <span className="ml-0.5 animate-pulse text-indigo-400">|</span>
    </span>
  );
}

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl text-center"
      >
        {/* Greeting badge */}
        <motion.div variants={item} className="mb-8 inline-block">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-300">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Available for internships
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-white">Hi, I&apos;m </span>
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          variants={item}
          className="mb-6 h-10 text-xl font-medium sm:text-2xl md:text-3xl"
        >
          <TypingEffect words={personalInfo.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="gradient-border rounded-full bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-5"
        >
          {[
            {
              icon: FiGithub,
              href: personalInfo.github,
              label: "GitHub",
            },
            {
              icon: FiLinkedin,
              href: personalInfo.linkedin,
              label: "LinkedIn",
            },
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
              className="group rounded-full border border-white/10 p-3 text-slate-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
            >
              <social.icon size={20} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-slate-500 uppercase">
            Scroll
          </span>
          <FiArrowDown className="text-slate-500" size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
