import type { Metadata } from "next";
import { getAllPosts, getFeaturedPost } from "@/lib/queries";
import { PageHero } from "@/components/sections/PageHero";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { Stagger, Reveal } from "@/components/animations/Reveal";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Thinking out loud on AI, systems, and the businesses that use them. Insights on AEO, automation, and revenue infrastructure.",
};

export default async function ResourcesPage() {
  const [featured, allPosts] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(),
  ]);
  const rest = allPosts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Thinking out loud on AI, systems, and the businesses that use them."
      />

      <section className="pb-8">
        <div className="zn-container">
          <Reveal>
            <ArticleCard post={featured} featured />
          </Reveal>
        </div>
      </section>

      <section className="zn-section pt-8">
        <div className="zn-container">
          <SectionLabel>More writing</SectionLabel>
          <Stagger className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* Newsletter */}
      <section data-theme="dark" className="bg-zn-dark text-zn-inv">
        <div className="zn-container zn-section">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel className="text-zn-inv-2">Newsletter</SectionLabel>
              <h2 className="mt-6 zn-h2 font-sans font-normal leading-tight text-zn-inv">
                Get one insight per week. No slop.
              </h2>
            </div>
            <NewsletterSignup theme="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
