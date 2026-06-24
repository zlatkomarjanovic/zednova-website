import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { migrations } from "@/lib/content/migrations";
import { breadcrumbJsonLd } from "@/lib/seo";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Check } from "lucide-react";

export async function generateStaticParams() {
  return migrations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = migrations.find((m) => m.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.shortDescription,
    alternates: { canonical: `/migrations/${slug}` },
    openGraph: {
      type: "website",
      url: `/migrations/${slug}`,
      title: item.title,
      description: item.shortDescription,
    },
  };
}

const MIGRATION_STEPS = [
  { step: 1, title: "Audit", description: "We inventory your current content, URLs, redirects, and integrations before moving anything." },
  { step: 2, title: "Map", description: "We map every page and record to its new home in Next.js and Sanity so nothing is lost." },
  { step: 3, title: "Build", description: "We rebuild on Next.js with Sanity CMS, preserving design, SEO metadata, and URL structure." },
  { step: 4, title: "Launch", description: "We cut over with 301 redirects in place, test every page, and monitor for the first week." },
];

const MIGRATION_BENEFITS = [
  "Keep your URLs and SEO — 301 redirects on every old path",
  "Content lives in Sanity so your team edits without a developer",
  "Sub-2-second load times on mobile, the make-or-break for ranking",
  "No plugins to maintain, no security patches, no theme lock-in",
];

export default async function MigrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = migrations.find((m) => m.slug === slug);
  if (!item) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Migrations", href: "/migrations" },
    { label: item.title },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />

      {/* Hero — guides framing */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset pb-16 pt-32 lg:pb-20 lg:pt-44">
                <Breadcrumbs items={crumbs} />
                <Reveal>
                  <div className="mt-6">
                    <SectionLabel withRule={false}>Migration</SectionLabel>
                  </div>
                </Reveal>
                <TextReveal
                  as="h1"
                  text={item.title}
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    {item.description}
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Plan this migration
                    </Button>
                    <Button href="/migrations" variant="link" withArrow>
                      All migrations
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get + process */}
      <section data-theme="light" className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]">
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="zn-container-inset grid gap-12 py-[clamp(3rem,6vw,5rem)] lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Reveal>
                  <SectionLabel withRule={false}>What you keep</SectionLabel>
                </Reveal>
                <ul className="mt-6 grid gap-4">
                  {MIGRATION_BENEFITS.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 border-b border-zn-border pb-4 text-zn-text"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-zn-text-3" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Reveal>
                  <SectionLabel withRule={false}>How we migrate</SectionLabel>
                </Reveal>
                <ol className="mt-6 grid gap-6">
                  {MIGRATION_STEPS.map((s) => (
                    <li key={s.step} className="grid grid-cols-[2rem_1fr] gap-4">
                      <span className="font-mono text-sm text-zn-text-3">
                        {String(s.step).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-sans text-base font-normal text-zn-text">
                          {s.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-zn-text-2">
                          {s.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DarkCTA
        heading={`Ready to migrate to ${item.title.split(" to ")[1] ?? "a modern stack"}?`}
        sub="We scope content, URLs, redirects, and launch timing before we move a single page. Tell us where you are today and where you want to go."
        ctaLabel="Plan this migration"
      />
    </>
  );
}
