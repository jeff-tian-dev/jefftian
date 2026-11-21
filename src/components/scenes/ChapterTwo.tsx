import { seg } from "@/lib/seg";
import Scene, { SceneNumber } from "../Scene";

/**
 * Chapter 2: one dot becomes 200 (pinned), a chat where the bot catches
 * scams, and a gauge needle swinging from 900 ms to 180 ms.
 */

const DOTS = 200;

const chat: { text: string; scam?: boolean; mine?: boolean }[] = [
  { text: "gg everyone, nice war" },
  { text: "who's free for clan games tonight?", mine: true },
  { text: "FREE GEMS!! claim at fr33-gems.example", scam: true },
  { text: "war starts in 2 hours" },
  { text: "you won a prize: prize-claim.example", scam: true },
  { text: "the bot caught another one", mine: true },
];

export default function ChapterTwo() {
  return (
    <>
      {/* Pinned moment 2 of 3. */}
      <Scene pinned className="mt-16">
        <div className="grid items-center gap-8 md:grid-cols-12">
          {/* The number is sized to its column (container units), so
              "2,000+" can never spill into the dots. */}
          <div className="min-w-0 [container-type:inline-size] md:col-span-5">
            <p className="sr-only">July grew from 6 to 2,000+ members across 20 clans.</p>
            <p
              aria-hidden="true"
              className="widest figures whitespace-nowrap font-display text-[min(20cqi,7.5rem)] font-black leading-none"
            >
              <SceneNumber from={6} to={2000} start={0.05} end={0.82} plus />
            </p>
            <p aria-hidden="true" className="mt-3 font-display text-step-2 font-bold">
              members across 20 clans
            </p>
          </div>
          <div
            aria-hidden="true"
            className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px] sm:gap-1.5 md:col-span-7"
          >
            {Array.from({ length: DOTS }, (_, i) => (
              <span
                key={i}
                className={`seg pop-in aspect-square rounded-full ${
                  i === 0
                    ? "bg-sun ring-2 ring-night"
                    : i % 5 === 0
                      ? "bg-sun"
                      : "bg-white"
                }`}
                style={
                  i === 0
                    ? seg(-1, 1)
                    : seg(0.05 + ((i - 1) / (DOTS - 1)) * 0.72, 0.05)
                }
              />
            ))}
          </div>
        </div>
      </Scene>

      {/* The moderation bot at work. */}
      <Scene
        offset={["start 85%", "end 50%"]}
        className="mt-24 grid items-center gap-10 md:grid-cols-12"
      >
        <div aria-hidden="true" className="flex flex-col gap-3 md:col-span-7">
          {chat.map((msg, i) => {
            const s = 0.03 + i * 0.1;
            return (
              <div
                key={msg.text}
                className={`seg rise-in relative max-w-[88%] ${
                  msg.mine ? "self-end" : "self-start"
                }`}
                style={seg(s, 0.1)}
              >
                <div
                  className={`relative rounded-2xl border-2 border-night px-4 py-2.5 text-base font-medium text-night ${
                    msg.mine ? "rounded-br-sm bg-sun" : "rounded-bl-sm bg-white"
                  }`}
                >
                  {msg.text}
                  {msg.scam && (
                    <span
                      className="seg strike absolute inset-x-3 top-1/2 h-[3px] bg-fail"
                      style={seg(s + 0.07, 0.06)}
                    />
                  )}
                </div>
                {msg.scam && (
                  <span
                    className="seg pop-in absolute -right-3 -top-3 inline-flex items-center gap-1 border-2 border-night bg-night px-2 py-0.5 text-sm font-bold text-white"
                    style={seg(s + 0.1, 0.06)}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#EF4444">
                      <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
                    </svg>
                    Flagged
                  </span>
                )}
              </div>
            );
          })}
          <p className="mt-1 text-sm text-graphite">Illustration</p>
        </div>
        <div className="md:col-span-5">
          <p className="widest figures font-display text-step-5 font-black">
            <SceneNumber from={0} to={10} start={0.1} end={0.6} suffix="K+" />
            <span className="sr-only">10K+</span>
          </p>
          <p className="mt-2 font-display text-step-1 font-bold">
            messages a day, checked by the bot I built
          </p>
          <p className="mt-3 max-w-measure text-base text-graphite">
            It flags scam links before anyone clicks, with under 2% false
            alarms. A bot that cries wolf gets muted fast.
          </p>
        </div>
      </Scene>

      {/* ClashTracker: the needle swings from slow to fast. */}
      <Scene
        offset={["start 80%", "end 55%"]}
        className="mt-24 grid items-center gap-10 md:grid-cols-12"
      >
        <div className="md:col-span-5">
          <svg aria-hidden="true" viewBox="0 0 300 180" className="w-full max-w-sm">
            <path
              d="M30 150 A120 120 0 0 1 270 150"
              fill="none"
              stroke="rgb(var(--ink) / 0.15)"
              strokeWidth="24"
            />
            <path
              d="M30 150 A120 120 0 0 1 270 150"
              fill="none"
              stroke="rgb(var(--ink))"
              strokeWidth="24"
              pathLength={1}
              className="seg draw"
              style={seg(0, 0.25)}
            />
            {/* Good zone: under 300 ms. */}
            <path
              d="M30 150 A120 120 0 0 1 79.5 52.9"
              fill="none"
              stroke="rgb(var(--pop))"
              strokeWidth="24"
            />
            {/* Where it started: 900 ms. */}
            <line
              x1="150"
              y1="150"
              x2="150"
              y2="48"
              stroke="rgb(var(--ink))"
              strokeWidth="4"
              strokeDasharray="6 6"
              opacity="0.45"
              style={{ transformOrigin: "150px 150px", rotate: "72deg" }}
            />
            <g className="seg gauge-needle" style={seg(0.2, 0.5)}>
              <line x1="150" y1="150" x2="150" y2="44" stroke="rgb(var(--ink))" strokeWidth="8" strokeLinecap="round" />
            </g>
            <circle cx="150" cy="150" r="14" fill="#FFC93C" stroke="#0B0B0F" strokeWidth="4" />
            <text x="30" y="176" fontSize="13" fontWeight="700" textAnchor="middle" fill="rgb(var(--ink))">0</text>
            <text x="270" y="176" fontSize="13" fontWeight="700" textAnchor="middle" fill="rgb(var(--ink))">1000 ms</text>
          </svg>
        </div>
        <div className="md:col-span-7">
          <p className="text-base font-bold">ClashTracker, p95 API latency</p>
          <p className="sr-only">It went from 900 ms to 180 ms.</p>
          <p className="widest figures font-display text-[clamp(3.5rem,10vw,7rem)] font-black leading-none">
            <SceneNumber from={900} to={180} start={0.2} end={0.7} suffix=" ms" />
          </p>
          <p className="mt-3 max-w-measure text-step-1">
            Clan leaders were drowning in stats, so I built them a dashboard.
            Then I made it fast with composite indexes and caching.
          </p>
          <p className="mt-2 text-base text-graphite">
            500+ players across 20 teams use it. Clan leads get 3–5 hours of
            their week back.
          </p>
        </div>
      </Scene>
    </>
  );
}
