import { IconType } from "react-icons";
import {
  FaPython,
  FaJava,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDatabase,
  FaNetworkWired,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiC,
  SiFastapi,
  SiPandas,
  SiNumpy,
  SiDocker,
  SiPostgresql,
  SiGithubactions,
  SiPytorch,
  SiNextdotjs,
  SiTailwindcss,
  SiOpencv,
  SiRadixui,
  SiSqlite,
  SiSupabase,
  SiTestinglibrary,
  SiGooglegemini,
} from "react-icons/si";

export interface Skill {
  name: string;
  icon: IconType;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  gradient: string;
  iconBg: string;
  date: string;
  github?: string;
  live?: string;
}

export interface TimelineItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  badge?: string;
}

export const personalInfo = {
  name: "Jeff Tian",
  tagline:
    "Building intelligent systems at the intersection of AI & software engineering.",
  roles: [
    "ML Engineer Intern @ SYNC",
    "Contest Director @ CSSC",
    "Full-Stack Developer",
    "CS Student @ UofT",
  ],
  bio: `I'm a Computer Science student at the University of Toronto who builds production ML pipelines, full-stack platforms, and developer tooling. At SYNC I fine-tuned DistilBERT classifiers on 50K-row datasets and deployed models behind Dockerized Flask APIs. As Contest Director and Technical Lead at the Computer Science Student Community (CSSC), I run programming competitions for 120+ participants and built an automated judging pipeline that graded 2,000+ submissions. I also ship ClashTracker (analytics for 500+ users across 20 teams), JobRadar (local LLM job search with RAG and fine-tuned scoring), and VisionLoop (CV desktop automation with 20+ paying customers). Ranked Top 100 nationally in the Canadian Computing Competition.`,
  email: "jeff.tian23@gmail.com",
  phone: "+1-672-513-5392",
  github: "https://github.com/jeff-tian-dev",
  linkedin: "https://linkedin.com/in/jeff-tian",
  location: "Toronto, ON",
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: FaPython },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "SQL", icon: FaDatabase },
      { name: "Java", icon: FaJava },
      { name: "C++", icon: SiCplusplus },
      { name: "C", icon: SiC },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "PyTorch", icon: SiPytorch },
      { name: "React", icon: FaReact },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
      { name: "OpenCV", icon: SiOpencv },
      { name: "Radix UI", icon: SiRadixui },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "SQLite", icon: SiSqlite },
      { name: "Supabase", icon: SiSupabase },
      { name: "Docker", icon: SiDocker },
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "pytest", icon: SiTestinglibrary },
      { name: "REST", icon: FaNetworkWired },
      { name: "Gemini API", icon: SiGooglegemini },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "clashtracker",
    title: "ClashTracker",
    subtitle: "FastAPI & React Analytics Dashboard",
    description:
      "Full-stack analytics platform for clan leadership—9-router FastAPI backend, React 19 SPA, and scheduled Supercell API ingestion into PostgreSQL at 144 runs/day.",
    longDescription: `ClashTracker consolidates war results, Legends League standings, and Capital Raid performance into a single searchable dashboard. A Python ingestion service pulls from the Supercell API on a systemd timer (~144 runs/day, ~250 API calls per cycle), eliminating 3–5 hours of manual reporting per week for clan leads. The FastAPI backend exposes nine domain routers with Pydantic validation and structured logging; the React 19 SPA serves 500+ users across 20 teams with 100k+ rows of historical data in PostgreSQL via Supabase. Query optimizations cut average dashboard load time by 80%. Deployed on an Oracle Cloud VM with Caddy reverse proxy, TLS, and GitHub Actions CI/CD shipping the SPA to GitHub Pages on every push.`,
    techStack: [
      "FastAPI",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "GitHub Actions",
      "Caddy",
      "Oracle Cloud",
    ],
    features: [
      "500+ users across 20 teams; 100k+ rows of historical PostgreSQL data",
      "Nine FastAPI routers with scheduled ingestion at ~144 runs/day (~250 API calls/cycle)",
      "Saves clan leads 3–5 hours weekly; 80% faster average dashboard load time",
      "Oracle Cloud VM deployment with Caddy reverse proxy, TLS, and systemd timers",
      "GitHub Actions CI/CD pipeline shipping the SPA to GitHub Pages on every push",
    ],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    iconBg: "bg-orange-500/20",
    date: "Jul 2025 – Apr 2026",
    github: "https://github.com/jeff-tian-dev/ClashTracker",
  },
  {
    id: "jobradar",
    title: "JobRadar",
    subtitle: "Local LLM Job Search Automation Tool",
    description:
      "End-to-end job-search agent with a RAG pipeline for job-tailored resume generation, a fine-tuned PyTorch classifier for relevance scoring, and a React dashboard for triage and export—all at zero recurring LLM API cost.",
    longDescription: `JobRadar automates job search without recurring paid LLM APIs. A RAG pipeline uses Ollama embeddings to retrieve relevant experience chunks from a personal dossier, generating job-tailored resumes via local LLM. A fine-tuned PyTorch transformer classifier on 1,200 hand-labeled postings improved F1 from 0.71 to 0.92 over a keyword baseline. The FastAPI + React dashboard supports reviewing listings, re-scoring roles, and exporting tailored resumes. pytest covers the pipeline with HTTP and LLM calls mocked.`,
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "SQLite",
      "Ollama",
      "PyTorch",
      "pytest",
    ],
    features: [
      "RAG pipeline with Ollama embeddings retrieving dossier chunks for tailored resume generation",
      "Fine-tuned PyTorch classifier on 1,200 hand-labeled postings: F1 0.71 → 0.92 vs keyword baseline",
      "Zero recurring paid LLM API cost for scoring and resume tailoring (local Ollama only)",
      "React dashboard for reviewing listings, re-scoring roles, and exporting tailored resumes",
      "Full pytest coverage with HTTP and LLM calls mocked",
    ],
    gradient: "from-orange-600 via-amber-600 to-orange-400",
    iconBg: "bg-amber-500/20",
    date: "Mar 2026 – Present",
    github: "https://github.com/jeff-tian-dev/JobRadar",
  },
  {
    id: "visionloop",
    title: "VisionLoop",
    subtitle: "Computer-Vision Input Simulation Engine",
    description:
      "Windows automation engine using OpenCV template matching and Win32 APIs—50 ms detection-to-action latency, with FastAPI, Supabase, Stripe licensing, and 20+ paying users.",
    longDescription: `VisionLoop automates repetitive Windows UI workflows using OpenCV template matching and Win32 message-based input, achieving 50 ms detection-to-action latency for near-instant desktop response. A Win32 layer finds target HWNDs, captures frames via PrintWindow, and sends input via SendMessage with Bezier-curve mouse paths. A license-key system with FastAPI and Supabase backend, hardware-fingerprint binding, and Stripe checkout/webhook integration supports 20+ paying users and $250+ MRR. Packaged with PyInstaller for distribution.`,
    techStack: [
      "Python",
      "OpenCV",
      "Win32 API",
      "FastAPI",
      "Supabase",
      "Stripe",
      "PyInstaller",
    ],
    features: [
      "50 ms detection-to-action latency for time-sensitive desktop workflows",
      "OpenCV template matching + Win32 SendMessage input with Bezier-curve mouse paths",
      "License-key system with hardware-fingerprint binding and Stripe checkout/webhooks",
      "20+ paying users, $250+ MRR; packaged with PyInstaller",
      "FastAPI backend with Supabase for licensing and user management",
    ],
    gradient: "from-amber-600 via-orange-500 to-red-500",
    iconBg: "bg-amber-600/20",
    date: "Dec 2025 – Present",
    github: "https://github.com/jeff-tian-dev/VisionLoop",
  },
  {
    id: "returnclip",
    title: "ReturnClip",
    subtitle: "AI-Powered Returns Platform",
    description:
      "Hack Canada 2026 (Reactiv ClipKit Lab) prototype: SwiftUI iOS return flow, Next.js AI assessment pipeline, React merchant dashboard, Postgres schema via Supabase, and optional Shopify refunds.",
    longDescription: `ReturnClip shortens returns to a mobile clip-style flow: scan order → reason → photo → AI condition summary → refund/exchange decision. The SwiftUI app uses URL-based order deep linking and calls Cloudinary and Gemini REST APIs (with a documented mock path). Next.js 15 handlers cover upload, assessment, decisions, and execution with Zod validation; Shopify Admin API integrates order lookup and refunds when configured. The React + Vite merchant dashboard uses Cloudinary React for media and case triage. A Supabase migration defines merchants, cases, evidence, decisions, executions with idempotency keys, and audit tables (the hackathon demo used in-memory storage). Recorded smoke tests: Cloudinary pass; Gemini valid but rate-limited under load.`,
    techStack: [
      "Swift",
      "SwiftUI",
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Zod",
      "Supabase",
      "PostgreSQL",
      "Gemini",
      "Cloudinary",
      "Shopify",
    ],
    features: [
      "SwiftUI iOS app with order-ID deep linking and multi-step return UX",
      "Next.js pipeline: evidence, AI assessment, decision engine, execution APIs with Zod",
      "React + Vite merchant dashboard: case list, detail, return-media viewer",
      "Shopify Admin API for order lookup and refund execution when credentials exist",
      "Postgres target schema: idempotent executions, JSONB, audit tables (demo used in-memory store)",
      "Outcomes: ~30s mobile flow vs ~15–30 min legacy; ~15–25 cases/hour merchant triage UX",
    ],
    gradient: "from-amber-500 via-orange-400 to-yellow-500",
    iconBg: "bg-yellow-500/20",
    date: "March 2026",
    github: "https://github.com/jeff-tian-dev/reactivapp-clipkit-lab",
  },
];

