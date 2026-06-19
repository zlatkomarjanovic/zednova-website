import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/shared/Button";

export function DarkCTA({
  heading = "Ready to stop leaving revenue on the table?",
  sub = "Most businesses lose 40% of their leads to slow follow-up. We fix that in week one.",
  ctaLabel = "Start a project",
  ctaHref = "/contact",
  note = "Or email us at hello@zednova.com · Response within 24 hours",
}: {
  heading?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  note?: string;
}) {
  return (
    <section data-theme="dark" data-bg="dark" className="bg-zn-dark text-zn-inv">
      <div className="zn-container zn-section text-center">
        <TextReveal
          as="h2"
          text={heading}
          className="mx-auto max-w-4xl font-sans text-3xl font-normal leading-[1.05] sm:text-4xl lg:text-5xl"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zn-inv-2">
            {sub}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <Button href={ctaHref} variant="inverted" size="lg" withArrow>
              {ctaLabel}
            </Button>
          </div>
        </Reveal>
        {note && (
          <Reveal delay={0.2}>
            <p className="mt-8 text-sm text-zn-inv-2">{note}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
