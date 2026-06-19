"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/shared/Icon";
import type { CaseStudy } from "@/lib/types";
import { cn } from "@/lib/utils";

type CaseStudyShowcaseCardProps = {
  caseStudy: CaseStudy;
  industryLabel: string;
  industryIcon: string;
  className?: string;
};

/** Homepage case study grid — same square card pattern as services showcase. */
export function CaseStudyShowcaseCard({
  caseStudy,
  industryLabel,
  industryIcon,
  className,
}: CaseStudyShowcaseCardProps) {
  const tags = caseStudy.techStack.slice(0, 3);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hovering, setHovering] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const onMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <Link
      ref={cardRef}
      href={`/work/${caseStudy.slug}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={onMouseMove}
      className={cn(
        "group zn-card-ref relative aspect-square w-full overflow-hidden p-6 lg:p-7",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        aria-hidden="true"
      >
        <Image
          src={caseStudy.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-cover"
        />
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute z-[3] whitespace-nowrap rounded-full bg-zn-text px-5 py-2.5 text-sm font-medium tracking-tight text-zn-inv shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-opacity duration-150",
          hovering ? "opacity-100" : "opacity-0",
        )}
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        View case study
      </span>

      <div className="relative z-[2] flex h-full min-h-0 flex-col transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-sans text-base font-medium leading-snug tracking-tight text-zn-text">
            {caseStudy.title}
          </h3>
          <span className="zn-pill-tag shrink-0 text-zn-text-2">{industryLabel}</span>
        </div>

        <div className="flex flex-1 items-center justify-center py-4">
          <Icon name={industryIcon} className="size-12 text-zn-text lg:size-14" />
        </div>

        <p className="zn-prose line-clamp-2">{caseStudy.resultHeadline}</p>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="zn-chip-tag font-sans text-zn-text">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
