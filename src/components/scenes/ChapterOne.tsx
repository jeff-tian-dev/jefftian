import { stagger } from "@/lib/seg";
import Scene, { SceneNumber } from "../Scene";
import BinarySearch from "./BinarySearch";

/**
 * Chapter 1: a binary search types itself and then runs, step by step,
 * beside a drawing of the same run (pinned). Then the club fills up.
 */

function Person({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 48" className="h-full w-full">
      <circle cx="20" cy="12" r="10" fill={color} stroke="rgb(var(--ink))" strokeWidth="3" />
      <path
        d="M4 46 C4 32 12 26 20 26 C28 26 36 32 36 46 Z"
        fill={color}
        stroke="rgb(var(--ink))"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const peopleColors = ["#0B0B0F", "#1E5BFF", "#FFC93C", "#FFFFFF", "#1E5BFF"];

export default function ChapterOne() {
  return (
    <>
      {/* Pinned moment 1 of 3. */}
      <Scene pinned className="mt-16">
        <BinarySearch />
      </Scene>

      <Scene
        offset={["start 85%", "end 60%"]}
        className="mt-28 grid gap-10 md:grid-cols-12 md:items-center"
      >
        <div
          aria-hidden="true"
          className="grid grid-cols-5 gap-3 sm:gap-4 md:col-span-7"
        >
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="seg pop-in aspect-[40/48]"
              style={stagger(i, 25, 0.02, 0.8, 0.12)}
            >
              <Person color={peopleColors[i % peopleColors.length]} />
            </div>
          ))}
        </div>
        <div className="md:col-span-5">
          <p className="widest figures font-display text-step-5 font-black">
            <SceneNumber from={0} to={25} start={0.05} end={0.8} plus />
            <span className="sr-only">25+</span>
          </p>
          <p className="mt-2 font-display text-step-1 font-bold">
            members in the CS club I founded
          </p>
          <ul className="mt-4 space-y-1 text-base text-graphite">
            <li>Weekly workshops on Python, algorithms, and web dev</li>
            <li>4 school-wide coding competitions</li>
            <li>10+ beginners mentored into advanced CS courses</li>
          </ul>
        </div>
      </Scene>
    </>
  );
}
