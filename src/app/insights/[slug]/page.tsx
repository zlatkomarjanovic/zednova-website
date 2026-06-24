import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, CalendarDays } from "lucide-react";

import {
  getAllPosts,
  getAdjacentPosts,
  getAuthor,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/queries";
import {
  articleJsonLd,
  articleUrl,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { ArticleBody } from "@/features/insights/ArticleBody";
import { ArticleFaq } from "@/features/insights/ArticleFaq";
import { ArticleShare } from "@/features/insights/ArticleShare";
import { ArticleTakeaways } from "@/features/insights/ArticleTakeaways";
import { ArticleCard } from "@/features/insights/ArticleCard";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { Button } from "@/ui/Button";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { SectionLabel } from "@/ui/SectionLabel";
import { Tag } from "@/ui/Tag";
import { formatDate, slugify } from "@/lib/utils";

const SITE_ORIGIN = "https://zednova.com";

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

  const url = articleUrl(slug);
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const ogImage = post.ogImage ?? post.image;

  return {
    title,
    description,
    keywords: post.keywords,
    authors: [{ name: "Zed Marjanovic", url: `${SITE_ORIGIN}/about` }],
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName: "ZedNova Studios",
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ["Zed Marjanovic"],
      section: post.category,
      tags: post.tags,
      images: ogImage
        ? [{ url: ogImage, width: 1600, height: 900, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@zednova",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
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

  const [author, related, adjacent] = await Promise.all([
    getAuthor(post.author),
    getRelatedPosts(slug, 3),
    getAdjacentPosts(slug),
  ]);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Insights", href: "/insights" },
    { label: post.category, href: "/insights" },
    { label: post.title },
  ];

  const toc = post.body.filter((b) => b.type === "h2") as {
    type: "h2";
    text: string;
  }[];

  const url = articleUrl(slug);
  const hasFaq = Boolean(post.faqs && post.faqs.length);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({ post, author }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      {/* Article — continuous guides frame */}
      <section
        data-theme="light"
        className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]"
      >
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />

            {/* Hero */}
            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset pb-12 pt-28 lg:pt-36">
                <div className="mx-auto max-w-[760px]">
                  <Breadcrumbs items={crumbs} />

                  <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zn-text-3">
                    <Tag>{post.category}</Tag>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </span>
                    {post.updatedAt && (
                      <span className="text-xs text-zn-text-3">
                        · Updated{" "}
                        <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                      </span>
                    )}
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {post.readTime} min read
                    </span>
                  </div>

                  <h1 className="mt-6 zn-h1 font-sans font-normal text-zn-text">
                    {post.title}
                  </h1>
                  <p className="mt-6 text-lg leading-relaxed text-zn-text-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-zn-border py-5">
                    {author && (
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zn-text font-sans font-normal text-base text-zn-inv">
                          {author.name.charAt(0)}
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-zn-text">{author.name}</p>
                          <p className="text-zn-text-3">{author.role}, ZedNova</p>
                        </div>
                      </div>
                    )}
                    <ArticleShare url={url} title={post.title} />
                  </div>
                </div>
              </div>
            </div>

            {/* Cover image — within guides width */}
            <figure className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
              </div>
              {post.tags.length > 0 && (
                <figcaption className="zn-container-inset flex flex-wrap gap-2 py-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-[0.1em] text-zn-text-3"
                    >
                      #{tag}
                    </span>
                  ))}
                </figcaption>
              )}
            </figure>

            {/* Body */}
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset py-14 lg:py-16">
                <div className="mx-auto flex max-w-5xl gap-12">
                  {toc.length > 0 && (
                    <aside className="hidden w-56 shrink-0 xl:block">
                      <div className="sticky top-28">
                        <p className="zn-label mb-4 text-zn-text-3">On this page</p>
                        <ul className="grid gap-2.5 border-l border-zn-border">
                          {toc.map((heading) => (
                            <li key={heading.text}>
                              <a
                                href={`#${slugify(heading.text)}`}
                                className="-ml-px block border-l border-transparent pl-4 text-sm leading-snug text-zn-text-2 transition-colors hover:border-zn-text hover:text-zn-text"
                              >
                                {heading.text}
                              </a>
                            </li>
                          ))}
                          {hasFaq && (
                            <li>
                              <a
                                href="#article-faq"
                                className="-ml-px block border-l border-transparent pl-4 text-sm leading-snug text-zn-text-2 transition-colors hover:border-zn-text hover:text-zn-text"
                              >
                                FAQ
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </aside>
                  )}

                  <div className="mx-auto w-full max-w-[720px]">
                    {post.takeaways && post.takeaways.length > 0 && (
                      <div className="mb-10">
                        <ArticleTakeaways items={post.takeaways} />
                      </div>
                    )}

                    <ArticleBody blocks={post.body} />

                    {hasFaq && (
                      <div id="article-faq" className="mt-16">
                        <ArticleFaq faqs={post.faqs!} />
                      </div>
                    )}

                    {author && (
                      <div className="mt-16 flex items-start gap-5 rounded-[2px] border border-zn-border bg-zn-bg-2/40 p-6">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-zn-text font-sans font-normal text-xl text-zn-inv">
                          {author.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-sans font-normal text-zn-text">
                            {author.name}
                          </p>
                          <p className="text-sm text-zn-text-3">{author.role}, ZedNova</p>
                          <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
                            {author.bio[0]}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {author.linkedin && (
                              <Button
                                href={author.linkedin}
                                variant="outline"
                                size="sm"
                                withArrow
                              >
                                LinkedIn
                              </Button>
                            )}
                            <Button href="/contact" variant="link" size="sm" withArrow>
                              Work with ZedNova
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {post.tags.length > 0 && (
                      <div className="mt-10 flex flex-wrap items-center gap-2">
                        <span className="zn-label mr-1 text-zn-text-3">Tagged</span>
                        {post.tags.map((tag) => (
                          <Tag key={tag} variant="outline">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Previous / Next */}
            {(adjacent.previous || adjacent.next) && (
              <div className="relative border-b border-zn-border">
                <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
                <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />
                <div className="grid md:grid-cols-2">
                  {adjacent.previous ? (
                    <Link
                      href={`/insights/${adjacent.previous.slug}`}
                      className="group flex flex-col justify-between gap-4 border-b border-zn-border px-[clamp(1.25rem,4vw,2.5rem)] py-10 md:border-b-0 md:border-r md:py-12"
                    >
                      <span className="zn-label inline-flex items-center gap-2 text-zn-text-3">
                        <ArrowLeft className="size-3.5" aria-hidden="true" />
                        Older article
                      </span>
                      <span className="font-sans font-normal text-lg leading-snug text-zn-text transition-opacity group-hover:opacity-70 lg:text-xl">
                        {adjacent.previous.title}
                      </span>
                      {adjacent.previous.excerpt && (
                        <p className="zn-prose line-clamp-2 text-sm">
                          {adjacent.previous.excerpt}
                        </p>
                      )}
                    </Link>
                  ) : (
                    <div className="hidden md:block md:border-r md:border-zn-border" />
                  )}
                  {adjacent.next && (
                    <Link
                      href={`/insights/${adjacent.next.slug}`}
                      className="group flex flex-col items-end justify-between gap-4 px-[clamp(1.25rem,4vw,2.5rem)] py-10 md:py-12"
                    >
                      <span className="zn-label inline-flex items-center gap-2 text-zn-text-3">
                        Newer article
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-right font-sans font-normal text-lg leading-snug text-zn-text transition-opacity group-hover:opacity-70 lg:text-xl">
                        {adjacent.next.title}
                      </span>
                      {adjacent.next.excerpt && (
                        <p className="zn-prose line-clamp-2 text-right text-sm">
                          {adjacent.next.excerpt}
                        </p>
                      )}
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div className="relative">
                <div className="zn-container-inset py-14 lg:py-16">
                  <SectionLabel withRule={false}>Keep reading</SectionLabel>
                  <h2 className="mt-6 max-w-2xl zn-h2 font-sans font-normal text-zn-text">
                    More from ZedNova
                  </h2>
                  <p className="zn-prose mt-5 max-w-lg">
                    Practical notes on AI search, conversion, and the systems behind
                    businesses that ship.
                  </p>
                  <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((p) => (
                      <ArticleCard key={p.slug} post={p} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
            <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />
          </div>
        </div>
      </section>

      <DarkCTA
        heading="Want a website that ranks, converts, and gets cited by AI?"
        sub="We design and build Next.js sites, Shopify stores, and automations for clinics, ecommerce brands, and small businesses across the United States. Tell us what you need — we reply within 24 hours."
        ctaLabel="Tell us what you need"
      />
    </>
  );
}
