import Link from "next/link";
import { Check } from "lucide-react";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { BlueprintGridCrosses } from "@/ui/BlueprintGridCrosses";
import type { HomepagePricingPackage } from "@/lib/content/homepage-pricing";
import { cn } from "@/lib/utils";

export function PricingCardsSection({
  packages,
}: {
  packages: HomepagePricingPackage[];
}) {
  if (packages.length === 0) return null;

  return (
    <section
      data-theme="light"
      className="relative zn-section overflow-hidden zn-sage-surface"
    >
      <div className="zn-sage-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <BlueprintGrid />

      <div className="zn-container relative">
        <Reveal>
          <SectionLabel withRule={false} className="text-zn-sage-text">
            Typical investment
          </SectionLabel>
        </Reveal>
        <TextReveal
          as="h2"
          text="What most clients start with"
          className="mt-6 max-w-2xl zn-h2 font-sans font-normal text-zn-sage-text"
        />
        <Reveal delay={0.08}>
          <p className="zn-prose mt-5 max-w-xl text-zn-sage-text-2">
            Fixed scope and clear pricing before we start. Most projects launch as an MVP,
            then iterate based on real usage, not a six-month strategy deck.
          </p>
        </Reveal>
      </div>

      <div className="zn-container-guides relative mt-14">
        <div className="relative border-x border-zn-sage-text/15">
          <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
          <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />

          <div className="relative border-y border-zn-sage-text/15 bg-white/70 shadow-[0_24px_80px_-48px_rgba(74,99,71,0.45)]">
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              <BlueprintGridCrosses columns={packages.length} rows={1} />
            </div>

            <Stagger
              className={cn(
                "grid divide-y divide-zn-sage-text/15",
                packages.length === 3 && "md:grid-cols-3 md:divide-x md:divide-y-0",
              )}
              stagger={0.06}
            >
              {packages.map((pkg) => (
                <article
                  key={pkg.slug}
                  className="flex flex-col bg-white/80 px-6 py-8 md:px-8 md:py-10"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="zn-label text-zn-sage-text-2">{pkg.group}</span>
                    {pkg.badge ? (
                      <span className="rounded-full border border-zn-sage-text/20 bg-zn-sage-mid px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-zn-sage-text">
                        {pkg.badge}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-5 font-sans text-lg font-normal tracking-tight text-zn-sage-text md:text-xl">
                    {pkg.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zn-sage-text-2">
                    {pkg.shortDescription}
                  </p>

                  <div className="mt-6 border-t border-zn-sage-text/15 pt-6">
                    <p className="font-mono text-2xl tracking-tight text-zn-sage-text md:text-[1.65rem]">
                      {pkg.pricingSignal}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zn-sage-text-2">
                      {pkg.timeline}
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {pkg.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-snug text-zn-sage-text"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-zn-sage-text"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                      href={pkg.contactHref}
                      size="sm"
                      withArrow
                      className="sm:flex-1"
                    >
                      Tell us what you need
                    </Button>
                    <Button
                      href={pkg.detailHref}
                      variant="outline"
                      size="sm"
                      className="sm:flex-1"
                    >
                      {pkg.detailLabel}
                    </Button>
                  </div>
                </article>
              ))}
            </Stagger>
          </div>
        </div>

        <Reveal delay={0.12}>
          <p className="zn-container-inset mt-6 text-center text-sm text-zn-sage-text-2">
            Need something different?{" "}
            <Link
              href="/services"
              className="text-zn-sage-text underline-offset-4 hover:underline"
            >
              Browse all services
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="text-zn-sage-text underline-offset-4 hover:underline"
            >
              describe your project
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
