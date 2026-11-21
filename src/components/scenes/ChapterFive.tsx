import { seg, stagger } from "@/lib/seg";
import Scene, { SceneNumber } from "../Scene";

/**
 * Chapter 5: the SYNC pipeline draws itself node by node (pinned), then
 * 40 tests turn green.
 */

const nodes = [
  { label: "3 data sources", badge: null, bg: "bg-white" },
  { label: "Pandas pipeline", badge: "4 h → 20 min", bg: "bg-sun" },
  { label: "DistilBERT", badge: "F1 0.71 → 0.89", bg: "bg-sun" },
  { label: "Docker + Flask API", badge: "p95 under 120 ms", bg: "bg-sun" },
  { label: "Dashboard", badge: "2 engineers", bg: "bg-white" },
];

const wide = {
  viewBox: "0 0 1000 440",
  path: "M90 132 C195 132 195 308 300 308 S405 132 500 132 S605 308 700 308 S805 132 910 132",
  points: [
    [9, 30],
    [30, 70],
    [50, 30],
    [70, 70],
    [91, 30],
  ],
};

const tall = {
  viewBox: "0 0 360 640",
  path: "M108 51 C108 118 252 118 252 186 S108 252 108 320 S252 387 252 454 S108 522 108 589",
  points: [
    [30, 8],
    [70, 29],
    [30, 50],
    [70, 71],
    [30, 92],
  ],
};

function Pipeline({ layout, className }: { layout: typeof wide; className: string }) {
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <svg viewBox={layout.viewBox} className="absolute inset-0 h-full w-full" fill="none">
        <path d={layout.path} stroke="rgb(var(--ink) / 0.25)" strokeWidth="3" strokeDasharray="8 10" />
        <path
          d={layout.path}
          stroke="rgb(var(--pop))"
          strokeWidth="8"
          strokeLinecap="round"
          pathLength={1}
          className="seg draw"
          style={seg(0.02, 0.72)}
        />
      </svg>
      {nodes.map((node, i) => {
        const [x, y] = layout.points[i];
        const s = 0.02 + i * 0.165;
        return (
          <div
            key={node.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span
              className={`seg pop-in whitespace-nowrap border-2 border-night px-3 py-2 text-sm font-bold text-night shadow-[4px_4px_0_0_#0B0B0F] md:text-base ${node.bg}`}
              style={seg(s, 0.07)}
            >
              {node.label}
            </span>
            {node.badge && (
              <span
                className="seg rise-in mt-2 whitespace-nowrap bg-night px-2 py-1 text-xs font-bold text-white md:text-sm"
                style={seg(s + 0.05, 0.07)}
              >
                {node.badge}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ChapterFive() {
  return (
    <>
      {/* Pinned moment 3 of 3. */}
      <Scene pinned className="mt-12">
        <p className="mb-6 font-display text-step-1 font-bold">
          From notebook to something other engineers call
        </p>
        <p className="sr-only">
          The pipeline: 3 data sources feed a Pandas pipeline that cut prep
          from 4 hours to 20 minutes, which feeds a fine-tuned DistilBERT model
          that improved F1 from 0.71 to 0.89, served by a Docker and Flask API
          kept under 120 ms p95, used by 2 engineers in a dashboard.
        </p>
        <Pipeline layout={wide} className="hidden aspect-[1000/440] w-full md:block" />
        <Pipeline
          layout={tall}
          className="mx-auto aspect-[360/640] h-[min(calc(100svh-12rem),600px)] md:hidden"
        />
      </Scene>

      <Scene
        offset={["start 85%", "end 60%"]}
        className="mt-20 grid items-center gap-10 md:grid-cols-12"
      >
        <div
          aria-hidden="true"
          className="grid grid-cols-10 gap-1.5 sm:gap-2 md:col-span-7"
        >
          {Array.from({ length: 40 }, (_, i) => (
            <span
              key={i}
              className="seg pop-in grid aspect-square place-items-center rounded-md border-2 border-night bg-pass text-night"
              style={stagger(i, 40, 0.02, 0.75, 0.1)}
            >
              <svg viewBox="0 0 24 24" className="h-3/5 w-3/5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5 10 17 19 7" />
              </svg>
            </span>
          ))}
        </div>
        <div className="md:col-span-5">
          <p className="widest figures font-display text-step-5 font-black">
            <SceneNumber from={0} to={40} start={0.02} end={0.75} plus />
            <span className="sr-only">40+</span>
          </p>
          <p className="mt-2 font-display text-step-1 font-bold">
            tests on every pull request
          </p>
          <p
            className="seg rise-in mt-4 inline-block border-2 border-night bg-white px-3 py-2 text-base font-bold text-night"
            style={seg(0.7, 0.2)}
          >
            If p95 latency passes 120 ms, the build fails.
          </p>
        </div>
      </Scene>
    </>
  );
}
