import type { Metadata } from "next";

import {
  getAllCaseStudies,
  getAllCustomSoftware,
  getAllMigrations,
  getAllServices,
  getAllPosts,
  getFeaturedCaseStudies,
  getHomepageIndustries,
  getPlatformTestimonials,
  getPortfolioProjects,
  getSiteSettings,
} from "@/lib/queries";
import { homepageFaqs } from "@/lib/content/faq";
import { agencyComparison } from "@/lib/content/agency-comparison";
import { clientLogos } from "@/lib/content/client-logos";
import { team } from "@/lib/content/team";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { WebsiteBuilderAnimation } from "@/components/animations/WebsiteBuilderAnimation";
import { CRMAutomationAnimation } from "@/components/animations/CRMAutomationAnimation";
import { AIChatbotAnimation } from "@/components/animations/AIChatbotAnimation";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { PortfolioWorkGrid } from "@/features/work/PortfolioWorkGrid";
import { ServicesTabShowcase } from "@/features/services/ServicesTabShowcase";
import { IndustryNavShowcaseGrid } from "@/features/industries/IndustryNavShowcaseGrid";
import { LogoTicker } from "@/features/home/LogoTicker";
import { HeroSection } from "@/features/home/HeroSection";
import { StatsRow } from "@/features/home/StatsRow";
import { BenefitsGrid } from "@/features/home/BenefitsGrid";
import { TechStackShowcase } from "@/features/home/TechStackShowcase";
import { techStackGroups } from "@/lib/content/tech-stack";
import { BlueprintGuides } from "@/ui/BlueprintGuides";
import { TestimonialCarousel } from "@/features/home/TestimonialCarousel";
import { AgencyComparisonSection } from "@/features/home/AgencyComparisonSection";
import { PricingCardsSection } from "@/features/home/PricingCardsSection";
import { FaqSection } from "@/features/home/FaqSection";
import { FounderSection } from "@/features/about/FounderSection";
import { homepagePricingPackages } from "@/lib/content/homepage-pricing";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { homepageGraphJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Websites, Custom Software & AI Tools | ZedNova",
  },
  description:
    "We build Next.js websites, Shopify stores, custom software, CRM automations, and AI tools for clinics, ecommerce brands, and growing businesses.",
};


const PILLARS = [
  {
    tagline: "Marketing websites",
    title: "We design and build the site",
    body: "B2B and B2C marketing websites, landing pages, and Sanity or Webflow CMS setups that load fast and convert visitors.",
  },
  {
    tagline: "Automation",
    title: "We connect your follow-up",
    body: "CRM automations, booking flows, email and SMS sequences, and n8n or Make workflows so no lead sits idle.",
  },
  {
    tagline: "AI tools",
    title: "We add AI where it actually helps",
    body: "Website chatbots, AI phone assistants for missed calls, and intake flows that book appointments without anyone picking up the phone.",
  },
];

