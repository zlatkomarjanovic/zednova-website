"use client";

import { Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlueprintGuides } from "@/ui/BlueprintGuides";
import type { ValueItem } from "@/lib/types";
import { Icon } from "@/ui/Icon";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { cn } from "@/lib/utils";

function valueCellBorderClass(index: number, columns: 2 | 4) {
  if (columns === 4) {
    return cn(
      "border-b border-zn-border-dk border-l-0 border-r-0",
      index % 4 === 0 && "lg:border-r",
      index % 4 === 1 && "lg:border-r",
      index % 4 === 2 && "lg:border-r",
      index % 2 === 0 && "md:border-r lg:border-r",
      index % 2 === 1 && "md:border-r-0",
      index % 4 === 3 && "lg:border-r-0",
    );
  }

  return cn(
    "border-b border-zn-border-dk border-l-0 border-r-0",
    index % 2 === 0 && "md:border-r",
    index % 2 === 1 && "md:border-r-0",
  );
}

function ValueIcon({ name }: { name: string }) {
  return (
    <div className="mb-6 flex size-11 items-center justify-center rounded-[4px] border border-zn-border-dk bg-zn-dark text-zn-inv">
      <Icon name={name} className="size-5" strokeWidth={1.65} />
    </div>
  );
}

export function ServiceValuesSection({
  values,
  eyebrow = "Why ZedNova",
  headline = "Values we bring to every engagement",
  subtext = "How we work on every engagement. Speed, outcomes, and one team accountable for the full stack.",
}: {
  values: ValueItem[];
  eyebrow?: string;
  headline?: string;
  subtext?: string;
}) {
  if (values.length === 0) return null;

  const useFourColumns = values.length === 4;

  return (
    <section
      data-theme="dark"
      data-bg="dark"
      className="relative overflow-hidden bg-zn-dark text-zn-inv"
    >
      <BlueprintGuides theme="dark" reveal="scroll" showEdgeCrosses={false} />

      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border-dk pb-48">
          <div className="zn-container-inset pt-[clamp(4rem,8vw,6.5rem)] pb-[clamp(3rem,6vw,5rem)]">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel withRule={false} className="text-zn-inv-2">
                  {eyebrow}
                </SectionLabel>
              </div>
              <TextReveal
                as="h2"
                text={headline}
                className="zn-h2 font-sans font-normal text-zn-inv"
              />
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zn-inv-2 lg:text-lg lg:leading-relaxed">
                {subtext}
              </p>
            </div>
          </div>

          <div className="relative border-t border-zn-border-dk">
            <BlueprintCross theme="dark" anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross theme="dark" anchor="right" className="top-0 z-10 -translate-y-1/2" />
            {useFourColumns ? (
              <>
                <BlueprintCross
                  theme="dark"
                  anchor={25}
                  className="top-0 z-10 hidden -translate-y-1/2 lg:block"
                />
                <BlueprintCross
                  theme="dark"
                  anchor={50}
                  className="top-0 z-10 hidden -translate-y-1/2 md:block"
                />
                <BlueprintCross
                  theme="dark"
                  anchor={75}
                  className="top-0 z-10 hidden -translate-y-1/2 lg:block"
                />
              </>
            ) : (
              <BlueprintCross
                theme="dark"
                anchor={50}
                className="top-0 z-10 hidden -translate-y-1/2 md:block"
              />
            )}

            <Stagger
              className={cn(
                "grid w-full grid-cols-1 border-zn-border-dk md:grid-cols-2",
                useFourColumns && "lg:grid-cols-4",
              )}
              stagger={0.05}
            >
              {values.map((value, index) => (
                <article
                  key={value.title}
                  className={cn(
                    "flex min-h-[14rem] flex-col bg-zn-dark px-8 py-10 sm:min-h-[15rem] sm:px-10 sm:py-12 lg:min-h-[16rem] lg:px-12 lg:py-14",
                    valueCellBorderClass(index, useFourColumns ? 4 : 2),
                  )}
                >
                  <span className="font-mono text-3xl leading-none tracking-tight text-zn-inv-3 lg:text-4xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {value.icon ? (
                    <div className="mt-6">
                      <ValueIcon name={value.icon} />
                    </div>
                  ) : null}

                  <h3 className="mt-4 max-w-xs font-sans text-[1.2rem] font-normal leading-[1.15] tracking-[-0.02em] text-zn-inv lg:text-[1.35rem]">
                    {value.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-zn-inv-2 lg:text-[0.9375rem] lg:leading-[1.75]">
                    {value.description}
                  </p>
                </article>
              ))}
            </Stagger>

            <BlueprintCross theme="dark" anchor="left" className="bottom-0 z-10 translate-y-1/2" />
            <BlueprintCross theme="dark" anchor="right" className="bottom-0 z-10 translate-y-1/2" />
            {useFourColumns ? (
              <>
                <BlueprintCross
                  theme="dark"
                  anchor={25}
                  className="bottom-0 z-10 hidden translate-y-1/2 lg:block"
                />
                <BlueprintCross
                  theme="dark"
                  anchor={50}
                  className="bottom-0 z-10 hidden translate-y-1/2 md:block"
                />
                <BlueprintCross
                  theme="dark"
                  anchor={75}
                  className="bottom-0 z-10 hidden translate-y-1/2 lg:block"
                />
              </>
            ) : (
              <BlueprintCross
                theme="dark"
                anchor={50}
                className="bottom-0 z-10 hidden translate-y-1/2 md:block"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
