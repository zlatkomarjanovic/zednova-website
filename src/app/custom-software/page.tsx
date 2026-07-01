import type { Metadata } from "next";

import {

  getCustomSoftwareGroups,

  getCustomSoftwareNavItems,

} from "@/lib/queries";

import { Reveal } from "@/components/animations/Reveal";

import { TextReveal } from "@/components/animations/TextReveal";

import { Button } from "@/ui/Button";

import { SectionLabel } from "@/ui/SectionLabel";

import { BlueprintCross } from "@/ui/BlueprintCross";

import { CustomSoftwarePageGrids } from "@/features/custom-software/CustomSoftwarePageGrids";

import { DarkCTA } from "@/features/home/DarkCTA";



export const metadata: Metadata = {

  title: "Custom Software — Web Apps, Portals & Dashboards | ZedNova",

  description:
    "Custom web apps, client portals, staff dashboards, booking systems, intake forms, and admin panels for small teams that have outgrown spreadsheets and no-code tools.",

  alternates: { canonical: "/custom-software" },

  openGraph: {
    type: "website",
    url: "/custom-software",
    title: "Custom Software — ZedNova Studio",
    description:
      "Web apps, client portals, staff dashboards, booking systems, and admin panels.",
  },

  robots: { index: true, follow: true },

};



export default async function CustomSoftwarePage() {

  const [customSoftwareGroups, customSoftwareNavItems] = await Promise.all([

    getCustomSoftwareGroups(),

    getCustomSoftwareNavItems(),

  ]);



  const groups = customSoftwareGroups.map((group) => ({

    id: group.id,

    label: group.label,

    headline: group.headline,

    description: group.description,

    items: group.items.map((item) => ({

      href: item.href,

      title: item.title,

      description: item.shortDescription,

    })),

  }));



  const allItems = customSoftwareNavItems.map((item) => ({

    href: item.href,

    title: item.title,

    description: item.shortDescription,

  }));



  return (

    <>

      <section

        data-theme="light"

        className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]"

      >

        <div className="zn-container-guides relative">

          <div className="relative border-x border-b border-zn-border">

            <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />

            <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />



            <div className="relative border-b border-zn-border">

              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />

              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />

              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">

                <Reveal>

                  <SectionLabel withRule={false}>Custom software</SectionLabel>

                </Reveal>

                <TextReveal

                  as="h1"

                  text="Portals, dashboards, and tools built for your team"

                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"

                />

                <Reveal delay={0.1}>

                  <p className="mt-6 max-w-2xl zn-prose">

                    We build client portals, staff dashboards, booking systems,

                    intake forms, and internal tools for small teams that have

                    outgrown spreadsheets, WordPress, Webflow, Wix, Squarespace,

                    and Airtable.

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



            <CustomSoftwarePageGrids groups={groups} allItems={allItems} />



            <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />

            <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />

          </div>

        </div>

      </section>



      <DarkCTA />

    </>

  );

}