export default async function HomePage() {
  const [featuredCases, allCases, services, customSoftware, migrations, platformTestimonials, settings, homepageIndustries, portfolioProjects, allPosts] =
    await Promise.all([
      getFeaturedCaseStudies(3),
      getAllCaseStudies(),
      getAllServices(),
      getAllCustomSoftware(),
      getAllMigrations(),
      getPlatformTestimonials(),
      getSiteSettings(),
      getHomepageIndustries(),
      getPortfolioProjects(),
      getAllPosts(),
    ]);

  const recentPosts = allPosts.slice(0, 3);

  const PILLAR_VISUALS = [
    <WebsiteBuilderAnimation key="website-builder" />,
    <CRMAutomationAnimation key="crm-automation" />,
    <AIChatbotAnimation key="ai-chatbot" />,
  ];

  const benefits = PILLARS.map((pillar, i) => ({
    ...pillar,
    image: allCases[i % allCases.length]?.image ?? "",
    accent: allCases[i % allCases.length]?.accent,
    visual: PILLAR_VISUALS[i],
  }));

  const founder = team[0];

  return (
    <>
      <JsonLd
        data={homepageGraphJsonLd({
          pillars: PILLARS,
          clientLogos: clientLogos.map((logo) => logo.alt),
          portfolioProjects: portfolioProjects.map((project) => ({
            slug: project.slug,
            title: project.title,
            summary: project.summary,
            href: project.href,
            category: project.category,
          })),
          featuredCases: featuredCases.map((study) => ({
            slug: study.slug,
            title: study.title,
            excerpt: study.resultHeadline,
          })),
          stats: settings.stats,
          services: services.map((service) => ({
            slug: service.slug,
            title: service.title,
            shortDescription: service.shortDescription,
          })),
          customSoftware: customSoftware.map((item) => ({
            slug: item.slug,
            title: item.title,
            shortDescription: item.shortDescription,
          })),
          migrations: migrations.map((item) => ({
            slug: item.slug,
            title: item.title,
            shortDescription: item.shortDescription,
          })),
          techStackGroups,
          industries: homepageIndustries.map((industry) => ({
            title: industry.title,
            shortDescription: industry.shortDescription,
            href: industry.href,
          })),
          testimonials: platformTestimonials.map((testimonial) => ({
            quote: testimonial.quote,
            authorName: testimonial.authorName,
            authorTitle: testimonial.authorTitle,
            company: testimonial.company,
            rating: testimonial.rating,
          })),
          pricingPackages: homepagePricingPackages,
          faqs: homepageFaqs,
          recentPosts,
          founder: founder
            ? {
                slug: founder.slug,
                name: founder.name,
                role: founder.role,
                bio: founder.bio,
                image: founder.avatar,
                sameAs: [founder.linkedin, founder.twitter, founder.website].filter(
                  Boolean,
                ) as string[],
              }
            : undefined,
          agencyComparison: {
            heading: agencyComparison.heading,
            subheading: agencyComparison.subheading,
            sections: agencyComparison.sections.map((section) => ({
              title: section.title,
              rows: section.rows.map((row) => ({
                category: row.category,
                zednova: row.zednova,
              })),
            })),
          },
        })}
      />
      <HeroSection projects={portfolioProjects} />

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
            text="An experienced software and product studio. We build web apps, mobile apps, desktop software, ecommerce stores, marketing websites, and automations, using AI internally to deliver faster and more cost-effectively, without adding headcount."
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
                text="Projects and case studies"
                className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
              />
            </div>
            <Reveal delay={0.1}>
              <Button href="/work" variant="link" withArrow>
                All case studies
              </Button>
            </Reveal>
          </div>
          <PortfolioWorkGrid projects={portfolioProjects} />
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
              120+ projects. 10+ years shipping products. $0 wasted on agency overhead.
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
                  Marketing website design, e-commerce development, custom software,
                  CRM automation, dashboards, and migrations for clinics, ecommerce
                  brands, and growing businesses.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Button href="/services" variant="link" withArrow>
                See services
              </Button>
            </Reveal>
          </div>
        </div>
        <div className="zn-container-guides relative">
          <ServicesTabShowcase
            services={services}
            customSoftware={customSoftware}
            migrations={migrations}
          />
        </div>
      </section>

      {/* Tech stack — continues sage */}
      <section
        data-theme="light"
        className="relative zn-section bg-gradient-to-b from-zn-sage via-zn-sage-mid to-zn-sage"
      >
        <div className="zn-sage-grain absolute inset-0" aria-hidden="true" />
        <BlueprintGrid />
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
                text="Clinics, coaches, brands, startups, and teams we build for"
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
        <IndustryNavShowcaseGrid industries={homepageIndustries} />
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
            <Reveal>
              <div className="flex justify-center">
                <SectionLabel withRule={false} className="text-zn-inv-2">
                  What the people have to say
                </SectionLabel>
              </div>
            </Reveal>
            <h2 className="zn-h2 mt-6 font-sans font-normal text-zn-inv">
              Real reviews from real clients
            </h2>
            <Reveal delay={0.08}>
              <p className="zn-prose mx-auto mt-5 max-w-md text-zn-inv-2">
                All reviews are sourced from Contra, Fiverr, Upwork, and LinkedIn.
                You can verify every one of them on those platforms.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="zn-container-guides relative">
          <TestimonialCarousel testimonials={platformTestimonials} />
        </div>
      </section>

      <AgencyComparisonSection {...agencyComparison} />

      <PricingCardsSection packages={homepagePricingPackages} />

      <FaqSection
        faqs={homepageFaqs}
        recentPosts={recentPosts}
        description="Websites, Shopify, automations, migrations, AI tools, pricing, and support. The essentials before you reach out."
      />

      <FounderSection />

      <DarkCTA bookingEmbed />
    </>
  );
}
