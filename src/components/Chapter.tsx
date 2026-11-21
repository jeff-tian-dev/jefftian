import type { Chapter as ChapterData } from "@/data/portfolio";
import { seg } from "@/lib/seg";
import { ProblemLink } from "./ProblemsProvider";
import Scene from "./Scene";
import SplitHeadline from "./SplitHeadline";
import ChapterOne from "./scenes/ChapterOne";
import ChapterTwo from "./scenes/ChapterTwo";
import ChapterThree from "./scenes/ChapterThree";
import ChapterFour from "./scenes/ChapterFour";
import ChapterFive from "./scenes/ChapterFive";

const scenes: Record<number, () => JSX.Element> = {
  1: ChapterOne,
  2: ChapterTwo,
  3: ChapterThree,
  4: ChapterFour,
  5: ChapterFive,
};

export default function Chapter({ chapter }: { chapter: ChapterData }) {
  const n = chapter.number;
  const Scenes = scenes[n];

  return (
    <section
      id={`chapter-${n}`}
      data-tone={n % 2 === 0 ? "blue" : "tint"}
      aria-labelledby={`chapter-${n}-title`}
      className="relative overflow-x-clip border-b-2 border-ink"
    >
      <div className="mx-auto max-w-[72rem] px-4 pb-24 pt-20 sm:px-8 md:pb-32 md:pt-28">
        {/* Chapter intro: number slides in, headline rises word by word. */}
        <Scene
          offset={["start 90%", "start 30%"]}
          className="grid items-end gap-6 md:grid-cols-12"
        >
          <div className="flex items-end gap-4 md:col-span-3 md:block">
            <p
              aria-hidden="true"
              className="seg slide-in widest figures font-display text-[clamp(6rem,18vw,13rem)] font-black leading-[0.8]"
              style={seg(0, 0.45)}
            >
              {n}
            </p>
            <p
              className="seg rise-in figures mb-2 inline-block border-2 border-ink bg-white px-2 py-0.5 text-base font-bold text-night md:mb-0 md:mt-4"
              style={seg(0.2, 0.3)}
            >
              {chapter.years}
            </p>
          </div>
          <div className="md:col-span-9">
            <SplitHeadline
              id={`chapter-${n}-title`}
              prefix={`Chapter ${n}, ${chapter.years}:`}
              text={chapter.title}
              start={0.1}
              className="wide text-balance font-display text-step-4 font-extrabold sm:text-step-5"
            />
            <p
              className="seg rise-in mt-5 max-w-measure text-pretty text-step-1"
              style={seg(0.35, 0.4)}
            >
              {chapter.lede}
            </p>
          </div>
        </Scene>

        <Scenes />

        {chapter.links.length > 0 && (
          <div className="mt-16 flex flex-wrap gap-4 md:pl-[25%]">
            {chapter.links.map((link) =>
              link.problemId ? (
                <ProblemLink
                  key={link.label}
                  id={link.problemId}
                  className="btn btn-solid"
                >
                  {link.label}
                </ProblemLink>
              ) : (
                <a key={link.label} href={link.href} className="btn">
                  {link.label}
                </a>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
