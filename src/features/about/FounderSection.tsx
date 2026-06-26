import Image from "next/image";
import type { ReactNode } from "react";
import { Globe } from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { getFounder } from "@/lib/queries";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { BlueprintGuides } from "@/ui/BlueprintGuides";

const FOUNDER_BIO = [
  "Zlatko is a designer, developer, and product builder with 10+ years of experience shipping websites, software, ecommerce stores, automations, and digital products.",
  "He has completed 120+ projects for clients across the United States, Europe, and other global markets.",
  "His work covers design, frontend and backend development, CMS setup, ecommerce, dashboards, client portals, automations, and AI tools that connect the moving parts of a business.",
  "He has published components on the Framer Marketplace used by more than 1,500 creators and works across Framer, Webflow, Shopify, WordPress, Sanity, Next.js, Make, n8n, and modern AI-assisted development tools.",
];

const FOUNDER_IMAGE = "/images/team/zlatko-marjanovic-macbook.png";
const STUDIO_QUOTE =
  "Most agencies sell the idea of better systems. We build the websites, software, and automations that actually run them.";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FounderLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-2.5 border border-zn-border-dk px-4 py-2.5 text-sm text-zn-inv transition-colors hover:border-zn-inv hover:bg-zn-dark-2"
    >
      {children}
      <span>{label}</span>
    </a>
  );
}

export async function FounderSection() {
  const founder = await getFounder();

  return (
    <section
      data-theme="dark"
      data-bg="dark"
      className="relative overflow-hidden border-t border-zn-border-dk bg-zn-dark text-zn-inv"
    >
      <BlueprintGuides theme="dark" reveal="scroll" className="z-10" />
      <div className="zn-container-guides relative z-20">
        <div className="relative border-x border-zn-border-dk">
          <BlueprintCross anchor="left" theme="dark" className="top-0 -translate-y-1/2" />
          <BlueprintCross anchor="right" theme="dark" className="top-0 -translate-y-1/2" />

          <div className="border-b border-zn-border-dk">
            <div className="zn-container-inset grid gap-12 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal className="min-w-0">
                <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[10px] border border-zn-border-dk bg-zn-dark-2">
                  <Image
                    src={founder.avatar ?? FOUNDER_IMAGE}
                    alt={`${founder.name}, founder of ZedNova Studios`}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </figure>
              </Reveal>
              <div>
                <Reveal>
                  <SectionLabel withRule={false} className="text-zn-inv-2">
                    Founder
                  </SectionLabel>
                </Reveal>
                <TextReveal
                  as="h2"
                  text={founder.name}
                  className="mt-6 font-sans text-4xl font-normal text-zn-inv lg:text-5xl"
                />
                <p className="mt-2 text-sm text-zn-inv-2">
                  Founder, ZedNova Studios{" "}
                  <span className="text-zn-inv-2/80">(Zed is short for Zlatko, my full name)</span>
                </p>
                <div className="mt-6 space-y-4 leading-relaxed text-zn-inv-2">
                  {FOUNDER_BIO.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
                <Reveal delay={0.1}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {founder.linkedin && (
                      <FounderLink href={founder.linkedin} label="LinkedIn">
                        <LinkedInIcon className="size-4 shrink-0" />
                      </FounderLink>
                    )}
                    {founder.twitter && (
                      <FounderLink href={founder.twitter} label="X / Twitter">
                        <XIcon className="size-4 shrink-0" />
                      </FounderLink>
                    )}
                    {founder.website && (
                      <FounderLink href={founder.website} label="Personal website">
                        <Globe
                          className="size-4 shrink-0"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </FounderLink>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <div className="zn-container-inset py-[clamp(3.5rem,7vw,5.5rem)]">
            <TextReveal
              as="blockquote"
              text={`“${STUDIO_QUOTE}”`}
              className="mx-auto max-w-4xl text-center zn-accent-italic text-[clamp(1.25rem,2.35vw,1.875rem)] leading-[1.45] text-zn-inv"
              stagger={0.032}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
