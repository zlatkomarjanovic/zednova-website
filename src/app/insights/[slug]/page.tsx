import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, CalendarDays } from "lucide-react";

import { CmsImage } from "@/ui/CmsImage";

import {
  getAllPosts,
  getAdjacentPosts,
  getAuthor,
  getPostBySlug,
  getRelatedPosts,
  getServicesBySlugs,
} from "@/lib/queries";
import { insightPageGraphJsonLd, articleUrl } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";
import { SITE_ORIGIN } from "@/lib/site-url";
import { ArticleInlineCta, ArticleQuickAnswer } from "@/features/insights/ArticleAeoBlocks";
import { ArticleAudienceLine } from "@/features/insights/ArticleAudienceLine";
import { ArticleRelatedLinks } from "@/features/insights/ArticleRelatedLinks";
import { ArticleBody } from "@/features/insights/ArticleBody";
import { ArticleFaq } from "@/features/insights/ArticleFaq";
import { ArticleShare } from "@/features/insights/ArticleShare";
import { ArticleSidebar, ArticleMobileToc } from "@/features/insights/ArticleSidebar";
import { ArticleTags } from "@/features/insights/ArticleTags";
import { ArticleTakeaways } from "@/features/insights/ArticleTakeaways";
import { ArticleContinueReading } from "@/features/insights/ArticleContinueReading";
import { AuthorAvatar } from "@/features/insights/AuthorAvatar";
import { ArticleImplementationTable } from "@/features/insights/ArticleImplementationTable";
import { ArticleSources } from "@/features/insights/ArticleSources";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { Button } from "@/ui/Button";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Tag } from "@/ui/Tag";
import { cn, formatDate } from "@/lib/utils";

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

  const title = post.seo?.seoTitle ?? post.seoTitle ?? post.title;
  const description = post.seo?.seoDescription ?? post.seoDescription ?? post.excerpt;
  const ogImageRaw = post.seo?.ogImage ?? post.ogImage ?? post.image;
  const ogImage = ogImageRaw ? absoluteUrl(ogImageRaw) : undefined;
  const canonical = post.seo?.seoCanonical ?? `/insights/${slug}`;
  const canonicalAbsolute = absoluteUrl(canonical);
  const authorRecord = await getAuthor(post.author);
  const authorName = authorRecord?.name ?? "Zed Marjanovic";
  const authorUrl = authorRecord
    ? `${SITE_ORIGIN}/about`
    : `${SITE_ORIGIN}/about`;

  const ogTitle = post.openGraph?.ogTitle ?? post.seo?.ogTitle ?? title;
  const ogDescription =
    post.openGraph?.ogDescription ?? post.seo?.ogDescription ?? description;
  const twitterTitle = post.openGraph?.twitterTitle ?? post.seo?.twitterTitle ?? ogTitle;
  const twitterDescription =
    post.openGraph?.twitterDescription ?? post.seo?.twitterDescription ?? ogDescription;
  const twitterImage =
    post.openGraph?.twitterImage ?? post.seo?.twitterImage ?? ogImage;

  return {
    title,
    description,
    keywords: post.seo?.keywords ?? post.keywords,
    authors: [{ name: authorName, url: authorUrl }],
    alternates: { canonical: canonicalAbsolute },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: canonicalAbsolute,
      siteName: "ZedNova Studio",
      title: ogTitle,
      description: ogDescription,
      publishedTime: post.publishedAt,
      modifiedTime: post.lastReviewedAt ?? post.updatedAt ?? post.publishedAt,
      authors: [authorName],
      section: post.category,
      tags: post.tags,
      images: ogImage
        ? [{ url: ogImage, width: 1600, height: 900, alt: post.imageAlt ?? post.title }]
        : undefined,
    },
    twitter: {
      card: (post.seo?.twitterCard ?? "summary_large_image") as
        | "summary"
        | "summary_large_image"
        | "player"
        | "app",
      creator: "@zednova",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : ogImage ? [ogImage] : undefined,
    },
    robots: post.seo?.seoNoIndex
      ? { index: false, follow: false }
      : {
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

  const [author, related, adjacent, relatedServices] = await Promise.all([
    getAuthor(post.author),
    getRelatedPosts(slug, 3),
    getAdjacentPosts(slug),
    post.relatedLinks?.length
      ? Promise.resolve([])
      : post.relatedServices?.length
        ? getServicesBySlugs(post.relatedServices.slice(0, 4))
        : Promise.resolve([]),
  ]);

  const relatedLinkItems =
    post.relatedLinks ??
    relatedServices.map((service) => ({
      href: `/services/${service.slug}`,
      label: service.title,
    }));

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

  const showToc = post.tableOfContentsEnabled !== false && toc.length > 0;

  const url = articleUrl(slug);
  const hasFaq = Boolean(post.faqs && post.faqs.length);
  const imageCaption =
    post.imageCaption?.trim() ||
    (post.imageAlt && post.imageAlt !== post.title ? post.imageAlt : null);

  const coverDeliveryWidth = Math.min(
    Math.max(post.imageWidth ?? 3840, 3840),
    4096,
  );

  const enableFaqSchema =
    hasFaq && post.schemaMarkup?.enableFaqSchema !== false;

  return (
    <>
      <JsonLd
        data={insightPageGraphJsonLd({
          post,
          author,
          crumbs,
          faqs: post.faqs,
          related,
          includeToc: showToc,
          includeFaq: enableFaqSchema,
        })}
      />

      {/* Article — continuous guides frame */}
      <section
        data-theme="light"
        className="relative bg-zn-bg"
      >
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border pb-28">
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
                        · Last updated{" "}
                        <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                      </span>
                    )}
                    {post.lastReviewedAt && (
                      <span className="text-xs text-zn-text-3">
                        · Last reviewed{" "}
                        <time dateTime={post.lastReviewedAt}>
                          {formatDate(post.lastReviewedAt)}
                        </time>
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
                    {author ? (
                      <Link
                        href={`/about#${author.slug}`}
                        className="group flex min-w-0 items-center gap-3"
                      >
                        <AuthorAvatar
                          name={author.name}
                          avatar={author.avatar}
                          size="sm"
                          className="transition-opacity group-hover:opacity-85"
                        />
                        <div className="min-w-0 text-sm">
                          <p className="font-medium text-zn-text">{author.name}</p>
                          <p className="text-zn-text-3">{author.role}, ZedNova</p>
                        </div>
                      </Link>
                    ) : (
                      <span />
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
              <div className="relative w-full">
                <CmsImage
                  src={post.image}
                  alt={post.imageAlt ?? post.title}
                  width={post.imageWidth ?? 1920}
                  height={post.imageHeight ?? 1080}
                  priority
                  preset="hero"
                  maxWidth={coverDeliveryWidth}
                  quality={95}
                  sizes="100vw"
                  className="block h-auto w-full"
                />
              </div>
              {imageCaption && (
                <figcaption className="zn-container-inset border-t border-zn-border py-3 text-sm leading-relaxed text-zn-text-3">
                  {imageCaption}
                </figcaption>
              )}
            </figure>

            {/* Body — sidebar + article column */}
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset py-14 lg:py-16">
                <div className="mx-auto flex max-w-5xl gap-12 xl:gap-16">
                  <ArticleSidebar
                    post={post}
                    toc={toc}
                    showToc={showToc}
                    hasFaq={hasFaq}
                    author={author}
                    shareUrl={url}
                    shareTitle={post.title}
                  />

                  <article className="min-w-0 flex-1 lg:max-w-[720px]">
                    <ArticleMobileToc toc={toc} hasFaq={hasFaq} />

                    <ArticleQuickAnswer post={post} />
                    <ArticleAudienceLine post={post} />

                    {post.takeaways && post.takeaways.length > 0 && (
                      <div className="mb-10">
                        <ArticleTakeaways items={post.takeaways} />
                      </div>
                    )}

                    <ArticleBody blocks={post.body} />

                    {post.implementationTable && post.implementationTable.length > 0 && (
                      <ArticleImplementationTable rows={post.implementationTable} />
                    )}

                    {hasFaq && (
                      <div id="article-faq" className="mt-16">
                        <ArticleFaq faqs={post.faqs!} />
                      </div>
                    )}

                    {post.sources && post.sources.length > 0 && (
                      <ArticleSources sources={post.sources} />
                    )}

                    <ArticleTags tags={post.tags} />

                    <ArticleRelatedLinks items={relatedLinkItems} />

                    {author && (
                      <div className="mt-16 flex items-start gap-5 rounded-[2px] border border-zn-border bg-zn-bg-2/40 p-6">
                        <AuthorAvatar name={author.name} avatar={author.avatar} size="md" />
                        <div className="min-w-0">
                          <p className="font-sans font-normal text-zn-text">{author.name}</p>
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
                            {author.website && (
                              <Button
                                href={author.website}
                                variant="outline"
                                size="sm"
                                withArrow
                              >
                                Website
                              </Button>
                            )}
                            {author.twitter && (
                              <Button
                                href={author.twitter}
                                variant="outline"
                                size="sm"
                                withArrow
                              >
                                X / Twitter
                              </Button>
                            )}
                            <Button href="/contact" variant="outline" size="sm" withArrow>
                              Work with ZedNova
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <ArticleInlineCta post={post} />
                  </article>
                </div>
              </div>
            </div>

            {/* Previous / Next */}
            {(adjacent.previous || adjacent.next) && (
              <div
                className={cn(
                  "relative bg-zn-bg-2",
                  related.length > 0 && "border-b border-zn-border",
                )}
              >
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
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zn-text-3">
                        <Tag>{adjacent.previous.category}</Tag>
                        <span>
                          Published{" "}
                          <time dateTime={adjacent.previous.publishedAt}>
                            {formatDate(adjacent.previous.publishedAt)}
                          </time>
                        </span>
                      </div>
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
                      <div className="flex flex-wrap items-end justify-end gap-x-3 gap-y-2 text-xs text-zn-text-3">
                        <Tag>{adjacent.next.category}</Tag>
                        <span>
                          Published{" "}
                          <time dateTime={adjacent.next.publishedAt}>
                            {formatDate(adjacent.next.publishedAt)}
                          </time>
                        </span>
                      </div>
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
                <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
                <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />
                <ArticleContinueReading current={post} related={related} />
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
