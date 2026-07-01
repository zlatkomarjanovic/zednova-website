import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getAllServices } from "@/lib/queries";
import {
  getParentSlugForServiceSlug,
  parentServicePath,
} from "@/lib/content/service-routes";
import {
  PRIMARY_SERVICE_GROUPS,
  PRIMARY_SERVICE_TAB_LABELS,
} from "@/lib/content/service-groups";
import type { Service } from "@/lib/types";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { BlueprintColumnFrame } from "@/ui/BlueprintColumnFrame";
import { CmsImage } from "@/ui/CmsImage";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services | Lead-Gen Websites, CRM, AI Receptionists & Custom Software | ZedNova",
  description:
    "Lead-gen websites, CRM follow-up automation, AI receptionists, custom in-house software for SMBs, platform migrations, and monthly support for small businesses.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    title: "Services | ZedNova Studio",
    description:
      "Lead-gen websites, CRM automation, AI receptionists, custom software, platform migrations, and monthly support for small businesses.",
  },
  robots: { index: true, follow: true },
};

type ServiceCard = {
  slug: string;
  parentSlug: string;
  label: string;
  title: string;
  shortDescription: string;
  image: string;
  startingPrice?: string;
  timeline: string;
  icon: string;
};

function pickPrimaryServices(services: Service[]): ServiceCard[] {
  const cards: ServiceCard[] = [];

  for (const group of PRIMARY_SERVICE_GROUPS) {
    const service = services.find(
      (s) => s.group === group && getParentSlugForServiceSlug(s.slug) != null,
    );
    if (!service) continue;

    cards.push({
      slug: service.slug,
      parentSlug: getParentSlugForServiceSlug(service.slug)!,
      label: PRIMARY_SERVICE_TAB_LABELS[group],
      title: service.heroHeadline ?? service.title,
      shortDescription: service.shortDescription,
      image: service.image,
      startingPrice: service.pricingSignal,
      timeline: service.timeline,
      icon: service.icon,
    });
  }

  return cards;
}

export default async function ServicesPage() {
  const allServices = await getAllServices();
  const cards = pickPrimaryServices(allServices);

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            path: "/services",
            name: "Services — ZedNova Studio",
            description:
              "Lead-gen websites, CRM automation, AI receptionists, portals and dashboards, and monthly support for small businesses.",
          }),
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Services" },
          ]),
        ]}
      />

      <section data-theme="light" className="relative bg-zn-bg">
        <div className="zn-container-guides relative">
          <BlueprintColumnFrame>
            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Services" },
                  ]}
                  className="mb-8"
                />
                <Reveal>
                  <SectionLabel withRule={false}>What we build</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Six services that fix where your business leaks leads, calls, and time"
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    Each service targets a specific part of the funnel — the website,
                    the follow-up, the receptionist, the portals, the migration, and
                    the ongoing support. Pick the one leaking the most, or combine them.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Tell us what you need
                    </Button>
                    <Button href="/work" variant="link" withArrow>
                      See our work
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Zigzag services grid */}
            <div className="zn-container-inset py-[clamp(3rem,6vw,5rem)]">
              <div className="flex flex-col gap-[clamp(3rem,7vw,6rem)]">
                {cards.map((card, index) => {
                  const reversed = index % 2 === 1;
                  const href = parentServicePath(card.parentSlug);
                  return (
                    <Reveal key={card.slug} delay={index * 0.04}>
                      <div
                        className={cn(
                          "grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16",
                        )}
                      >
                        {/* Content */}
                        <div className={cn(reversed ? "lg:order-2" : "lg:order-1")}>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-zn-text-3">
                              0{index + 1}
                            </span>
                            <span className="zn-label text-zn-text-3">
                              {card.label}
                            </span>
                          </div>
                          <h2 className="mt-4 max-w-xl zn-h2 font-sans font-normal text-zn-text">
                            {card.title}
                          </h2>
                          <p className="mt-5 max-w-lg text-lg leading-relaxed text-zn-text-2">
                            {card.shortDescription}
                          </p>
                          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                            {card.startingPrice && (
                              <div>
                                <dt className="zn-label text-zn-text-3">Starting at</dt>
                                <dd className="mt-1 font-mono text-sm text-zn-text">
                                  {card.startingPrice}
                                </dd>
                              </div>
                            )}
                            <div>
                              <dt className="zn-label text-zn-text-3">Timeline</dt>
                              <dd className="mt-1 font-mono text-sm text-zn-text">
                                {card.timeline}
                              </dd>
                            </div>
                          </dl>
                          <div className="mt-8">
                            <Button href={href} withArrow>
                              Explore {card.label}
                            </Button>
                          </div>
                        </div>

                        {/* Image */}
                        <div className={cn(reversed ? "lg:order-1" : "lg:order-2")}>
                          <Link
                            href={href}
                            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-zn-border bg-zn-bg-2"
                          >
                            <CmsImage
                              src={card.image}
                              alt={card.title}
                              fill
                              sizes="(min-width: 1024px) 50vw, 100vw"
                              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                            />
                            <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-zn-border bg-zn-bg/80 backdrop-blur-sm transition-colors group-hover:bg-zn-text">
                              <ArrowUpRight className="size-4 text-zn-text transition-colors group-hover:text-zn-bg" aria-hidden="true" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </BlueprintColumnFrame>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
