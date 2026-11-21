import { seg, stagger } from "@/lib/seg";
import Scene, { SceneNumber } from "../Scene";

/**
 * Chapter 3: pending submissions flip to their verdicts in a diagonal
 * wave, the way a judge queue clears. Mostly accepted.
 */

const COLS = 12;
const ROWS = 10;

type Verdict = "ac" | "wa" | "tle" | "ce";

const verdicts: Record<Verdict, { label: string; tile: string }> = {
  ac: { label: "AC", tile: "bg-pass" },
  wa: { label: "WA", tile: "bg-fail" },
  tle: { label: "TLE", tile: "bg-tle" },
  ce: { label: "ER", tile: "bg-sun" },
};

// Deterministic scatter (same on server and client): about 82% accepted.
function verdictFor(i: number): Verdict {
  const h = (Math.imul(i + 1, 2654435761) >>> 0) % 100;
  if (h < 82) return "ac";
  if (h < 90) return "wa";
  if (h < 95) return "tle";
  return "ce";
}

const stats = [
  { to: 2000, plus: true, label: "submissions graded", box: "bg-night text-white" },
  { to: 0, plus: false, label: "graded by hand", box: "bg-cobalt text-white" },
  { to: 25, plus: true, label: "original problems written", box: "bg-sun text-night" },
  { to: 120, plus: true, label: "participants across 4 contests", box: "bg-white text-night" },
];

export default function ChapterThree() {
  return (
    <>
      <Scene offset={["start 85%", "end 45%"]} className="mt-16 max-w-[46rem]">
        <p className="sr-only">
          Most of the 2,000+ submissions were accepted. The rest were wrong
          answers, time limit exceeded or compile errors, all graded
          automatically.
        </p>
        <div
          aria-hidden="true"
          className="grid grid-cols-[repeat(10,minmax(0,1fr))] gap-1.5 sm:grid-cols-[repeat(12,minmax(0,1fr))] sm:gap-2"
        >
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const r = Math.floor(i / COLS);
            const c = i % COLS;
            const wave = (r + c) / (ROWS + COLS - 2);
            const v = verdicts[verdictFor(i)];
            return (
              <div
                key={i}
                className="seg flip relative aspect-square"
                style={seg(0.02 + wave * 0.7, 0.12)}
              >
                <span className="face-front absolute inset-0 rounded-md border-2 border-dashed border-ink/50" />
                <span
                  className={`face-back absolute inset-0 grid place-items-center rounded-md border-2 border-night font-mono text-[0.6875rem] font-bold text-night sm:text-sm md:text-base ${v.tile}`}
                >
                  {v.label}
                </span>
              </div>
            );
          })}
        </div>
      </Scene>

      <Scene offset={["start 90%", "end 70%"]} className="mt-14">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`seg pop-in flex flex-col-reverse justify-end border-2 border-ink p-5 shadow-[6px_6px_0_0_rgb(var(--ink))] ${stat.box}`}
              style={stagger(i, stats.length, 0, 0.6, 0.25)}
            >
              <dt className="mt-1 text-base font-medium">{stat.label}</dt>
              <dd className="widest figures font-display text-step-4 font-black">
                {stat.to === 0 ? (
                  "0"
                ) : (
                  <>
                    <SceneNumber from={0} to={stat.to} start={0.1} end={0.85} plus={stat.plus} />
                    <span className="sr-only">
                      {stat.to.toLocaleString("en-US")}
                      {stat.plus ? "+" : ""}
                    </span>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Scene>
    </>
  );
}
