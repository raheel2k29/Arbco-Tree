import type { Metadata } from "next";
import { Montserrat, Poppins, Caveat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://arbco-tree.vercel.app'),
  title: "Arbco Tree Services | Townsville's Trusted Arborists",
  description: "Specialising in safe tree removal, stump grinding, tree pruning, and arborist assessments across Townsville and Queensland. Fully insured with 15+ years experience.",
  alternates: {
    canonical: '/',
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans pb-20 lg:pb-0">
        <Header />
        {children}
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
