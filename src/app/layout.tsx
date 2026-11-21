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

const description =
  "CS student at the University of Toronto. ML engineering intern at SYNC, contest director at CSSC, and builder of ClashTracker, VisionLoop and JobRadar.";

export const metadata: Metadata = {
  title: "Jeff Tian",
  description,
  authors: [{ name: "Jeff Tian" }],
  // What link previews (Discord, iMessage, LinkedIn, Slack) show.
  openGraph: {
    title: "Jeff Tian",
    description,
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
