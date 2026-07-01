import type { Industry, IndustryParent, PainPoint, ProcessStep } from "@/lib/types";
import type {
  IndustryBuildCard,
  IndustryGlanceItem,
  IndustryPageContent,
  IndustryProblemItem,
  IndustryProcessStepItem,
  IndustrySegmentCard,
  IndustrySystemStep,
  IndustryTrustStat,
} from "@/lib/types/industry-page";
import { mergeIndustryLandingCopy } from "@/lib/content/industry-detail-fallbacks";
import { assignIndustryBuildSpans } from "@/lib/content/industry-build-layout";
import { getServicePublicPath, getParentSlugForServiceSlug } from "@/lib/content/service-routes";

const GLANCE_ICON_DEFAULTS = [
  { icon: "/icons/industry/glance-audience.svg", iconKey: "glance-audience", subtitle: "Your ideal client" },
  { icon: "/icons/industry/glance-build.svg", iconKey: "glance-build", subtitle: "What we ship" },
  { icon: "/icons/industry/glance-outcome.svg", iconKey: "glance-outcome", subtitle: "Typical result" },
] as const;

const BENTO_SPANS: IndustryBuildCard["span"][] = ["2x1", "1x1", "1x1", "1x2", "1x1", "1x1"];

const DEFAULT_TRUST_STATS: IndustryTrustStat[] = [
  { value: "120+", label: "Projects shipped" },
  { value: "10+", label: "Years building products" },
  { value: "Senior-led", label: "No hand-offs to juniors" },
];

const DEFAULT_PROCESS: IndustryProcessStepItem[] = [
  {
    step: 1,
    title: "Map the current journey",
    body: "We audit how inquiries enter, get handled, and convert: calls, forms, DMs, booking, and follow-up.",
  },
  {
    step: 2,
    title: "Find the highest-leverage bottleneck",
    body: "We prioritize the fix that stops the most leaks: response time, intake, routing, or repeat revenue.",
  },
  {
    step: 3,
    title: "Build and connect the system",
    body: "We ship the website, automations, and dashboards wired to your CRM, calendar, and payment tools.",
  },
  {
    step: 4,
    title: "Launch, measure, and improve",
    body: "We go live, track what converts, and iterate without another full rebuild every quarter.",
  },
];

