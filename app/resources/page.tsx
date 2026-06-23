import type { Metadata } from "next";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { InsightsArticleGrid } from "@/components/sections/InsightsArticleGrid";
import { InsightsFeaturedArticle } from "@/components/sections/InsightsFeaturedArticle";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { PageHero } from "@/components/sections/PageHero";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { BlueprintGuides } from "@/components/shared/BlueprintGuides";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { getAllPosts, getFeaturedPost } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on AI, systems, conversion, and the businesses that use them. From a software and product studio with 10+ years shipping products.",
};

/** Grid slots under More writing (excludes the featured post). */
const MORE_WRITING_LIMIT = 3;

export default async function ResourcesPage() {
  const [featured, allPosts] = await Promise.all([getFeaturedPost(), getAllPosts()]);
  const gridPosts = allPosts
    .filter((p) => p.slug !== featured.slug)
    .slice(0, MORE_WRITING_LIMIT);

  return (
    <>
      <section data-theme="light" className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]">
        <BlueprintGrid immediate />

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

            <div className="relative border-b border-zn-border bg-zn-bg">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset border-b border-zn-border py-6 md:py-8">
                <Reveal>
                  <SectionLabel withRule={false}>Featured</SectionLabel>
                </Reveal>
              </div>
              <InsightsFeaturedArticle post={featured} />
            </div>
          </div>
        </div>

        <div className="zn-container relative mt-14">
          <Reveal>
            <SectionLabel withRule={false}>More writing</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Notes on AI, systems, and conversion."
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
          />
          <Reveal delay={0.08}>
            <p className="zn-prose mt-5 max-w-lg">
              Practical notes on AI search, conversion, and the systems behind
              businesses that ship.
            </p>
          </Reveal>
        </div>

        <div className="zn-container-guides relative mt-14">
          <InsightsArticleGrid posts={gridPosts} />
        </div>
      </section>

      <section
        data-theme="dark"
        data-bg="dark"
        className="relative overflow-hidden bg-zn-dark text-zn-inv"
      >
        <div className="zn-blueprint-grid absolute inset-0 opacity-[0.22]" aria-hidden="true" />
        <div className="zn-grain absolute inset-0 opacity-[0.06]" aria-hidden="true" />
        <BlueprintGuides theme="dark" reveal="immediate" showEdgeCrosses className="z-10" />

        <div className="zn-container-guides relative">
          <BlueprintCross anchor="left" theme="dark" className="top-0 -translate-y-1/2" />
          <BlueprintCross anchor="right" theme="dark" className="top-0 -translate-y-1/2" />

          <div className="relative border-x border-t border-zn-border-dk">
            <div className="zn-container-inset grid gap-10 py-[clamp(4.5rem,9vw,7rem)] lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <Reveal>
                  <p className="zn-label text-zn-inv-2">Newsletter</p>
                </Reveal>
                <TextReveal
                  as="h2"
                  text="One insight per week. No slop."
                  className="mt-5 max-w-2xl font-sans text-[clamp(1.75rem,3.2vw,2.75rem)] font-normal leading-[1.06] tracking-[-0.03em]"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-zn-inv-2">
                    Short notes on what we are seeing in AI search, conversion, and
                    systems for US businesses. Unsubscribe anytime.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.12}>
                <NewsletterSignup theme="dark" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
