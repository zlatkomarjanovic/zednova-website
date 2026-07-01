import { Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import type { PainPoint } from "@/lib/types";
import { BlueprintGuides } from "@/ui/BlueprintGuides";

export function IndustryAiPressuresSection({
  headline,
  subtext,
  pressures,
}: {
  headline: string;
  subtext: string;
  pressures: PainPoint[];
}) {
  if (pressures.length === 0) return null;

  return (
    <section
      data-theme="dark"
      data-bg="dark"
      className="relative overflow-hidden bg-zn-dark text-zn-inv"
    >
      <BlueprintGuides theme="dark" reveal="immediate" className="z-10" />
      <div className="zn-container-guides relative">
        <div className="relative border-x border-zn-inv-border/20">
          <div className="zn-container-inset py-[clamp(3.5rem,7vw,5.5rem)]">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel withRule={false} className="text-zn-inv-2">
                Market shift
              </SectionLabel>
              <TextReveal
                as="h2"
                text={headline}
                className="mt-6 zn-h2 font-sans font-normal text-zn-inv"
              />
              {subtext ? (
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zn-inv-2 lg:text-lg">
                  {subtext}
                </p>
              ) : null}
            </div>
          </div>

          <Stagger
            className="grid grid-cols-1 border-t border-zn-inv-border/20 md:grid-cols-2"
            stagger={0.05}
          >
            {pressures.map((pressure, index) => (
              <article
                key={`${pressure.title}-${index}`}
                className="border-b border-zn-inv-border/20 px-8 py-10 sm:px-10 md:odd:border-r md:odd:border-zn-inv-border/20 lg:px-12 lg:py-12"
              >
                <h3 className="max-w-md font-sans text-xl font-normal leading-snug tracking-tight text-zn-inv lg:text-[1.35rem]">
                  {pressure.title}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-zn-inv-2 lg:text-[0.9375rem] lg:leading-[1.7]">
                  {pressure.description}
                </p>
              </article>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
