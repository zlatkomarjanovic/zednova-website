import type { Metadata } from "next";
import { getAllIndustries } from "@/lib/queries";
import { PageHero } from "@/components/sections/PageHero";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { Stagger } from "@/components/animations/Reveal";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { Button } from "@/components/shared/Button";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Revenue systems built for 10 industries across the US. Home services, dental, legal, real estate, SaaS, and more.",
};

export default async function IndustriesPage() {
  const industries = await getAllIndustries();

  return (
    <>
      <PageHero
        eyebrow="Who we serve"
        title="We know your industry's problems before you tell us"
        description="We have built revenue systems for 10 industries across the US. Every vertical has its own pain points, compliance quirks, and conversion patterns. We have already solved them."
      >
        <Button href="/contact" withArrow>
          Start a project
        </Button>
      </PageHero>

      <section className="pb-4">
        <div className="zn-container">
          <Stagger
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {industries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </Stagger>
        </div>
      </section>

      <div className="mt-16">
        <DarkCTA />
      </div>
    </>
  );
}
