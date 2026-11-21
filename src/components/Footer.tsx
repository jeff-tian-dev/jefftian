import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[72rem] px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-1 text-base text-graphite sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}, {personalInfo.location}
        </p>
        <p>Set in Archivo and Space Grotesk.</p>
      </div>
    </footer>
  );
}
