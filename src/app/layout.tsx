import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
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
    icon: "/icon/icon.jpg",
    shortcut: "/icon/icon.jpg",
    apple: "/icon/icon.jpg",
  },
  openGraph: {
    title: "New Era Support Ltd | Healthcare & Housing Staffing Solutions",
    description: "High-converting, compliant, and accessible UK care & housing staffing solutions.",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
