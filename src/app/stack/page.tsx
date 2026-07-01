import type { Metadata } from "next";
import Link from "next/link";
import { techStackGroups } from "@/lib/content/tech-stack";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { TemplateSection } from "@/ui/TemplateSection";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tech Stack — Next.js, Sanity, n8n, AI & Automation | ZedNova",
  description:
    "The tools ZedNova Studio builds with — Next.js, React, TypeScript, Sanity, Supabase, n8n, Make, Vapi, Twilio, Claude, GPT-5, Stripe, and more. Frontend, backend, CMS, automation, AI, CRM, and analytics.",
  alternates: { canonical: "/stack" },
  openGraph: {
    type: "website",
    url: "/stack",
    title: "Tech Stack — ZedNova Studio",
    description:
      "Next.js, Sanity, n8n, Vapi, Twilio, Claude, Stripe, and more — the tools we wire together.",
  },
  robots: { index: true, follow: true },
};

export default function StackPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Tech stack" },
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            path: "/stack",
            name: "Tech Stack — ZedNova Studio",
            description:
              "The tools ZedNova Studio builds with — frontend, backend, CMS, automation, AI, CRM, communication, analytics, and payments.",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset pb-16 pt-32 lg:pb-20 lg:pt-44">
                <Breadcrumbs items={crumbs} className="mb-8" />
                <Reveal>
                  <SectionLabel withRule={false}>Tech stack</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="The tools we wire together for you"
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    The platforms we build on, connect, and deploy. We pick the
                    right stack for the project, not the most familiar one —
                    frontend, backend, CMS, automation, AI, CRM, communication,
                    analytics, and payments.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Tell us what you need
                    </Button>
                    <Button href="/services" variant="link" withArrow>
                      See services
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TemplateSection borderBottom={false}>
        <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.05}>
          {techStackGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-[2px] border border-zn-border bg-zn-bg-2 p-7"
            >
              <h2 className="font-sans text-lg font-normal text-zn-text">
                {group.category}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
                {group.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-[4px] bg-zn-bg px-3 py-1.5 text-sm tracking-tight text-zn-text"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Stagger>

        <div className="mt-12 rounded-[2px] border border-zn-border bg-zn-bg-2/60 p-7">
          <SectionLabel withRule={false}>Entity summary</SectionLabel>
          <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="zn-label text-zn-text-3">Company</dt>
              <dd className="mt-1 text-sm text-zn-text">ZedNova Studio</dd>
            </div>
            <div>
              <dt className="zn-label text-zn-text-3">Stack focus</dt>
              <dd className="mt-1 text-sm text-zn-text">
                Next.js, Sanity, Supabase, n8n, Vapi, Twilio, Claude, GPT-5
              </dd>
            </div>
            <div>
              <dt className="zn-label text-zn-text-3">Markets served</dt>
              <dd className="mt-1 text-sm text-zn-text">
                US and Europe, remote delivery
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-zn-text-2">
            Want to know if we build with a specific tool?{" "}
            <Link
              href="/contact"
              className="text-zn-text underline-offset-4 hover:underline"
            >
              Ask us
            </Link>
            .
          </p>
        </div>
      </TemplateSection>
    </>
  );
}
