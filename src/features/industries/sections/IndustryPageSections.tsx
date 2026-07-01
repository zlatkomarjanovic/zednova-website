"use client";

import Link from "next/link";

import type { IndustryGlanceItem, IndustryPageContent } from "@/lib/types/industry-page";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { Button } from "@/ui/Button";
import { CmsImage } from "@/ui/CmsImage";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { hasSectionContent } from "@/lib/content/resolve-industry-page";

const GLANCE_ICON_BY_KEY: Record<string, string> = {
  "glance-audience": "/icons/industry/glance-audience.svg",
  "glance-build": "/icons/industry/glance-build.svg",
  "glance-outcome": "/icons/industry/glance-outcome.svg",
};

function GlanceIcon({ item }: { item: IndustryGlanceItem }) {
  const src = item.icon ?? (item.iconKey ? GLANCE_ICON_BY_KEY[item.iconKey] : undefined);
  if (!src) return null;

  return (
    <div className="flex size-12 items-center justify-center rounded-[4px] border border-zn-border bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="size-6 object-contain" loading="lazy" />
    </div>
  );
}

type Crumb = { label: string; href?: string };

export function IndustryHeroSection({
  page,
  crumbs,
}: {
  page: IndustryPageContent;
  crumbs: Crumb[];
}) {
  const { hero } = page;

  return (
    <section data-theme="light" className="relative bg-zn-bg">
      <BlueprintGrid immediate />
      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border">
          <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
          <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />

          <div className="zn-container-inset pb-10 pt-24 text-center lg:pb-12 lg:pt-28">
            <Reveal>
              <div className="flex justify-center">
                <Breadcrumbs items={crumbs} />
              </div>
            </Reveal>
            <TextReveal
              as="h1"
              text={hero.heading}
              className="mx-auto mt-8 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
            />
            <Reveal delay={0.08}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                {hero.subheading}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href={hero.primaryCta.href} withArrow>
                  {hero.primaryCta.label}
                </Button>
                <Button href={hero.secondaryCta.href} variant="link" withArrow>
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {hero.image ? (
            <Reveal delay={0.16}>
              <div className="zn-container-inset pb-12 lg:pb-14">
                <div className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden rounded-[2px] border border-zn-border bg-zn-bg-2">
                  <CmsImage
                    src={hero.image}
                    alt={hero.imageAlt ?? page.title}
                    fill
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          ) : null}

          <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
          <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />
        </div>
      </div>
    </section>
  );
}

