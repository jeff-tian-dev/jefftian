"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { useStoryMotion } from "./useStoryMotion";

/**
 * The hook. One orchestrated load moment (letters drop, shapes spin in,
 * marker highlights sweep), then the shapes react to scroll and, on
 * desktop, drift with the pointer. All of it is off for reduced motion.
 */

type Shape = {
  kind: "circle" | "square" | "triangle" | "pill" | "star";
  color: string;
  className: string;
  dx: number;
  dy: number;
  rot: number;
  depth: number;
};

// Phones keep every shape in a band above the name; desktop spreads
// them around it.
const shapes: Shape[] = [
  { kind: "circle", color: "#FFC93C", className: "right-4 top-5 h-20 w-20 md:right-[6%] md:top-[8%] md:h-[22vw] md:w-[22vw] md:max-h-64 md:max-w-64", dx: 160, dy: -120, rot: 90, depth: 28 },
  { kind: "square", color: "#1E5BFF", className: "left-[50%] top-12 h-11 w-11 rotate-12 md:left-auto md:right-[30%] md:top-[30%] md:h-[12vw] md:w-[12vw] md:max-h-36 md:max-w-36", dx: 60, dy: -220, rot: -140, depth: -18 },
  { kind: "triangle", color: "#FFFFFF", className: "left-[28%] top-4 h-14 w-14 md:left-[34%] md:top-[6%] md:h-[13vw] md:w-[13vw] md:max-h-40 md:max-w-40", dx: -120, dy: -180, rot: 200, depth: 22 },
  { kind: "pill", color: "#0B0B0F", className: "left-[34%] top-[6.75rem] h-7 w-24 -rotate-12 md:left-auto md:right-[2%] md:top-[46%] md:h-[7vw] md:w-[20vw] md:max-h-24 md:max-w-64", dx: 220, dy: 40, rot: -60, depth: -26 },
  { kind: "star", color: "#FFC93C", className: "left-4 top-14 h-12 w-12 md:left-[8%] md:top-[14%] md:h-[10vw] md:w-[10vw] md:max-h-32 md:max-w-32", dx: -200, dy: -60, rot: 260, depth: 16 },
];

function ShapeArt({ shape }: { shape: Shape }) {
  const stroke = { stroke: "#0B0B0F", strokeWidth: 4 };
  switch (shape.kind) {
    case "circle":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="46" fill={shape.color} {...stroke} />
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="4" y="4" width="92" height="92" rx="10" fill={shape.color} {...stroke} />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path d="M50 6 L95 92 L5 92 Z" fill={shape.color} {...stroke} strokeLinejoin="round" />
        </svg>
      );
    case "pill":
      return (
        <svg viewBox="0 0 200 70" className="h-full w-full" preserveAspectRatio="none">
          <rect x="3" y="3" width="194" height="64" rx="32" fill={shape.color} {...stroke} />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            d="M50 4 L60 38 L96 38 L67 59 L78 94 L50 72 L22 94 L33 59 L4 38 L40 38 Z"
            fill={shape.color}
            {...stroke}
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { motion: allowed, compact } = useStoryMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const width = useTransform(scrollYProgress, [0, 0.7], [62, 125]);
  const flyOut = useTransform(scrollYProgress, (v) => (allowed ? v : 0));

  // Pointer parallax on desktop: shapes drift by depth, throttled to one
  // update per animation frame.
  useEffect(() => {
    const el = ref.current;
    if (!el || !allowed || compact) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", String(((event.clientX - r.left) / r.width) * 2 - 1));
        el.style.setProperty("--my", String(((event.clientY - r.top) / r.height) * 2 - 1));
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
    };
  }, [allowed, compact]);

  const name = personalInfo.name;
  // Every highlight is the same yellow.
  const mark = "255 201 60";

  return (
    <motion.section
      ref={ref}
      aria-labelledby="hero-name"
      className="relative overflow-x-clip border-b-2 border-ink"
      style={{ "--hero-wdth": width, "--hp": flyOut } as unknown as React.CSSProperties}
    >
      {/* Decorative shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {shapes.map((shape, i) => (
          <div
            key={shape.kind}
            className={`hero-shape absolute ${shape.className}`}
            style={
              {
                "--dx": `${shape.dx}px`,
                "--dy": `${shape.dy}px`,
                "--rot": `${shape.rot}deg`,
                "--depth": `${shape.depth}px`,
              } as React.CSSProperties
            }
          >
            <div
              className="hero-shape-inner h-full w-full"
              style={{ "--i": i } as React.CSSProperties}
            >
              <ShapeArt shape={shape} />
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto flex min-h-[78svh] max-w-[72rem] flex-col justify-end px-4 pb-12 pt-44 sm:px-8 md:min-h-[calc(92svh-3.5rem)]">
        <h1
          id="hero-name"
          aria-label={name}
          className="hero-name whitespace-nowrap font-display text-[clamp(3.75rem,12.5vw,11.5rem)] font-black leading-[0.82] tracking-[-0.02em]"
        >
          {name.split("").map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="hero-letter inline-block"
              style={{ "--i": i } as React.CSSProperties}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 border-t-2 border-ink pt-8 md:grid-cols-12">
          <p className="wide text-balance font-display text-step-2 font-bold md:col-span-7 md:text-step-3">
            I build software people{" "}
            <Mark i={0} color={mark}>actually use</Mark>, then
            make it <Mark i={1} color={mark}>fast</Mark>,{" "}
            <Mark i={2} color={mark}>tested</Mark>, and{" "}
            <Mark i={3} color={mark}>reliable</Mark>.
          </p>
          <div className="md:col-span-5">
            <p className="text-pretty text-graphite">{personalInfo.intro}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#chapter-1" className="btn btn-solid">
                Start the story
              </a>
              <a href="#work" className="btn">
                Skip to all work
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Mark({
  children,
  color,
  i,
}: {
  children: React.ReactNode;
  color: string;
  i: number;
}) {
  return (
    <span
      className="marker"
      style={{ "--mark": color, "--i": i } as React.CSSProperties}
    >
      {children}
    </span>
  );
}
