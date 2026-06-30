import type { Metadata } from "next";
import {
  getAllMigrations,
  getCustomSoftwareNavItems,
  getServiceGroups,
  getServiceMegaMenuCards,
  getServiceNavGroups,
} from "@/lib/queries";
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

const GROUP_TAGLINES: Record<string, string> = {
  "Lead-Gen Websites & AI Search":
    "Fast websites that explain your offer, rank on Google and AI search, and turn visitors into calls, forms, and bookings.",
  "CRM & Follow-Up Automation":
    "Every form, call, and booking request gets captured, followed up with, and tracked until it becomes a booked call or customer.",
  "AI Receptionist & Booking Automation":
    "AI voice and chat assistants that answer calls, qualify leads, book appointments, and text back missed calls.",
  "Custom Portals & Dashboards":
    "Client portals, staff dashboards, booking systems, and internal tools for teams outgrowing spreadsheets.",
  "Monthly Support & Improvements":
    "Ongoing help for your website, CRM automations, AI receptionist, dashboards, forms, and integrations.",
  "Shopify & Ecommerce (Legacy)":
    "Shopify, Klaviyo, and ecommerce work — kept for SEO. Not a primary offering.",
  Migrations:
    "Move from Webflow, WordPress, Framer, Wix, or Squarespace to Next.js + Sanity.",
};

export default async function ServicesPage() {
  const [groups, serviceNavGroups, customSoftwareNavItems, migrations, serviceMegaMenuCards] =
    await Promise.all([
      getServiceGroups(),
      getServiceNavGroups(),
      getCustomSoftwareNavItems(),
      getAllMigrations(),
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

  const gridGroups = [
    {
      id: "lead-gen-websites",
      label: "Lead-Gen Websites & AI Search",
      headline: GROUP_TAGLINES["Lead-Gen Websites & AI Search"],
      items: navGroupItems("Lead-Gen Websites & AI Search"),
    },
    {
      id: "crm-automation",
      label: "CRM & Follow-Up Automation",
      headline: GROUP_TAGLINES["CRM & Follow-Up Automation"],
      items: navGroupItems("CRM & Follow-Up Automation"),
    },
    {
      id: "ai-receptionist",
      label: "AI Receptionist & Booking",
      headline: GROUP_TAGLINES["AI Receptionist & Booking Automation"],
      items: navGroupItems("AI Receptionist & Booking Automation"),
    },
    {
      id: "portals-dashboards",
      label: "Custom Portals & Dashboards",
      headline: GROUP_TAGLINES["Custom Portals & Dashboards"],
      items: customSoftwareNavItems.map((item) => ({
        href: item.href,
        title: item.title,
        description: item.shortDescription,
      })),
      exploreHref: "/custom-software",
      exploreLabel: "All custom software",
    },
    {
      id: "migrations",
      label: "Migrations",
      headline: GROUP_TAGLINES.Migrations,
      items: [...migrations]
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          href: `/migrations/${item.slug}`,
          title: item.title,
          description: item.shortDescription,
        })),
      exploreHref: "/migrations",
      exploreLabel: "All migrations",
    },
    {
      id: "monthly-support",
      label: "Monthly Support",
      headline: GROUP_TAGLINES["Monthly Support & Improvements"],
      items: navGroupItems("Monthly Support & Improvements"),
    },
  ];

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
