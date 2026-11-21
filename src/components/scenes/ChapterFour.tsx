import { problems } from "@/data/portfolio";
import { seg } from "@/lib/seg";
import Metric from "../Metric";
import MiniStage from "../MiniStage";
import { ProblemLink } from "../ProblemsProvider";
import Scene from "../Scene";

/**
 * Chapter 4: three project cards start stacked and deal out as you
 * scroll. Each has a short animation of what the product does.
 */

function MiniVision() {
  const targets = [
    { x: 22, y: 62, color: "#FFC93C", d: "0.7s" },
    { x: 52, y: 28, color: "#FFC93C", d: "1.4s" },
    { x: 80, y: 58, color: "#FFC93C", d: "2.15s" },
  ];
  return (
    <div
      className="absolute inset-0 bg-night"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
        backgroundSize: "8cqw 8cqw",
      }}
    >
      {targets.map((t) => (
        <div
          key={t.d}
          className="absolute h-[22cqh] w-[16cqw] -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-dashed"
          style={{ left: `${t.x}%`, top: `${t.y}%`, borderColor: t.color }}
        >
          <span
            className="mv-hit absolute -inset-1.5 rounded-lg border-[3px]"
            style={{ borderColor: t.color, "--d": t.d } as React.CSSProperties}
          />
        </div>
      ))}
      <svg viewBox="0 0 24 24" className="mv-cursor absolute left-0 top-0 h-[14cqh] w-[14cqh]">
        <path d="M3 2 L3 20 L8 15 L11.5 22 L14.5 20.5 L11 14 L18 14 Z" fill="#fff" stroke="#0B0B0F" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="mini-chip absolute right-[4cqw] top-[6cqh] border-2 border-night bg-sun px-2 py-0.5 text-[7cqh] font-bold leading-tight text-night">
        50 ms
      </span>
    </div>
  );
}

function MiniRadar() {
  const dots = [
    { x: 30, y: 30, d: "0.35s", c: "#FFC93C" },
    { x: 66, y: 24, d: "0.65s", c: "#FFFFFF" },
    { x: 72, y: 62, d: "0.95s", c: "#FFC93C" },
    { x: 40, y: 70, d: "1.25s", c: "#FFFFFF" },
    { x: 22, y: 52, d: "1.55s", c: "#FFC93C" },
    { x: 56, y: 46, d: "1.85s", c: "#FFFFFF" },
    { x: 48, y: 16, d: "2.1s", c: "#FFC93C" },
  ];
  return (
    <div className="absolute inset-0 grid place-items-center bg-night">
      <div className="relative aspect-square h-[86cqh] overflow-hidden rounded-full border-2 border-sun/60">
        <span className="absolute inset-[18%] rounded-full border border-sun/30" />
        <span className="absolute inset-[36%] rounded-full border border-sun/30" />
        <span
          className="mr-sweep absolute inset-0 rounded-full"
          style={{ background: "conic-gradient(from 0deg, rgba(255,201,60,0.5), transparent 22%)" }}
        />
        {dots.map((dot) => (
          <span
            key={dot.d}
            className="mr-dot absolute h-[7cqh] w-[7cqh] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-night"
            style={{ left: `${dot.x}%`, top: `${dot.y}%`, background: dot.c, "--d": dot.d } as React.CSSProperties}
          />
        ))}
      </div>
      <span className="mini-chip absolute right-[4cqw] top-[6cqh] border-2 border-night bg-sun px-2 py-0.5 text-[7cqh] font-bold leading-tight text-night">
        1,000+ a day
      </span>
    </div>
  );
}

function MiniPhone() {
  const steps = ["0.3s", "0.8s", "1.3s", "1.8s"];
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[8cqw] bg-[#EAF0FF]">
      <div className="flex h-[84cqh] aspect-[9/16] flex-col gap-[4cqh] rounded-[4cqh] border-2 border-night bg-white p-[4cqh]">
        <span className="mx-auto h-[2cqh] w-[30%] rounded-full bg-night/20" />
        {steps.map((d, i) => (
          <div key={d} className="flex items-center gap-[2cqw]">
            <span
              className={`mp-step grid h-[8cqh] w-[8cqh] shrink-0 place-items-center rounded-full border-2 border-night ${
                i === steps.length - 1 ? "bg-sun" : "bg-cobalt"
              }`}
              style={{ "--d": d } as React.CSSProperties}
            />
            <span className="h-[3.5cqh] flex-1 rounded-full bg-night/15" />
          </div>
        ))}
      </div>
      <div className="relative h-[56cqh] w-[56cqh]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(11,11,15,.12)" strokeWidth="12" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1E5BFF" strokeWidth="12" strokeLinecap="round" pathLength={1} className="mp-ring" />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-[11cqh] font-black text-night">
          30 s
        </span>
      </div>
    </div>
  );
}

const cards = [
  { id: "visionloop", Mini: MiniVision, label: "Animation: a cursor finds and clicks three targets on screen in about 50 ms each." },
  { id: "jobradar", Mini: MiniRadar, label: "Animation: a radar sweep picks up job postings." },
  { id: "returnclip", Mini: MiniPhone, label: "Animation: a phone return flow completes four steps in 30 seconds." },
];

export default function ChapterFour() {
  return (
    <Scene
      offset={["start 92%", "center 60%"]}
      className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6"
    >
      {cards.map(({ id, Mini, label }, i) => {
        const problem = problems.find((p) => p.id === id);
        if (!problem) return null;
        return (
          <div
            key={id}
            className={`seg deal ${i === 1 ? "z-10" : ""}`}
            style={seg(0, 1, {
              "--dx-wide": `${(1 - i) * 105}%`,
              "--r0-wide": `${(i - 1) * -10}deg`,
              "--r1-wide": `${(i - 1) * 2}deg`,
            })}
          >
            <ProblemLink
              id={id}
              className="group flex h-full flex-col border-2 border-night bg-white text-night shadow-[8px_8px_0_0_#0B0B0F] transition-transform duration-150 hover:-translate-y-2 hover:rotate-0 active:translate-y-0"
            >
              <MiniStage label={label} className="border-b-2 border-night">
                <Mini />
              </MiniStage>
              <span data-tone="card" className="flex flex-1 flex-col bg-transparent p-5">
                <span className="wide font-display text-step-2 font-black">
                  {problem.name}
                </span>
                <span className="mt-1 text-balance text-base font-bold">
                  {problem.title}
                </span>
                <span className="mt-4 text-base">
                  <Metric {...problem.listResult} />
                </span>
                <span className="mt-auto pt-5 text-base font-bold underline decoration-2 underline-offset-[5px] group-hover:decoration-cobalt">
                  Read the write-up
                </span>
              </span>
            </ProblemLink>
          </div>
        );
      })}
    </Scene>
  );
}
