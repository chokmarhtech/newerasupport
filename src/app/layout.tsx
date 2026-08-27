import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "New Era Support Ltd | Healthcare & Housing Staffing Solutions",
  description: "High-converting, compliant, and accessible UK care & housing staffing solutions.",
  metadataBase: new URL("https://newerasupport.co.uk"),
  icons: {
    icon: [
      { url: "/icon.png?v=3", type: "image/png" },
      { url: "/favicon.ico?v=3" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/apple-icon.png?v=3",
  },
  openGraph: {
    title: "New Era Support Ltd | Healthcare & Housing Staffing Solutions",
    description: "High-converting, compliant, and accessible UK care & housing staffing solutions.",
    locale: "en_GB",
    type: "website",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EmploymentAgency", "MedicalOrganization"],
  "name": "New Era Support Ltd",
  "image": "https://newerasupport.co.uk/logos/logo-1.png",
  "logo": "https://newerasupport.co.uk/logos/logo-1.png",
  "url": "https://newerasupport.co.uk",
  "telephone": "07565805795",
  "email": "info@newerasupport.co.uk",
  "priceRange": "££",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Flat 10 The Compasses, 11 Farley Hill",
    "addressLocality": "Luton",
    "addressRegion": "Bedfordshire",
    "addressCountry": "UK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "51.8787",
    "longitude": "-0.4200"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "knowsAbout": [
    "Healthcare Staffing",
    "Care Assistant Recruitment",
    "Registered Nurse Staffing",
    "Housing Assistant Staffing",
    "Emergency Shift Cover",
    "Hospitality and Catering Staffing"
  ]
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.png?v=3" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=3" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <QueryProvider>
          {children}
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
