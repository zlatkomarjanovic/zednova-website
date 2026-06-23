import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { migrations } from "@/lib/content/migrations";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/shared/Button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { DarkCTA } from "@/components/sections/DarkCTA";

export const metadata: Metadata = {
  title: "Migrations",
  description:
    "Migrate from Webflow, WordPress, Framer, Wix, Squarespace, or Shopify to Next.js, Sanity CMS, and headless Shopify.",
  alternates: { canonical: "/migrations" },
};

export default async function MigrationsPage() {
  const sorted = [...migrations].sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Hero — guides framing */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
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
          </div>
        </div>
      </section>

      {/* Migration grid — guides framing */}
      <section
        data-theme="light"
        className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]"
      >
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="zn-container-inset py-14 lg:py-16">
              <Reveal>
                <SectionLabel withRule={false}>All migrations</SectionLabel>
              </Reveal>
              <TextReveal
                as="h2"
                text="From anything, to a modern stack"
                className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
              />
              <Reveal delay={0.08}>
                <p className="zn-prose mt-5 max-w-lg">
                  Each migration keeps your content, redirects, and SEO intact.
                  Pick the path that matches where you are today.
                </p>
              </Reveal>
              <Stagger
                className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-zn-border bg-zn-border sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.04}
              >
                {sorted.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/migrations/${item.slug}`}
                    className="group flex h-full flex-col gap-3 bg-zn-bg p-7 transition-colors hover:bg-zn-bg-2"
                  >
                    <span className="font-mono text-sm text-zn-text-3">
                      {String(item.order).padStart(2, "0")}
                    </span>
                    <h3 className="font-sans text-lg font-normal leading-snug text-zn-text">
                      {item.title}
                    </h3>
                    <p className="zn-prose line-clamp-3">{item.shortDescription}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm text-zn-text-3">
                      Explore
                      <ArrowUpRight
                        className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
