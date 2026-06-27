import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { HomePreloader } from "@/features/home/HomePreloader";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageTransition } from "@/components/animations/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AiSummaryFab } from "@/components/layout/AiSummaryFab";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { ConsentAwareAnalytics } from "@/components/legal/ConsentAwareAnalytics";
import { CookieConsentProvider } from "@/lib/cookies/CookieConsentProvider";
import { JsonLd } from "@/ui/JsonLd";
import { sitewideSchemaGraph } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site-url";
import { team } from "@/lib/content/team";
import { getAllMigrations, getCustomSoftwareNavItems, getFeaturedHomepageIndustries, getIndustryNavItems, getServiceMegaMenuCards, getSiteSettings } from "@/lib/queries";

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
  metadataBase: new URL(SITE_ORIGIN),
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
    images: [
      {
        url: "/api/og?title=ZedNova%20Studios&description=Websites%2C%20custom%20software%2C%20automations%2C%20and%20AI%20tools%20for%20service%20businesses.",
        width: 1200,
        height: 630,
        alt: "ZedNova Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@thezlatkom",
    title: "ZedNova Studios — Websites, Shopify & Automations",
    description:
      "Next.js websites, Shopify stores, booking flows, CRM automations, and AI chatbots for clinics, ecommerce, and small business.",
    images: [
      "/api/og?title=ZedNova%20Studios&description=Websites%2C%20custom%20software%2C%20automations%2C%20and%20AI%20tools%20for%20service%20businesses.",
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [migrations, settings, industryNavItems, customSoftwareNavItems, serviceMegaMenuCards, featuredHomepageIndustries] =
    await Promise.all([
      getAllMigrations(),
      getSiteSettings(),
      getIndustryNavItems(),
      getCustomSoftwareNavItems(),
      getServiceMegaMenuCards(),
      getFeaturedHomepageIndustries(),
    ]);

  const founder = team[0];
  const sameAs = [
    founder?.linkedin,
    founder?.twitter,
    founder?.website,
    settings.socialLinks.linkedin,
    settings.socialLinks.twitter,
    settings.socialLinks.github,
  ].filter(Boolean) as string[];

  const schemaGraph = sitewideSchemaGraph({
    org: {
      name: "ZedNova Studios",
      legalName: "ZedNova Studios LLC",
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/icon.svg`,
      description: settings.siteDescription,
      email: settings.contactEmail,
      sameAs,
    },
    founder: founder
      ? {
          slug: founder.slug,
          name: "Zlatko Marjanovic",
          role: founder.role,
          bio: founder.bio,
          image: founder.avatar,
          sameAs: [founder.linkedin, founder.twitter, founder.website].filter(Boolean) as string[],
        }
      : undefined,
    siteName: settings.siteTitle,
  });

  return (
    <html lang="en" className={`${geistMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <JsonLd data={schemaGraph} />
      </head>
      <body
        className="flex min-h-dvh flex-col bg-zn-bg font-sans text-zn-text"
        suppressHydrationWarning
      >
        <a href="#main" className="zn-skip-link">
          Skip to content
        </a>
        <CookieConsentProvider>
          <HomePreloader />
          <LenisProvider>
            <CustomCursor />
            <Navbar
              industryNavItems={industryNavItems}
              customSoftwareNavItems={customSoftwareNavItems}
              migrations={migrations}
              serviceMegaMenuCards={serviceMegaMenuCards}
            />
            <PageTransition className="flex flex-1 flex-col">
              <main id="main" className="flex-1">
                {children}
              </main>
            </PageTransition>
            <Footer
              migrations={migrations}
              settings={settings}
              serviceMegaMenuCards={serviceMegaMenuCards}
              customSoftwareNavItems={customSoftwareNavItems}
              featuredHomepageIndustries={featuredHomepageIndustries}
            />
            <AiSummaryFab />
          </LenisProvider>
          <CookieBanner />
          <ConsentAwareAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
