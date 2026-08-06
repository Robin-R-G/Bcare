import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { CompareProvider } from "@/context/CompareContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BCare Bakery & Kitchen Equipments",
  description: "Complete Commercial Kitchen & Bakery Solutions in Kerala.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-on-background pb-16 md:pb-0`}
      >
        <CompareProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <MobileStickyBar />
        </CompareProvider>
      </body>
    </html>
  );
}
