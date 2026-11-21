"use client";

import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { chapters } from "@/data/portfolio";

/**
 * Story progress indicator. Wide screens get a fixed chapter rail; smaller
 * screens get a bar under the header that expands into a chapter list.
 * Both only appear while a chapter is on screen.
 */
export default function StoryProgress() {
  const [current, setCurrent] = useState<number | null>(null);
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    const visible = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const n = Number(entry.target.id.replace("chapter-", ""));
          if (entry.isIntersecting) visible.add(n);
          else visible.delete(n);
        }
        setCurrent(visible.size ? Math.max(...Array.from(visible)) : null);
      },
      // A thin band across the middle of the screen decides the chapter.
      { rootMargin: "-45% 0px -54% 0px" }
    );
    chapters.forEach((c) => {
      const el = document.getElementById(`chapter-${c.number}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (current === null) setListOpen(false);
  }, [current]);

  useEffect(() => {
    if (!listOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setListOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [listOpen]);

  const currentChapter = chapters.find((c) => c.number === current);

  return (
    <>
      {/* Wide screens: fixed rail. */}
      <nav
        aria-label="Story chapters"
        className={`fixed left-4 top-1/2 z-20 hidden -translate-y-1/2 border-2 border-ink bg-paper p-1 ${
          current !== null ? "xl:block" : ""
        }`}
      >
        <ol>
          {chapters.map((c) => {
            const isCurrent = c.number === current;
            const isPast = current !== null && c.number < current;
            return (
              <li key={c.number} className="relative">
                <a
                  href={`#chapter-${c.number}`}
                  aria-current={isCurrent ? "step" : undefined}
                  className="peer flex h-11 w-11 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className={`figures flex h-8 w-8 items-center justify-center border-2 border-ink text-sm font-bold transition-transform duration-200 ${
                      isCurrent
                        ? "scale-110 bg-cobalt text-white"
                        : isPast
                          ? "bg-ink text-paper"
                          : ""
                    }`}
                  >
                    {c.number}
                  </span>
                  <span className="sr-only">
                    Chapter {c.number}: {c.title}
                  </span>
                </a>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 whitespace-nowrap border-2 border-ink bg-paper px-2 py-1 text-sm font-bold peer-hover:block peer-focus-visible:block"
                >
                  {c.title}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Phones and tablets: bar under the header with a chapter list. */}
      {currentChapter && (
        <div className="fixed inset-x-0 top-14 z-20 border-b-2 border-ink bg-paper xl:hidden">
          <div className="mx-auto max-w-[72rem] px-4 sm:px-8">
            <button
              type="button"
              aria-expanded={listOpen}
              aria-controls="chapter-list"
              onClick={() => setListOpen((open) => !open)}
              className="flex h-[3.25rem] w-full items-center gap-3 text-left"
            >
              <span aria-hidden="true" className="flex shrink-0 gap-1">
                {chapters.map((c) => (
                  <span
                    key={c.number}
                    className={`h-2.5 w-4 border-2 border-ink ${
                      c.number <= currentChapter.number ? "bg-cobalt" : ""
                    }`}
                  />
                ))}
              </span>
              <span className="min-w-0 flex-1 truncate text-base">
                <span className="sr-only">Chapter </span>
                <span className="font-bold">
                  {currentChapter.number} of {chapters.length}:
                </span>{" "}
                {currentChapter.title}
              </span>
              <FiChevronDown
                aria-hidden="true"
                size={20}
                className={`shrink-0 ${listOpen ? "rotate-180" : ""}`}
              />
            </button>
            {listOpen && (
              <nav aria-label="Story chapters">
                <ol id="chapter-list" className="border-t-2 border-ink py-2">
                  {chapters.map((c) => (
                    <li key={c.number}>
                      <a
                        href={`#chapter-${c.number}`}
                        aria-current={
                          c.number === currentChapter.number ? "step" : undefined
                        }
                        onClick={() => setListOpen(false)}
                        className="flex min-h-11 items-center gap-3 px-1 text-base hover:bg-ink hover:text-paper aria-[current=step]:font-bold"
                      >
                        <span className="figures w-5 font-bold">{c.number}</span>
                        {c.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
        </div>
      )}
    </>
  );
}
