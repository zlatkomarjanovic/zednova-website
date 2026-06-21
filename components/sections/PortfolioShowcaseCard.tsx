"use client";

import { useRef, useState } from "react";
import { ProjectShowcaseLogo } from "@/components/shared/ProjectShowcaseLogo";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import type { PortfolioProject } from "@/lib/types";
import { cn } from "@/lib/utils";

type PortfolioShowcaseCardProps = {
  project: PortfolioProject;
  className?: string;
};

/** Our Work grid — project info by default, mockup image on hover. */
export function PortfolioShowcaseCard({ project, className }: PortfolioShowcaseCardProps) {
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
    <a
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
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
        <PortfolioImage
          src={project.image}
          alt={project.imageAlt}
          sizes="(max-width: 768px) 100vw, 42vw"
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
        View project
      </span>

      <div className="relative z-[2] flex h-full min-h-0 flex-col transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-sans text-base font-medium leading-snug tracking-tight text-zn-text">
            {project.title}
          </h3>
          <span className="zn-pill-tag shrink-0 text-zn-text-2">{project.client}</span>
        </div>

        <div className="flex flex-1 items-center justify-center py-4">
          {project.logo ? (
            <ProjectShowcaseLogo src={project.logo.src} alt={project.logo.alt} />
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zn-text-3">
              {project.client}
            </span>
          )}
        </div>

        <p className="zn-prose line-clamp-3">{project.summary}</p>
      </div>
    </a>
  );
}
