import type { Metadata } from "next";
import { getAllProducts } from "@/lib/queries";
import { PageHero } from "@/components/sections/PageHero";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { Stagger } from "@/components/animations/Reveal";
import { ProductCard } from "@/components/shared/ProductCard";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ZedNova Labs. Software and tools we build for designers, developers, and operators who build fast.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <PageHero
        eyebrow="ZedNova Labs"
        title="Software we build for the ecosystems we live in."
        description="We don't just build for clients. We ship tools for designers, developers, and operators who build fast."
      />

      <section className="pb-4">
        <div className="zn-container">
          <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.06}>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </Stagger>
        </div>
      </section>

      <div className="mt-16">
        <DarkCTA
          heading="Want something built for your ecosystem?"
          sub="We build products for the markets we work in. If you have one in mind, tell us."
          ctaLabel="Start a conversation"
        />
      </div>
    </>
  );
}
