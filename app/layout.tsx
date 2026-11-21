import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import websiteData from "@/data/websiteData.json";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: `${websiteData.common.siteNamePrimary}${websiteData.common.siteNameAccent} | ${websiteData.common.tagline}`,
  description: websiteData.common.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.className} ${plusJakartaSans.variable} ${montserrat.variable} ${poppins.variable} min-h-screen bg-white text-[#071947] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}