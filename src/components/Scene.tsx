"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useStoryMotion } from "./useStoryMotion";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

const SceneContext = createContext<MotionValue<number> | null>(null);

/**
 * Drives a scroll-linked scene. Sets `--p` (0 to 1) on its element; child
 * `.seg` elements turn that into their own animation in CSS, so one
 * motion value animates hundreds of elements cheaply.
 *
 * Until JS confirms motion is allowed, `--p` is 1: server HTML, no-JS and
 * reduced-motion visitors all see the finished frame.
 */
export default function Scene({
  children,
  className = "",
  pinned = false,
  offset = ["start 85%", "end 55%"],
  label,
}: {
  children: React.ReactNode;
  className?: string;
  /** Pin the scene and play it across a tall scroll stage (used 3 times: chapters 1, 2 and 5). */
  pinned?: boolean;
  offset?: ScrollOffset;
  /** Accessible description of what the visual shows. */
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion: allowed, compact } = useStoryMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: pinned ? ["start start", "end end"] : offset,
  });
  // A light spring keeps it tied to the scrollbar without jitter
  // (ui-ux-pro-max motion preset: scrub ≈ 1).
  const smooth = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 44,
    mass: 0.35,
  });
  const enabled = useMotionValue(0);
  useEffect(() => {
    enabled.set(allowed ? 1 : 0);
  }, [allowed, enabled]);
  const progress = useTransform([smooth, enabled], ([s, e]: number[]) =>
    e ? s : 1
  );
  const style = { "--p": progress } as unknown as React.CSSProperties;
  const describe = label ? { role: "img", "aria-label": label } : {};

  if (pinned) {
    // Phones get a shorter stage: same story, less scrolling.
    const stage = allowed ? (compact ? "h-[170vh]" : "h-[260vh]") : "";
    return (
      <SceneContext.Provider value={progress}>
        <div ref={ref} className={`relative ${stage}`}>
          <motion.div
            style={style}
            className={`${
              allowed
                ? "sticky top-28 flex min-h-[calc(100svh-8rem)] flex-col justify-center"
                : ""
            } ${className}`}
            {...describe}
          >
            {children}
          </motion.div>
        </div>
      </SceneContext.Provider>
    );
  }

  return (
    <SceneContext.Provider value={progress}>
      <motion.div ref={ref} style={style} className={className} {...describe}>
        {children}
      </motion.div>
    </SceneContext.Provider>
  );
}

/** The surrounding Scene's progress (1 outside a Scene or without motion). */
export function useSceneProgress() {
  const fallback = useMotionValue(1);
  return useContext(SceneContext) ?? fallback;
}

/**
 * A number that counts from `from` to `to` while the surrounding Scene's
 * progress moves through [start, end]. Visual only: pair it with text
 * that states the final value for screen readers.
 */
export function SceneNumber({
  from,
  to,
  start = 0,
  end = 1,
  decimals = 0,
  plus = false,
  suffix = "",
}: {
  from: number;
  to: number;
  start?: number;
  end?: number;
  decimals?: number;
  plus?: boolean;
  suffix?: string;
}) {
  const fallback = useMotionValue(1);
  const progress = useContext(SceneContext) ?? fallback;
  const text = useTransform(progress, (v) => {
    const t = Math.min(Math.max((v - start) / (end - start), 0), 1);
    const n = from + (to - from) * t;
    const formatted = n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return formatted + (plus && t >= 1 ? "+" : "") + suffix;
  });
  return <motion.span aria-hidden="true">{text}</motion.span>;
}
