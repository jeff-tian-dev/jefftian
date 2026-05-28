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
    "Full-Stack Developer",
    "AI Engineer",
    "CS Student @ UofT",
    "Co-Founder @ July",
  ],
  bio: `I'm a Computer Science student at the University of Toronto building systems that merge intelligent automation with clean, scalable software architecture. As co-founder of July, I scaled a competitive gaming community from 6 to 350+ members across 5 clans while shipping ClashTracker—the operational backbone for leadership. I also build local LLM job-search automation with RAG and fine-tuned classifiers (JobRadar), and computer-vision desktop automation distributed to active users (VisionLoop). Ranked Top 100 nationally in the Canadian Computing Competition.`,
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
      "Full-stack analytics dashboard that automated community performance tracking for competitive clans—9-router FastAPI backend, React 19 SPA, and scheduled Supercell API ingestion into PostgreSQL.",
    longDescription: `ClashTracker is the operational backbone for July's competitive clans, consolidating war results, Legends League standings, and Capital Raid performance. A Python ingestion service pulls from the Supercell API on a systemd timer (~144 runs/day, ~250 API calls per cycle), eliminating ~5–8 hrs/week of manual community management for leadership. The FastAPI backend exposes nine domain routers with Pydantic validation and structured logging; the React 19 SPA serves ~500 users across 40 teams with 50k+ rows of historical data in PostgreSQL via Supabase. Deployed on an Oracle Cloud VM with Caddy reverse proxy, TLS, and GitHub Actions CI/CD shipping the SPA to GitHub Pages on every push.`,
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
      "~500 users across 40 teams; 50k+ rows of historical PostgreSQL data",
      "Nine FastAPI routers with scheduled ingestion at ~144 runs/day (~250 API calls/cycle)",
      "Eliminates ~5–8 hrs/week of manual community management for clan leadership",
      "Oracle Cloud VM deployment with Caddy reverse proxy, TLS, and systemd timers",
      "GitHub Actions CI/CD pipeline shipping the SPA to GitHub Pages on every push",
    ],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    iconBg: "bg-orange-500/20",
    date: "Jul 2025 – Present",
    github: "https://github.com/jeff-tian-dev/ClashTracker",
  },
  {
    id: "jobradar",
    title: "JobRadar",
    subtitle: "Local LLM Job Search Automation Tool",
    description:
      "End-to-end job-search agent with a RAG pipeline for job-tailored resume generation, a fine-tuned PyTorch classifier for relevance scoring, and a React dashboard for triage and export—all at zero recurring LLM API cost.",
    longDescription: `JobRadar automates job search without recurring paid LLM APIs. A RAG pipeline uses Ollama embeddings to retrieve relevant experience chunks from a personal dossier, generating job-tailored resumes via local LLM. A manual labeling pipeline was automated by fine-tuning a transformer classifier in PyTorch on proprietary labels, improving accuracy from ~60% to 94% (92% F1). The FastAPI + React dashboard supports reviewing listings, re-scoring roles, and exporting tailored resumes. pytest covers the pipeline with HTTP and LLM calls mocked.`,
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
      "Fine-tuned PyTorch transformer classifier: ~60% → 94% accuracy (92% F1) on proprietary labels",
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
      "Windows automation engine using OpenCV template matching and Win32 APIs to execute repetitive UI workflows—distributed to 15+ active users with FastAPI backend, Supabase, and Stripe integration.",
    longDescription: `VisionLoop automates repetitive Windows UI workflows using OpenCV template matching and Win32 message-based input. Each 20-minute session executes ~150–500 automated actions versus ~25–50 manual interactions, reclaiming ~5–7 hrs/week of active attention per user across ~2 daily sessions. A Win32 layer finds target HWNDs, captures frames via PrintWindow, and sends input via SendMessage with Bezier-curve mouse paths. Packaged with PyInstaller and distributed to 15+ active users, with FastAPI, Supabase, and Stripe powering licensing and backend services.`,
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
      "~150–500 automated UI actions per 20-minute session vs ~25–50 manual interactions",
      "Reclaims ~5–7 hrs/week of active attention per user across ~2 daily automated sessions",
      "OpenCV template matching + Win32 SendMessage input with Bezier-curve mouse paths",
      "Distributed to 15+ active users; packaged with PyInstaller",
      "FastAPI backend with Supabase and Stripe for licensing and user management",
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
    title: "Co-Founder & Software Engineer",
    organization: "July",
    date: "Apr 2025 — Present",
    description:
      "Built and deployed ClashTracker, a full-stack analytics dashboard that automated community performance tracking, becoming the operational backbone for 5 competitive clans. Co-founded July, scaling an online competitive community from 6 to 350+ members across 5 clans, with the top clan ranked #1 internationally (May 2026). Organized 6+ tournaments end-to-end with prize logistics valued at up to $150. Tracked and analyzed member performance metrics to drive competitive roster selection across 30 spots.",
  },
  {
    title: "B.Sc. Computer Science",
    organization: "University of Toronto Mississauga",
    date: "2024 — 2028 (Expected)",
    description:
      "Relevant coursework: Data Structures & Algorithms, Discrete Math, Linear Algebra, Statistics, Multivariable Calculus.",
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
