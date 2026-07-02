import type { Metadata } from "next";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { StatsRow } from "@/features/home/StatsRow";
import { ProcessSteps } from "@/features/home/ProcessSteps";
import { DarkCTA } from "@/features/home/DarkCTA";
import { FounderSection } from "@/features/about/FounderSection";
import { LogoTicker } from "@/features/home/LogoTicker";
import { ServiceValuesSection } from "@/features/services/ServiceValuesSection";
import { AGENCY_VALUES } from "@/lib/content/agency-values";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { EntitySummary } from "@/ui/EntitySummary";
import { CONTACT_EMAIL } from "@/lib/content/site";
import { aboutPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { team } from "@/lib/content/team";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "About ZedNova Studio | Senior-Led Software & Website Studio",
  description:
    "ZedNova Studio is a software and product studio led by Zlatko Marjanovic, building websites, custom software, automations, and AI tools for US and global businesses.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About ZedNova Studio",
    description:
      "Senior-led software and product studio building websites, custom software, automations, and AI tools.",
    images: [
      {
        url: "/api/og?title=About%20ZedNova%20Studio&description=Senior-led%20software%20studio%20for%20websites%2C%20automations%2C%20and%20AI%20tools.",
        width: 1200,
        height: 630,
        alt: "About ZedNova Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ZedNova Studio",
    description:
      "Senior-led software and product studio building websites, custom software, automations, and AI tools.",
  },
  robots: { index: true, follow: true },
};

const HOW_WE_WORK_STEPS = [
  {
    step: 1,
    title: "Lower overhead, better use of budget",
    description:
      "No downtown office or inflated agency cost structure. Your budget goes into the work, not the appearance of a bigger company.",
  },
  {
    step: 2,
    title: "Async delivery, fewer wasted meetings",
    description:
      "Most updates do not need a meeting. We work async, send clear updates, document decisions, and keep projects moving.",
  },
  {
    step: 3,
    title: "Senior-led from start to finish",
    description:
      "You are not handed off after the sales call. The same senior thinking that shapes the project stays involved through launch.",
  },
  {
    step: 4,
    title: "A US entity, real accountability",
    description:
      "ZedNova Studio is a Texas LLC. Remote delivery with the structure and accountability of a real business partner.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const founder = team[0];
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "About" },
  ];

  return (
    <>
      <JsonLd
        data={[
          aboutPageJsonLd(
            founder
              ? {
                  slug: founder.slug,
                  name: "Zlatko Marjanovic",
                  role: founder.role,
                  bio: founder.bio,
                  image: founder.avatar,
                  sameAs: [founder.linkedin, founder.twitter, founder.website].filter(
                    Boolean,
                  ) as string[],
                }
              : undefined,
          ),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      {/* Hero */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="zn-container-inset pb-16 pt-32 lg:pb-20 lg:pt-44">
              <Breadcrumbs items={crumbs} />
              <Reveal>
                <SectionLabel withRule={false}>The studio</SectionLabel>
              </Reveal>
              <TextReveal
                as="h1"
                text="Software, websites, and automations built by senior hands."
                className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
              />
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                  ZedNova Studio is a software and product studio led by Zlatko
                  Marjanovic, also known as Zed M. We build lead-gen websites, CRM
                  automations, AI receptionists, custom in-house software, and the
                  systems that connect them, for US and global businesses. ZedNova
                  Studio LLC is a Texas-based company with 10+ years of delivery
                  and 120+ completed projects.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button href="/contact" withArrow analyticsLocation="about-hero">
                    Work with ZedNova
                  </Button>
                  <Button href="/work" variant="link" withArrow>
                    See our work
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <LogoTicker />

      {/* Stats, same sage hand-off as the homepage */}
      <section
        data-theme="light"
        className="relative zn-section overflow-hidden bg-gradient-to-b from-zn-bg to-zn-sage-mid"
      >
        <BlueprintGrid />
        <div className="zn-container-guides relative">
          <div className="border-t border-zn-border">
            <p className="zn-container-inset py-4 text-center zn-label text-zn-text-3">
              120+ projects. 10+ years shipping products. $0 wasted on agency overhead.
            </p>
          </div>
          <StatsRow stats={settings.stats} />
        </div>
      </section>

      {/* How we work, sage wash into the dark values section */}
      <section
        data-theme="light"
        className="relative zn-section overflow-hidden bg-gradient-to-b from-zn-sage-mid via-zn-sage-mid to-zn-sage"
      >
        <div className="zn-sage-grain absolute inset-0" aria-hidden="true" />
        <BlueprintGrid />
        <div className="zn-container relative">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel withRule={false}>How we work</SectionLabel>
            </Reveal>
            <TextReveal
              as="h2"
              text="Why a remote, senior-led studio works better"
              className="mt-6 zn-h2 font-sans font-normal"
            />
            <Reveal delay={0.08}>
              <p className="zn-prose mt-5 max-w-lg">
                Lower overhead, async delivery, senior-led execution, and a US
                entity, without the agency layers in between.
              </p>
            </Reveal>
          </div>
          <div className="mt-12">
            <ProcessSteps steps={HOW_WE_WORK_STEPS} />
          </div>
        </div>
      </section>

      {/* Values, same dark grid used on every service detail page */}
      <ServiceValuesSection
        values={AGENCY_VALUES}
        eyebrow="What we believe"
        headline="Values we bring to every engagement"
        subtext="The same principles that shape every service we ship. Speed, outcomes, and one team accountable for the full stack."
      />

      <FounderSection />

      <EntitySummary
        fields={[
          { label: "Founder", value: "Zlatko Marjanovic (Zed M.)" },
          { label: "Role", value: "Designer, developer, and product builder" },
          { label: "Experience", value: "10+ years, 120+ projects shipped" },
          {
            label: "Platforms",
            value: "Upwork, Fiverr, Contra, LinkedIn, Google",
          },
          {
            label: "Specialties",
            value:
              "Next.js, React, TypeScript, Tailwind, Sanity, Webflow, Framer, Shopify, n8n, Make, Supabase, Vapi, Twilio, Claude, GPT-5",
          },
          {
            label: "Markets served",
            value: "United States and Europe (remote, async)",
          },
          { label: "Company", value: "ZedNova Studio LLC (Texas)" },
        ]}
        links={[
          { label: "Services", href: "/services" },
          { label: "Work", href: "/work" },
          { label: "Tech stack", href: "/stack" },
          { label: "Contact", href: "/contact" },
        ]}
        intro="Zlatko Marjanovic = ZedNova Studio = websites, custom software, automations, and AI tools for service businesses."
      />

      <DarkCTA
        heading="Ready to start your next website, software, or automation project?"
        sub="Tell us what you need and we will scope it clearly. Whether you need a new website, internal dashboard, booking flow, CRM automation, AI receptionist, or client portal, we can help you figure out the right build."
        ctaLabel="Tell us what you need"
        note={`Or email us at ${CONTACT_EMAIL}. We usually reply within 24 hours.`}
      />
    </>
  );
}
