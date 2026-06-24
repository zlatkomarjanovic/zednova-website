import { CountUp } from "@/components/animations/CountUp";
import { BlueprintGridCrosses } from "@/ui/BlueprintGridCrosses";
import type { SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

function parseStat(value: string) {
  const match = value.match(/^(\D*)(\d[\d,]*)(\D*)$/);
  if (!match) return { prefix: "", num: null as number | null, suffix: value };
  return {
    prefix: match[1],
    num: Number(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}

export function StatsRow({
  stats,
  theme = "light",
  className,
}: {
  stats: SiteSettings["stats"];
  theme?: "light" | "dark";
  className?: string;
}) {
  const dark = theme === "dark";

  return (
    <div className={cn("relative border-y border-zn-border", className)}>
      <div className="pointer-events-none absolute inset-0 md:hidden">
        <BlueprintGridCrosses columns={2} rows={2} />
      </div>
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <BlueprintGridCrosses columns={4} rows={1} />
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-zn-border md:grid-cols-4 md:divide-y-0">
        {stats.map((stat) => {
          const { prefix, num, suffix } = parseStat(stat.value);
          return (
            <div key={stat.label} className="px-6 py-10 md:px-8 md:py-12">
              <div
                className={cn(
                  "font-mono text-4xl tracking-tight lg:text-5xl",
                  dark ? "text-zn-inv" : "text-zn-text",
                )}
              >
                {num !== null ? (
                  <CountUp value={num} prefix={prefix} suffix={suffix} />
                ) : (
                  stat.value
                )}
              </div>
              <div
                className={cn(
                  "mt-3 zn-prose",
                  dark ? "text-zn-inv-2" : undefined,
                )}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
