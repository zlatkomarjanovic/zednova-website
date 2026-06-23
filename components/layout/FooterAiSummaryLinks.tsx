import Image from "next/image";

import {
  AI_SUMMARY_PROMPT,
  aiSummaryFabModels,
  summarizeWithLabel,
} from "@/lib/content/ai-summary-models";
import { cn } from "@/lib/utils";

export function FooterAiSummaryLinks({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-zn-inv">
        Summarize with AI
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {aiSummaryFabModels.map((model) => (
          <a
            key={model.id}
            href={model.buildUrl(AI_SUMMARY_PROMPT)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={summarizeWithLabel(model.name)}
            className="flex size-9 items-center justify-center rounded-full border border-zn-border-dk bg-white transition-colors hover:border-zn-inv"
          >
            <Image
              src={model.logo}
              alt=""
              width={20}
              height={20}
              className={cn("size-5 object-contain", model.logoClassName)}
              unoptimized
            />
          </a>
        ))}
      </div>
    </div>
  );
}
