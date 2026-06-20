import type { Metadata } from "next";
import Link from "next/link";
import { migrations } from "@/lib/content/migrations";
import { PageHero } from "@/components/sections/PageHero";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { Button } from "@/components/shared/Button";

export const metadata: Metadata = {
  title: "Migrations",
  description:
    "Migrate from Webflow, WordPress, Framer, Wix, Squarespace, or Shopify to Next.js, Sanity CMS, and headless Shopify.",
};

export default function MigrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Migrations"
        title="Move to Next.js, Sanity, and headless Shopify"
        description="We migrate websites and content from Webflow, WordPress, Framer, Wix, Squarespace, and Shopify to faster, more flexible stacks."
      >
        <Button href="/contact" withArrow>
          Plan a migration
        </Button>
      </PageHero>

      <section className="pb-4">
        <div className="zn-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {migrations.map((item) => (
            <Link
              key={item.slug}
              href={`/migrations/${item.slug}`}
              className="rounded-[2px] border border-zn-border bg-zn-bg p-7 transition-colors hover:border-zn-text hover:bg-zn-bg-2"
            >
              <h2 className="font-sans text-base font-normal text-zn-text">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
                {item.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <DarkCTA />
      </div>
    </>
  );
}
