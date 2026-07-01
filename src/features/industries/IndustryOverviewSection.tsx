import { Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { cn } from "@/lib/utils";

const OVERVIEW_ITEMS = [
  { key: "who", label: "Who we build for" },
  { key: "what", label: "What we build" },
  { key: "outcome", label: "Example outcome" },
] as const;

function cellSurface(index: number) {
  return index % 2 === 0 ? "bg-zn-bg" : "bg-zn-bg-2";
}

export function IndustryOverviewSection({
  whoItIsFor,
  whatWeBuild,
  exampleProject,
}: {
  whoItIsFor: string;
  whatWeBuild: string;
  exampleProject: string;
}) {
  const bodies = { who: whoItIsFor, what: whatWeBuild, outcome: exampleProject };
  const hasContent = Object.values(bodies).some((value) => value.trim().length > 0);
  if (!hasContent) return null;

  return (
    <section data-theme="light" className="relative bg-zn-bg">
      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border">
          <div className="zn-container-inset py-[clamp(3rem,6vw,5rem)] pb-8 md:pb-10">
            <div className="mx-auto max-w-2xl text-center">
              <SectionLabel withRule={false}>At a glance</SectionLabel>
              <TextReveal
                as="h2"
                text="Built for your market, not a generic agency template"
                className="mt-6 zn-h2 font-sans font-normal text-zn-text"
              />
            </div>
          </div>

          <Stagger
            className="grid grid-cols-1 border-t border-zn-border lg:grid-cols-3"
            stagger={0.06}
          >
            {OVERVIEW_ITEMS.map((item, index) => (
              <article
                key={item.key}
                className={cn(
                  "flex min-h-[14rem] flex-col px-8 py-10 sm:px-10 lg:min-h-[16rem] lg:px-12 lg:py-12",
                  cellSurface(index),
                  "border-b border-zn-border lg:border-b-0",
                  index < 2 && "lg:border-r lg:border-zn-border",
                )}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-zn-text-3">
                  {item.label}
                </p>
                <p className="mt-5 max-w-md text-base leading-relaxed text-zn-text-2 lg:text-[1.0625rem] lg:leading-[1.65]">
                  {bodies[item.key]}
                </p>
              </article>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
