import type { CSSProperties } from "react";

/**
 * Inline style for a `.seg` element inside a Scene: it animates while the
 * scene's progress runs from `start` to `start + length` (both 0 to 1).
 */
export function seg(
  start: number,
  length: number,
  extra: Record<string, string | number> = {}
): CSSProperties {
  return { "--s": start, "--l": length, ...extra } as CSSProperties;
}

/** Spread `count` items across a progress window, in order. */
export function stagger(
  index: number,
  count: number,
  from: number,
  to: number,
  length: number
) {
  const span = Math.max(to - from - length, 0);
  return seg(from + (count > 1 ? (index / (count - 1)) * span : 0), length);
}
