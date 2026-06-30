import type { Metadata } from "next";
import {
  getServiceMegaMenuCards,
  getServiceNavGroups,
} from "@/lib/queries";
import {
  PRIMARY_SERVICE_GROUPS,
  PRIMARY_SERVICE_TAGLINES,
} from "@/lib/content/nav-menu";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { BlueprintColumnFrame } from "@/ui/BlueprintColumnFrame";
import {
  ServicesFilterableGrids,
  type ServiceGridEntry,
} from "@/features/services/ServicesFilterableGrids";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import type { TableGridItem } from "@/ui/BlueprintTableGrid";

export const metadata: Metadata = {
  title: "Services — Lead-Gen Websites, CRM, AI Receptionists & Dashboards | ZedNova",
  description:
    "Lead-gen websites, CRM follow-up automation, AI receptionists, custom portals and dashboards, and monthly support for small businesses that want more booked calls and less manual admin.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    title: "Services — ZedNova Studios",
    description:
      "Lead-gen websites, CRM automation, AI receptionists, portals and dashboards, and monthly support for small businesses.",
  },
  robots: { index: true, follow: true },
};

const GROUP_TAGLINES = PRIMARY_SERVICE_TAGLINES;

const PRIMARY_NAV_GROUPS = PRIMARY_SERVICE_GROUPS;

export default async function ServicesPage() {
  const [serviceNavGroups, serviceMegaMenuCards] = await Promise.all([
    getServiceNavGroups(),
    getServiceMegaMenuCards(),
  ]);

  const navGroupItems = (groupName: string): TableGridItem[] => {
    const group = serviceNavGroups.find((g) => g.group === groupName);
    if (!group) return [];
    return group.items.map((item) => ({
      href: item.href,
      title: item.title,
      description: item.shortDescription,
    }));
  };

  const gridGroups = PRIMARY_NAV_GROUPS.map((groupName) => {
    const shortLabels: Record<string, string> = {
      "AI Receptionist & Booking Automation": "AI Receptionist & Booking",
      "Monthly Support & Improvements": "Monthly Support",
      "Platform Migrations": "Platform Migrations",
    };

    return {
      id: groupName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      label: shortLabels[groupName] ?? groupName,
      headline: GROUP_TAGLINES[groupName],
      items: navGroupItems(groupName),
      ...(groupName === "Custom Portals & Dashboards"
        ? { exploreHref: "/custom-software", exploreLabel: "All portals & dashboards" }
        : {}),
      ...(groupName === "Platform Migrations"
        ? { exploreHref: "/migrations", exploreLabel: "All migrations" }
        : {}),
    };
  });

  const coreServices = serviceMegaMenuCards.map((card) => ({
    href: card.href,
    title: card.title,
    description: card.shortDescription,
    includes: card.includes,
  }));

  const allServices: ServiceGridEntry[] = [
    ...coreServices.map((service) => ({ ...service, category: "Core" })),
    ...gridGroups.flatMap((group) =>
      group.items.map((item) => ({
        ...item,
        category: group.label,
      })),
    ),
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            path: "/services",
            name: "Services — ZedNova Studios",
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
                  text="Websites, CRM automations, and AI receptionists for small businesses"
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    Choose the part of the business that is leaking leads, calls,
                    bookings, or admin time. We build the website, CRM automation, AI
                    receptionist, or dashboard that fixes it.
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

            <ServicesFilterableGrids
              coreServices={coreServices}
              groups={gridGroups}
              allServices={allServices}
            />
          </BlueprintColumnFrame>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
