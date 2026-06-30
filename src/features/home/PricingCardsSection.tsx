import Link from "next/link";
import { Check, Plus } from "lucide-react";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { BlueprintGridCrosses } from "@/ui/BlueprintGridCrosses";
import { CAL_BOOKING_URL } from "@/lib/booking";
import type { HomepagePricingPackage } from "@/lib/content/homepage-pricing";
import { cn } from "@/lib/utils";

function PricingAmount({
  setupAmount,
  setupLabel,
  monthlyAmount,
}: {
  setupAmount: string;
  setupLabel?: string;
  monthlyAmount?: string;
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-1.5 font-mono text-2xl tracking-tight text-zn-text md:text-[1.65rem]">
      <span>From</span>
      <span className="inline-flex items-center gap-0.5">
        {setupAmount}
        <Plus
          className="size-4 shrink-0 text-zn-text-3"
          aria-hidden="true"
          strokeWidth={2}
        />
      </span>
      {setupLabel ? <span>{setupLabel}</span> : null}
      {monthlyAmount ? (
        <>
          <span className="text-zn-text-3">+</span>
          <span>{monthlyAmount}</span>
        </>
      ) : null}
    </p>
  );
}

export function PricingCardsSection({
  packages,
}: {
  packages: HomepagePricingPackage[];
}) {
  if (packages.length === 0) return null;

  return (
    <section data-theme="light" className="relative zn-section bg-zn-bg">
      <BlueprintGrid />

      <div className="zn-container relative">
        <Reveal>
          <SectionLabel withRule={false}>Typical investment</SectionLabel>
        </Reveal>
        <TextReveal
          as="h2"
          text="What most clients start with"
          className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
        />
        <Reveal delay={0.08}>
          <p className="zn-prose mt-5 max-w-xl">
            Fixed scope and clear pricing before we start. The numbers below are starting prices.
            More features or higher complexity cost more, and you see the exact quote before we
            kick off.
          </p>
        </Reveal>
      </div>

      <div className="zn-container-guides relative mt-14">
        <div className="relative border-x border-zn-border">
          <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
          <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />

          <div className="relative border-y border-zn-border">
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <BlueprintGridCrosses columns={Math.min(packages.length, 4)} rows={1} />
            </div>

            <Stagger
              className={cn(
                "grid divide-y divide-zn-border",
                packages.length >= 4 &&
                  "md:grid-cols-2 md:divide-x lg:grid-cols-4 lg:divide-y-0",
                packages.length === 3 && "md:grid-cols-3 md:divide-x md:divide-y-0",
                packages.length === 2 && "md:grid-cols-2 md:divide-x md:divide-y-0",
              )}
              stagger={0.06}
            >
              {packages.map((pkg) => (
                <article
                  key={pkg.slug}
                  className="flex flex-col bg-zn-bg-2/40 px-6 py-8 md:px-8 md:py-10"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="zn-label text-zn-text-3">{pkg.group}</span>
                    {pkg.badge ? (
                      <span className="rounded-full border border-zn-border bg-zn-bg px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-zn-text-2">
                        {pkg.badge}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-5 min-h-[1.75rem] font-sans text-lg font-normal leading-snug tracking-tight text-zn-text md:min-h-[1.875rem] md:text-xl">
                    {pkg.title}
                  </h3>
                  <p className="zn-prose mt-3">{pkg.shortDescription}</p>

                  <div className="mt-6 border-t border-zn-border pt-6">
                    <PricingAmount
                      setupAmount={pkg.pricing.setupAmount}
                      setupLabel={pkg.pricing.setupLabel}
                      monthlyAmount={pkg.pricing.monthlyAmount}
                    />
                    <p className="mt-1 text-xs text-zn-text-3">Starting price</p>
                    <p className="mt-2 text-sm leading-relaxed text-zn-text-3">
                      {pkg.timeline}
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-4 md:gap-[1.125rem]">
                    {pkg.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-snug text-zn-text"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-zn-text-3"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </Stagger>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="zn-container-inset flex justify-center border-t border-zn-border py-8">
            <Button href={CAL_BOOKING_URL} size="lg" withArrow>
              Book a call
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="zn-container-inset mt-6 text-center text-sm text-zn-text-3">
            Need something different?{" "}
            <Link
              href="/services"
              className="text-zn-text underline-offset-4 hover:underline"
            >
              Browse all services
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="text-zn-text underline-offset-4 hover:underline"
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
