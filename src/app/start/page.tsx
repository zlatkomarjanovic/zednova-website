import type { Metadata } from "next";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ServiceChooser } from "@/features/start/ServiceChooser";
import { breadcrumbJsonLd, startPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { SectionLabel } from "@/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Find the Right Service — ZedNova Studio",
  description:
    "Answer two quick questions and get a recommended ZedNova service for websites, Shopify, CRM automation, AI tools, or migrations.",
  alternates: { canonical: "/start" },
  openGraph: {
    type: "website",
    url: "/start",
    title: "Find the Right Service — ZedNova Studio",
    description:
      "Choose your goal and industry — we will point you to the best-fit service or a scoping call.",
  },
  robots: { index: true, follow: true },
};

export default function StartPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Get started" },
  ];

  return (
    <>
      <JsonLd data={[startPageJsonLd(), breadcrumbJsonLd(crumbs)]} />

      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <div className="zn-container-inset pb-20 pt-32 lg:pb-24 lg:pt-40">
              <Breadcrumbs items={crumbs} />
              <Reveal>
                <SectionLabel withRule={false} className="mt-6">
                  Get started
                </SectionLabel>
              </Reveal>
              <TextReveal
                as="h1"
                text="Not sure which service fits?"
                className="mt-6 max-w-3xl zn-h1 font-sans font-normal text-zn-text"
              />
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-zn-text-2">
                  Two quick questions — then we recommend where to start. No pitch deck, just a
                  clear path to contact or book a call.
                </p>
              </Reveal>
              <div className="mt-14">
                <ServiceChooser />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
