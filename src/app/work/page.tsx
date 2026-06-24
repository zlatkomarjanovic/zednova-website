import type { Metadata } from "next";
import {
  getAllCaseStudies,
  getAllIndustries,
  getIndustryParents,
} from "@/lib/queries";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { WorkGrid } from "@/features/work/WorkGrid";
import { DarkCTA } from "@/features/home/DarkCTA";

export const metadata: Metadata = {
  title: "Work",
  description:
    "120+ completed projects. Selected case studies with the stories, systems, and results attached.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const [caseStudies, industries, parents] = await Promise.all([
    getAllCaseStudies(),
    getAllIndustries(),
    getIndustryParents(),
  ]);

  const usedIndustries = new Set(caseStudies.map((c) => c.industry));
  const lookup = [
    ...parents.map((p) => ({ value: p.slug, label: p.title })),
    ...industries.map((i) => ({ value: i.slug, label: i.title })),
  ];
  const filters = lookup.filter((item) => usedIndustries.has(item.value));

  return (
    <>
      {/* Hero — guides framing */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />
            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">
                <Reveal>
                  <SectionLabel withRule={false}>Our work</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Projects and case studies"
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    120+ completed projects. These are the deep-dive case
                    studies — the challenge, the system we built, and the
                    results that followed. Filter by industry to find work like
                    yours.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Start a project
                    </Button>
                    <Button href="/services" variant="link" withArrow>
                      See services
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work grid — guides framing */}
      <section
        data-theme="light"
        className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]"
      >
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="zn-container-inset py-14 lg:py-16">
              <WorkGrid caseStudies={caseStudies} filters={filters} showHeader={false} />
            </div>
          </div>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
