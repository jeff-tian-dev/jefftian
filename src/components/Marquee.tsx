const dots = ["#FFC93C", "#1E5BFF"];

/**
 * A scrolling strip of tools. It pauses on hover and focus, and is a
 * static list under reduced motion.
 */
export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee">
      <div className="overflow-hidden border-y-2 border-ink py-4">
        <ul
          aria-label="Tools I use"
          className="marquee-track flex w-max gap-3 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:[&>[aria-hidden=true]]:hidden"
        >
          {doubled.map((item, i) => (
            <li
              key={`${item}-${i}`}
              aria-hidden={i >= items.length ? true : undefined}
              className="flex shrink-0 items-center gap-2 border-2 border-ink px-3 py-1.5 text-base font-bold"
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: dots[i % dots.length] }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
