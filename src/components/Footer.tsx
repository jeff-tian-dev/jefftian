"use client";

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative px-6 pb-8 pt-8 sm:px-10 lg:px-16">
      <div className="mx-auto mb-8 h-px max-w-6xl bg-border" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span>&copy; {currentYear} {personalInfo.name}</span>
          <span className="text-border">·</span>
          <span>{personalInfo.location}</span>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
            { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
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
              className="text-text-muted transition-colors hover:text-accent"
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
