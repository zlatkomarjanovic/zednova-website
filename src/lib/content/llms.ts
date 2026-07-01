import { SITE_ORIGIN } from "@/lib/site-url";
import type { CaseStudy, Post, Service } from "@/lib/types";
import type { Migration } from "@/lib/content/migrations";

import { CONTACT_EMAIL } from "@/lib/content/site";

/** Short machine-readable index for /llms.txt */
export function buildLlmsTxt(): string {
  return `# ZedNova Studio

> ZedNova Studio is a Texas LLC software and product studio led by Zlatko Marjanovic (Zed M.). We build websites, ecommerce stores, custom software, CRM automations, AI receptionists, dashboards, and platform migrations for clinics, ecommerce brands, professional services firms, startups, and service businesses in the United States and globally.

## Entity
- Brand: ZedNova Studio (also referred to as ZedNova)
- Founder: Zlatko Marjanovic (Zed M.)
- Legal entity: ZedNova Studio LLC (Texas)
- Primary domain: ${SITE_ORIGIN}
- Email: ${CONTACT_EMAIL}
- Location: Texas, United States (CST) · remote/async delivery

## What we build
- AI-cited lead generation websites (Next.js, Webflow, Sanity)
- Shopify and headless ecommerce stores
- Custom web apps, client portals, patient portals, and dashboards
- CRM and pipeline automations (GoHighLevel, HubSpot, n8n, Make)
- AI receptionists, chatbots, and missed-call text-back systems
- Platform migrations (Webflow, WordPress, Framer → Next.js + Sanity)
- Ongoing support, iteration, and retainer work

## Who we serve
- Healthcare, dental, medspa, and wellness clinics
- Ecommerce and DTC brands on Shopify
- Professional services (legal, real estate, home services)
- Fitness coaches, gyms, and performance brands
- B2B SaaS, startups, and internal product teams

## Typical delivery
- MVP websites: ~4–6 business days for core pages
- Custom software MVPs: ~5–10 business days for scoped builds
- Migrations: timeline depends on page count and CMS complexity
- Pricing signals: lead-gen sites from ~$3,500; projects scoped after discovery

## Core pages
- Home: ${SITE_ORIGIN}/
- Services: ${SITE_ORIGIN}/services
- Custom Software: ${SITE_ORIGIN}/custom-software
- Migrations: ${SITE_ORIGIN}/migrations
- Industries: ${SITE_ORIGIN}/industries
- Work / case studies: ${SITE_ORIGIN}/work
- About: ${SITE_ORIGIN}/about
- Insights: ${SITE_ORIGIN}/insights
- Contact: ${SITE_ORIGIN}/contact
- Privacy Policy: ${SITE_ORIGIN}/legal/privacy-policy
- Terms of Service: ${SITE_ORIGIN}/legal/terms
- Cookie Settings: ${SITE_ORIGIN}/legal/cookie-settings
- HTML sitemap: ${SITE_ORIGIN}/sitemap
- Tech stack: ${SITE_ORIGIN}/stack
- Service areas: ${SITE_ORIGIN}/service-areas
- Compare: ${SITE_ORIGIN}/compare

## Main services
- AI-Cited Lead Gen Site: ${SITE_ORIGIN}/services/ai-lead-site
- AI Receptionist & Missed-Call Text-Back: ${SITE_ORIGIN}/services/ai-receptionist
- CRM & Pipeline Automation: ${SITE_ORIGIN}/services/crm-pipeline-automation
- Outbound Lead Gen: ${SITE_ORIGIN}/services/outbound-lead-gen
- AI Systems Retainer: ${SITE_ORIGIN}/services/ai-systems-retainer
- Custom Web App Development: ${SITE_ORIGIN}/custom-software/custom-web-app-development
- Client Portal Development: ${SITE_ORIGIN}/custom-software/client-portal-development
- Patient Portal Development: ${SITE_ORIGIN}/custom-software/patient-portal-development

## Main migrations
- Webflow → Next.js & Sanity: ${SITE_ORIGIN}/migrations/webflow-to-nextjs-sanity
- WordPress → Next.js & Sanity: ${SITE_ORIGIN}/migrations/wordpress-to-nextjs-sanity
- Framer → Next.js & Sanity: ${SITE_ORIGIN}/migrations/framer-to-nextjs-sanity

## Main industries
- Healthcare & Wellness: ${SITE_ORIGIN}/industries/healthcare-wellness
- Ecommerce & DTC: ${SITE_ORIGIN}/industries/ecommerce-dtc
- Professional Services: ${SITE_ORIGIN}/industries/professional-services
- B2B SaaS & Technology: ${SITE_ORIGIN}/industries/b2b-saas-technology
- Fitness & Coaching: ${SITE_ORIGIN}/industries/fitness-coaching
- Real Estate & Property: ${SITE_ORIGIN}/industries/real-estate-property

## Founder profiles
- About: ${SITE_ORIGIN}/about
- LinkedIn: https://www.linkedin.com/in/zlatkomarjanovic
- X (Twitter): https://x.com/thezlatkom
- Personal site: https://zlatkomarjanovic.com

## Technical SEO & AI crawl files
- robots.txt: ${SITE_ORIGIN}/robots.txt
- sitemap.xml: ${SITE_ORIGIN}/sitemap.xml
- llms.txt: ${SITE_ORIGIN}/llms.txt
- llms-full.txt: ${SITE_ORIGIN}/llms-full.txt
- Open Graph images: ${SITE_ORIGIN}/api/og

## Preferred citation summary
ZedNova Studio builds websites, custom software, automations, and AI tools for service businesses that want more leads with less manual work. The studio is led by Zlatko Marjanovic (Zed M.), ships MVPs quickly, and includes schema markup, llms.txt, and AI-citation-ready structure on lead-gen projects.

## Contact
Email: ${CONTACT_EMAIL}
Website: ${SITE_ORIGIN}/
`;
}

