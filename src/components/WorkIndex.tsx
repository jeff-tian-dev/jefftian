import {
  background,
  indexLinkId,
  problems,
  skillGroups,
} from "@/data/portfolio";
import Metric from "./Metric";
import { ProblemLink } from "./ProblemsProvider";

/** A fast, skimmable index for people who'd rather not read the story. */
export default function WorkIndex() {
  const education = background[0];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-b-2 border-ink"
    >
      <div className="mx-auto max-w-[72rem] px-4 py-20 sm:px-8 md:py-28">
        <h2
          id="work-heading"
          className="wide font-display text-step-4 font-extrabold sm:text-step-5"
        >
          All work
        </h2>
        <p className="mt-3 text-graphite">
          Every project in one place, for when you&apos;d rather skim.
        </p>

        <ol className="mt-10 border-t-2 border-ink">
          {problems.map((p) => (
            <li key={p.id} className="border-b-2 border-ink">
              <ProblemLink
                id={p.id}
                linkId={indexLinkId(p.id)}
                className="group relative grid gap-x-8 gap-y-2 py-5 pl-5 md:grid-cols-[minmax(0,1fr)_13rem_auto] md:items-baseline"
              >
                {/* Blue bar grows on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1.5 origin-bottom scale-y-[0.35] bg-cobalt transition-transform duration-200 ease-out group-hover:scale-y-100 motion-reduce:transition-none"
                />
                <span className="min-w-0">
                  <span
                    className="inline bg-[linear-gradient(#FFC93C,#FFC93C)] bg-no-repeat font-display text-step-1 font-black transition-[background-size] duration-300 ease-out [background-position:0_88%] [background-size:0%_0.4em] group-hover:[background-size:100%_0.4em] group-focus-visible:[background-size:100%_0.4em] motion-reduce:transition-none"
                  >
                    {p.name}
                  </span>
                  <span className="block text-base text-graphite">{p.title}</span>
                </span>
                <span className="text-base">
                  {p.role && <span className="block">{p.role}</span>}
                  <span className="figures block text-graphite">{p.date}</span>
                </span>
                <span className="text-base md:text-right">
                  <Metric {...p.listResult} />
                </span>
              </ProblemLink>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-step-1 font-bold">Education</h3>
            <p className="mt-3 font-bold">{education.title}</p>
            <p className="figures text-base text-graphite">
              {education.place}, {education.date}
            </p>
            <p className="mt-2 max-w-measure text-pretty text-base">
              {education.description}
            </p>
          </div>
          <div>
            <h3 className="font-display text-step-1 font-bold">Tools I use</h3>
            <dl className="mt-3 space-y-3 text-base">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <dt className="font-bold">{group.title}</dt>
                  <dd className="text-graphite">{group.skills.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
