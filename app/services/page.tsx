import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllServices } from "@/lib/queries";
import { PageHero } from "@/components/sections/PageHero";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { Stagger } from "@/components/animations/Reveal";
import { Button } from "@/components/shared/Button";
import { Icon } from "@/components/shared/Icon";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Ten interconnected AI and automation services that compound. Lead sites, AI receptionists, CRM automation, custom agents, and more.",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      <PageHero
        eyebrow="What we build"
        title="Revenue infrastructure, not just deliverables"
        description="Ten interconnected services that compound. Mix and match, or take the full stack."
      >
        <Button href="/contact" withArrow>
          Start a project
        </Button>
      </PageHero>

      <section className="pb-8">
        <div className="zn-container">
          <Stagger className="border-t border-zn-border" stagger={0.05}>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group grid grid-cols-[2rem_1fr_auto] items-center gap-5 border-b border-zn-border py-7 transition-colors hover:bg-zn-bg-2 sm:grid-cols-[3rem_auto_1fr_auto] sm:gap-8"
              >
                <span className="font-mono text-sm text-zn-text-3">
                  {service.number}
                </span>
                <Icon
                  name={service.icon}
                  className="hidden size-6 text-zn-text sm:block"
                />
                <div>
                  <h2 className="font-sans text-xl font-normal tracking-tight text-zn-text sm:text-2xl">
                    {service.title}
                  </h2>
                  <p className="mt-1 max-w-xl text-sm text-zn-text-2 sm:text-base">
                    {service.shortDescription}
                  </p>
                </div>
                <ArrowUpRight
                  className="size-5 text-zn-text-3 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zn-text"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
