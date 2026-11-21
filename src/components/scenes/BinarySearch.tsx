"use client";

import { useState } from "react";
import { useMotionValueEvent } from "framer-motion";
import { seg, stagger } from "@/lib/seg";
import { useSceneProgress } from "../Scene";

/**
 * Chapter 1's pinned scene. The code types itself, then runs: each step
 * lights up the line being executed while the array beside it shows that
 * same step (the search window shrinks, mid jumps, the target is found).
 *
 * Steps are picked from the Scene's scroll progress. Outside motion
 * (server HTML, no JS, reduced motion) progress is 1, so it renders the
 * finished run.
 */

const ARRAY = [3, 8, 12, 17, 21, 26, 30, 35, 42, 47, 53, 61];
const TARGET = 47;
const N = ARRAY.length;

const SOURCE = [
  "int search(vector<int>& a, int x) {",
  "  int lo = 0, hi = a.size() - 1;",
  "  while (lo <= hi) {",
  "    int mid = (lo + hi) / 2;",
  "    if (a[mid] == x) return mid;",
  "    if (a[mid] < x) lo = mid + 1;",
  "    else hi = mid - 1;",
  "  }",
  "  return -1;",
  "}",
];

// Syntax colours, all from the site palette (a light tint of the blue
// keeps keywords readable on the dark editor).
const KW = "#8FB0FF";
const FN = "#FFC93C";
const PLAIN = "#F5F5F5";
const TOKEN = /(\b(?:int|while|if|else|return|vector)\b|\b(?:search|size)\b|\b\d+\b)/;

function colourFor(token: string) {
  if (/^(int|while|if|else|return|vector)$/.test(token)) return KW;
  if (/^(search|size|\d+)$/.test(token)) return FN;
  return PLAIN;
}

const totalChars = SOURCE.join("").length;
const TYPE_START = 0.02;
const TYPE_END = 0.34;

type Step = {
  at: number;
  line: number;
  lo: number;
  hi: number;
  mid: number | null;
  readout: string;
  found?: boolean;
};

// The real run of the code above for x = 47.
const STEPS: Step[] = [
  { at: 0.38, line: 1, lo: 0, hi: 11, mid: null, readout: "lo = 0, hi = 11" },
  { at: 0.43, line: 3, lo: 0, hi: 11, mid: 5, readout: "mid = 5" },
  { at: 0.48, line: 5, lo: 6, hi: 11, mid: 5, readout: "26 < 47, so lo = 6" },
  { at: 0.53, line: 3, lo: 6, hi: 11, mid: 8, readout: "mid = 8" },
  { at: 0.58, line: 5, lo: 9, hi: 11, mid: 8, readout: "42 < 47, so lo = 9" },
  { at: 0.63, line: 3, lo: 9, hi: 11, mid: 10, readout: "mid = 10" },
  { at: 0.68, line: 6, lo: 9, hi: 9, mid: 10, readout: "53 > 47, so hi = 9" },
  { at: 0.73, line: 3, lo: 9, hi: 9, mid: 9, readout: "mid = 9" },
  { at: 0.78, line: 4, lo: 9, hi: 9, mid: 9, readout: "47 == 47, return 9", found: true },
];

function stepAt(p: number) {
  let index = -1;
  for (let i = 0; i < STEPS.length; i++) if (p >= STEPS[i].at) index = i;
  return index;
}

