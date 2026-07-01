import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { ServicesStickyStack } from "@/features/services/ServicesStickyStack";

export type ServicesPageCard = {
  slug: string;
  parentSlug: string;
  label: string;
  title: string;
  shortDescription: string;
  image: string;
  startingPrice?: string;
  timeline: string;
  icon: string;
  href: string;
};

export function ServicesPageShowcase({ cards }: { cards: ServicesPageCard[] }) {
  return (
    <div className="relative border-t border-zn-border">
      <div className="relative border-b border-zn-border zn-container-inset py-10 md:py-12">
        <Reveal>
          <SectionLabel withRule={false}>All services</SectionLabel>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zn-text-2 md:text-lg">
            Six parent offers in a fixed order — website, follow-up, receptionist,
            custom software, migrations, and monthly support. Each row links to the
            full service page.
          </p>
        </Reveal>
      </div>

      <ServicesStickyStack cards={cards} />
    </div>
  );
}