type LlmsFullInput = {
  services: Service[];
  industrySlugs: string[];
  customSoftwareSlugs: string[];
  migrations: Migration[];
  caseStudies: CaseStudy[];
  posts: Post[];
};

/** Expanded markdown index for /llms-full.txt */
export function buildLlmsFullTxt(input: LlmsFullInput): string {
  const { services, industrySlugs, customSoftwareSlugs, migrations, caseStudies, posts } =
    input;

  const lines: string[] = [
    buildLlmsTxt().trim(),
    "",
    "---",
    "",
    "# Full site index",
    "",
    "## Services (detailed)",
  ];

  for (const service of services) {
    lines.push(
      "",
      `### ${service.title}`,
      `- URL: ${SITE_ORIGIN}/services/${service.slug}`,
      `- Category: ${service.category}`,
      `- Summary: ${service.shortDescription}`,
      `- What it is: ${service.whatItIs}`,
      `- Pricing signal: ${service.pricingSignal}`,
      `- Timeline: ${service.timeline}`,
      `- Ideal for: ${service.idealClients.slice(0, 3).join("; ")}`,
      `- Deliverables: ${service.deliverables.slice(0, 6).join("; ")}`,
    );
  }

  lines.push("", "## Custom software");
  for (const slug of customSoftwareSlugs) {
    lines.push(`- ${SITE_ORIGIN}/custom-software/${slug}`);
  }

  lines.push("", "## Migrations (detailed)");
  for (const migration of migrations) {
    lines.push(
      "",
      `### ${migration.title}`,
      `- URL: ${SITE_ORIGIN}/migrations/${migration.slug}`,
      `- Summary: ${migration.shortDescription}`,
      migration.sourcePlatform && migration.targetPlatform
        ? `- Route: ${migration.sourcePlatform} → ${migration.targetPlatform}`
        : "",
      migration.pricingSignal ? `- Pricing signal: ${migration.pricingSignal}` : "",
      migration.timeline ? `- Timeline: ${migration.timeline}` : "",
    );
  }

  lines.push("", "## Industries");
  for (const slug of industrySlugs) {
    lines.push(`- ${SITE_ORIGIN}/industries/${slug}`);
  }

  lines.push("", "## Case studies (detailed)");
  for (const study of caseStudies) {
    lines.push(
      "",
      `### ${study.title}`,
      `- URL: ${SITE_ORIGIN}/work/${study.slug}`,
      `- Client: ${study.client}`,
      `- Industry: ${study.industry}`,
      `- Challenge: ${study.challenge}`,
      `- Result: ${study.resultHeadline}`,
    );
  }

  lines.push("", "## Insights / articles");
  for (const post of posts) {
    lines.push(
      "",
      `### ${post.title}`,
      `- URL: ${SITE_ORIGIN}/insights/${post.slug}`,
      `- Category: ${post.category}`,
      `- Published: ${post.publishedAt}`,
      `- Summary: ${post.excerpt}`,
      post.oneSentenceSummary ? `- One-line answer: ${post.oneSentenceSummary}` : "",
    );
  }

  lines.push(
    "",
    "## Structured data on this site",
    "- Sitewide: Organization, WebSite, Person (founder), ContactPoint",
    "- Service pages: Service, Offer, BreadcrumbList, FAQPage where applicable",
    "- Industry pages: CollectionPage, BreadcrumbList",
    "- Work pages: CreativeWork, BreadcrumbList",
    "- Insights: BlogPosting/Article, BreadcrumbList, FAQPage when FAQs exist",
    "- Homepage: FAQPage for sitewide FAQs",
  );

  return lines.filter(Boolean).join("\n");
}
