import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { B2BProvider } from "@/context/B2BContext";
import { CompareProvider } from "@/context/CompareContext";
import { COMPANY_DETAILS } from "@/lib/constants/company";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "BCare Bakery & Kitchen Equipments | Commercial Kitchen Solutions Kerala",
    template: "%s | BCare",
  },
  description:
    "Established in 2010, BCare is a leading supplier of commercial bakery and kitchen equipment in Kerala. EUROPYA and BCARE brand mixers, ovens, slicers, and more. Based in Thrissur.",
  keywords: [
    "bakery equipment Kerala",
    "commercial kitchen equipment Thrissur",
    "planetary mixer India",
    "spiral mixer Kerala",
    "deck oven commercial",
    "bread slicer bakery",
    "BCare equipment",
    "EUROPYA mixer",
    "restaurant kitchen setup",
    "hotel kitchen equipment",
  ],
  authors: [{ name: "BCare Bakery & Kitchen Equipments" }],
  creator: "BCare",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://robin-r-g.github.io/Bcare",
    siteName: "BCare Bakery & Kitchen Equipments",
    title: "BCare Bakery & Kitchen Equipments | Commercial Kitchen Solutions Kerala",
    description:
      "Premium commercial bakery and kitchen equipment. EUROPYA and BCARE brand mixers, ovens, slicers, and dough processing equipment. 15+ years of trust.",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "BCare Bakery & Kitchen Equipments",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth">
      <head>
        <link rel="icon" href="/logo.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />
        <meta name="theme-color" content="#0b1f33" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "BCare Bakery & Kitchen Equipments",
              image: "/logo.webp",
              url: "https://robin-r-g.github.io/Bcare",
              telephone: COMPANY_DETAILS.phone,
              email: "info@bcareequipments.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Nadathara, Mannuthy",
                addressLocality: "Thrissur",
                addressRegion: "Kerala",
                postalCode: "680651",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.5270,
                longitude: 76.2144,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "18:00",
              },
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.7",
                reviewCount: "10",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-on-background pb-16 md:pb-0`}
      >
        <B2BProvider>
          <CompareProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <MobileStickyBar />
          </CompareProvider>
        </B2BProvider>
      </body>
    </html>
  );
}
