"use client";

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative px-6 pb-8 pt-16">
      {/* Divider */}
      <div className="mx-auto mb-8 h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-400">
            &copy; {currentYear} {personalInfo.name}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-sm text-slate-500">
            Built with Next.js & Tailwind
          </span>
        </div>

        <div className="flex items-center gap-4">
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
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-slate-500 transition-colors hover:text-slate-300"
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
