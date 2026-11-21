"use client";

import { useEffect, useState } from "react";
import { navLinks, personalInfo } from "@/data/portfolio";

export default function Header() {
  const [current, setCurrent] = useState<string | null>(null);

  // "You are here": any chapter marks Story, otherwise the section itself.
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[id^="chapter-"]:not([id$="-title"]), #work, #contact')
    );
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const id = Array.from(visible).find(([, on]) => on)?.[0];
        setCurrent(id ? (id.startsWith("chapter-") ? "#chapter-1" : `#${id}`) : null);
      },
      { rootMargin: "-45% 0px -54% 0px" }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-14 max-w-[72rem] items-center gap-1 px-4 sm:px-8">
        <a
          href="#top"
          className="wide mr-auto hidden font-display text-step-0 font-black sm:inline"
        >
          {personalInfo.name}
        </a>
        <nav aria-label="Sections" className="-ml-2 min-w-0 sm:ml-0">
          <ul className="flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={current === link.href ? "true" : undefined}
                  className="inline-flex min-h-11 items-center whitespace-nowrap px-1.5 text-base font-bold decoration-[3px] underline-offset-[7px] hover:bg-ink hover:text-paper aria-[current=true]:underline min-[360px]:px-2.5"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
