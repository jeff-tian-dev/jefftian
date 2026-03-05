# Jeff Tian — Portfolio

A modern, production-ready personal portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/jeff-tian-dev/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: Git Integration

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel auto-detects Next.js — click **Deploy**.

No environment variables are required for the base site.

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles, utilities, scrollbar
│   ├── layout.tsx         # Root layout with metadata & fonts
│   └── page.tsx           # Main page composing all sections
├── components/
│   ├── AnimatedBackground # Gradient blobs + grid overlay
│   ├── Navbar             # Floating glassmorphism navbar
│   ├── Hero               # Name, typing effect, CTA, socials
│   ├── About              # Bio, skills badges
│   ├── Projects           # Project cards + modal detail view
│   ├── ProjectModal       # Full project detail overlay
│   ├── Experience         # Timeline layout
│   ├── Contact            # Form with validation
│   ├── Footer             # Minimal footer
│   └── SectionHeading     # Reusable heading component
└── data/
    └── portfolio.ts       # All portfolio data in one place
```

## Customization

All personal data lives in `src/data/portfolio.ts`. Update this single file to change:

- Name, bio, tagline, contact info
- Skills and categories
- Projects (title, description, tech stack, links)
- Timeline items (education, achievements)
- Navigation links

## Optional Enhancements

- **Email Integration:** Connect the contact form to [Resend](https://resend.com), [EmailJS](https://emailjs.com), or a Next.js API route.
- **Blog Section:** Add an MDX-powered blog using `@next/mdx` or Contentlayer.
- **Three.js Background:** Add a subtle 3D particle field using `@react-three/fiber`.
- **Analytics:** Integrate Vercel Analytics or Plausible for privacy-friendly tracking.
- **CMS:** Use Sanity or Notion as a headless CMS for projects.
- **Dark/Light Toggle:** Add a theme switcher with `next-themes`.

## License

MIT
