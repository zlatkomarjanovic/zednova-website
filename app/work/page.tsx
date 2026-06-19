import type { Metadata } from "next";
import { getAllCaseStudies, getAllIndustries } from "@/lib/queries";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { WorkGrid } from "@/components/sections/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "120+ completed projects. Selected case studies with the stories, systems, and results attached.",
};

export default async function WorkPage() {
  const [caseStudies, industries] = await Promise.all([
    getAllCaseStudies(),
    getAllIndustries(),
  ]);

  const usedIndustries = new Set(caseStudies.map((c) => c.industry));
  const filters = industries
    .filter((i) => usedIndustries.has(i.slug))
    .map((i) => ({ value: i.slug, label: i.title }));

  return (
    <>
      <section className="pb-4 pt-32 lg:pt-36">
        <div className="zn-container">
          <WorkGrid caseStudies={caseStudies} filters={filters} />
        </div>
      </section>

      <div className="mt-16">
        <DarkCTA />
      </div>
    </>
  );
}
