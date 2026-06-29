import Link from "next/link";

import type { CaseStudy } from "@/lib/types";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { MediaImage } from "@/ui/MediaImage";

export function CaseStudyCards({
  studies,
  title = "Related case studies",
}: {
  studies: CaseStudy[];
  title?: string;
}) {
  if (!studies.length) return null;

  return (
    <div>
      <Reveal>
        <SectionLabel withRule={false}>{title}</SectionLabel>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {studies.map((study) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            className="group overflow-hidden rounded-[2px] border border-zn-border bg-zn-bg transition hover:border-zn-text-3"
          >
            <MediaImage
              src={study.image}
              alt={study.imageAlt ?? study.title}
              accent={study.accent}
              tint={0.35}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="aspect-[16/9] w-full"
            />
            <div className="p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-zn-text-3">
                {study.client}
              </p>
              <p className="mt-2 font-sans text-lg text-zn-text group-hover:underline">
                {study.title}
              </p>
              <p className="mt-2 text-sm text-zn-text-2">{study.resultHeadline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
