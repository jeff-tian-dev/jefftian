import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Variable Archivo, including the width axis the hero animates.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeff Tian",
  description:
    "Jeff Tian builds software people actually use. ML engineer intern at SYNC, contest director at UofT's CSSC, co-founder of Lotus, and builder of ClashTracker, VisionLoop, and JobRadar.",
  authors: [{ name: "Jeff Tian" }],
  openGraph: {
    title: "Jeff Tian",
    description:
      "The story so far, from competitive programming to production ML. CS at the University of Toronto.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#DCE4F5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
