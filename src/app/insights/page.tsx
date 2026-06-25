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
import { getAllFaqs, getAllPosts, getFeaturedPost } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on AI, systems, conversion, and the businesses that use them. From a software and product studio with 10+ years shipping products.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const [featured, allPosts, faqs] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(),
    getAllFaqs(),
  ]);
  const filterable = allPosts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <section
        data-theme="light"
        className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]"
      >
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
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

            <div className="relative border-b border-zn-border bg-zn-bg">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset py-6 md:py-8">
                <Reveal>
                  <SectionLabel withRule={false}>Featured</SectionLabel>
                </Reveal>
              </div>
              <InsightsFeaturedArticle post={featured} />
            </div>

            <div className="relative border-b border-zn-border">
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

            <InsightsFilterableGrid posts={filterable} />

            <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
            <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />
          </div>
        </div>
      </section>

      <FaqSection
        faqs={faqs}
        groupByCategory
        filterable
        heading="Common questions"
        description="Pricing, timelines, tech, migrations, and how we work. Filter by topic or browse everything."
      />

      <FounderSection />

      <DarkCTA bookingEmbed />
    </>
  );
}
