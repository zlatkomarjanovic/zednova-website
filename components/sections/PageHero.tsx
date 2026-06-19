import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { cn } from "@/lib/utils";

/** Reusable hero for inner pages. Clears the fixed navbar with top padding. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  theme = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
}) {
  const dark = theme === "dark";
  return (
    <section
      data-theme={theme}
      className={cn(dark && "bg-zn-dark text-zn-inv", className)}
    >
      <div className="zn-container pb-14 pt-36 lg:pb-24 lg:pt-44">
        {eyebrow && (
          <Reveal>
            <SectionLabel className={dark ? "text-zn-inv-2" : undefined}>
              {eyebrow}
            </SectionLabel>
          </Reveal>
        )}
        <TextReveal
          as="h1"
          text={title}
          className="mt-6 max-w-4xl font-sans text-4xl font-normal leading-[1.04] sm:text-5xl lg:text-6xl"
        />
        {description && (
          <Reveal delay={0.1}>
            <p
              className={cn(
                "mt-6 max-w-2xl text-lg leading-relaxed",
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
      </div>
    </section>
  );
}