function resolveHref(href: string): string {
  const match = href.match(/^\/services\/([^/?#]+)/);
  if (!match) return href;
  return getParentSlugForServiceSlug(match[1])
    ? getServicePublicPath(match[1])
    : href;
}

function painToProblem(items: PainPoint[]): IndustryProblemItem[] {
  return items
    .map((item) => ({
      title: item.title,
      body: item.description ?? item.subheading ?? "",
    }))
    .filter((item) => item.body.trim().length > 0);
}

function mapProcessSteps(steps: ProcessStep[]): IndustryProcessStepItem[] {
  return steps.map((step) => ({
    step: step.step,
    title: step.title,
    body: step.description,
    deliverables: step.deliverables,
    icon: step.icon,
  }));
}

function defaultSystemSteps(parent: IndustryParent): IndustrySystemStep[] {
  const noun = parent.title.toLowerCase();
  return [
    { label: "01", title: "Visitor lands", body: `Prospects find you on Google, ads, or referrals. Your ${noun} page must explain the offer fast.` },
    { label: "02", title: "Inquiry captured", body: "Forms, calls, chat, and DMs route into one place instead of scattered inboxes." },
    { label: "03", title: "Lead routed", body: "CRM assigns an owner, alerts the team, and triggers the right next step automatically." },
    { label: "04", title: "Follow-up triggered", body: "Email, SMS, or AI receptionist responds in minutes, not hours or the next business day." },
    { label: "05", title: "Booking or checkout", body: "Appointments, consults, orders, or contracts move forward with fewer manual handoffs." },
    { label: "06", title: "Reporting updated", body: "Pipeline, revenue, and source data show up in a dashboard your team actually checks." },
    { label: "07", title: "Retention loop", body: "Reviews, rebooking, replenishment, or nurture sequences run without someone remembering each time." },
  ];
}

function defaultGlance(parent: IndustryParent): IndustryGlanceItem[] {
  const rows = [
    { title: "Who we build for", body: parent.whoItIsFor },
    { title: "What we build", body: parent.whatWeBuild },
    { title: "Example outcome", body: parent.exampleProject },
  ].filter((item) => item.body.trim().length > 0);

  return rows.map((row, index) => ({
    ...row,
    subtitle: GLANCE_ICON_DEFAULTS[index]?.subtitle,
    icon: GLANCE_ICON_DEFAULTS[index]?.icon,
    iconKey: GLANCE_ICON_DEFAULTS[index]?.iconKey,
  }));
}

function buildsFromPopular(parent: IndustryParent): IndustryBuildCard[] {
  const spans = assignIndustryBuildSpans(parent.popularServices.length);
  return parent.popularServices.map((service, index) => ({
    title: service.label,
    body: parent.whatWeBuild,
    bestFor: parent.whoItIsFor.split(".")[0] ?? parent.whoItIsFor,
    serviceHref: resolveHref(service.href),
    span: spans[index] ?? BENTO_SPANS[index % BENTO_SPANS.length],
  }));
}

function segmentsFromSubs(subs: Industry[]): IndustrySegmentCard[] {
  return subs.map((segment) => ({
    title: segment.title,
    body: segment.hook,
    commonBuild: segment.whatWeBuild.split(".")[0] ?? segment.whatWeBuild,
  }));
}

/** Build full page content from CMS parent record, static fallbacks, and sub-industry segments. */
export function resolveIndustryPageContent(
  parent: IndustryParent,
  subIndustries: Industry[] = [],
): IndustryPageContent {
  const copy = mergeIndustryLandingCopy(parent);

  const hero = {
    eyebrow: parent.heroEyebrow ?? copy.heroEyebrow,
    heading: parent.heroHeadline ?? copy.heroHeadline,
    subheading: parent.heroSubhead ?? copy.heroSubhead,
    primaryCta: {
      label: parent.primaryCtaLabel ?? "Book a discovery call",
      href: parent.primaryCtaHref ?? `/contact?industry=${parent.slug}`,
    },
    secondaryCta: {
      label: parent.secondaryCtaLabel ?? "See our work",
      href: parent.secondaryCtaHref ?? "/work",
    },
    image: parent.image,
    imageAlt: parent.imageAlt ?? parent.title,
  };

  const glanceItems = parent.glanceItems?.length
    ? parent.glanceItems
    : defaultGlance(parent);

  const problemItems: IndustryProblemItem[] = parent.problemItems?.length
    ? parent.problemItems
    : parent.problems?.length
      ? painToProblem(parent.problems)
      : painToProblem(copy.problems);

  const systemSteps = parent.systemSteps?.length
    ? parent.systemSteps
    : defaultSystemSteps(parent);

  const buildCards = parent.buildCards?.length
    ? parent.buildCards.map((card, index) => {
        const spans = assignIndustryBuildSpans(parent.buildCards!.length);
        const { subtitle, ...rest } = card;
        return {
          ...rest,
          ...(subtitle && !/^deliverables?$/i.test(subtitle.trim()) ? { subtitle } : {}),
          span: spans[index] ?? card.span ?? "1x1",
        };
      })
    : buildsFromPopular(parent);

  const segmentCards = parent.segmentCards?.length
    ? parent.segmentCards
    : segmentsFromSubs(subIndustries);

  const processSteps = parent.processSteps?.length
    ? mapProcessSteps(parent.processSteps)
    : DEFAULT_PROCESS;

  const faqItems = parent.faqs?.length ? parent.faqs : copy.faqs;

  return {
    slug: parent.slug,
    title: parent.title,
    seoTitle: parent.seo?.seoTitle ?? hero.heading,
    seoDescription: parent.seo?.seoDescription ?? hero.subheading,
    hero,
    logoCarousel: {
      show: parent.showLogoCarousel !== false,
      label: parent.logoCarouselLabel ?? "Trusted by teams across the US",
    },
    glance: {
      eyebrow: parent.glanceEyebrow ?? "At a glance",
      heading: parent.glanceHeading ?? "Built for your market, not a generic agency template",
      subheading: parent.glanceSubheading,
      items: glanceItems,
    },
    problems: {
      eyebrow: parent.problemsEyebrow ?? "Diagnosis",
      heading: parent.problemsHeading ?? copy.problemsHeadline,
      subheading: parent.problemsSubheading,
      cta: parent.problemsCtaLabel
        ? { label: parent.problemsCtaLabel, href: parent.problemsCtaHref ?? hero.primaryCta.href }
        : undefined,
      items: problemItems,
    },
    system: {
      eyebrow: parent.systemEyebrow ?? "Connected system",
      heading: parent.systemHeading ?? copy.systemHeadline,
      subheading: parent.systemSubheading ?? copy.systemSubtext,
      steps: systemSteps,
    },
    builds: {
      eyebrow: parent.buildsEyebrow ?? "Deliverables",
      heading: parent.buildsHeading ?? "What we build for this industry",
      subheading: parent.buildsSubheading ?? parent.whatWeBuild,
      cards: buildCards,
    },
    segments: {
      eyebrow: parent.segmentsEyebrow ?? copy.subIndustriesEyebrow,
      heading: parent.segmentsHeading ?? copy.subIndustriesHeadline,
      subheading: parent.segmentsSubheading ?? copy.subIndustriesSubtext,
      cards: segmentCards,
    },
    proof: {
      eyebrow: parent.proofEyebrow ?? "Proof",
      heading: parent.proofHeading ?? "What clients say",
      subheading: parent.proofSubheading ?? "Real reviews from real projects",
      testimonialTags: parent.testimonialFilterTags,
    },
    services: {
      eyebrow: parent.servicesEyebrow ?? copy.servicesEyebrow,
      heading: parent.servicesHeadline ?? copy.servicesHeadline,
      subheading: parent.servicesSubheading,
    },
    process: {
      eyebrow: parent.processEyebrow ?? "Process",
      heading: parent.processHeading ?? "How we work with your team",
      subheading: parent.processSubheading,
      steps: processSteps,
    },
    insights: {
      eyebrow: parent.insightsEyebrow ?? "Insights",
      heading: parent.insightsHeading ?? "Related articles",
      subheading: parent.insightsSubheading,
    },
    cta: {
      eyebrow: parent.ctaEyebrow ?? "Next step",
      heading: parent.ctaHeading ?? copy.ctaHeading,
      subheading: parent.ctaSub ?? copy.ctaSub,
      primaryCta: {
        label: parent.ctaPrimaryLabel ?? "Start a project",
        href: parent.ctaPrimaryHref ?? `/contact?industry=${parent.slug}`,
      },
      secondaryCta: {
        label: parent.ctaSecondaryLabel ?? "View our work",
        href: parent.ctaSecondaryHref ?? "/work",
      },
      microcopy: parent.ctaMicrocopy,
      trustStats: parent.trustStats?.length ? parent.trustStats : DEFAULT_TRUST_STATS,
    },
    faq: {
      eyebrow: parent.faqEyebrow ?? copy.faqEyebrow,
      heading: parent.faqHeadline ?? copy.faqHeadline,
      subheading: parent.faqSubtext ?? copy.faqSubtext,
      items: faqItems,
    },
    workEyebrow: parent.workEyebrow ?? copy.workEyebrow,
    workHeadline: parent.workHeadline ?? copy.workHeadline,
  };
}

export function hasSectionContent<T>(
  items: T[] | undefined,
  min = 1,
): items is T[] {
  return Boolean(items && items.length >= min);
}
