import type { Metadata } from "next";

import {
  getAllCaseStudies,
  getAllFaqs,
  getAllIndustries,
  getAllProducts,
  getAllServices,
  getFeaturedCaseStudies,
  getPlatformTestimonials,
  getSiteSettings,
} from "@/lib/queries";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/shared/Button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CaseStudiesShowcaseGrid } from "@/components/sections/CaseStudiesShowcaseGrid";
import { ServicesTabShowcase } from "@/components/sections/ServicesTabShowcase";
import { IndustryShowcaseGrid } from "@/components/sections/IndustryShowcaseGrid";
import { ProductCard } from "@/components/shared/ProductCard";
import { LogoTicker } from "@/components/sections/LogoTicker";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsRow } from "@/components/sections/StatsRow";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { TechStackShowcase } from "@/components/sections/TechStackShowcase";
import { techStackGroups } from "@/lib/content/tech-stack";
import { BlueprintGuides } from "@/components/shared/BlueprintGuides";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { FaqSection } from "@/components/sections/FaqSection";
import { DarkCTA } from "@/components/sections/DarkCTA";

export const metadata: Metadata = {
  title: { absolute: "ZedNova Studios — AI Systems for American Businesses" },
  description:
    "We build end-to-end revenue infrastructure for American businesses: lead capture, automation, CRM, and AI agents that compound results over time.",
};


const PILLARS = [
  {
    tagline: "Infrastructure",
    title: "We build the infrastructure",
    body: "Websites, AI agents, and automations that run 24/7 without anyone watching them.",
  },
  {
    tagline: "Revenue",
    title: "We wire it to your revenue",
    body: "Everything connects. CRM, lead capture, follow-up, and reporting move as one system.",
  },
  {
    tagline: "Ownership",
    title: "We hand you the controls",
    body: "Dashboards and SOPs so you own what we build, long after launch.",
  },
];

