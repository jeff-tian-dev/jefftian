import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Semantic tokens. Each section's data-tone (white, blue, finale, card) swaps the values, so a
      // component styled with these adapts to whichever chapter it sits in.
      colors: {
        paper: token("paper"),
        ink: token("ink"),
        graphite: token("graphite"),
        rule: token("rule"),
        accent: token("accent"),
        accepted: token("accepted"),
        wrong: token("wrong"),
        pop: token("pop"),
        pop2: token("pop2"),
        // The fixed palette: blue is the main colour, yellow the highlight.
        sun: "#FFC93C",
        cobalt: "#1E5BFF",
        night: "#0B0B0F",
        // Status colours, only where they carry meaning (judge verdicts,
        // tests). Compile errors reuse sun.
        pass: "#22C55E",
        fail: "#EF4444",
        tle: "#A1A1AA",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      // Modular scale, ratio 1.25, from an 18px body.
      fontSize: {
        "step-0": ["1.125rem", { lineHeight: "1.6" }],
        "step-1": ["1.40625rem", { lineHeight: "1.3" }],
        "step-2": ["1.758rem", { lineHeight: "1.2" }],
        "step-3": ["2.197rem", { lineHeight: "1.1" }],
        "step-4": ["2.747rem", { lineHeight: "1.05" }],
        "step-5": ["3.433rem", { lineHeight: "1" }],
      },
      maxWidth: {
        measure: "62ch",
      },
    },
  },
  plugins: [],
};

export default config;
