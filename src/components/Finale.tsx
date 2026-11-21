"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy, FiMail } from "react-icons/fi";
import { personalInfo, skillGroups } from "@/data/portfolio";
import { seg } from "@/lib/seg";
import Marquee from "./Marquee";
import Scene from "./Scene";

type CopyState = "idle" | "copied" | "failed";

const words = ["Let's", "work", "together."];
const shapeColors = ["#FFC93C", "#1E5BFF", "#FFFFFF", "#FFC93C", "#1E5BFF"];

/** The climax: black, with the yellow and blue from the story. */
export default function Finale() {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopyState("copied");
      resetTimer.current = setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("failed");
    }
  };

  const tools = skillGroups.flatMap((g) => g.skills);

  return (
    <section
      id="contact"
      data-tone="finale"
      aria-labelledby="contact-heading"
      className="relative overflow-x-clip border-b-2 border-ink"
    >
      <div className="mx-auto max-w-[72rem] px-4 py-24 sm:px-8 md:py-32">
        <Scene offset={["start 85%", "start 25%"]}>
          <div aria-hidden="true" className="mb-8 flex gap-3">
            {shapeColors.map((color, i) => (
              <span
                key={i}
                className={`seg pop-in h-8 w-8 border-2 border-white sm:h-10 sm:w-10 ${
                  i % 2 === 0 ? "rounded-full" : "rotate-12"
                }`}
                style={{ ...seg(i * 0.08, 0.25), background: color }}
              />
            ))}
          </div>
          <h2 id="contact-heading">
            <span className="widest block text-balance font-display text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.92]">
              {words.map((word, i) => (
                <span key={word}>
                  <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <span
                      className="seg word-rise inline-block text-sun"
                      style={seg(0.15 + i * 0.12, 0.35)}
                    >
                      {word}
                    </span>
                  </span>
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </h2>
          <p className="seg rise-in mt-8 max-w-measure text-pretty text-step-1" style={seg(0.5, 0.4)}>
            I&apos;m looking for software and ML engineering internships where I
            can ship things real people use. If your team has a problem worth
            solving, I&apos;d like to hear about it.
          </p>
        </Scene>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={`mailto:${personalInfo.email}`}
            className="btn border-sun bg-sun text-night shadow-[4px_4px_0_0_#1E5BFF] hover:shadow-[6px_6px_0_0_#1E5BFF]"
          >
            <FiMail aria-hidden="true" />
            Email me
          </a>
          <button type="button" onClick={copyEmail} className="btn">
            {copyState === "copied" ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
            {copyState === "copied" ? "Copied" : "Copy email"}
          </button>
        </div>

        <p aria-live="polite" className="mt-3 min-h-[1.6em] text-base">
          {copyState === "copied" && <span className="sr-only">Email address copied.</span>}
          {copyState === "failed" && (
            <span>
              Couldn&apos;t copy automatically. The address is{" "}
              <span className="select-all font-bold">{personalInfo.email}</span>.
            </span>
          )}
        </p>

        <p className="mt-2 text-base">
          Or find me on{" "}
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="link">
            GitHub
          </a>{" "}
          and{" "}
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="link">
            LinkedIn
          </a>
          .
        </p>

        <div className="mt-16">
          <Marquee items={tools} />
        </div>
      </div>
    </section>
  );
}
