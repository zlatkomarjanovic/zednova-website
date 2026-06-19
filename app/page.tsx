import type { Metadata } from "next";

import {
  getAllCaseStudies,
  getAllFaqs,
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
import { IndustryShowcaseGrid } from "@/components/sections/IndustryShowcaseGrid";
import { ProductCard } from "@/components/shared/ProductCard";
import { LogoTicker } from "@/components/sections/LogoTicker";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsRow } from "@/components/sections/StatsRow";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { FaqSection } from "@/components/sections/FaqSection";
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
  const [services, industries, featuredCases, allCases, testimonials, products, settings, faqs] =
    await Promise.all([
      getAllServices(),
      getAllIndustries(),
      getFeaturedCaseStudies(3),
      getAllCaseStudies(),
      getFeaturedTestimonials(),
      getAllProducts(),
      getSiteSettings(),
      getAllFaqs(),
    ]);

  const serviceCovers = services.map((_, i) => ({
    image: allCases[i % allCases.length]?.image ?? "",
    accent: allCases[i % allCases.length]?.accent,
  }));

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

      {/* Stats — hand off into sage */}
      <section
        data-theme="light"
        className="relative zn-section overflow-hidden bg-gradient-to-b from-zn-bg to-zn-sage-mid"
      >
        <BlueprintGrid />
        <div className="zn-container-guides relative">
          <StatsRow stats={settings.stats} />
        </div>
      </section>

      {/* Process — full sage */}
      <section
        data-theme="light"
        className="relative zn-section overflow-hidden bg-gradient-to-b from-zn-sage-mid via-zn-sage-mid to-zn-sage"
      >
        <div className="zn-sage-grain absolute inset-0" aria-hidden="true" />
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
      <section data-theme="dark" data-bg="dark" className="zn-section bg-zn-dark text-zn-inv">
        <div className="zn-container">
          <div className="max-w-xl">
            <SectionLabel className="text-zn-inv-2" withRule={false}>
              What clients say
            </SectionLabel>
            <h2 className="mt-6 zn-h2 font-sans font-normal text-zn-inv">
              Proof from the field
            </h2>
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
