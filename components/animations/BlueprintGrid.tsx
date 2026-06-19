"use client";

import { BlueprintGuides } from "@/components/shared/BlueprintGuides";
import { cn } from "@/lib/utils";

type BlueprintGridProps = {
  className?: string;
  immediate?: boolean;
};

/** Section blueprint guides — opacity reveal on scroll (or immediately in hero). */
export function BlueprintGrid({ className, immediate = false }: BlueprintGridProps) {
  return (
    <BlueprintGuides
      className={cn(className)}
      reveal={immediate ? "immediate" : "scroll"}
      showTicks
      showEdgeCrosses={false}
    />
  );
}
