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

import type { TableGridItem } from "@/ui/BlueprintTableGrid";



export const metadata: Metadata = {

  title: "Services",

  description:

    "Website design, Shopify development, CRM automation, AI chatbots, dashboards, n8n workflows, and migrations for clinics, ecommerce, and small business.",

  alternates: { canonical: "/services" },

};



const GROUP_TAGLINES: Record<string, string> = {

  "AI Tools":

    "Phone assistants, chatbots, and AI agents — what teams ask for most right now.",

  Automation:

    "CRM, booking, email, SMS, and workflow automation that runs without you watching.",

  Websites: "Sites that load fast, rank, and convert.",

  Ecommerce: "Stores that turn first-time buyers into repeat customers.",

  "Custom software":

    "Portals, dashboards, booking flows, and internal tools built for your team.",

  Migrations:

    "Move from Webflow, WordPress, Framer, Wix, Squarespace, or Shopify to a modern stack.",

};



export default async function ServicesPage() {

  const [

    groups,

    serviceNavGroups,

    customSoftwareNavItems,

    migrations,

    serviceMegaMenuCards,

  ] = await Promise.all([

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



  const serviceGroupItems = (groupName: string): TableGridItem[] => {

    const match = groups.find((g) => g.group === groupName);

    if (!match) return [];

    return match.services.map((service) => ({

      href: `/services/${service.slug}`,

      title: service.title,

      description: service.shortDescription,

      icon: service.icon,

    }));

  };



  const gridGroups = [

    {

      id: "ai-tools",

      label: "AI Tools",

      headline: GROUP_TAGLINES["AI Tools"],

      items: navGroupItems("AI Tools"),

    },

    {

      id: "automation",

      label: "AI automation",

      headline: GROUP_TAGLINES.Automation,

      items: navGroupItems("Automation"),

    },

    {

      id: "websites",

      label: "Websites",

      headline: GROUP_TAGLINES.Websites,

      items: serviceGroupItems("Websites"),

    },

    {

      id: "ecommerce",

      label: "Ecommerce",

      headline: GROUP_TAGLINES.Ecommerce,

      items: navGroupItems("Shopify & Ecommerce"),

    },

    {

      id: "custom-software",

      label: "Custom software",

      headline: GROUP_TAGLINES["Custom software"],

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

      <section data-theme="light" className="relative bg-zn-bg">

        <div className="zn-container-guides relative">

          <BlueprintColumnFrame>

            <div className="relative border-b border-zn-border">

              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />

              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />

              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">

                <Reveal>

                  <SectionLabel withRule={false}>What we build</SectionLabel>

                </Reveal>

                <TextReveal

                  as="h1"

                  text="Website design, Shopify, automation, and AI tools"

                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"

                />

                <Reveal delay={0.1}>

                  <p className="mt-6 max-w-2xl zn-prose">

                    Pick one service or combine a few. We scope each project

                    around what your business actually needs.

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

