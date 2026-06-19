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
    <div className="relative grid gap-10 md:grid-cols-4">
      <div
        className={cn(
          "absolute inset-x-0 top-6 hidden h-px md:block",
          dark ? "bg-zn-border-dk" : "bg-zn-border",
        )}
        aria-hidden="true"
      />
      {steps.map((step) => (
        <div key={step.step} className="relative">
          <div
            className={cn(
              "relative inline-flex font-mono text-3xl",
              dark ? "bg-zn-dark text-zn-inv" : "bg-zn-bg text-zn-text",
            )}
          >
            <span className={dark ? "pr-3" : "pr-3"}>
              {String(step.step).padStart(2, "0")}
            </span>
          </div>
          <h3
            className={cn(
              "mt-5 font-sans text-lg font-normal tracking-tight",
              dark ? "text-zn-inv" : "text-zn-text",
            )}
          >
            {step.title}
          </h3>
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              dark ? "text-zn-inv-2" : "text-zn-text-2",
            )}
          >
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
