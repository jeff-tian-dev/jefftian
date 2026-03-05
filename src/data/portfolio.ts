import { IconType } from "react-icons";
import {
  FaPython,
  FaJava,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDatabase,
  FaLinux,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiC,
  SiFlask,
  SiPandas,
  SiNumpy,
  SiOpencv,
  SiArduino,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
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
  tagline: "Building intelligent systems at the intersection of AI & software engineering.",
  roles: [
    "Full-Stack Developer",
    "AI Engineer",
    "CS Student @ UofT",
    "Problem Solver",
  ],
  bio: `I'm a Computer Science student at the University of Toronto with a passion for building 
  systems that merge intelligent automation with clean, scalable software architecture. From 
  designing computer vision pipelines to engineering real-time analytics dashboards, I thrive 
  on solving complex problems with elegant code. Ranked in the Top 100 nationally in the 
  Canadian Computing Competition, I bring strong algorithmic foundations paired with hands-on 
  full-stack and AI engineering experience.`,
  email: "jeff.tian23@gmail.com",
  github: "https://github.com/jeff-tian-dev",
  linkedin: "https://linkedin.com/in/jeff-tian",
  location: "Mississauga, ON",
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: FaPython },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Java", icon: FaJava },
      { name: "C++", icon: SiCplusplus },
      { name: "C", icon: SiC },
      { name: "SQL", icon: FaDatabase },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: FaReact },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Flask", icon: SiFlask },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "OpenCV", icon: SiOpencv },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss3 },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: FaGitAlt },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
      { name: "Linux", icon: FaLinux },
      { name: "Arduino", icon: SiArduino },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "cv-framework",
    title: "Computer Vision Automation Framework",
    subtitle: "AI-Powered Desktop Automation",
    description:
      "Real-time automation system combining computer vision with OS-level APIs to reduce repetitive workflows by ~60%.",
    longDescription: `A sophisticated automation framework that integrates computer vision, 
    template matching, and a locally hosted LLaMA model to intelligently detect, decide, and 
    act on screen content in real time. The modular pipeline architecture separates detection, 
    decision logic, and action execution, making the system highly extensible and maintainable.`,
    techStack: ["Python", "LLaMA", "OpenCV", "PyAutoGUI", "ctypes", "tkinter"],
    features: [
      "Real-time screen analysis using OpenCV template matching",
      "Locally hosted LLaMA model integration for intelligent decision-making",
      "Modular pipeline: detection → decision → action execution",
      "Windows API integration for window enumeration and foreground control",
      "~60% reduction in repetitive workflows",
      "~75% reduction in error rates through adaptive threshold tuning",
      "Packaged as standalone executable via PyInstaller",
    ],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    iconBg: "bg-indigo-500/20",
    date: "Sept 2025 – Present",
    github: "https://github.com/jeff-tian-dev",
  },
  {
    id: "analytics-dashboard",
    title: "Clash of Clans Analytics Dashboard",
    subtitle: "Full-Stack Data Platform",
    description:
      "Full-stack analytics platform tracking ~5 clans and 200+ players, with war outcomes, raid contributions, and player stats visualized over time.",
    longDescription: `A full-stack analytics dashboard that tracks performance data for Clash of Clans clans and players. 
    The system ingests data via an hourly Python pipeline running on a Linux VM (~250 API requests per sync), 
    stores 20k+ historical records in a normalized PostgreSQL database with idempotent UPSERT logic, and 
    serves paginated REST endpoints through a FastAPI backend. The React + TypeScript frontend visualizes 
    war outcomes, raid contributions, and player statistics over time. Deployed on Oracle Cloud VM with 
    systemd for fully autonomous operation.`,
    techStack: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Supabase", "Oracle Cloud VM"],
    features: [
      "Tracks ~5 clans and 200+ players with war outcomes, raid contributions, and player stats over time",
      "Hourly Python ingestion pipeline on Linux VM (~250 API requests per sync)",
      "Normalized relational database (PostgreSQL/Supabase) storing 20k+ historical records with idempotent UPSERT logic",
      "FastAPI backend with paginated REST endpoints",
      "React + TypeScript analytics dashboard for visualization",
      "Deployed on Oracle Cloud VM with systemd for fully autonomous operation",
    ],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    iconBg: "bg-cyan-500/20",
    date: "June 2025 – Present",
    github: "https://github.com/jeff-tian-dev",
  },
  {
    id: "temp-monitor",
    title: "Embedded Temperature Monitor",
    subtitle: "Microcontroller Sensing System",
    description:
      "Hardware-software temperature sensing system with custom-wired circuitry and embedded C firmware.",
    longDescription: `An embedded systems project featuring a microcontroller-based temperature 
    sensing system with custom-wired sensor circuitry. The firmware, written in C for Arduino, 
    interfaces with analog inputs and converts signals via the onboard ADC for real-time data 
    acquisition. The system outputs readings through a serial interface with periodic sampling 
    logic for continuous monitoring.`,
    techStack: ["C", "Arduino", "Microcontrollers", "ADC", "Serial I/O"],
    features: [
      "Custom-wired temperature sensor circuitry",
      "Embedded C firmware for analog-to-digital conversion",
      "Periodic sampling logic for real-time data acquisition",
      "Serial interface output for monitoring and logging",
      "Hardware-software integration debugging and calibration",
      "Iterative testing and performance validation",
    ],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    iconBg: "bg-emerald-500/20",
    date: "Aug 2025 – Dec 2025",
    github: "https://github.com/jeff-tian-dev",
  },
];

export const timeline: TimelineItem[] = [
  {
    title: "B.Sc. Computer Science",
    organization: "University of Toronto Mississauga",
    date: "2024 — 2028 (Expected)",
    description:
      "Pursuing a degree in Computer Science with coursework in Data Structures & Algorithms, Discrete Mathematics, Linear Algebra, Statistics, and Multivariable Calculus.",
  },
  {
    title: "Co-Founder & President — Computer Science Club",
    organization: "High School Leadership",
    date: "2021 — 2024",
    description:
      "Founded and led a CS club for 3 years, growing it to 25+ active members. Taught Python, algorithms, and web development through weekly workshops, organized 4 school-wide coding competitions, and mentored 10+ beginners into advanced CS courses.",
    badge: "3 Years",
  },
  {
    title: "Senior Honour Roll — Top 100 in Canada",
    organization: "Canadian Computing Competition (CCC)",
    date: "February 2022",
    description:
      "Ranked in the Top 100 nationally in a timed algorithmic programming competition emphasizing data structures, graph theory, and problem-solving under pressure.",
    badge: "Top 100",
  },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];
