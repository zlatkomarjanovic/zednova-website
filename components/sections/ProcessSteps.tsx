import { cn } from "@/lib/utils";

type Step = { step: number; title: string; description: string };

export function ProcessSteps({
  steps,
  theme = "light",
}: {
  steps: Step[];
  theme?: "light" | "dark";
}) {
  const dark = theme === "dark";

  return (
    <div
      className={cn(
        "grid border border-zn-border md:grid-cols-4 md:divide-x md:divide-y-0 divide-y divide-zn-border",
        !dark && "divide-zn-border",
      )}
    >
      {steps.map((step) => (
        <div
          key={step.step}
          className={cn(
            "flex flex-col px-6 py-8 md:px-7 md:py-10",
            dark ? "bg-zn-dark" : "bg-white/80",
          )}
        >
          <span
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.16em]",
              dark ? "text-zn-inv-2" : "text-zn-text-3",
            )}
          >
            Step {String(step.step).padStart(2, "0")}
          </span>
          <h3
            className={cn(
              "mt-5 font-sans text-lg font-normal tracking-tight",
              dark ? "text-zn-inv" : "text-zn-text",
            )}
          >
            {step.title}
          </h3>
          <p className={cn("zn-prose mt-3", dark && "text-zn-inv-2")}>{step.description}</p>
        </div>
      ))}
    </div>
  );
}
