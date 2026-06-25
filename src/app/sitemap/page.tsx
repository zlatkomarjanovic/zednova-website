import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllCaseStudies,
  getCustomSoftwareGroups,
  getAllMigrations,
  getAllPosts,
  getAllServices,
  getIndustryGroups,
} from "@/lib/queries";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { TemplateSection } from "@/ui/TemplateSection";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sitemap — All Pages | ZedNova Studios",
  description:
    "Full human-readable sitemap of ZedNova Studios — services, industries, case studies, custom software, migrations, and insights.",
  alternates: { canonical: "/sitemap" },
  openGraph: {
    type: "website",
    url: "/sitemap",
    title: "Sitemap — ZedNova Studios",
    description: "Full human-readable sitemap of ZedNova Studios.",
  },
  robots: { index: true, follow: true },
};

type SitemapGroup = {
  label: string;
  href?: string;
  description?: string;
  items: { title: string; href: string; description?: string }[];
};

export default async function SitemapPage() {
  const [services, industries, work, posts, migrations, customSoftwareGroups] =
    await Promise.all([
      getAllServices(),
      getIndustryGroups(),
      getAllCaseStudies(),
      getAllPosts(),
      getAllMigrations(),
      getCustomSoftwareGroups(),
    ]);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Sitemap" },
  ];

  const groups: SitemapGroup[] = [
    {
      label: "Company",
      description: "Who we are and how to reach us.",
      items: [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Contact", href: "/contact" },
        { title: "Work", href: "/work" },
        { title: "Insights", href: "/insights" },
        { title: "Resources", href: "/resources" },
        { title: "Products", href: "/products" },
        { title: "Sitemap (XML)", href: "/sitemap.xml" },
        { title: "llms.txt", href: "/llms.txt" },
      ],
    },
    {
      label: "Services",
      href: "/services",
      description:
        "Website design, Shopify, automation, AI tools, and custom software.",
      items: services.map((s) => ({
        title: s.title,
        href: `/services/${s.slug}`,
        description: s.shortDescription,
      })),
    },
    {
      label: "Custom software",
      href: "/custom-software",
      description: "Portals, dashboards, booking flows, and internal tools.",
      items: customSoftwareGroups.flatMap((g) =>
        g.items.map((item) => ({
          title: item.title,
          href: item.href,
          description: item.shortDescription,
        })),
      ),
    },
    {
      label: "Migrations",
      href: "/migrations",
      description: "Move from WordPress, Webflow, Wix, Framer, or Shopify to a modern stack.",
      items: migrations.map((m) => ({
        title: m.title,
        href: `/migrations/${m.slug}`,
        description: m.shortDescription,
      })),
    },
    {
      label: "Industries",
      href: "/industries",
      description:
        "Healthcare, dental, medspas, ecommerce, fitness, professional services, B2B SaaS, and real estate.",
      items: industries.flatMap((group) => [
        {
          title: group.parent.title,
          href: `/industries/${group.parent.slug}`,
          description: group.parent.hook,
        },
        ...group.industries.map((ind) => ({
          title: `${ind.title} (${group.parent.title})`,
          href: `/industries/${ind.slug}`,
          description: ind.hook,
        })),
      ]),
    },
    {
      label: "Work",
      href: "/work",
      description: "Case studies and project write-ups.",
      items: work.map((c) => ({
        title: c.title,
        href: `/work/${c.slug}`,
        description: c.resultHeadline ?? c.client,
      })),
    },
    {
      label: "Insights",
      href: "/insights",
      description: "Notes, walkthroughs, and explainers.",
      items: posts.map((p) => ({
        title: p.title,
        href: `/insights/${p.slug}`,
        description: p.excerpt,
      })),
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            path: "/sitemap",
            name: "Sitemap — ZedNova Studios",
            description:
              "Human-readable sitemap listing all services, industries, case studies, custom software, migrations, and insights.",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset pb-16 pt-32 lg:pb-20 lg:pt-44">
                <Breadcrumbs items={crumbs} className="mb-8" />
                <Reveal>
                  <SectionLabel withRule={false}>Site map</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Every page on ZedNova Studios, in one place."
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    A human- and crawler-readable index of services, industries,
                    case studies, custom software, migrations, and insights.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TemplateSection borderBottom={false}>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.label}>
              <h2 className="font-sans text-lg font-normal text-zn-text">
                {group.href ? (
                  <Link href={group.href} className="underline-offset-4 hover:underline">
                    {group.label}
                  </Link>
                ) : (
                  group.label
                )}
              </h2>
              {group.description && (
                <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
                  {group.description}
                </p>
              )}
              <ul className="mt-4 space-y-2 border-t border-zn-border pt-4">
                {group.items.length === 0 && (
                  <li className="text-sm text-zn-text-3">No pages yet.</li>
                )}
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group block py-1 text-sm text-zn-text transition-colors hover:text-zn-text-3"
                    >
                      <span className="font-medium">{item.title}</span>
                      {item.description && (
                        <span className="mt-0.5 block text-xs leading-snug text-zn-text-3">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </TemplateSection>
    </>
  );
}
