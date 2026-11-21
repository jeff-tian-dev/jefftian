"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useStoryMotion } from "./useStoryMotion";

/**
 * Plays a short CSS animation (under 3s) once when it scrolls into view,
 * and replays it when the surrounding card is hovered or focused.
 * Without JS or with reduced motion it isn't armed, so it shows the
 * finished frame.
 */
export default function MiniStage({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion: allowed } = useStoryMotion();
  const inView = useInView(ref, { amount: 0.6 });
  const [play, setPlay] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (allowed && inView) setPlay(true);
  }, [allowed, inView]);

  useEffect(() => {
    const card = ref.current?.closest("a");
    if (!card || !allowed) return;
    const replay = () => {
      setPlay(true);
      setRun((r) => r + 1);
    };
    card.addEventListener("mouseenter", replay);
    card.addEventListener("focus", replay);
    return () => {
      card.removeEventListener("mouseenter", replay);
      card.removeEventListener("focus", replay);
    };
  }, [allowed]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      data-armed={allowed ? "" : undefined}
      data-play={play ? "" : undefined}
      className={`mini relative aspect-video overflow-hidden ${className}`}
    >
      {/* Remounting restarts the CSS animations for a replay. */}
      <div key={run} className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
