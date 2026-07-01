import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/animations/Reveal";
import { CookieSettingsPanel } from "@/components/legal/CookieSettingsPanel";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { SectionLabel } from "@/ui/SectionLabel";
import { TemplateSection } from "@/ui/TemplateSection";
import { JsonLd } from "@/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cookiePolicyIntro } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Cookie Settings | ZedNova Studio",
  description:
    "Manage cookie preferences for zednova.studio — control analytics and optional cookies. Your choices are saved on this device.",
  alternates: { canonical: "/legal/cookie-settings" },
  openGraph: {
    type: "website",
    url: "/legal/cookie-settings",
    title: "Cookie Settings | ZedNova Studio",
    description:
      "Update analytics and optional cookie preferences for zednova.studio.",
  },
  robots: { index: true, follow: true },
};

export default function CookieSettingsPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: cookiePolicyIntro.shortTitle },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <TemplateSection noInsetPadding borderBottom={false}>
        <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">
          <Reveal>
            <Breadcrumbs items={crumbs} className="mb-8" />
          </Reveal>
          <Reveal>
            <SectionLabel withRule={false}>Legal</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text">
              {cookiePolicyIntro.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl zn-prose">{cookiePolicyIntro.intro}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm text-zn-text-3">
              Last updated: {cookiePolicyIntro.lastUpdated} ·{" "}
              <Link
                href="/legal/privacy-policy"
                className="underline underline-offset-2"
              >
                Privacy Policy
              </Link>
            </p>
          </Reveal>
        </div>
      </TemplateSection>

      <TemplateSection borderBottom={false}>
        <div className="zn-container-inset pb-20 lg:pb-24">
          <div className="mx-auto max-w-2xl">
            <CookieSettingsPanel />
          </div>
        </div>
      </TemplateSection>
    </>
  );
}
