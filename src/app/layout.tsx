import type { Metadata } from "next";
import { Fraunces, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Jeff Tian | Full-Stack & AI Engineer",
  description:
    "Portfolio of Jeff Tian — ML engineer and full-stack developer, CS @ UofT. SYNC intern, CSSC Contest Director, builder of ClashTracker, JobRadar, and VisionLoop.",
  keywords: [
    "Jeff Tian",
    "software engineer",
    "full-stack developer",
    "AI engineer",
    "University of Toronto",
    "portfolio",
  ],
  authors: [{ name: "Jeff Tian" }],
  openGraph: {
    title: "Jeff Tian | Full-Stack & AI Engineer",
    description:
      "ML engineer and full-stack developer at the University of Toronto. SYNC intern, CSSC Contest Director, and builder of production ML and web systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fraunces.variable} ${bricolage.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
