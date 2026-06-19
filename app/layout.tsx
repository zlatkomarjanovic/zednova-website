import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageTransition } from "@/components/animations/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  getAllIndustries,
  getAllServices,
  getFeaturedCaseStudies,
  getServiceGroups,
  getSiteSettings,
} from "@/lib/queries";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zednova.com"),
  title: {
    default: "ZedNova Studios — AI Systems for American Businesses",
    template: "%s | ZedNova Studios",
  },
  description:
    "Full-stack AI systems agency. We build lead capture, automation, CRM, and AI agents that compound revenue for US businesses.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ZedNova Studios",
    title: "ZedNova Studios — AI Systems for American Businesses",
    description:
      "We build end-to-end revenue infrastructure for American businesses: lead capture, automation, CRM, and AI agents that compound results over time.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@zednova",
    title: "ZedNova Studios — AI Systems for American Businesses",
    description:
      "Full-stack AI systems agency for US businesses. Lead capture, automation, CRM, and AI agents that compound revenue.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [serviceGroups, industries, featuredCases, allServices, settings] =
    await Promise.all([
      getServiceGroups(),
      getAllIndustries(),
      getFeaturedCaseStudies(1),
      getAllServices(),
      getSiteSettings(),
    ]);

  return (
    <html lang="en" className={`${geistMono.variable} ${instrumentSerif.variable}`}>
      <body
        className="flex min-h-dvh flex-col bg-zn-bg font-sans text-zn-text"
        suppressHydrationWarning
      >
        <a href="#main" className="zn-skip-link">
          Skip to content
        </a>
        <LenisProvider>
          <CustomCursor />
          <Navbar
            serviceGroups={serviceGroups}
            industries={industries}
            featured={featuredCases[0] ?? null}
          />
          <PageTransition className="flex flex-1 flex-col">
            <main id="main" className="flex-1">
              {children}
            </main>
          </PageTransition>
          <Footer services={allServices} settings={settings} />
        </LenisProvider>
      </body>
    </html>
  );
}
