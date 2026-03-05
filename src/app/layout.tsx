import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jeff Tian | Full-Stack & AI Engineer",
  description:
    "Portfolio of Jeff Tian — Computer Science student at the University of Toronto, specializing in full-stack development and AI engineering.",
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
      "Computer Science student at the University of Toronto, specializing in full-stack development and AI engineering.",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
