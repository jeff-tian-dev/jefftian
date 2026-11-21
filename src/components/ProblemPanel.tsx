"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiGithub,
  FiX,
} from "react-icons/fi";
import type { Problem } from "@/data/portfolio";
import Metric from "./Metric";

interface Neighbour {
  problem: Problem;
  letter: string;
}

interface ProblemPanelProps {
  problem: Problem | null;
  letter: string;
  total: number;
  prev: Neighbour | null;
  next: Neighbour | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
  /** Called after the exit animation, once the dialog has closed. */
  onClosed: () => void;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

const ease = [0.32, 0.72, 0, 1] as const;

export default function ProblemPanel({
  problem,
  letter,
  total,
  prev,
  next,
  onClose,
  onNavigate,
  onClosed,
}: ProblemPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Open the native dialog: focus trap, Esc and inert page come for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (problem && dialog && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("scroll-locked");
      // Start on the title (not the close button) so screen readers read
      // the problem first and no focus ring flashes on open.
      document.getElementById("problem-title")?.focus();
    }
  }, [problem]);

  // Route Esc through our close so the URL and exit animation stay in sync.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onCloseRef.current();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, []);

  // Each problem starts at the top. When switching between problems (not on
  // first open, where the dialog label is read), announce the new one.
  const [announcement, setAnnouncement] = useState("");
  const previousId = useRef<string | null>(null);
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
    const id = problem?.id ?? null;
    if (id && previousId.current && id !== previousId.current) {
      setAnnouncement(`Problem ${letter}: ${problem?.title}`);
      // Switching remounts the article; if focus went with it, put it on
      // the new title so the keyboard keeps working inside the panel.
      if (!dialogRef.current?.contains(document.activeElement)) {
        document.getElementById("problem-title")?.focus();
      }
    } else if (!id) {
      setAnnouncement("");
    }
    previousId.current = id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem?.id]);

  const handleExitComplete = () => {
    dialogRef.current?.close();
    document.documentElement.classList.remove("scroll-locked");
    onClosed();
  };

  // Arrow keys and J/K only work while focus is inside the panel, which
  // keeps single-key shortcuts scoped as WCAG 2.1.4 requires.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if ((event.key === "ArrowRight" || event.key === "j") && next) {
      event.preventDefault();
      onNavigate(next.problem.id);
    } else if ((event.key === "ArrowLeft" || event.key === "k") && prev) {
      event.preventDefault();
      onNavigate(prev.problem.id);
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 500) onClose();
  };

  const startDrag = (event: React.PointerEvent) => {
    if (isDesktop) return;
    if ((event.target as HTMLElement).closest("button, a")) return;
    dragControls.start(event);
  };

  const enter = reduceMotion
    ? { duration: 0.15 }
    : { duration: 0.34, ease };
  const exit = reduceMotion ? { duration: 0.1 } : { duration: 0.22, ease };
  const offscreen = reduceMotion
    ? { opacity: 0 }
    : isDesktop
      ? { x: "100%" }
      : { y: "100%" };
  const onscreen = reduceMotion ? { opacity: 1 } : { x: 0, y: 0 };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="problem-title"
      className="problem-dialog"
      onKeyDown={handleKeyDown}
    >
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {problem && (
          <motion.div
            key="scrim"
            aria-hidden="true"
            className="absolute inset-0 bg-[rgb(var(--scrim)/0.5)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: enter }}
            exit={{ opacity: 0, transition: exit }}
            onClick={onClose}
          />
        )}
        {problem && (
          <motion.div
            key="panel"
            className={
              isDesktop
                ? "absolute inset-y-0 right-0 flex w-full max-w-[42rem] flex-col border-l border-rule bg-paper"
                : "absolute inset-x-0 bottom-0 top-3 flex flex-col overflow-hidden bg-paper"
            }
            initial={offscreen}
            animate={{ ...onscreen, transition: enter }}
            exit={{ ...offscreen, transition: exit }}
            drag={isDesktop || reduceMotion ? false : "y"}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={handleDragEnd}
          >
            <header
              className="relative flex items-center gap-3 border-b border-rule px-4 pb-2 pt-3 sm:px-8"
              onPointerDown={startDrag}
              style={isDesktop ? undefined : { touchAction: "none" }}
            >
              {!isDesktop && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-rule"
                />
              )}
              <p className="font-body text-base text-graphite">
                Problem {letter} of {total}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 ml-auto inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:bg-ink/[0.06]"
              >
                <FiX size={22} aria-hidden="true" />
              </button>
            </header>

            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto overscroll-contain"
            >
              <motion.article
                key={problem.id}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.18 } }}
                className="px-4 pb-12 pt-6 sm:px-8 sm:pt-8"
              >
                <h2
                  id="problem-title"
                  tabIndex={-1}
                  className="text-balance outline-none font-display text-step-2 font-semibold sm:text-step-3"
                >
                  <span className="mr-2">{letter}.</span>
                  {problem.title}
                </h2>
                <p className="mt-3 font-body text-base text-graphite">
                  {problem.name}
                  {problem.role ? `, ${problem.role}` : ""}, {problem.date}
                </p>

                <PanelSection title="The problem">
                  <p>{problem.statement}</p>
                </PanelSection>

                <PanelSection title="What I built">
                  {problem.approach.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </PanelSection>

                <PanelSection title="Result">
                  <dl className="divide-y divide-rule border-y border-rule">
                    {problem.results.map((row) => (
                      <div
                        key={row.label}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
                      >
                        <dt className="font-body text-base text-graphite">
                          {row.label}
                        </dt>
                        <dd className="text-right font-body text-base">
                          <Metric before={row.before} after={row.after} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </PanelSection>

                <PanelSection title="Built with">
                  <p className="font-body text-base">
                    {problem.stack.join(", ")}
                  </p>
                </PanelSection>

                {(problem.github || problem.live) && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {problem.github && (
                      <a
                        href={problem.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 border-2 border-ink px-4 font-body text-base font-bold transition-colors hover:border-ink hover:bg-ink/[0.04]"
                      >
                        <FiGithub aria-hidden="true" />
                        View source on GitHub
                      </a>
                    )}
                    {problem.live && (
                      <a
                        href={problem.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 bg-ink px-4 font-body text-base font-bold text-paper transition-opacity hover:opacity-90"
                      >
                        <FiExternalLink aria-hidden="true" />
                        Open live site
                      </a>
                    )}
                  </div>
                )}
              </motion.article>
            </div>

            <footer
              className="border-t border-rule px-4 pt-2 sm:px-8"
              style={{
                paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
              }}
            >
              <div className="grid grid-cols-2 gap-2">
                {prev ? (
                  <NeighbourButton
                    direction="prev"
                    neighbour={prev}
                    onClick={() => onNavigate(prev.problem.id)}
                  />
                ) : (
                  <span />
                )}
                {next ? (
                  <NeighbourButton
                    direction="next"
                    neighbour={next}
                    onClick={() => onNavigate(next.problem.id)}
                  />
                ) : (
                  <span />
                )}
              </div>
              {isDesktop && (
                <p className="pb-1 pt-1 text-center font-body text-sm text-graphite">
                  Use the ← and → keys to switch problems, and Esc to close.
                </p>
              )}
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}

function PanelSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-9">
      <h3 className="mb-3 font-display text-step-1 font-semibold">{title}</h3>
      <div className="max-w-measure space-y-4 text-pretty">{children}</div>
    </section>
  );
}

function NeighbourButton({
  direction,
  neighbour,
  onClick,
}: {
  direction: "prev" | "next";
  neighbour: Neighbour;
  onClick: () => void;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 min-w-0 items-center gap-2 px-2 py-1.5 font-body transition-colors hover:bg-ink/[0.05] ${
        isNext ? "flex-row-reverse text-right" : "text-left"
      }`}
    >
      {isNext ? (
        <FiChevronRight size={20} aria-hidden="true" className="shrink-0" />
      ) : (
        <FiChevronLeft size={20} aria-hidden="true" className="shrink-0" />
      )}
      <span className="min-w-0">
        <span className="block text-sm text-graphite">
          {isNext ? "Next" : "Previous"}
        </span>
        <span className="block truncate text-base font-bold">
          {neighbour.letter}. {neighbour.problem.shortName ?? neighbour.problem.name}
        </span>
      </span>
    </button>
  );
}
