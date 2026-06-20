import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageTransition } from "@/components/animations/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  getIndustryGroups,
  getAllServices,
  getFeaturedCaseStudies,
  getServiceGroups,
  getAllMigrations,
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
    default: "ZedNova Studios — Websites, Shopify & Automations",
    template: "%s | ZedNova Studios",
  },
  description:
    "We design and build Next.js websites, Shopify stores, booking flows, CRM automations, AI chatbots, and migration projects for clinics, ecommerce brands, and small businesses.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ZedNova Studios",
    title: "ZedNova Studios — Websites, Shopify & Automations",
    description:
      "Next.js websites, Shopify development, CRM automations, AI chatbots, and migrations for clinics, ecommerce brands, and small businesses.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@zednova",
    title: "ZedNova Studios — Websites, Shopify & Automations",
    description:
      "Next.js websites, Shopify stores, booking flows, CRM automations, and AI chatbots for clinics, ecommerce, and small business.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [serviceGroups, industryGroups, migrations, featuredCases, allServices, settings] =
    await Promise.all([
      getServiceGroups(),
      getIndustryGroups(),
      getAllMigrations(),
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
            industryGroups={industryGroups}
            migrations={migrations}
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
