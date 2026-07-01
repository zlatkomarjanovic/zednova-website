import type { Metadata } from "next";
import Link from "next/link";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { CalBookingEmbed } from "@/features/home/CalBookingEmbed";
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
  title: "Contact ZedNova Studio — Start a Website, Software, or Automation Project",
  description:
    "Tell ZedNova what you need. Websites, custom software, CRM automations, and AI tools for clinics, ecommerce brands, and service businesses. Reply within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact ZedNova Studio",
    description:
      "Start a website, custom software, automation, or AI tool project with ZedNova Studio.",
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
  searchParams: Promise<{ service?: string; industry?: string; product?: string; message?: string }>;
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
              description="Book a 30-minute call below, or send the form and we will reply within 24 hours."
            />
          </div>

          <div className="relative border-b border-zn-border bg-zn-bg">
            <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
            <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />

            <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-zn-border">
              <ContactForm
                defaults={defaults}
                serviceOptions={serviceOptions}
                industryOptions={industryOptions}
              />

              <aside className="border-t border-zn-border px-6 py-10 lg:border-t-0 md:px-8 md:py-12">
                <Reveal>
                  <p className="zn-label">Book a call</p>
                  <h2 className="mt-4 font-sans text-xl font-normal tracking-tight text-zn-text md:text-2xl">
                    Pick a time that works
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-zn-text-2">
                    30 minutes with ZedNova. Walk through what you need, get a clear scope, and
                    see if we are the right fit.
                  </p>
                </Reveal>

                <Reveal delay={0.08} className="mt-8">
                  <CalBookingEmbed
                    theme="light"
                    analyticsSource="contact-page"
                    className="overflow-hidden rounded-[12px] border-b border-zn-border bg-white"
                  />
                </Reveal>

                <div className="mt-8 border-t border-zn-border pt-8">
                  <p className="zn-label">Prefer email?</p>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="mt-3 inline-block text-sm text-zn-text underline-offset-4 hover:underline"
                  >
                    {settings.contactEmail}
                  </a>
                  <p className="mt-2 text-sm text-zn-text-2">{settings.responseTime}</p>
                </div>
              </aside>
            </div>

            <div className="border-t border-zn-border px-6 py-10 md:px-8 md:py-12">
              <Reveal>
                <p className="zn-label">What happens next</p>
              </Reveal>

              <ol className="mt-8 grid gap-8 md:grid-cols-3">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="font-mono text-xs text-zn-text-3">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-sans text-base font-normal tracking-tight text-zn-text">
                        {step.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-zn-text-2">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-zn-border pt-8 text-sm text-zn-text-2">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
