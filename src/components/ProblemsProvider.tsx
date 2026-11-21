"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { indexLinkId, letterFor, problems } from "@/data/portfolio";
import ProblemPanel from "./ProblemPanel";
import { useProblemParam } from "./useProblemParam";

const ids = problems.map((p) => p.id);

type OpenProblem = (id: string, opener?: HTMLElement | null) => void;
const ProblemsContext = createContext<OpenProblem | null>(null);

/**
 * Owns the single write-up panel for the whole page. It renders outside
 * every chapter, so the panel always uses the base colour tokens.
 */
export default function ProblemsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openId, open, close } = useProblemParam(ids);
  const opener = useRef<HTMLElement | null>(null);
  const lastShown = useRef<string | null>(null);

  const index = openId ? ids.indexOf(openId) : -1;
  const problem = index >= 0 ? problems[index] : null;

  useEffect(() => {
    if (problem) lastShown.current = problem.id;
  }, [problem]);

  const openFrom = useCallback<OpenProblem>(
    (id, el) => {
      opener.current = el ?? null;
      open(id);
    },
    [open]
  );

  // Return focus to whatever opened the panel. A deep-linked panel has no
  // opener, so focus goes to that problem's row in the "All work" index.
  const handleClosed = useCallback(() => {
    const el = opener.current;
    if (el?.isConnected) {
      el.focus();
    } else if (lastShown.current) {
      document.getElementById(indexLinkId(lastShown.current))?.focus();
    }
    opener.current = null;
  }, []);

  const neighbour = (i: number) =>
    i >= 0 && i < problems.length
      ? { problem: problems[i], letter: letterFor(i) }
      : null;

  const value = useMemo(() => openFrom, [openFrom]);

  return (
    <ProblemsContext.Provider value={value}>
      {children}
      <ProblemPanel
        problem={problem}
        letter={index >= 0 ? letterFor(index) : ""}
        total={problems.length}
        prev={neighbour(index - 1)}
        next={index >= 0 ? neighbour(index + 1) : null}
        onClose={close}
        onNavigate={open}
        onClosed={handleClosed}
      />
    </ProblemsContext.Provider>
  );
}

/**
 * A real link to `?p=<id>` (it works without JavaScript and can open in a
 * new tab). A plain click opens the panel in place instead.
 */
export function ProblemLink({
  id,
  className,
  children,
  linkId,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  linkId?: string;
}) {
  const openProblem = useContext(ProblemsContext);
  return (
    <a
      id={linkId}
      href={`?p=${id}`}
      className={className}
      onClick={(event) => {
        if (
          !openProblem ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        openProblem(id, event.currentTarget);
      }}
    >
      {children}
    </a>
  );
}
