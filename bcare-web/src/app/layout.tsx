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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bcareequipments.com"),
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
    url: (process.env.NEXT_PUBLIC_SITE_URL || "https://bcareequipments.com") + "/",
    siteName: "BCare Bakery & Kitchen Equipments",
    title: "BCare Bakery & Kitchen Equipments | Commercial Kitchen Solutions Kerala",
    description:
      "Premium commercial bakery and kitchen equipment. EUROPYA and BCARE brand mixers, ovens, slicers, and dough processing equipment. 15+ years of trust.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BCare Bakery & Kitchen Equipments",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
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
        <meta name="theme-color" content="#0b1f33" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: COMPANY_DETAILS.name,
              image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bcareequipments.com"}/og-image.png`,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bcareequipments.com"}/icon-512.png`,
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://bcareequipments.com",
              telephone: COMPANY_DETAILS.phone,
              email: COMPANY_DETAILS.email,
              foundingDate: COMPANY_DETAILS.established,
              founder: { "@type": "Person", name: COMPANY_DETAILS.managingDirector },
              sameAs: [COMPANY_DETAILS.socialMedia.indiamart, COMPANY_DETAILS.socialMedia.instagram],
              address: {
                "@type": "PostalAddress",
                streetAddress: COMPANY_DETAILS.address.street,
                addressLocality: COMPANY_DETAILS.address.city,
                addressRegion: COMPANY_DETAILS.address.state,
                postalCode: COMPANY_DETAILS.address.pincode,
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
