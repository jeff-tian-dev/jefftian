import type { ListResult } from "@/data/portfolio";

/**
 * A before/after value. The old value is struck through in red and the new
 * one is bold green, so the change reads without relying on colour alone.
 * Screen readers hear "from 900 to 180 ms".
 */
export default function Metric({ prefix, before, after, suffix }: ListResult) {
  return (
    <span className="font-body">
      {prefix && <span className="text-graphite">{prefix} </span>}
      {before && (
        <>
          <del className="figures font-display text-[1.0625em] text-wrong decoration-[1.5px]">
            <span className="sr-only">from </span>
            {before}
          </del>
          <span aria-hidden="true" className="mx-1.5 text-graphite">
            →
          </span>
          <span className="sr-only"> to </span>
        </>
      )}
      <ins className="figures font-display text-[1.0625em] font-bold text-accepted no-underline">
        {after}
      </ins>
      {suffix && <span className="text-graphite"> {suffix}</span>}
    </span>
  );
}
