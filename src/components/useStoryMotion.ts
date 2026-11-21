"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Which story effects are allowed:
 * - `motion`: scroll-driven scenes and entrances. Off during server render
 *   (so the HTML is the finished, readable frame) and under reduced motion.
 * - `compact`: phones get simplified scenes (shorter pins, fewer
 *   elements), per the ui-ux-pro-max storytelling rule.
 */
export function useStoryMotion() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    setMounted(true);
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return { motion: mounted && !reduce, compact };
}
