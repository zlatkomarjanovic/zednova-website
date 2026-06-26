import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllMigrations, getMigrationBySlug, getInsightsByMigration, getServicesBySlugs } from "@/lib/queries";
import { breadcrumbJsonLd, serviceAtJsonLd, faqPageJsonLd } from "@/lib/seo";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { FaqSection } from "@/components/sections/FaqSection";
import { TemplateSection } from "@/ui/TemplateSection";
import { MigrationPlatformPill } from "@/ui/MigrationPlatformPill";
import { migrationPlatformLabel } from "@/lib/migrations/platform-icons";
import Link from "next/link";
import { Check } from "lucide-react";

export async function generateStaticParams() {
  const migrations = await getAllMigrations();
  return migrations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getMigrationBySlug(slug);
  if (!item) return {};

  const title = item.seo?.seoTitle ?? item.title;
  const description = item.seo?.seoDescription ?? item.shortDescription;
  const canonical = item.seo?.seoCanonical ?? `/migrations/${slug}`;

  return {
    title,
    description,
    keywords: item.seo?.keywords,
    alternates: { canonical },
    robots: item.seo?.seoNoIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: item.seo?.ogImage ? [item.seo.ogImage] : undefined,
    },
    twitter: {
      card: (item.seo?.twitterCard ?? "summary_large_image") as
        | "summary"
        | "summary_large_image"
        | "player"
        | "app",
      title: item.seo?.twitterTitle ?? title,
      description: item.seo?.twitterDescription ?? description,
    },
  };
}

const FALLBACK_BENEFITS = [
  "Keep your URLs and SEO — 301 redirects on every old path",
  "Content lives in Sanity so your team edits without a developer",
  "Sub-2-second load times on mobile, the make-or-break for ranking",
  "No plugins to maintain, no security patches, no theme lock-in",
];

const FALLBACK_STEPS = [
  { step: 1, title: "Audit", description: "We inventory your current content, URLs, redirects, and integrations before moving anything." },
  { step: 2, title: "Map", description: "We map every page and record to its new home in Next.js and Sanity so nothing is lost." },
  { step: 3, title: "Build", description: "We rebuild on Next.js with Sanity CMS, preserving design, SEO metadata, and URL structure." },
  { step: 4, title: "Launch", description: "We cut over with 301 redirects in place, test every page, and monitor for the first week." },
];

export default async function MigrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getMigrationBySlug(slug);
  if (!item) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Migrations", href: "/migrations" },
    { label: item.title },
  ];

  const benefits = item.whatsIncluded?.length
    ? item.whatsIncluded.map((b) => b.title)
    : item.deliverables?.length
      ? item.deliverables
      : FALLBACK_BENEFITS;

  const steps = item.processSteps?.length ? item.processSteps : FALLBACK_STEPS;
  const headline = item.heroHeadline ?? item.title;
  const subhead = item.heroSubhead ?? item.description;
  const target = item.targetPlatform ?? item.title.split(" to ")[1] ?? "a modern stack";

  const [relatedInsights, relatedServices] = await Promise.all([
    getInsightsByMigration(slug),
    item.relatedServices?.length ? getServicesBySlugs(item.relatedServices) : Promise.resolve([]),
  ]);

  const schemas: object[] = [
    serviceAtJsonLd({
      path: `/migrations/${item.slug}`,
      title: item.title,
      description: item.shortDescription ?? item.description,
      serviceType: item.platformIcons
        ? migrationPlatformLabel(item.platformIcons)
        : item.sourcePlatform
          ? `${item.sourcePlatform} to ${item.targetPlatform ?? "Next.js"}`
          : "Migration",
      pricingSignal: item.pricingSignal,
      timeline: item.timeline,
    }),
    breadcrumbJsonLd(crumbs),
  ];
  if (item.faqs && item.faqs.length > 0) schemas.push(faqPageJsonLd(item.faqs));

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset pb-16 pt-32 lg:pb-20 lg:pt-44">
                <Breadcrumbs items={crumbs} />
                <Reveal>
                  <div className="mt-6">
                    {item.platformIcons ? (
                      <MigrationPlatformPill
                        from={item.platformIcons.from}
                        to={item.platformIcons.to}
                        className="mb-1"
                      />
                    ) : (
                      <SectionLabel withRule={false}>
                        {item.sourcePlatform
                          ? `${item.sourcePlatform} → ${item.targetPlatform ?? "Next.js"}`
                          : "Migration"}
                      </SectionLabel>
                    )}
                  </div>
                </Reveal>
                <TextReveal
                  as="h1"
                  text={headline}
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    {subhead}
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
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 border-b border-zn-border pb-4 text-zn-text"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-zn-text-3" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                {item.timeline && (
                  <p className="mt-6 text-sm text-zn-text-3">
                    Typical timeline: <span className="text-zn-text-2">{item.timeline}</span>
                  </p>
                )}
                {item.pricingSignal && (
                  <p className="mt-2 text-sm text-zn-text-3">
                    {item.pricingSignal}
                  </p>
                )}
              </div>

              <div>
                <Reveal>
                  <SectionLabel withRule={false}>How we migrate</SectionLabel>
                </Reveal>
                <ol className="mt-6 grid gap-6">
                  {steps.map((s) => (
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

      {item.faqs && item.faqs.length > 0 && (
        <FaqSection faqs={item.faqs} title="Migration FAQ" />
      )}

      {relatedServices.length > 0 && (
        <TemplateSection>
          <SectionLabel withRule={false}>Related services</SectionLabel>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group border border-zn-border p-6 transition hover:border-zn-text-3"
              >
                <p className="font-sans text-lg text-zn-text">{s.title}</p>
                <p className="mt-2 text-sm text-zn-text-2 line-clamp-2">{s.shortDescription}</p>
              </Link>
            ))}
          </div>
        </TemplateSection>
      )}

      {relatedInsights.length > 0 && (
        <TemplateSection borderBottom={false}>
          <SectionLabel withRule={false}>Related insights</SectionLabel>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedInsights.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group border border-zn-border p-6 transition hover:border-zn-text-3"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-zn-text-3">
                  {post.category}
                </p>
                <p className="mt-2 font-sans text-lg text-zn-text">{post.title}</p>
                <p className="mt-2 text-sm text-zn-text-2 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </TemplateSection>
      )}

      <DarkCTA
        heading={`Ready to migrate to ${target}?`}
        sub="We scope content, URLs, redirects, and launch timing before we move a single page. Tell us where you are today and where you want to go."
        ctaLabel="Plan this migration"
      />
    </>
  );
}
