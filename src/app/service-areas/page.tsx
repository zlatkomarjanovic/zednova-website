import type { Metadata } from "next";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { TemplateSection } from "@/ui/TemplateSection";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import {
  collectionPageJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Service Areas — Remote Delivery for US Businesses | ZedNova",
  description:
    "ZedNova Studio works remotely with US-based clinics, ecommerce brands, professional services firms, and service businesses. Async delivery with clear milestones and direct builder communication.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    type: "website",
    url: "/service-areas",
    title: "Service Areas — ZedNova Studio",
    description:
      "Remote delivery for US clinics, ecommerce brands, professional services, and service businesses.",
  },
  robots: { index: true, follow: true },
};

const REGIONS = [
  {
    name: "United States",
    description:
      "Primary market. ZedNova Studio LLC is a Texas-based company serving clients across all 50 states with remote, async delivery.",
  },
  {
    name: "Texas",
    description:
      "Home base. Same-day replies during Central business hours for Texas clinics, ecommerce brands, and service businesses.",
  },
  {
    name: "New York",
    description:
      "Websites, Shopify stores, CRM automation, and AI receptionists for New York service businesses and professional services firms.",
  },
  {
    name: "Florida",
    description:
      "Booking automation, missed-call text-back, and lead-gen sites for Florida clinics, medspas, and real estate teams.",
  },
  {
    name: "California",
    description:
      "Custom software, dashboards, and B2B SaaS builds for California startups and technology companies.",
  },
  {
    name: "Europe",
    description:
      "Secondary market. We work with European clinics, ecommerce brands, and product teams with async delivery and clear documentation.",
  },
];

export default function ServiceAreasPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Service areas" },
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            path: "/service-areas",
            name: "Service Areas — ZedNova Studio",
            description:
              "Remote delivery for US-based clinics, ecommerce brands, professional services, and service businesses.",
          }),
          breadcrumbJsonLd(crumbs),
          organizationJsonLd({
            description:
              "ZedNova Studio works remotely with US-based clinics, ecommerce brands, professional services firms, and service businesses.",
          }),
        ]}
      />

      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset pb-16 pt-32 lg:pb-20 lg:pt-44">
                <Breadcrumbs items={crumbs} className="mb-8" />
                <Reveal>
                  <SectionLabel withRule={false}>Service areas</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Remote delivery for US clinics, brands, and service businesses."
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    ZedNova Studio works remotely with US-based clinics,
                    ecommerce brands, professional services firms, and service
                    businesses. Projects are delivered async with clear
                    milestones, recorded walkthroughs, and direct builder
                    communication.
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

      <TemplateSection borderBottom={false}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((region) => (
            <div
              key={region.name}
              className="rounded-[2px] border border-zn-border bg-zn-bg-2 p-7"
            >
              <h2 className="font-sans text-lg font-normal text-zn-text">
                {region.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zn-text-2">
                {region.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[2px] border border-zn-border bg-zn-bg-2/60 p-7">
          <SectionLabel withRule={false}>How remote delivery works</SectionLabel>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            <li className="text-sm leading-relaxed text-zn-text-2">
              <strong className="text-zn-text">Clear milestones.</strong> You
              always know what is being built, when, and why.
            </li>
            <li className="text-sm leading-relaxed text-zn-text-2">
              <strong className="text-zn-text">Recorded walkthroughs.</strong>{" "}
              Every handoff includes a video so your team can run it.
            </li>
            <li className="text-sm leading-relaxed text-zn-text-2">
              <strong className="text-zn-text">Direct builder contact.</strong>{" "}
              No account managers — you talk to the person doing the work.
            </li>
            <li className="text-sm leading-relaxed text-zn-text-2">
              <strong className="text-zn-text">US entity.</strong> ZedNova Studio
              LLC, Texas. Real accountability, real partner.
            </li>
          </ul>
        </div>
      </TemplateSection>
    </>
  );
}
