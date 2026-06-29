import type { Metadata } from "next";
import {
  getAllCaseStudies,
  getIndustryTitle,
  getPortfolioProjects,
} from "@/lib/queries";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { BlueprintColumnFrame } from "@/ui/BlueprintColumnFrame";
import { WorkFilterableGrid } from "@/features/work/WorkFilterableGrid";
import { CaseStudyCard } from "@/features/work/CaseStudyCard";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work — Website, Software & Automation Case Studies | ZedNova",
  description:
    "Selected projects from ZedNova Studios — marketing websites, Shopify stores, SaaS, custom software, CRM automations, and AI tools with brand, design, and development.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "/work",
    title: "Work — ZedNova Studios",
    description:
      "Marketing websites, Shopify stores, custom software, CRM automations, and AI tools.",
  },
  robots: { index: true, follow: true },
};



export default async function WorkPage() {

  const [portfolioProjects, caseStudies] = await Promise.all([
    getPortfolioProjects(),
    getAllCaseStudies(),
  ]);

  const caseStudyIndustries = await Promise.all(
    caseStudies.map((c) => getIndustryTitle(c.industry)),
  );

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Work" },
  ];

  return (

    <>

      <JsonLd
        data={[
          collectionPageJsonLd({
            path: "/work",
            name: "Work — ZedNova Studios Case Studies",
            description:
              "Selected website, ecommerce, custom software, automation, and AI tool builds by ZedNova Studios.",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <section data-theme="light" className="relative bg-zn-bg">

        <div className="zn-container-guides relative">

          <BlueprintColumnFrame>

            <div className="relative border-b border-zn-border">

              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />

              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />

              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">
                <Breadcrumbs items={crumbs} className="mb-8" />
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

                    A selection of recent builds — brand, design, and development

                    for teams that needed a site that converts and scales.

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



            <WorkFilterableGrid projects={portfolioProjects} />

            {caseStudies.length > 0 && (
              <div className="zn-container-inset border-t border-zn-border py-14 lg:py-16">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                  <div>
                    <Reveal>
                      <SectionLabel withRule={false}>Case studies</SectionLabel>
                    </Reveal>
                    <TextReveal
                      as="h2"
                      text="Full-service builds with measurable results"
                      className="mt-6 max-w-2xl zn-h2 font-sans font-normal text-zn-text"
                    />
                    <Reveal delay={0.08}>
                      <p className="zn-prose mt-5 max-w-xl">
                        Deep-dive case studies covering the challenge, what we
                        built, the stack, and the outcomes — for clinics, legal,
                        real estate, SaaS, and service businesses.
                      </p>
                    </Reveal>
                  </div>
                  <Reveal delay={0.1}>
                    <Button href="/contact" variant="link" withArrow>
                      Start a similar project
                    </Button>
                  </Reveal>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                  {caseStudies.map((caseStudy, index) => (
                    <Reveal key={caseStudy.slug} delay={0.04 * index}>
                      <CaseStudyCard
                        caseStudy={caseStudy}
                        industryLabel={caseStudyIndustries[index]}
                        className="h-full"
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

          </BlueprintColumnFrame>

        </div>

      </section>



      <DarkCTA />

    </>

  );

}