export const timeline: TimelineItem[] = [
  {
    title: "Machine Learning Engineer Intern",
    organization: "SYNC",
    date: "May 2026 — Aug 2026",
    description:
      "Built and fine-tuned a DistilBERT text classification model (PyTorch) on a 50K-row internal dataset, improving F1 from 0.71 to 0.89 through hyperparameter tuning and data augmentation. Built a Python/Pandas pipeline to clean and merge 3 data sources, cutting manual data prep from 4 hours to 20 minutes per run. Containerized the model with Docker and deployed it behind a Flask API, enabling 2 other engineers to integrate predictions into a downstream dashboard.",
  },
  {
    title: "Contest Director / Technical Lead",
    organization: "Computer Science Student Community (CSSC)",
    date: "Oct 2025 — Present",
    description:
      "Designed and ran 4 programming competitions for 120+ participants, authoring 25+ original problems with editorials, test data, and model solutions across difficulty tiers. Built an automated judging pipeline (Docker sandboxing, dev statistics dashboard, live scoreboard) alongside 2 other engineers that graded 2,000+ submissions with zero manual intervention.",
    badge: "Leadership",
  },
  {
    title: "Co-Founder & Software Engineer",
    organization: "July — Competitive Gaming Community",
    date: "Apr 2025 — Present",
    description:
      "Built a Discord moderation bot that classifies posted links against a scam-domain list and heuristics, auto-flagging 50+ messages/month to a staff channel. Shipped ClashTracker as the analytics platform for competitive clan leadership.",
  },
  {
    title: "B.Sc. Computer Science",
    organization: "University of Toronto Mississauga",
    date: "2024 — 2028 (Expected)",
    description:
      "GPA 3.9. Relevant coursework: Data Structures & Algorithms, Discrete Math, Linear Algebra, Statistics, Multivariable Calculus.",
  },
  {
    title: "ReturnClip — Hackathon build",
    organization: "Hack Canada 2026 · Reactiv ClipKit Lab",
    date: "March 2026",
    description:
      "Multi-surface returns prototype: SwiftUI iOS flow with Cloudinary/Gemini integration, Next.js 15 assessment and execution APIs, React merchant dashboard, Supabase-structured Postgres model, and optional Shopify refunds—with Zod validation and idempotent execution design.",
    badge: "Hackathon",
  },
  {
    title: "Senior Honour Roll — Top 100 in Canada",
    organization: "Canadian Computing Competition (CCC)",
    date: "February 2022",
    description:
      "Ranked Top 100 nationally in a timed algorithmic programming competition emphasizing data structures and graph theory.",
    badge: "Top 100",
  },
  {
    title: "Co-Founder & President — Computer Science Club",
    organization: "High School Leadership",
    date: "2021 — 2024",
    description:
      "Founded and led a CS club for 3 years, growing it to 25+ active members. Taught Python, algorithms, and web development through weekly workshops, organized 4 school-wide coding competitions, and mentored 10+ beginners into advanced CS courses.",
    badge: "3 Years",
  },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];
