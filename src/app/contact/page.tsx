import type { Metadata } from "next";
import Link from "next/link";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/features/home/PageHero";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { JsonLd } from "@/ui/JsonLd";
import { contactPageJsonLd } from "@/lib/seo";
import { resolveContactPrefill } from "@/lib/content/contact-options";
import {
  getContactIndustryOptions,
  getContactServiceOptions,
  getSiteSettings,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact ZedNova Studios — Start a Website, Software, or Automation Project",
  description:
    "Tell ZedNova what you need. Websites, custom software, CRM automations, and AI tools for clinics, ecommerce brands, and service businesses. Reply within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact ZedNova Studios",
    description:
      "Start a website, custom software, automation, or AI tool project with ZedNova Studios.",
  },
  robots: { index: true, follow: true },
};

const STEPS = [
  {
    title: "Share context",
    body: "Tell us what you are building, what is not working today, and any deadlines.",
  },
  {
    title: "We scope it",
    body: "You hear back within 24 hours with clarifying questions or a suggested path.",
  },
  {
    title: "Kick off",
    body: "Fixed scope, clear timeline, and the same senior team from first call to launch.",
  },
] as const;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; industry?: string; product?: string }>;
}) {
  const params = await searchParams;
  const [settings, serviceOptions, industryOptions] = await Promise.all([
    getSiteSettings(),
    getContactServiceOptions(),
    getContactIndustryOptions(),
  ]);
  const defaults = resolveContactPrefill(params);

  return (
    <section data-theme="light" className="relative pb-[clamp(4rem,8vw,7rem)]">
      <JsonLd data={[contactPageJsonLd(settings.contactEmail)]} />
      <BlueprintGrid immediate />

      <div className="zn-container-guides relative">
        <div className="relative border-x border-zn-border">
          <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
          <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />

          <div className="relative border-b border-zn-border">
            <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
            <PageHero
              guidesLayout
              eyebrow="Contact"
              eyebrowWithRule={false}
              title="Tell us what you need"
              description="Share a few details and we will scope the right path on the first reply."
            />
          </div>

          <div className="relative border-b border-zn-border bg-zn-bg">
            <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
            <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />

            <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:divide-x lg:divide-zn-border">
              <ContactForm
                defaults={defaults}
                serviceOptions={serviceOptions}
                industryOptions={industryOptions}
              />

              <aside className="border-t border-zn-border px-6 py-10 lg:border-t-0 md:px-8 md:py-12">
                <Reveal>
                  <p className="zn-label">What happens next</p>
                </Reveal>

                <ol className="mt-8 space-y-8">
                  {STEPS.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="font-mono text-xs text-zn-text-3">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 className="font-sans text-base font-normal tracking-tight text-zn-text">
                          {step.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 border-t border-zn-border pt-8">
                  <p className="zn-label">Direct line</p>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="mt-3 inline-block text-sm text-zn-text underline-offset-4 hover:underline"
                  >
                    {settings.contactEmail}
                  </a>
                  <p className="mt-2 text-sm text-zn-text-2">{settings.responseTime}</p>
                </div>

                <div className="mt-8 space-y-2 text-sm text-zn-text-2">
                  <p>120+ projects shipped</p>
                  <p>10+ years shipping products</p>
                  <p>Texas LLC · US clients</p>
                </div>

                <p className="mt-8 text-xs leading-relaxed text-zn-text-3">
                  Prefer to browse first?{" "}
                  <Link href="/work" className="text-zn-text underline-offset-4 hover:underline">
                    See our work
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/services"
                    className="text-zn-text underline-offset-4 hover:underline"
                  >
                    explore services
                  </Link>
                  .
                </p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
