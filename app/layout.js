import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ruyainteriors.com"),
  title: {
    default: "RUYA Interiors — Interior Design & Turnkey Interiors",
    template: "%s · RUYA Interiors",
  },
  description:
    "RUYA Interiors designs and builds residential and commercial spaces — turnkey interiors, modular kitchens, bespoke furniture and full project execution.",
  keywords: [
    "interior design",
    "RUYA Interiors",
    "turnkey interiors",
    "modular kitchen",
    "home interiors",
    "commercial interiors",
    "luxury interior designer",
  ],
  openGraph: {
    title: "RUYA Interiors — Where Your Vision Takes Shape",
    description:
      "Award-winning interior design studio crafting residential and commercial spaces end to end.",
    type: "website",
    locale: "en_US",
    siteName: "RUYA Interiors",
  },
  twitter: {
    card: "summary_large_image",
    title: "RUYA Interiors — Where Your Vision Takes Shape",
    description:
      "Award-winning interior design studio crafting residential and commercial spaces end to end.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0e0c0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
