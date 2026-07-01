import type { Metadata } from "next";

import { getAllMigrations } from "@/lib/queries";

import { Reveal } from "@/components/animations/Reveal";

import { TextReveal } from "@/components/animations/TextReveal";

import { Button } from "@/ui/Button";

import { SectionLabel } from "@/ui/SectionLabel";

import { BlueprintCross } from "@/ui/BlueprintCross";

import { MigrationsPageGrids } from "@/features/migrations/MigrationsPageGrids";

import { DarkCTA } from "@/features/home/DarkCTA";



export const metadata: Metadata = {

  title: "Migrations — Move to Next.js & Sanity | ZedNova Studio",

  description:
    "Platform migrations from WordPress, Webflow, Wix, Framer, and Shopify to Next.js and Sanity. Preserve SEO, URLs, and content with a clean redirect map.",

  alternates: { canonical: "/migrations" },

  openGraph: {
    type: "website",
    url: "/migrations",
    title: "Migrations — ZedNova Studio",
    description:
      "Move from WordPress, Webflow, Wix, Framer, or Shopify to Next.js and Sanity.",
  },

  robots: { index: true, follow: true },

};



export default async function MigrationsPage() {

  const migrations = await getAllMigrations();



  const items = [...migrations]

    .sort((a, b) => a.order - b.order)

    .map((item) => ({

      href: `/migrations/${item.slug}`,

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

                  <SectionLabel withRule={false}>Migrations</SectionLabel>

                </Reveal>

                <TextReveal

                  as="h1"

                  text="Move to Next.js, Sanity, and headless Shopify"

                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"

                />

                <Reveal delay={0.1}>

                  <p className="mt-6 max-w-2xl zn-prose">

                    We migrate websites and content from Webflow, WordPress,

                    Framer, Wix, Squarespace, and Shopify to faster, more

                    flexible stacks — without losing URLs, SEO, or content.

                  </p>

                </Reveal>

                <Reveal delay={0.15}>

                  <div className="mt-10 flex flex-wrap items-center gap-4">

                    <Button href="/contact" withArrow>

                      Plan a migration

                    </Button>

                    <Button href="/services" variant="link" withArrow>

                      See services

                    </Button>

                  </div>

                </Reveal>

              </div>

            </div>



            <MigrationsPageGrids items={items} />



            <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />

            <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />

          </div>

        </div>

      </section>



      <DarkCTA />

    </>

  );

}

