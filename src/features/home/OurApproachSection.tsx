import { getPortfolioProjects } from "@/lib/queries";
import { HOMEPAGE_PILLARS } from "@/lib/content/homepage-pillars";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { WebsiteBuilderAnimation } from "@/components/animations/WebsiteBuilderAnimation";
import { CRMAutomationAnimation } from "@/components/animations/CRMAutomationAnimation";
import { AIChatbotAnimation } from "@/components/animations/AIChatbotAnimation";
import { SectionLabel } from "@/ui/SectionLabel";
import { BenefitsGrid } from "@/features/home/BenefitsGrid";

const PILLAR_VISUALS = [
  <WebsiteBuilderAnimation key="website-builder" />,
  <CRMAutomationAnimation key="crm-automation" />,
  <AIChatbotAnimation key="ai-chatbot" />,
];

export async function OurApproachSection() {
  const portfolio = await getPortfolioProjects();

  const benefits = HOMEPAGE_PILLARS.map((pillar, i) => ({
    ...pillar,
    image: portfolio[i % portfolio.length]?.image ?? "",
    accent: portfolio[i % portfolio.length]?.accent,
    visual: PILLAR_VISUALS[i],
  }));

  return (
    <section data-theme="light" className="relative zn-section">
      <BlueprintGrid />
      <div className="zn-container relative">
        <Reveal>
          <SectionLabel withRule={false}>Our approach</SectionLabel>
        </Reveal>
        <TextReveal
          as="h2"
          text="Choose the part of the business that needs a better website, internal tool, or automated workflow. We build full-stack web products, custom software, and AI automations that connect the full funnel."
          className="mt-6 max-w-3xl zn-h2 font-sans font-normal"
        />
      </div>
      <div className="zn-container-guides relative mt-14">
        <BenefitsGrid items={benefits} />
      </div>
    </section>
  );
}
