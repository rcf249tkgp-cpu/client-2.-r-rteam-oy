import type { Metadata, Viewport } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

// Display face: a Scandinavian grotesk for headlines and numbers.
const display = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title:
    "S Rörteam Oy Ab – VVS-installationer i Närpes, Kristinestad och Kaskö",
  description:
    "S Rörteam Oy Ab utför VVS-installationer för privatkunder, bostadsbolag, företag och kommuner i Närpes, Kristinestad och Kaskö. VVS-butik i Närpes.",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sv"
      className={`${inter.variable} ${display.variable} antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
