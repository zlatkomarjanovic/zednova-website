import type { Metadata } from "next";

import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { InsightsFilterableGrid } from "@/features/insights/InsightsFilterableGrid";
import { InsightsFeaturedArticle } from "@/features/insights/InsightsFeaturedArticle";
import { PageHero } from "@/features/home/PageHero";
import { DarkCTA } from "@/features/home/DarkCTA";
import { FaqSection } from "@/features/home/FaqSection";
import { FounderSection } from "@/features/about/FounderSection";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { SectionLabel } from "@/ui/SectionLabel";
import { getAllFaqs, getAllInsightCategories, getAllPosts, getFeaturedPost } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Insights on AI Search, Websites & Automations | ZedNova",
  description:
    "Practical notes on AI search, websites, automations, CRM workflows, and software for service businesses — from ZedNova Studio.",
  alternates: { canonical: "/insights" },
  openGraph: {
    type: "website",
    url: "/insights",
    title: "Insights — ZedNova Studio",
    description:
      "Practical notes on AI search, websites, automations, CRM workflows, and software.",
  },
  robots: { index: true, follow: true },
};

export default async function InsightsPage() {
  const [featured, allPosts, categories, faqs] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(),
    getAllInsightCategories(),
    getAllFaqs(),
  ]);
  const filterable = allPosts.filter((p) => p.slug !== featured.slug);
  const categoryLabels = categories.map((category) => category.title);

  return (
    <>
      <section data-theme="light" className="relative bg-zn-bg">
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />

            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <PageHero
                guidesLayout
                eyebrow="Insights"
                eyebrowWithRule={false}
                title="Thinking out loud on AI, systems, and the businesses that use them."
                description="Practical writing from a studio that ships websites, software, and automations. No slop, no hype."
              />
            </div>

            <div className="relative bg-zn-bg">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset py-6 md:py-8">
                <Reveal>
                  <SectionLabel withRule={false}>Featured</SectionLabel>
                </Reveal>
              </div>
              <InsightsFeaturedArticle post={featured} />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-zn-border/50"
              />
            </div>

            <div className="relative">
              <div className="zn-container-inset py-12 lg:py-14">
                <Reveal>
                  <SectionLabel withRule={false}>All articles</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h2"
                  text="Notes on AI, systems, and conversion."
                  className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
                />
                <Reveal delay={0.08}>
                  <p className="zn-prose mt-5 max-w-lg">
                    Practical notes on AI search, conversion, and the systems behind
                    businesses that ship. Filter by topic or search to find what you need.
                  </p>
                </Reveal>
              </div>
            </div>

            <InsightsFilterableGrid posts={filterable} categories={categoryLabels} />

            <FaqSection
              embedded
              faqs={faqs}
              groupByCategory
              filterable
              heading="Common questions"
              description="Pricing, timelines, tech, migrations, and how we work. Filter by topic or browse everything."
            />

            <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
            <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />
          </div>
        </div>
      </section>

      <FounderSection />

      <DarkCTA bookingEmbed />
    </>
  );
}
