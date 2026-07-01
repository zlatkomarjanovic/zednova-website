import type { Metadata } from "next";

import { getAllProducts } from "@/lib/queries";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { ProductCard } from "@/features/home/ProductCard";
import { DarkCTA } from "@/features/home/DarkCTA";
import type { Product, ProductType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free and paid resources from ZedNova — guides, PDFs, templates, freebies, lead magnets, and software products we build for designers, developers, and operators who build fast.",
  alternates: { canonical: "/resources" },
  openGraph: {
    type: "website",
    url: "/resources",
    title: "Resources — ZedNova Studio",
    description:
      "Free and paid resources from ZedNova — guides, PDFs, templates, freebies, lead magnets, and software products.",
  },
};

const TYPE_LABELS: Record<ProductType, string> = {
  software: "Software",
  tool: "Tools",
  pdf: "PDFs",
  guide: "Guides",
  checklist: "Checklists",
  template: "Templates",
  freebie: "Freebies",
  "lead-magnet": "Lead magnets",
};

const TYPE_ORDER: ProductType[] = [
  "freebie",
  "lead-magnet",
  "guide",
  "pdf",
  "checklist",
  "template",
  "tool",
  "software",
];

export default async function ResourcesPage() {
  const products = await getAllProducts();

  const grouped = TYPE_ORDER.map((type) => ({
    type,
    label: TYPE_LABELS[type],
    items: products.filter((p) => (p.type ?? "software") === type),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {/* Hero */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />
            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">
                <Reveal>
                  <SectionLabel withRule={false}>Resources</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Guides, freebies, and software we ship for the ecosystems we live in."
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    We don&apos;t just build for clients. We ship guides, PDFs,
                    templates, lead magnets, and tools for designers, developers,
                    and operators who build fast. Grab what&apos;s useful.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Start a conversation
                    </Button>
                    <Button href="/work" variant="link" withArrow>
                      See our work
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grouped resources */}
      {grouped.map((group) => (
        <section
          key={group.type}
          data-theme="light"
          className="relative bg-zn-bg pb-[clamp(3rem,6vw,5rem)]"
        >
          <div className="zn-container">
            <Reveal>
              <div className="flex items-end justify-between gap-6 border-b border-zn-border pb-6">
                <div>
                  <SectionLabel withRule={false}>{group.label}</SectionLabel>
                  <h2 className="mt-3 zn-h3 font-sans font-normal text-zn-text">
                    {group.items.length} {group.items.length === 1 ? "resource" : "resources"}
                  </h2>
                </div>
              </div>
            </Reveal>
            <Stagger className="mt-10 grid gap-6 md:grid-cols-2" stagger={0.06}>
              {group.items.map((product: Product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </Stagger>
          </div>
        </section>
      ))}

      <DarkCTA bookingEmbed />
    </>
  );
}
