import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { migrations } from "@/lib/content/migrations";
import { PageHero } from "@/components/sections/PageHero";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { Button } from "@/components/shared/Button";

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
  return { title: item.title, description: item.shortDescription };
}

export default async function MigrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = migrations.find((m) => m.slug === slug);
  if (!item) notFound();

  return (
    <>
      <PageHero eyebrow="Migration" title={item.title} description={item.description}>
        <Button href="/contact" withArrow>
          Plan this migration
        </Button>
      </PageHero>
      <div className="mt-16">
        <DarkCTA
          heading={`Ready to migrate to ${item.title.split(" to ")[1] ?? "a modern stack"}?`}
          sub="We scope content, URLs, redirects, and launch timing before we move a single page."
        />
      </div>
    </>
  );
}