function TypedCode({ activeLine }: { activeLine: number | null }) {
  let index = 0;
  return (
    <code className="block">
      {SOURCE.map((line, li) => (
        <span
          key={li}
          className={`block min-h-6 px-4 transition-colors duration-200 motion-reduce:transition-none sm:min-h-7 sm:px-5 ${
            activeLine === li ? "bg-white/[0.12] shadow-[inset_4px_0_0_0_#FFC93C]" : ""
          }`}
        >
          {line.split(TOKEN).map((part, ti) =>
            part ? (
              <span key={ti} style={{ color: colourFor(part) }}>
                {part.split("").map((ch) => {
                  const i = index++;
                  return (
                    <span
                      key={i}
                      className="seg type-char"
                      style={seg(TYPE_START + (i / totalChars) * (TYPE_END - TYPE_START), 0.004)}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            ) : null
          )}
        </span>
      ))}
    </code>
  );
}

export default function BinarySearch() {
  const progress = useSceneProgress();
  const [stepIndex, setStepIndex] = useState(() => stepAt(progress.get()));
  useMotionValueEvent(progress, "change", (v) => {
    const next = stepAt(v);
    setStepIndex((current) => (current === next ? current : next));
  });

  const step = stepIndex >= 0 ? STEPS[stepIndex] : null;
  const checks = STEPS.slice(0, stepIndex + 1).filter((s) => s.line === 3).length;
  const cell = (i: number) => `calc(${i} * 100cqw / ${N})`;
  const move = "transition-[translate,scale,opacity] duration-300 ease-out motion-reduce:transition-none";

  return (
    <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
      <p className="sr-only">
        A binary search for 47 in a sorted list of 12 numbers. It halves the
        list each step and finds 47 at index 9 after 4 checks.
      </p>

      {/* The code. */}
      <div
        aria-hidden="true"
        className="seg rise-in overflow-hidden border-2 border-ink bg-night shadow-[8px_8px_0_0_rgb(var(--ink))] md:col-span-7"
        style={seg(0, 0.06)}
      >
        <div className="flex items-center gap-2 border-b-2 border-white/15 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-white/30" />
          <span className="h-3 w-3 rounded-full bg-white/30" />
          <span className="h-3 w-3 rounded-full bg-white/30" />
          <span className="ml-2 font-mono text-sm text-white/70">search.cpp</span>
        </div>
        <pre className="whitespace-pre-wrap break-words py-4 font-mono text-[0.8125rem] leading-6 sm:text-base sm:leading-7">
          <TypedCode activeLine={step?.line ?? null} />
        </pre>
      </div>

      {/* The same run, drawn. */}
      <div aria-hidden="true" className="md:col-span-5">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="seg pop-in border-2 border-ink bg-sun px-3 py-1 font-mono text-base font-bold text-night"
            style={seg(0.3, 0.05)}
          >
            x = {TARGET}
          </span>
          <span
            className="seg pop-in figures border-2 border-ink bg-paper px-3 py-1 font-mono text-base font-bold"
            style={seg(0.32, 0.05)}
          >
            checks: {checks}
          </span>
        </div>

        <div className="relative mt-4 [container-type:inline-size]">
          {/* mid pointer */}
          <div className="h-7">
            <span
              className={`flex w-[calc(100cqw/12)] flex-col items-center font-mono text-xs font-bold text-ink sm:text-sm ${move}`}
              style={{
                translate: `${cell(step?.mid ?? 0)} 0`,
                opacity: step?.mid != null ? 1 : 0,
              }}
            >
              mid
              <svg viewBox="0 0 10 6" className="h-1.5 w-2.5" fill="currentColor">
                <path d="M0 0h10L5 6z" />
              </svg>
            </span>
          </div>

          {/* The sorted array. */}
          <ol className="grid grid-cols-12 gap-1">
            {ARRAY.map((value, i) => {
              const out = step ? i < step.lo || i > step.hi : false;
              const isMid = step?.mid === i;
              const found = isMid && step?.found;
              return (
                <li
                  key={value}
                  className="seg pop-in"
                  style={stagger(i, N, 0.06, 0.3, 0.05)}
                >
                  <span
                    className={`figures grid aspect-[3/4] place-items-center rounded-md border-2 font-mono text-xs font-bold transition-[background-color,color,opacity,transform] duration-300 ease-out motion-reduce:transition-none sm:text-sm ${
                      found
                        ? "-translate-y-1 scale-110 border-night bg-pass text-night"
                        : isMid
                          ? "-translate-y-1 border-night bg-cobalt text-white"
                          : out
                            ? "border-ink/30 text-ink opacity-30"
                            : "border-ink bg-paper text-ink"
                    }`}
                  >
                    {value}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* The search window, lo to hi. */}
          <div className="relative mt-2 h-12">
            <span
              className={`absolute left-0 top-0 h-2 w-full origin-left bg-cobalt ${move}`}
              style={{
                translate: `${cell(step?.lo ?? 0)} 0`,
                scale: `${step ? (step.hi - step.lo + 1) / N : 1} 1`,
                opacity: step ? 1 : 0,
              }}
            />
            <span
              className={`absolute left-0 top-3 w-[calc(100cqw/12)] font-mono text-xs font-bold sm:text-sm ${move}`}
              style={{ translate: `${cell(step?.lo ?? 0)} 0`, opacity: step ? 1 : 0 }}
            >
              lo
            </span>
            <span
              className={`absolute left-0 top-3 w-[calc(100cqw/12)] text-right font-mono text-xs font-bold sm:text-sm ${move}`}
              style={{
                // When lo meets hi, drop "hi" a line so the labels don't collide.
                translate: `${cell(step?.hi ?? N - 1)} ${step && step.lo === step.hi ? "1.2em" : "0"}`,
                opacity: step ? 1 : 0,
              }}
            >
              hi
            </span>
          </div>
        </div>

        <div className="mt-1 flex items-start justify-between gap-4">
          <p className="min-h-[1.75rem] font-mono text-base font-bold">
            {step?.readout ?? ""}
          </p>

          {/* The result lands like a stamp, beside the array, not on it. */}
          <div
            className="seg stamp-in flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-4 border-double border-night bg-sun text-center text-night shadow-[4px_4px_0_0_rgb(var(--ink))] sm:h-32 sm:w-32"
            style={seg(0.86, 0.08)}
          >
            <span className="font-display text-step-1 font-black leading-none sm:text-step-2">
              Top 100
            </span>
            <span className="mt-1 text-sm font-bold">in Canada, 2022</span>
          </div>
        </div>
      </div>
    </div>
  );
}
