import type { Metadata } from "next";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { TemplateSection } from "@/ui/TemplateSection";
import { StatsRow } from "@/features/home/StatsRow";
import { ProcessSteps } from "@/features/home/ProcessSteps";
import { DarkCTA } from "@/features/home/DarkCTA";
import { FounderSection } from "@/features/about/FounderSection";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { EntitySummary } from "@/ui/EntitySummary";
import { CONTACT_EMAIL } from "@/lib/content/site";
import { aboutPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { team } from "@/lib/content/team";

export const metadata: Metadata = {
  title: "About ZedNova Studio — Senior-Led Software & Website Studio",
  description:
    "ZedNova Studio is a software and product studio led by Zlatko Marjanovic, building websites, ecommerce, custom software, automations, and AI tools for US and global businesses.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About ZedNova Studio",
    description:
      "Senior-led software and product studio building websites, ecommerce, custom software, automations, and AI tools.",
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
      "Senior-led software and product studio building websites, ecommerce, custom software, automations, and AI tools.",
  },
  robots: { index: true, follow: true },
};

const ABOUT_STATS = [
  { value: "120+", label: "Projects completed" },
  { value: "10+", label: "Years shipping websites, products, and software" },
  { value: "Senior", label: "Team-led delivery from strategy to launch" },
  { value: "$0", label: "Wasted on agency overhead" },
];

const VALUES = [
  {
    name: "Practical work over agency theater",
    body: "You do not need endless strategy decks or weekly calls that go nowhere. You need a website, tool, or workflow that solves a real business problem and works in production.",
  },
  {
    name: "Systems over manual work",
    body: "Most businesses lose time because follow-up, updates, reminders, and data entry depend on people remembering to do them. We build systems that reduce that manual work.",
  },
  {
    name: "Ownership, always",
    body: "You should not feel trapped after launch. We document the build, explain how it works, and hand over what your team needs to run it confidently.",
  },
  {
    name: "Speed without mess",
    body: "Fast delivery only matters if the work stays clean. We use AI internally to move faster, but every project still gets structure, testing, and a reliable finish.",
  },
];

const REMOTE_STEPS = [
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

export default function AboutPage() {
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
                  ZedNova Studio is a software and product studio led by Zlatko Marjanovic,
                  also known as Zed M. The studio builds websites, ecommerce stores, custom
                  software, automations, and AI tools for US and global businesses. ZedNova
                  Studio LLC is a Texas-based company with 10+ years of delivery and 120+
                  completed projects.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button href="/contact" withArrow>
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

      {/* Stats */}
      <section data-theme="light" className="relative bg-zn-bg">
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <StatsRow stats={ABOUT_STATS} className="border-0" />
          </div>
        </div>
      </section>

      {/* Values */}
      <TemplateSection>
        <Reveal>
          <SectionLabel withRule={false}>What we believe</SectionLabel>
        </Reveal>
        <TextReveal
          as="h2"
          text="Practical work, real systems, clean delivery"
          className="mt-6 max-w-3xl zn-h2 font-sans font-normal"
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.05}>
          {VALUES.map((value, i) => (
            <div
              key={value.name}
              className="rounded-[2px] border border-zn-border bg-zn-bg-2 p-7"
            >
              <span className="font-mono text-sm text-zn-text-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-sans text-lg font-normal tracking-tight text-zn-text">
                {value.name}
              </h3>
              <p className="zn-prose mt-3">{value.body}</p>
            </div>
          ))}
        </Stagger>
      </TemplateSection>

      {/* Remote advantage */}
      <TemplateSection className="bg-zn-bg-2/40">
        <Reveal>
          <SectionLabel withRule={false}>The remote advantage</SectionLabel>
        </Reveal>
        <TextReveal
          as="h2"
          text="Why a remote studio works better for modern businesses"
          className="mt-6 max-w-3xl zn-h2 font-sans font-normal"
        />
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zn-text-2">
            Lower overhead, async delivery, senior-led execution, and a US entity — without the
            agency layers in between.
          </p>
        </Reveal>
        <div className="mt-12">
          <ProcessSteps steps={REMOTE_STEPS} />
        </div>
      </TemplateSection>

      <FounderSection />

      <EntitySummary
        fields={[
          { label: "Founder", value: "Zlatko Marjanovic (Zed M.)" },
          { label: "Role", value: "Designer, developer, and product builder" },
          { label: "Experience", value: "10+ years, 120+ projects shipped" },
          {
            label: "Platforms",
            value:
              "Upwork, Fiverr, Contra, LinkedIn, Google",
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
        sub="Tell us what you need and we will scope it clearly. Whether you need a new website, Shopify store, internal dashboard, booking flow, CRM automation, AI chatbot, client portal, or migration to a better stack, we can help you figure out the right build."
        ctaLabel="Tell us what you need"
        note={`Or email us at ${CONTACT_EMAIL}. We usually reply within 24 hours.`}
      />
    </>
  );
}
