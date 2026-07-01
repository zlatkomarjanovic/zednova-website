import type { IndustryPageContent } from "@/lib/types/industry-page";
import type { PortfolioProject, Post, Testimonial } from "@/lib/types";
import type { CustomSoftware } from "@/lib/types/custom-software";
import type { Migration, NavMenuGroup, ServiceMegaMenuCard } from "@/lib/types/content-nav";
import type { Service } from "@/lib/types";
import { breadcrumbJsonLd, faqPageJsonLd, industryJsonLd } from "@/lib/seo";
import { hasSectionContent } from "@/lib/content/resolve-industry-page";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { BlueprintGuides } from "@/ui/BlueprintGuides";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { Button } from "@/ui/Button";
import { TextReveal } from "@/components/animations/TextReveal";
import { PortfolioWorkGrid } from "@/features/work/PortfolioWorkGrid";
import { LogoTicker } from "@/features/home/LogoTicker";
import { TestimonialCarousel } from "@/features/home/TestimonialCarousel";
import { ServicePageCTA } from "@/features/services/ServicePageCTA";
import { FaqSection } from "@/features/home/FaqSection";
import { BlueprintColumnFrame } from "@/ui/BlueprintColumnFrame";
import { InsightsHomePostsSection } from "@/features/insights/InsightsHomePostsSection";
import { JsonLd } from "@/ui/JsonLd";
import {
  IndustryAtGlanceSection,
  IndustryHeroSection,
  IndustryProblemSection,
  IndustrySegmentsSection,
} from "@/features/industries/sections/IndustryPageSections";
import { IndustryTimelineStickySection } from "@/features/industries/sections/IndustryTimelineStickySection";
import { IndustryBuildBentoSection } from "@/features/industries/sections/IndustryBuildBentoSection";
import { IndustryServicesShowcase } from "@/features/industries/sections/IndustryServicesShowcase";
import { IndustryProcessSection } from "@/features/industries/sections/IndustryProcessSection";

export type IndustryPageTemplateContext = {
  relatedWork: PortfolioProject[];
  relatedPosts: Post[];
  platformTestimonials: Testimonial[];
  serviceNavGroups: NavMenuGroup[];
  serviceMegaMenuCards: ServiceMegaMenuCard[];
  services: Service[];
  customSoftware: CustomSoftware[];
  migrations: Migration[];
  linkedServiceSlugs: string[];
};

