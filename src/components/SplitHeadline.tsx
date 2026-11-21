import { seg } from "@/lib/seg";

/**
 * Word-by-word reveal for short headlines (under ~8 words, per the
 * ui-ux-pro-max split-text preset). Must sit inside a <Scene>. The words
 * stay real text, so screen readers read the heading normally.
 */
export default function SplitHeadline({
  id,
  text,
  prefix,
  className,
  start = 0.05,
  step = 0.09,
}: {
  id: string;
  text: string;
  /** Screen-reader-only context read before the heading. */
  prefix?: string;
  className?: string;
  start?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <h2 id={id} className={className}>
      {prefix && <span className="sr-only">{prefix} </span>}
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span
              className="seg word-rise inline-block"
              style={seg(start + i * step, 0.3)}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
