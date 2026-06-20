import type { Metadata } from "next";
import { getAllCaseStudies, getAllIndustries, getIndustryParents } from "@/lib/queries";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { WorkGrid } from "@/components/sections/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "120+ completed projects. Selected case studies with the stories, systems, and results attached.",
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
