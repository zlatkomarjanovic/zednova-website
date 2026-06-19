import type { Metadata } from "next";

import {
  getAllCaseStudies,
  getAllIndustries,
  getAllProducts,
  getAllServices,
  getFeaturedCaseStudies,
  getFeaturedTestimonials,
  getSiteSettings,
} from "@/lib/queries";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/shared/Button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ServicesShowcaseGrid } from "@/components/sections/ServicesShowcaseGrid";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { ProductCard } from "@/components/shared/ProductCard";
import { LogoTicker } from "@/components/sections/LogoTicker";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsRow } from "@/components/sections/StatsRow";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { DarkCTA } from "@/components/sections/DarkCTA";

export const metadata: Metadata = {
  title: { absolute: "ZedNova Studios — AI Systems for American Businesses" },
  description:
    "We build end-to-end revenue infrastructure for American businesses: lead capture, automation, CRM, and AI agents that compound results over time.",
};

const PROCESS_STEPS = [
  { step: 1, title: "Audit", description: "We map your current stack and find where revenue leaks." },
  { step: 2, title: "Strategy", description: "We design a system architecture specific to your business." },
  { step: 3, title: "Build", description: "We execute fast. No committees, no delays." },
  { step: 4, title: "Handoff", description: "We document everything and train your team." },
];

const PILLARS = [
  {
    title: "We build the infrastructure",
    body: "Websites, AI agents, and automations that run 24/7 without anyone watching them.",
  },
  {
    title: "We wire it to your revenue",
    body: "Everything connects. CRM, lead capture, follow-up, and reporting move as one system.",
  },
  {
    title: "We hand you the controls",
    body: "Dashboards and SOPs so you own what we build, long after launch.",
  },
];

export default async function HomePage() {
  const [services, industries, featuredCases, allCases, testimonials, products, settings] =
    await Promise.all([
      getAllServices(),
      getAllIndustries(),
      getFeaturedCaseStudies(3),
      getAllCaseStudies(),
      getFeaturedTestimonials(),
      getAllProducts(),
      getSiteSettings(),
    ]);

  const serviceCovers = services.map((_, i) => ({
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
          <Stagger className="mt-14 grid gap-10 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-t border-zn-border pt-6">
                <h3 className="font-sans text-lg font-normal tracking-tight text-zn-text">
                  {pillar.title}
                </h3>
                <p className="mt-3 leading-relaxed text-zn-text-2">{pillar.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Services */}
      <section data-theme="light" className="relative zn-section bg-zn-bg">
        <BlueprintGrid />
        <div className="zn-container relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <SectionLabel withRule={false}>What we do</SectionLabel>
              </Reveal>
              <TextReveal
                as="h2"
                text="Ten ways we compound your revenue"
                className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
              />
            </div>
            <Reveal delay={0.1}>
              <Button href="/services" variant="link" withArrow>
                All services
              </Button>
            </Reveal>
          </div>
          <ServicesShowcaseGrid services={services} covers={serviceCovers} />
        </div>
      </section>

      {/* Stats */}
      <section data-theme="light" className="relative zn-section">
        <BlueprintGrid />
        <div className="zn-container relative">
          <StatsRow stats={settings.stats} />
        </div>
      </section>

      {/* Process — sage gradient from site background */}
      <section
        data-theme="light"
        className="relative zn-section overflow-hidden bg-gradient-to-b from-zn-bg via-zn-sage-mid to-zn-sage"
      >
        <BlueprintGrid />
        <div className="zn-container relative">
          <Reveal>
            <SectionLabel withRule={false}>How we work</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="From first call to live system in weeks, not months"
            className="mt-6 max-w-3xl zn-h2 font-sans font-normal"
          />
          <div className="mt-16">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section
        data-theme="light"
        className="relative zn-section bg-gradient-to-b from-zn-sage to-zn-bg"
      >
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
          <Stagger
            className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
            stagger={0.04}
          >
            {industries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials (dark) */}
      <section data-theme="dark" data-bg="dark" className="zn-section bg-zn-dark text-zn-inv">
        <div className="zn-container">
          <div className="flex justify-center">
            <SectionLabel className="text-zn-inv-2" withRule={false}>
              What clients say
            </SectionLabel>
          </div>
          <div className="mt-12">
            <TestimonialSlider testimonials={testimonials} />
          </div>
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
                <p className="mt-5 max-w-md leading-relaxed text-zn-text-2">
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

      <DarkCTA />
    </>
  );
}
