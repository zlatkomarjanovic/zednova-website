import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { cn } from "@/lib/utils";

/** Reusable hero for inner pages. Clears the fixed navbar with top padding. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  theme = "light",
  eyebrowWithRule = true,
  guidesLayout = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  theme?: "light" | "dark";
  eyebrowWithRule?: boolean;
  /** Renders inside zn-container-inset for pages with zn-container-guides side borders. */
  guidesLayout?: boolean;
  className?: string;
}) {
  const dark = theme === "dark";

  const inner = (
    <>
      {eyebrow && (
        <Reveal>
          <SectionLabel
            withRule={eyebrowWithRule}
            className={dark ? "text-zn-inv-2" : undefined}
          >
            {eyebrow}
          </SectionLabel>
        </Reveal>
      )}
      <TextReveal
        as="h1"
        text={title}
        className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
      />
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-6 max-w-2xl zn-prose",
              dark ? "text-zn-inv-2" : "text-zn-text-2",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
      {children && (
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>
        </Reveal>
      )}
    </>
  );

  if (guidesLayout) {
    return (
      <div
        data-theme={theme}
        className={cn(
          "zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44",
          dark && "bg-zn-dark text-zn-inv",
          className,
        )}
      >
        {inner}
      </div>
    );
  }

  return (
    <section
      data-theme={theme}
      className={cn(dark && "bg-zn-dark text-zn-inv", className)}
    >
      <div className="zn-container pb-14 pt-36 lg:pb-24 lg:pt-44">
        {inner}
      </div>
    </section>
  );
}
