import type { Metadata } from "next";
import { getAllProducts } from "@/lib/queries";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/shared/Button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { ProductCard } from "@/components/shared/ProductCard";
import { DarkCTA } from "@/components/sections/DarkCTA";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ZedNova Labs. Software and tools we build for designers, developers, and operators who build fast.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      {/* Hero — guides framing */}
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
                  <SectionLabel withRule={false}>ZedNova Labs</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Software we build for the ecosystems we live in."
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    We don&apos;t just build for clients. We ship tools for
                    designers, developers, and operators who build fast.
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

      {/* Products grid — guides framing */}
      <section
        data-theme="light"
        className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]"
      >
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="zn-container-inset py-14 lg:py-16">
              <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.06}>
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      <DarkCTA
        heading="Want something built for your ecosystem?"
        sub="We build products for the markets we work in. If you have one in mind, tell us."
        ctaLabel="Start a conversation"
      />
    </>
  );
}
