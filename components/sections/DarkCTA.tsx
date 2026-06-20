import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlueprintGuides } from "@/components/shared/BlueprintGuides";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { Button } from "@/components/shared/Button";

export function DarkCTA({
  heading = "Ready to start your next website or automation project?",
  sub = "Tell us what you need and we will scope it out on the first call. Whether it is a new site, a Shopify store, a booking flow, or a migration, we have done it before.",
  ctaLabel = "Tell us what you need",
  ctaHref = "/contact",
  note = "Or email us at hello@zednova.com. We reply within 24 hours.",
}: {
  heading?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  note?: string;
}) {
  return (
    <section
      data-theme="dark"
      data-bg="dark"
      className="relative overflow-hidden bg-zn-dark text-zn-inv"
    >
      <div className="zn-blueprint-grid absolute inset-0 opacity-[0.22]" aria-hidden="true" />
      <div className="zn-grain absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <BlueprintGuides theme="dark" reveal="scroll" showEdgeCrosses className="z-10" />

      <div className="zn-container-guides relative">
        <BlueprintCross anchor="left" theme="dark" className="top-0 -translate-y-1/2" />
        <BlueprintCross anchor="right" theme="dark" className="top-0 -translate-y-1/2" />

        <div className="relative border-t border-zn-border-dk">
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-zn-border-dk lg:block"
            aria-hidden="true"
          />

          <div className="zn-container-inset grid gap-10 py-[clamp(4.5rem,9vw,7rem)] lg:grid-cols-2 lg:gap-0">
            <div className="flex flex-col justify-end lg:pr-12">
              <Reveal>
                <p className="zn-label text-zn-inv-2">Next step</p>
              </Reveal>
              <TextReveal
                as="h2"
                text={heading}
                className="mt-5 max-w-2xl font-sans text-[clamp(1.75rem,3.2vw,2.75rem)] font-normal leading-[1.06] tracking-[-0.03em]"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-zn-inv-2">
                  {sub}
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col justify-center gap-6 border-t border-zn-border-dk pt-10 lg:border-t-0 lg:pl-12 lg:pt-0">
              <Reveal delay={0.12}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <Button href={ctaHref} variant="inverted" size="lg" withArrow className="flex-1">
                    {ctaLabel}
                  </Button>
                  <Button
                    href="/work"
                    variant="outline-inverted"
                    size="lg"
                    withArrow
                    className="flex-1"
                  >
                    View our work
                  </Button>
                </div>
              </Reveal>

              {note && (
                <Reveal delay={0.18}>
                  <p className="text-sm leading-relaxed text-zn-inv-2">{note}</p>
                </Reveal>
              )}

              <Reveal delay={0.22}>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-zn-border-dk pt-6">
                  {["Texas LLC", "120+ projects", "7+ years", "100% JSS"].map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[10px] uppercase tracking-[0.1em] text-zn-inv-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="border-b border-zn-border-dk" />
      </div>
    </section>
  );
}