export default async function HomePage() {
  const [industries, featuredCases, allCases, services, platformTestimonials, products, settings, faqs] =
    await Promise.all([
      getAllIndustries(),
      getFeaturedCaseStudies(3),
      getAllCaseStudies(),
      getAllServices(),
      getPlatformTestimonials(),
      getAllProducts(),
      getSiteSettings(),
      getAllFaqs(),
    ]);

  const benefits = PILLARS.map((pillar, i) => ({
    ...pillar,
    image: allCases[i % allCases.length]?.image ?? "",
    accent: allCases[i % allCases.length]?.accent,
  }));

  return (
    <>
      <HeroSection caseStudies={featuredCases} />

      <LogoTicker />

      {/* What we build */}
      <section data-theme="light" className="relative zn-section">
        <BlueprintGrid />
        <div className="zn-container relative">
          <Reveal>
            <SectionLabel withRule={false}>Our approach</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Not an agency. A systems partner."
            className="mt-6 max-w-3xl zn-h2 font-sans font-normal"
          />
        </div>
        <div className="zn-container-guides relative mt-14">
          <BenefitsGrid items={benefits} />
        </div>
      </section>

      {/* Case studies */}
      <section data-theme="light" className="relative zn-section bg-zn-bg">
        <BlueprintGrid />
        <div className="zn-container relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <SectionLabel withRule={false}>Our work</SectionLabel>
              </Reveal>
              <TextReveal
                as="h2"
                text="Systems that moved the needle"
                className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
              />
            </div>
            <Reveal delay={0.1}>
              <Button href="/work" variant="link" withArrow>
                All case studies
              </Button>
            </Reveal>
          </div>
          <CaseStudiesShowcaseGrid caseStudies={allCases} industries={industries} />
        </div>
      </section>

      {/* Stats — hand off into sage */}
      <section
        data-theme="light"
        className="relative zn-section overflow-hidden bg-gradient-to-b from-zn-bg to-zn-sage-mid"
      >
        <BlueprintGrid />
        <div className="zn-container-guides relative">
          <div className="border-t border-zn-border">
            <p className="zn-container-inset py-4 text-center zn-label text-zn-text-3">
              Our work summarized over the years.
            </p>
          </div>
          <StatsRow stats={settings.stats} />
        </div>
      </section>

      {/* Services — sage wash */}
      <section
        data-theme="light"
        className="relative zn-section overflow-hidden bg-gradient-to-b from-zn-sage-mid via-zn-sage-mid to-zn-sage"
      >
        <div className="zn-sage-grain absolute inset-0" aria-hidden="true" />
        <BlueprintGrid />
        <div className="zn-container relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Reveal>
                <SectionLabel withRule={false}>Services</SectionLabel>
              </Reveal>
              <TextReveal
                as="h2"
                text="What we build for you"
                className="mt-6 zn-h2 font-sans font-normal"
              />
              <Reveal delay={0.08}>
                <p className="zn-prose mt-5 max-w-lg">
                  Ten interconnected systems — from AI-cited lead gen sites to CRM
                  automation and custom agents — designed to capture revenue and
                  compound over time.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Button href="/services" variant="link" withArrow>
                All services
              </Button>
            </Reveal>
          </div>
        </div>
        <div className="zn-container-guides relative">
          <ServicesTabShowcase services={services} />
        </div>
      </section>

      {/* Tech stack — continues sage */}
      <section
        data-theme="light"
        className="relative zn-section overflow-hidden bg-gradient-to-b from-zn-sage via-zn-sage-mid to-zn-sage"
      >
        <div className="zn-sage-grain absolute inset-0" aria-hidden="true" />
        <BlueprintGrid />
        <div className="zn-container relative">
          <Reveal>
            <SectionLabel withRule={false}>Tech stack</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="The tools we wire together for you"
            className="mt-6 max-w-3xl zn-h2 font-sans font-normal"
          />
          <Reveal delay={0.08}>
            <p className="zn-prose mt-5 max-w-lg">
              The platforms we build on, connect, and deploy — picked per project,
              not forced into one playbook.
            </p>
          </Reveal>
        </div>
        <TechStackShowcase groups={techStackGroups} />
      </section>

      {/* Industries — sage fading back to site background */}
      <section
        data-theme="light"
        className="relative zn-section overflow-hidden bg-gradient-to-b from-zn-sage to-zn-bg"
      >
        <div className="zn-sage-grain absolute inset-0" aria-hidden="true" />
        <BlueprintGrid />
        <div className="zn-container relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <SectionLabel withRule={false}>Who we serve</SectionLabel>
              </Reveal>
              <TextReveal
                as="h2"
                text="Built for the businesses that build America"
                className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
              />
            </div>
            <Reveal delay={0.1}>
              <Button href="/industries" variant="link" withArrow>
                All industries
              </Button>
            </Reveal>
          </div>
        </div>
        <IndustryShowcaseGrid industries={industries} />
      </section>

      {/* Testimonials */}
      <section
        data-theme="dark"
        data-bg="dark"
        className="relative overflow-hidden bg-zn-dark pb-[clamp(4rem,8vw,8rem)] pt-28 text-zn-inv"
      >
        <BlueprintGuides theme="dark" reveal="immediate" className="z-10" />
        <div className="zn-container relative">
          <div className="mx-auto max-w-2xl pb-28 text-center">
            <h2 className="zn-h2 font-sans font-normal text-zn-inv">
              What{" "}
              <span className="zn-accent-italic">the people</span>
              <br />
              have to say
            </h2>
            <Reveal delay={0.08}>
              <p className="zn-prose mx-auto mt-5 max-w-md text-zn-inv-2">
                All testimonials are sourced from Contra, Fiverr, Upwork, and
                LinkedIn — you can verify every review on those platforms.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="zn-container-guides relative">
          <TestimonialCarousel testimonials={platformTestimonials} />
        </div>
      </section>

      {/* Products teaser */}
      <section data-theme="light" className="relative zn-section">
        <BlueprintGrid />
        <div className="zn-container relative">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Reveal>
                <SectionLabel withRule={false}>ZedNova Labs</SectionLabel>
              </Reveal>
              <TextReveal
                as="h2"
                text="We also build products"
                className="mt-6 zn-h2 font-sans font-normal"
              />
              <Reveal delay={0.1}>
                <p className="zn-prose mt-5 max-w-md">
                  Beyond client work, we ship software and tools for the
                  ecosystems we work in.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8">
                  <Button href="/products" variant="link" withArrow>
                    Explore products
                  </Button>
                </div>
              </Reveal>
            </div>
            <Stagger className="grid gap-6 sm:grid-cols-2">
              {products.slice(0, 2).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} />

      <DarkCTA />
    </>
  );
}
