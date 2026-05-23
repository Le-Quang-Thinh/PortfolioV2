import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const oswald = Oswald({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-oswald",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlex = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lê Quang Thịnh — Front End Developer",
  description:
    "Front End Developer specializing in OTT and Smart TV platforms. 6+ years building high-performance streaming experiences across LG WebOS, Samsung Tizen, VIZIO and Chromecast.",
  keywords: [
    "Lê Quang Thịnh",
    "Front End Developer",
    "OTT Developer",
    "Smart TV Engineer",
    "Streaming Platform",
    "LG WebOS",
    "Samsung Tizen",
    "Chromecast",
    "React",
    "Next.js",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Lê Quang Thịnh" }],
  openGraph: {
    title: "Lê Quang Thịnh — Front End Developer",
    description:
      "OTT & Smart TV Specialist · Streaming Platform Engineer. Crafting smooth, reliable streaming experiences for millions.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${bebas.variable} ${oswald.variable} ${playfair.variable} ${inter.variable} ${ibmPlex.variable}`}
    >
      <body className="antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
