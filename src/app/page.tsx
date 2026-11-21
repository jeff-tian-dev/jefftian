import Chapter from "@/components/Chapter";
import Finale from "@/components/Finale";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemsProvider from "@/components/ProblemsProvider";
import StoryProgress from "@/components/StoryProgress";
import WorkIndex from "@/components/WorkIndex";
import { chapters } from "@/data/portfolio";

export default function Home() {
  return (
    <ProblemsProvider>
      <a
        href="#main"
        className="sr-only z-50 border-2 border-ink bg-paper px-4 py-3 text-base font-bold focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <StoryProgress />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        {chapters.map((chapter) => (
          <Chapter key={chapter.number} chapter={chapter} />
        ))}
        <WorkIndex />
        <Finale />
      </main>
      <Footer />
    </ProblemsProvider>
  );
}
