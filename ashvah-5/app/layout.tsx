import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ashvah.in"),
  title: {
    default: "ASHVAH — House of Fabrics",
    template: "%s · ASHVAH",
  },
  description:
    "Performance fabrics for sportswear, gym wear, and activewear manufacturers across India. Established 2011. Pan-India delivery. 500+ fabrics in catalogue.",
  keywords: [
    "sportswear fabric supplier",
    "gym wear fabric manufacturer Delhi",
    "activewear fabric India",
    "B2B fabric supplier",
    "knit fabric manufacturer",
    "lycra fabric supplier",
    "performance fabric India",
  ],
  authors: [{ name: "ASHVAH" }],
  creator: "ASHVAH",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.ashvah.in",
    siteName: "ASHVAH",
    title: "ASHVAH — House of Fabrics",
    description:
      "Performance fabrics for sportswear, gym wear, and activewear manufacturers across India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASHVAH — House of Fabrics",
    description: "Performance fabrics for India's activewear manufacturers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bone font-sans text-graphite antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "ASHVAH",
              alternateName: "ASHVAH House of Fabrics",
              description:
                "B2B supplier of performance fabrics for sportswear, gym wear, and activewear manufacturers across India. Established 2011.",
              url: "https://www.ashvah.in",
              telephone: "+91-90530-60102",
              email: "info@ashvah.in",
              foundingDate: "2011",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Star Heights, Godown no. 1, Street no. 5, Sheetal Nagar, Jhajjar Road",
                addressLocality: "Rohtak",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
              areaServed: "IN",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "10:00",
                closes: "17:00",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