export function IndustryAtGlanceSection({
  section,
}: {
  section: IndustryPageContent["glance"];
}) {
  if (!hasSectionContent(section.items)) return null;
  if (!section.heading) return null;

  return (
    <section data-theme="light" className="relative bg-zn-bg">
      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border">
          <div className="zn-container-inset py-[clamp(3rem,6vw,5rem)] pb-8 md:pb-10">
            <div className="mx-auto max-w-2xl text-center">
              {section.eyebrow ? (
                <SectionLabel withRule={false}>{section.eyebrow}</SectionLabel>
              ) : null}
              <TextReveal
                as="h2"
                text={section.heading}
                className="mt-6 zn-h2 font-sans font-normal text-zn-text"
              />
              {section.subheading ? (
                <p className="zn-prose mx-auto mt-5 max-w-xl text-zn-text-2">{section.subheading}</p>
              ) : null}
            </div>
          </div>
          <Stagger className="grid grid-cols-1 border-t border-zn-border lg:grid-cols-3" stagger={0.06}>
            {section.items.map((item, index) => (
              <article
                key={item.title}
                className={cn(
                  "flex min-h-[16rem] flex-col px-8 py-10 sm:px-10 lg:px-12 lg:py-12",
                  index % 2 === 0 ? "bg-zn-bg" : "bg-zn-bg-2",
                  "border-b border-zn-border lg:border-b-0",
                  index < 2 && "lg:border-r lg:border-zn-border",
                )}
              >
                <GlanceIcon item={item} />
                <h3 className="mt-6 font-sans text-lg font-normal tracking-tight text-zn-text">
                  {item.title}
                </h3>
                {item.subtitle ? (
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-zn-text-3">
                    {item.subtitle}
                  </p>
                ) : null}
                <p className="mt-5 flex-1 text-base leading-relaxed text-zn-text-2">{item.body}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

export function IndustryProblemSection({
  section,
}: {
  section: IndustryPageContent["problems"];
}) {
  if (!hasSectionContent(section.items) || !section.heading) return null;

  return (
    <section data-theme="light" className="relative bg-zn-bg">
      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border">
          <div className="grid lg:grid-cols-2">
            <div className="zn-container-inset border-b border-zn-border py-[clamp(3rem,6vw,5rem)] lg:border-b-0 lg:py-[clamp(4rem,8vw,6rem)]">
              {section.eyebrow ? (
                <SectionLabel withRule={false}>{section.eyebrow}</SectionLabel>
              ) : null}
              <TextReveal
                as="h2"
                text={section.heading}
                className="mt-6 zn-h2 font-sans font-normal text-zn-text"
              />
              {section.subheading ? (
                <p className="mt-5 text-base leading-relaxed text-zn-text-2">{section.subheading}</p>
              ) : null}
              {section.cta ? (
                <div className="mt-8">
                  <Button href={section.cta.href} variant="link" withArrow>
                    {section.cta.label}
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="border-t border-zn-border lg:border-l lg:border-t-0">
              <Stagger className="divide-y divide-zn-border" stagger={0.05}>
                {section.items.map((problem, index) => (
                  <article key={problem.title} className="flex gap-6 px-8 py-8 sm:px-10 lg:px-12 lg:py-10">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[2px] border border-zn-border bg-white font-mono text-xs tabular-nums text-zn-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-normal tracking-tight text-zn-text">
                        {problem.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-zn-text-2">
                        {problem.body}
                      </p>
                    </div>
                  </article>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndustrySegmentsSection({
  section,
}: {
  section: IndustryPageContent["segments"];
}) {
  if (!hasSectionContent(section.cards) || !section.heading) return null;

  const total = section.cards.length;
  const remainder = total % 3;

  function segmentSpanClass(index: number) {
    if (remainder === 2 && index >= total - 2) return "lg:col-span-3";
    return "lg:col-span-2";
  }

  return (
    <section data-theme="light" className="relative bg-zn-bg pb-48">
      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border">
          <div className="zn-container-inset py-[clamp(3rem,6vw,5rem)]">
            <div className="mx-auto max-w-2xl text-center">
              {section.eyebrow ? (
                <SectionLabel withRule={false}>{section.eyebrow}</SectionLabel>
              ) : null}
              <TextReveal
                as="h2"
                text={section.heading}
                className="mt-6 zn-h2 font-sans font-normal text-zn-text"
              />
              {section.subheading ? (
                <p className="zn-prose mx-auto mt-5 max-w-xl text-zn-text-2">{section.subheading}</p>
              ) : null}
            </div>
          </div>
          <Stagger
            className="grid grid-cols-1 border-t border-zn-border sm:grid-cols-2 lg:grid-cols-6"
            stagger={0.04}
          >
            {section.cards.map((segment, index) => {
              const inner = (
                <>
                  <h3 className="font-sans text-base font-normal tracking-tight text-zn-text">
                    {segment.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zn-text-2">{segment.body}</p>
                  {segment.commonBuild ? (
                    <p className="mt-4 text-xs text-zn-text-3">
                      <span className="font-medium text-zn-text-2">Common build:</span>{" "}
                      {segment.commonBuild}
                    </p>
                  ) : null}
                </>
              );

              const cellClass = cn(
                "flex flex-col border-b border-r border-zn-border px-6 py-8 sm:px-8",
                segmentSpanClass(index),
              );

              return segment.href ? (
                <Link key={segment.title} href={segment.href} className={cn(cellClass, "transition-colors hover:bg-zn-bg-2")}>
                  {inner}
                </Link>
              ) : (
                <article key={segment.title} className={cellClass}>
                  {inner}
                </article>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
