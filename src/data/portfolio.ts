/**
 * All site content lives here. Each piece of work is framed as a "problem":
 * why it needed solving, what I built, and what changed as a result.
 */

/** A before/after measurement. `before` is shown struck through. */
export interface Measure {
  before?: string;
  after: string;
}

export interface ResultRow extends Measure {
  label: string;
}

export interface ListResult extends Measure {
  prefix?: string;
  suffix?: string;
}

export interface Problem {
  id: string;
  /** Phrased as the problem that needed solving. */
  title: string;
  /** Product or organization name. */
  name: string;
  /** Used where space is tight, like the previous/next buttons. */
  shortName?: string;
  role?: string;
  date: string;
  statement: string;
  approach: string[];
  results: ResultRow[];
  /** The single measure shown in the problem list. */
  listResult: ListResult;
  stack: string[];
  github?: string;
  live?: string;
}

export interface BackgroundItem {
  title: string;
  place: string;
  date: string;
  description: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export const personalInfo = {
  name: "Jeff Tian",
  tagline:
    "I build software people actually use, then make it fast, tested, and boring to run.",
  intro:
    "Most recently a machine learning engineer intern at SYNC. I study computer science at the University of Toronto Mississauga and graduate in 2028.",
  about: [
    "Competitive programming taught me to care about correctness and speed. I placed in the top 100 in Canada at the Canadian Computing Competition, and these days I write the contest problems instead. Shipping real software taught me to care about the people on the other end.",
    "Most of the work above started as a problem I kept running into myself: clan leaders buried in stats, career pages I had to refresh by hand, clicks I was tired of repeating. Each one turned into software other people now use.",
  ],
  email: "jeff.tian23jobs@gmail.com",
  phone: "+1-672-513-5392",
  github: "https://github.com/jeff-tian-dev",
  linkedin: "https://linkedin.com/in/jeff-tian",
  location: "Toronto, ON",
  resume: "/Jeff_Tian_Resume_SWE.pdf",
};

export const problems: Problem[] = [
  {
    id: "sync",
    title: "Turn a classifier into something engineers can build on",
    name: "SYNC",
    role: "Machine Learning Engineer Intern",
    date: "May – Aug 2026",
    statement:
      "The goal was a text classifier other engineers could depend on, not just a promising notebook. The model was the headline, but most of the real engineering happened around it.",
    approach: [
      "I fine-tuned a DistilBERT classifier on a 50K-row dataset and pushed F1 from 0.71 to 0.89. Before any of that could matter, the data had to be ready, so I replaced a 4-hour manual prep routine with a Python and Pandas pipeline that merges 3 sources in 20 minutes.",
      "Then I made it usable. The model runs in Docker behind a Flask API, which let 2 engineers wire predictions straight into a downstream dashboard. More than 40 pytest unit and integration tests run in GitHub Actions on every pull request, and the build fails if p95 inference latency goes past 120 ms. A model nobody can safely call is just a demo.",
    ],
    results: [
      { label: "F1 score", before: "0.71", after: "0.89" },
      { label: "Data prep per run", before: "4 hours", after: "20 minutes" },
      { label: "Engineers integrating the API", after: "2" },
      { label: "Tests on every pull request", after: "40+" },
      { label: "p95 inference latency budget", after: "120 ms" },
    ],
    listResult: { prefix: "F1", before: "0.71", after: "0.89" },
    stack: ["PyTorch", "DistilBERT", "Pandas", "Docker", "Flask", "pytest", "GitHub Actions"],
  },
  {
    id: "clashtracker",
    title: "Give clan leaders their hours back",
    name: "ClashTracker",
    date: "Jul 2025 – Apr 2026",
    statement:
      "Clan leaders in my community were spending hours every week clicking through war results, Legends League standings, and Capital Raid stats one clan at a time. I wanted all of it in one place, searchable, with history.",
    approach: [
      "So I built the whole stack. A Python ingestion service runs on systemd timers 144 times a day, making about 250 Supercell API calls per cycle and landing everything in PostgreSQL. A FastAPI backend with nine domain routers serves that data to a React 19 and TypeScript app that 500+ users across 20 teams rely on, backed by 100K+ rows of history.",
      "Then came my favourite part: making it fast. Composite PostgreSQL indexes and response caching took p95 API latency from 900 ms down to 180 ms and cut average dashboard load time by 80%. JWT auth with role-based access keeps the admin tools in the right hands, and a GitHub Actions pipeline with 85% test coverage means shipping a new feature doesn't involve crossing my fingers. It all runs on an Oracle Cloud VM behind Caddy with TLS.",
    ],
    results: [
      { label: "p95 API latency", before: "900 ms", after: "180 ms" },
      { label: "Average dashboard load time", after: "80% faster" },
      { label: "Users", after: "500+ across 20 teams" },
      { label: "Time saved for clan leads", after: "3–5 hours a week" },
      { label: "Automated ingestion runs", after: "144 a day" },
      { label: "Test coverage", after: "85%" },
    ],
    listResult: { prefix: "p95", before: "900", after: "180 ms" },
    stack: ["FastAPI", "React 19", "TypeScript", "PostgreSQL", "Supabase", "JWT", "GitHub Actions", "systemd", "Caddy", "Oracle Cloud"],
    github: "https://github.com/jeff-tian-dev/ClashTracker",
  },
  {
    id: "visionloop",
    title: "Turn repetitive clicks into a product people pay for",
    name: "VisionLoop",
    date: "Dec 2025 – present",
    statement:
      "Some desktop workflows are just the same clicks on the same screens, hundreds of times over. VisionLoop watches the screen and does them for you. It's also the project that taught me what it takes to turn a script into something people will pay for.",
    approach: [
      "OpenCV template matching figures out what's on screen, and a Win32 layer acts on it: it finds the target window, captures frames with PrintWindow, and sends input through SendMessage with Bézier-curve mouse paths, all without taking over your real cursor. The whole see, decide, act loop runs in about 50 ms, which is the gap between feeling instant and feeling laggy.",
      "The product side was its own engineering problem. I designed a license-key system on FastAPI and Supabase with hardware-fingerprint binding, plus Stripe checkout and webhooks, then packaged everything as a standalone Windows app with PyInstaller.",
    ],
    results: [
      { label: "Detection to action", after: "about 50 ms" },
      { label: "Paying users", after: "20+" },
      { label: "Monthly recurring revenue", after: "$250+" },
    ],
    listResult: { after: "20+", suffix: "paying users" },
    stack: ["Python", "OpenCV", "Win32 API", "FastAPI", "Supabase", "Stripe", "PyInstaller"],
    github: "https://github.com/jeff-tian-dev/VisionLoop",
  },
  {
    id: "jobradar",
    title: "Read 1,000 job postings a day without an API bill",
    name: "JobRadar",
    date: "Mar 2026 – present",
    statement:
      "Job hunting as a student means checking dozens of career pages over and over, and still missing the posting that went up yesterday. I'd rather write software that does the checking for me, without paying a cloud LLM bill every time it reads a posting.",
    approach: [
      "A FastAPI service runs async scraping workers that pull 1,000+ postings a day into SQLite, deduplicated by content hash so a role cross-posted five times only shows up once. A PyTorch classifier I fine-tuned on 1,200 hand-labeled postings scores each role for relevance. Then a RAG pipeline built on Ollama embeddings pulls the most relevant parts of my experience to draft a resume tailored to that job.",
      "Because everything runs locally, reading another thousand postings costs nothing. A React dashboard handles triage, re-scoring, and export, and 30+ pytest tests, with HTTP and LLM calls mocked, cover the pipeline end to end, so adding a new source doesn't quietly break the old ones.",
    ],
    results: [
      { label: "Relevance F1 (keyword baseline → classifier)", before: "0.71", after: "0.92" },
      { label: "Postings ingested", after: "1,000+ a day" },
      { label: "Recurring LLM API cost", after: "$0" },
      { label: "End-to-end tests", after: "30+" },
    ],
    listResult: { prefix: "F1", before: "0.71", after: "0.92" },
    stack: ["Python", "FastAPI", "PyTorch", "Ollama", "SQLite", "React", "TypeScript", "pytest"],
    github: "https://github.com/jeff-tian-dev/JobRadar",
  },
  {
    id: "cssc",
    title: "Grade 2,000 submissions without touching one",
    name: "Computer Science Student Community",
    shortName: "CSSC",
    role: "Contest Director and Technical Lead",
    date: "Oct 2025 – present",
    statement:
      "A good contest problem is its own puzzle: it has to be fair, interesting, and impossible to brute-force your way through. And once 120 people start submitting, every one of those submissions has to be judged.",
    approach: [
      "I've run 4 contests for 120+ participants and written 25+ original problems, each with an editorial, test data, and model solutions across difficulty tiers.",
      "With 2 other engineers I built the automated judge behind them: Docker sandboxes so untrusted code can't touch anything, a live scoreboard for the adrenaline, and a stats dashboard for us.",
    ],
    results: [
      { label: "Submissions graded", after: "2,000+" },
      { label: "Manual interventions", after: "0" },
      { label: "Contests run", after: "4" },
      { label: "Original problems written", after: "25+" },
      { label: "Participants", after: "120+" },
    ],
    listResult: { after: "2,000+", suffix: "graded, none by hand" },
    stack: ["Docker", "Python", "C++", "Linux"],
  },
  {
    id: "july",
    title: "Keep scammers out of a 2,000-member community",
    name: "July",
    role: "Co-Founder and Software Engineer",
    date: "Apr 2025 – present",
    statement:
      "July started with 6 people and grew into a competitive gaming community of 2,000+ members across 20 clans. Communities that size attract scammers, and nobody can read 10,000 messages a day by hand.",
    approach: [
      "I built a Discord moderation bot that checks every posted link against a scam-domain list and a set of heuristics, flagging 50+ suspicious messages a month for staff.",
      "It runs in Docker on a Linux VPS with structured logging and health checks. Keeping false positives low mattered as much as catching scams, because a bot that cries wolf gets muted fast. This community is also the reason ClashTracker exists.",
    ],
    results: [
      { label: "Members", before: "6", after: "2,000+" },
      { label: "Messages checked", after: "10K+ a day" },
      { label: "Uptime", after: "99%+" },
      { label: "False-positive rate", after: "under 2%" },
      { label: "Scam links flagged", after: "50+ a month" },
    ],
    listResult: { before: "6", after: "2,000+", suffix: "members" },
    stack: ["Python", "Discord API", "Docker", "Linux"],
  },
  {
    id: "returnclip",
    title: "Make online returns take 30 seconds",
    name: "ReturnClip",
    role: "Hack Canada 2026",
    date: "Mar 2026",
    statement:
      "Nobody enjoys returning something online: find the order, fill out a form, email support, wait. At Hack Canada 2026, in the Reactiv ClipKit Lab track, I set out to compress that into a mobile flow that takes about 30 seconds. You scan the order, pick a reason, snap a photo, get an AI condition summary, and you're done.",
    approach: [
      "That meant building on every surface at once. The SwiftUI iOS app deep-links straight to an order and calls Cloudinary for uploads and Gemini for the condition assessment, with a mock path for when the API gets rate-limited, which it did mid-testing. Next.js 15 handlers cover evidence, assessment, decisions, and execution, all validated with Zod, and plug into the Shopify Admin API for real order lookups and refunds. Merchants get a React dashboard to triage cases and review photos.",
      "The detail that matters most is the data model. In the Postgres schema, every refund execution carries an idempotency key, so a nervous double-tap or a flaky retry turns into one refund instead of three. The demo itself ran on an in-memory store, and the schema is the production target.",
    ],
    results: [
      { label: "Time to return an item", before: "15–30 min", after: "about 30 s" },
      { label: "Merchant triage pace", after: "15–25 cases an hour" },
      { label: "Refunds from duplicate requests", before: "3–5", after: "1" },
    ],
    listResult: { before: "15–30 min", after: "30 s" },
    stack: ["Swift", "SwiftUI", "Next.js 15", "React 19", "TypeScript", "Zod", "PostgreSQL", "Gemini", "Cloudinary", "Shopify"],
    github: "https://github.com/jeff-tian-dev/reactivapp-clipkit-lab",
  },
];

export const background: BackgroundItem[] = [
  {
    title: "B.Sc. Computer Science",
    place: "University of Toronto Mississauga",
    date: "2024–2028",
    description:
      "Data structures and algorithms, discrete math, linear algebra, statistics, and multivariable calculus. It shows up every time I tune a model, read a loss curve, or work out why a query is slow.",
  },
  {
    title: "Senior Honour Roll, top 100 in Canada",
    place: "Canadian Computing Competition",
    date: "2022",
    description:
      "A timed contest heavy on data structures and graph theory, written in C++. It left me with a habit I still lean on: think about the complexity before reaching for a bigger server.",
  },
  {
    title: "Founder and President, Computer Science Club",
    place: "High school",
    date: "2021–2024",
    description:
      "I grew the club to 25+ active members over 3 years, taught weekly workshops on Python, algorithms, and web development, organized 4 school-wide coding competitions, and mentored 10+ beginners into advanced CS courses. It was the first version of what I do at CSSC now, just with fewer Docker containers.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "C++", "C", "Bash"],
  },
  {
    title: "Frameworks and libraries",
    skills: ["PyTorch", "React", "Next.js", "FastAPI", "Flask", "Node.js", "Tailwind", "Pandas", "NumPy", "OpenCV", "Radix UI"],
  },
  {
    title: "Tools",
    skills: ["PostgreSQL", "SQLite", "Supabase", "Docker", "Linux", "Git", "GitHub Actions", "pytest", "REST", "Stripe", "Gemini API"],
  },
];

/* ------------------------------------------------------------------ */
/* Story chapters                                                      */
/* ------------------------------------------------------------------ */

export interface ChapterLink {
  label: string;
  /** Opens this problem's write-up panel. */
  problemId?: string;
  /** Or jumps somewhere on the page. */
  href?: string;
}

export interface Chapter {
  number: number;
  years: string;
  title: string;
  /** One or two sentences: the scenes tell the rest. */
  lede: string;
  links: ChapterLink[];
}

export const chapters: Chapter[] = [
  {
    number: 1,
    years: "2021–2022",
    title: "Learning to be fast",
    lede: "In high school I started a computer science club and got hooked on making code fast.",
    links: [{ label: "See the contests I run now", href: "#chapter-3" }],
  },
  {
    number: 2,
    years: "2025",
    title: "Building for my own community",
    lede: "July started with 6 people. Then it grew, and it needed software.",
    links: [
      { label: "Read the ClashTracker write-up", problemId: "clashtracker" },
      { label: "Read about the moderation bot", problemId: "july" },
    ],
  },
  {
    number: 3,
    years: "2025–now",
    title: "Running the judge",
    lede: "At UofT's Computer Science Student Community I write the contest problems, and I helped build the judge that grades them.",
    links: [{ label: "Read the CSSC write-up", problemId: "cssc" }],
  },
  {
    number: 4,
    years: "2025–2026",
    title: "Shipping things people pay for",
    lede: "Some problems were mine alone, so I built the tools and shipped them to other people.",
    links: [],
  },
  {
    number: 5,
    years: "2026",
    title: "Making ML dependable",
    lede: "At SYNC I took a text classifier from a promising notebook to something other engineers could build on.",
    links: [{ label: "Read the SYNC write-up", problemId: "sync" }],
  },
];


export const navLinks = [
  { name: "Story", href: "#chapter-1" },
  { name: "All work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

/** Index rows use this id so deep-linked panels can return focus there. */
export const indexLinkId = (id: string) => `work-link-${id}`;

/** Contest-style problem letter: 0 → "A". */
export const letterFor = (index: number) => String.fromCharCode(65 + index);