export function IndustryPageTemplate({
  page,
  context,
}: {
  page: IndustryPageContent;
  context: IndustryPageTemplateContext;
}) {
  const {
    relatedWork,
    relatedPosts,
    platformTestimonials,
    serviceNavGroups,
    serviceMegaMenuCards,
    services,
    customSoftware,
    migrations,
    linkedServiceSlugs,
  } = context;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: page.title },
  ];

  const faqs = page.faq.items;
  const showFaq = hasSectionContent(faqs) && Boolean(page.faq.heading);

  return (
    <>
      <JsonLd
        data={[
          industryJsonLd({
            slug: page.slug,
            title: page.title,
            shortDescription: page.seoDescription,
            heroHeadline: page.hero.heading,
          }),
          breadcrumbJsonLd(crumbs),
          ...(faqs.length > 0 ? [faqPageJsonLd(faqs)] : []),
        ]}
      />

      <IndustryHeroSection page={page} crumbs={crumbs} />

      {page.logoCarousel.show ? (
        <section data-theme="light" className="relative bg-zn-bg">
          <LogoTicker label={page.logoCarousel.label} />
        </section>
      ) : null}

      {hasSectionContent(relatedWork) && page.workHeadline ? (
        <section data-theme="light" className="relative bg-zn-bg">
          <BlueprintGrid />
          <div className="zn-container-guides relative">
            <div className="relative border-x border-b border-zn-border">
              <div className="zn-container-inset py-[clamp(3rem,6vw,5rem)] pb-6 md:pb-8">
                {page.workEyebrow ? (
                  <SectionLabel withRule={false}>{page.workEyebrow}</SectionLabel>
                ) : null}
                <TextReveal
                  as="h2"
                  text={page.workHeadline}
                  className="mt-6 max-w-2xl zn-h2 font-sans font-normal text-zn-text"
                />
              </div>
              <PortfolioWorkGrid projects={relatedWork} />
            </div>
          </div>
        </section>
      ) : null}

      <IndustryAtGlanceSection section={page.glance} />
      <IndustryProblemSection section={page.problems} />
      <IndustryTimelineStickySection section={page.system} />
      <IndustryBuildBentoSection section={page.builds} />
      <IndustrySegmentsSection section={page.segments} />

      {hasSectionContent(platformTestimonials) && page.proof.heading ? (
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
                  {page.proof.eyebrow ? (
                    <SectionLabel withRule={false} className="text-zn-inv-2">
                      {page.proof.eyebrow}
                    </SectionLabel>
                  ) : null}
                </div>
              </Reveal>
              <h2 className="zn-h2 mt-6 font-sans font-normal text-zn-inv">{page.proof.heading}</h2>
              {page.proof.subheading ? (
                <p className="mx-auto mt-4 max-w-xl text-base text-zn-inv-2">{page.proof.subheading}</p>
              ) : null}
            </div>
          </div>
          <div className="zn-container-guides relative">
            <TestimonialCarousel testimonials={platformTestimonials} />
          </div>
        </section>
      ) : null}

      <IndustryServicesShowcase
        section={page.services}
        serviceNavGroups={serviceNavGroups}
        serviceMegaMenuCards={serviceMegaMenuCards}
        services={services}
        customSoftware={customSoftware}
        migrations={migrations}
        linkedServiceSlugs={linkedServiceSlugs}
      />
      <IndustryProcessSection section={page.process} industrySlug={page.slug} />

      {hasSectionContent(relatedPosts) && page.insights.heading ? (
        <section data-theme="light" className="relative bg-zn-bg">
          <div className="zn-container-guides relative">
            <div className="relative border-x border-b border-zn-border">
              <InsightsHomePostsSection
                posts={relatedPosts}
                label={page.insights.eyebrow ?? "Insights"}
                heading={page.insights.heading}
                headingId="industry-resources-heading"
                description={page.insights.subheading ?? ""}
                insetClassName="py-[clamp(3rem,6vw,5rem)] pb-6 md:pb-8"
                action={
                  <Button href="/insights" variant="link" withArrow>
                    All insights
                  </Button>
                }
              />
            </div>
          </div>
        </section>
      ) : null}

      {showFaq ? (
        <section data-theme="light" className="relative bg-zn-bg" aria-label="Get started">
          <BlueprintGrid />
          <div className="zn-container-guides relative">
            <BlueprintColumnFrame showBottomCrosses bottomInset={false}>
              <ServicePageCTA
                embedded
                eyebrow={page.cta.eyebrow}
                heading={page.cta.heading}
                sub={page.cta.subheading}
                ctaLabel={page.cta.primaryCta.label}
                ctaHref={page.cta.primaryCta.href}
                secondaryLabel={page.cta.secondaryCta.label}
                secondaryHref={page.cta.secondaryCta.href}
              />
              <FaqSection
                frameless
                faqs={faqs}
                showBlueprintCrosses={false}
                label={page.faq.eyebrow ?? "FAQ"}
                heading={page.faq.heading}
                description={page.faq.subheading ?? ""}
              />
            </BlueprintColumnFrame>
          </div>
        </section>
      ) : (
        <ServicePageCTA
          eyebrow={page.cta.eyebrow}
          heading={page.cta.heading}
          sub={page.cta.subheading}
          ctaLabel={page.cta.primaryCta.label}
          ctaHref={page.cta.primaryCta.href}
          secondaryLabel={page.cta.secondaryCta.label}
          secondaryHref={page.cta.secondaryCta.href}
          guideBottomInset
          guideShowBottomRail
          guideShowBottomCrosses
        />
      )}
    </>
  );
}
