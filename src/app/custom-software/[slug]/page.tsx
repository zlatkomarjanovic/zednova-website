import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";

import {
  getAllCustomSoftwareSlugs,
  getAllPosts,
  getCustomSoftwareBySlug,
  getCustomSoftwareRelatedPortfolioProjects,
  getServicesBySlugs,
} from "@/lib/queries";
import { breadcrumbJsonLd } from "@/lib/seo";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { Tag } from "@/ui/Tag";
import { DarkCTA } from "@/features/home/DarkCTA";
import { ProcessSteps } from "@/features/home/ProcessSteps";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { FaqSection } from "@/components/sections/FaqSection";
import { TemplateSection } from "@/ui/TemplateSection";
import { PortfolioWorkGrid } from "@/features/work/PortfolioWorkGrid";

export async function generateStaticParams() {
  const slugs = await getAllCustomSoftwareSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCustomSoftwareBySlug(slug);
  if (!item) return {};

  const title = item.seo?.seoTitle ?? item.title;
  const description = item.seo?.seoDescription ?? item.shortDescription;
  const canonical = item.seo?.seoCanonical ?? `/custom-software/${slug}`;

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

export default async function CustomSoftwareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getCustomSoftwareBySlug(slug);
  if (!item) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Custom Software", href: "/custom-software" },
    { label: item.title },
  ];

  const includedItems: { title: string; description?: string }[] =
    item.whatsIncluded ??
    item.keyFeatures ??
    item.deliverables?.map((title) => ({ title })) ??
    [];

  const [relatedServices, relatedWork, allPosts] = await Promise.all([
    item.relatedServices?.length
      ? getServicesBySlugs(item.relatedServices)
      : Promise.resolve([]),
    getCustomSoftwareRelatedPortfolioProjects(item),
    getAllPosts(),
  ]);

  const relatedInsights =
    item.relatedInsights && item.relatedInsights.length > 0
      ? allPosts.filter((post) => item.relatedInsights!.includes(post.slug)).slice(0, 3)
      : [];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />

      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset pb-16 pt-32 lg:pb-20 lg:pt-44">
                <Breadcrumbs items={crumbs} />
                <Reveal>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <SectionLabel withRule={false}>Custom software</SectionLabel>
                    {item.softwareType ? <Tag>{item.softwareType}</Tag> : null}
                  </div>
                </Reveal>
                <TextReveal
                  as="h1"
                  text={item.title}
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    {item.shortDescription}
                  </p>
                </Reveal>
                {item.whatItIs && item.whatItIs !== item.shortDescription ? (
                  <Reveal delay={0.12}>
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-zn-text-2">
                      {item.whatItIs}
                    </p>
                  </Reveal>
                ) : null}
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Scope this build
                    </Button>
                    <Button href="/custom-software" variant="link" withArrow>
                      All custom software
                    </Button>
                    {item.timeline ? (
                      <span className="text-sm text-zn-text-3">{item.timeline}</span>
                    ) : null}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {(item.problemSolved || item.startingPrice != null) && (
        <TemplateSection>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            {item.problemSolved ? (
              <div>
                <SectionLabel withRule={false}>Problem we solve</SectionLabel>
                <p className="zn-prose mt-6 text-zn-text-2">{item.problemSolved}</p>
              </div>
            ) : null}
            {item.startingPrice != null ? (
              <div className="rounded-[2px] border border-zn-border bg-zn-bg-2/50 p-7">
                <p className="zn-label text-zn-text-3">Typical investment</p>
                <p className="mt-3 font-mono text-2xl text-zn-text">
                  From ${item.startingPrice.toLocaleString()}
                </p>
                {item.timeline ? (
                  <p className="mt-2 text-sm text-zn-text-3">{item.timeline}</p>
                ) : null}
                {includedItems.length > 0 ? (
                  <ul className="mt-6 grid gap-3 border-t border-zn-border pt-6">
                    {includedItems.map((entry) => (
                      <li key={entry.title} className="flex items-start gap-3 text-sm text-zn-text">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-zn-text-3"
                          aria-hidden="true"
                        />
                        <span>{entry.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-6">
                  <Button href="/contact" withArrow className="w-full sm:w-auto">
                    Scope this build
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </TemplateSection>
      )}

      {item.targetAudience && item.targetAudience.length > 0 && (
        <TemplateSection>
          <Reveal>
            <SectionLabel withRule={false}>Who it&apos;s for</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Built for these teams"
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.05}>
            {item.targetAudience.map((profile, i) => (
              <div
                key={profile}
                className="rounded-[2px] border border-zn-border bg-zn-bg-2 p-7"
              >
                <span className="font-mono text-sm text-zn-text-3">0{i + 1}</span>
                <p className="mt-4 leading-relaxed text-zn-text">{profile}</p>
              </div>
            ))}
          </Stagger>
        </TemplateSection>
      )}

      {item.keyFeatures && item.keyFeatures.length > 0 && (
        <TemplateSection theme="dark">
          <Reveal>
            <SectionLabel withRule={false} className="text-zn-inv-2">
              Key features
            </SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="What you get in the build"
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
          />
          <Stagger
            className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-zn-border-dk bg-zn-border-dk sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {item.keyFeatures.map((feature, i) => (
              <div key={feature.title} className="bg-zn-dark p-8">
                <span className="font-mono text-sm text-zn-inv-2">0{i + 1}</span>
                <h3 className="mt-4 font-sans text-lg font-normal text-zn-inv">
                  {feature.title}
                </h3>
                {feature.description ? (
                  <p className="mt-2 leading-relaxed text-zn-inv-2">{feature.description}</p>
                ) : null}
              </div>
            ))}
          </Stagger>
        </TemplateSection>
      )}

      {includedItems.length > 0 && (
        <TemplateSection>
          <Reveal>
            <SectionLabel withRule={false}>What&apos;s included</SectionLabel>
          </Reveal>
          <Stagger
            className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2"
            stagger={0.04}
          >
            {includedItems.map((entry) => (
              <div
                key={entry.title}
                className="flex items-start gap-3 border-b border-zn-border pb-4 text-zn-text"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-zn-text-3" aria-hidden="true" />
                <div>
                  <p className="font-medium">{entry.title}</p>
                  {entry.description ? (
                    <p className="mt-1 text-sm text-zn-text-2">{entry.description}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </Stagger>
        </TemplateSection>
      )}

      {item.processSteps && item.processSteps.length > 0 && (
        <TemplateSection>
          <Reveal>
            <SectionLabel withRule={false}>Our process</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text={`How we deliver ${item.title.toLowerCase()}`}
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
          />
          <div className="mt-16">
            <ProcessSteps steps={item.processSteps} />
          </div>
        </TemplateSection>
      )}

      {(item.technologies?.length || item.integrations?.length) && (
        <TemplateSection className="bg-zn-bg-2/40">
          <div className="grid gap-10 lg:grid-cols-2">
            {item.technologies?.length ? (
              <div>
                <SectionLabel withRule={false}>Technologies</SectionLabel>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="zn-pill-tag text-zn-text-2">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {item.integrations?.length ? (
              <div>
                <SectionLabel withRule={false}>Integrations</SectionLabel>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.integrations.map((integration) => (
                    <span key={integration} className="zn-pill-tag text-zn-text-2">
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </TemplateSection>
      )}

      {item.faqs && item.faqs.length > 0 ? (
        <FaqSection faqs={item.faqs} title={`${item.title} FAQ`} />
      ) : null}

      {relatedWork.length > 0 && (
        <TemplateSection withBlueprintGrid>
          <Reveal>
            <SectionLabel withRule={false}>Related work</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Projects and case studies"
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
          />
          <PortfolioWorkGrid projects={relatedWork} />
        </TemplateSection>
      )}

      {relatedServices.length > 0 && (
        <TemplateSection>
          <SectionLabel withRule={false}>Related services</SectionLabel>
          <TextReveal
            as="h2"
            text="Often combined with"
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col gap-3 rounded-[2px] border border-zn-border bg-zn-bg-2 p-6 transition-colors hover:border-zn-text"
              >
                <span className="font-mono text-xs text-zn-text-3">{service.number}</span>
                <span className="font-sans text-lg font-normal text-zn-text">
                  {service.title}
                </span>
                <span className="text-sm leading-relaxed text-zn-text-2">
                  {service.shortDescription}
                </span>
              </Link>
            ))}
          </div>
        </TemplateSection>
      )}

      {relatedInsights.length > 0 && (
        <TemplateSection borderBottom={false}>
          <SectionLabel withRule={false}>Related insights</SectionLabel>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedInsights.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group border border-zn-border p-6 transition hover:border-zn-text-3"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-zn-text-3">
                  {post.category}
                </p>
                <p className="mt-2 font-sans text-lg text-zn-text">{post.title}</p>
                <p className="mt-2 line-clamp-2 text-sm text-zn-text-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </TemplateSection>
      )}

      <DarkCTA
        heading={`Need ${item.title.toLowerCase()}?`}
        sub="Tell us what your team or clients need to do in the app — we scope workflows, integrations, and launch timing on the first call."
        ctaLabel="Scope this build"
      />
    </>
  );
}
