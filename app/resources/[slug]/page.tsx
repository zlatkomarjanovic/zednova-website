import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import {
  getAllPosts,
  getPostBySlug,
  getTeamMember,
} from "@/lib/queries";
import { ArticleBody } from "@/components/shared/ArticleBody";
import { ReadingProgress } from "@/components/sections/ReadingProgress";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Tag } from "@/components/shared/Tag";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { formatDate, slugify } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [author, allPosts] = await Promise.all([
    getTeamMember(post.author),
    getAllPosts(),
  ]);
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const toc = post.body.filter((b) => b.type === "h2") as {
    type: "h2";
    text: string;
  }[];

  return (
    <>
      <ReadingProgress />

      <article className="zn-container pb-16 pt-28 lg:pt-36">
        <div className="mx-auto max-w-[760px]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zn-text-3">
            <Tag>{post.category}</Tag>
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
          </div>
          <h1 className="mt-6 font-sans font-normal text-4xl leading-[1.1] text-zn-text lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zn-text-2">
            {post.excerpt}
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-5xl gap-12">
          {toc.length > 0 && (
            <aside className="hidden w-52 shrink-0 xl:block">
              <div className="sticky top-28">
                <p className="zn-label mb-4 text-zn-text-3">On this page</p>
                <ul className="grid gap-2.5">
                  {toc.map((heading) => (
                    <li key={heading.text}>
                      <a
                        href={`#${slugify(heading.text)}`}
                        className="text-sm leading-snug text-zn-text-2 transition-colors hover:text-zn-text"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          <div className="mx-auto w-full max-w-[720px]">
            <ArticleBody blocks={post.body} />

            {/* Author card */}
            {author && (
              <div className="mt-16 flex items-start gap-5 rounded-[2px] border border-zn-border bg-zn-bg-2/40 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-zn-text font-sans font-normal text-xl text-zn-inv">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-sans font-normal text-zn-text">
                    {author.name}
                  </p>
                  <p className="text-sm text-zn-text-2">{author.role}, ZedNova</p>
                  <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
                    {author.bio[0]}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="zn-section border-t border-zn-border">
        <div className="zn-container">
          <SectionLabel>Keep reading</SectionLabel>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section data-theme="dark" className="bg-zn-dark text-zn-inv">
        <div className="zn-container zn-section">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <h2 className="zn-h2 font-sans font-normal leading-tight text-zn-inv">
              One insight per week. No slop.
            </h2>
            <NewsletterSignup theme="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
