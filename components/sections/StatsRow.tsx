import { CountUp } from "@/components/animations/CountUp";
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
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat) => {
        const { prefix, num, suffix } = parseStat(stat.value);
        return (
          <div key={stat.label}>
            <div
              className={cn(
                "font-mono text-5xl tracking-tight lg:text-6xl",
                theme === "dark" ? "text-zn-inv" : "text-zn-text",
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
                "mt-3 text-sm",
                theme === "dark" ? "text-zn-inv-2" : "text-zn-text-2",
              )}
            >
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
