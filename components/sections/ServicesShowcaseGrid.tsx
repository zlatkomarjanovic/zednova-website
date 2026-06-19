import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ServiceShowcaseCard } from "@/components/sections/ServiceShowcaseCard";

type ServicesShowcaseGridProps = {
  services: Service[];
  covers: { image: string; accent: string }[];
};

/** Two-column async grid — equal gaps, square cards, left higher / right lower. */
export function ServicesShowcaseGrid({ services, covers }: ServicesShowcaseGridProps) {
  return (
    <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
      {services.map((service, index) => (
        <ServiceShowcaseCard
          key={service.slug}
          service={service}
          image={covers[index]?.image}
          className={cn(index % 2 === 0 ? "md:-translate-y-6" : "md:translate-y-6")}
        />
      ))}
    </div>
  );
}
