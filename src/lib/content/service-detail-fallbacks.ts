import type { ProcessStep, Service } from "@/lib/types";

import { SERVICE_SLUG_BY_PARENT } from "./service-routes";
import { services as staticServices } from "./services";
import { getServiceFaqs } from "./service-faqs";
import { resolveProcessStepIcon } from "./service-process-icons";

const PARENT_CMS_SLUGS = new Set<string>(Object.values(SERVICE_SLUG_BY_PARENT));

function isParentCmsService(service: Service): boolean {
  return PARENT_CMS_SLUGS.has(service.slug);
}

export type ServiceSectionCopy = {
  problemsHeadline: string;
  subServicesEyebrow: string;
  subServicesHeadline: string;
  subServicesSubtext: string;
  processHeadline: string;
  processSubtext: string;
};

export type ServiceFaqSectionCopy = {
  eyebrow: string;
  headline: string;
  subtext: string;
};

export const FAQ_SECTION_COPY: Record<string, ServiceFaqSectionCopy> = {
  "ai-lead-site": {
    eyebrow: "FAQ",
    headline: "Lead-gen website questions, answered",
    subtext:
      "Pricing, timelines, SEO, CRM connections, and launch scope. The essentials before you reach out.",
  },
  "crm-pipeline-automation": {
    eyebrow: "FAQ",
    headline: "CRM automation questions, answered",
    subtext:
      "Pipeline setup, follow-up sequences, integrations, and what happens after a lead comes in.",
  },
  "ai-receptionist": {
    eyebrow: "FAQ",
    headline: "AI receptionist questions, answered",
    subtext:
      "Call handling, booking flows, missed-call text-back, and how we tune scripts after launch.",
  },
  "custom-in-house-software-for-smbs": {
    eyebrow: "FAQ",
    headline: "Custom software questions, answered",
    subtext:
      "Scope, integrations, access control, and what gets shipped in the first release.",
  },
  "platform-migrations": {
    eyebrow: "FAQ",
    headline: "Platform migration questions, answered",
    subtext:
      "Redirect maps, SEO preservation, downtime, and how we cut over without losing rankings.",
  },
  "seo-aeo-content": {
    eyebrow: "FAQ",
    headline: "SEO & AI search questions, answered",
    subtext:
      "Technical SEO, schema, llms.txt, content systems, and how we structure pages for Google and AI citations.",
  },
  "ai-systems-retainer": {
    eyebrow: "FAQ",
    headline: "Monthly support questions, answered",
    subtext:
      "What's included each month, response times, scope limits, and how ongoing improvements work.",
  },
};

const DEFAULT_FAQ_SECTION_COPY: ServiceFaqSectionCopy = {
  eyebrow: "FAQ",
  headline: "Answers before you reach out",
  subtext:
    "Pricing, timelines, scope, and what happens after launch. The essentials before you book a call.",
};

export const SECTION_COPY: Record<string, ServiceSectionCopy> = {
  "ai-lead-site": {
    problemsHeadline: "These are the reasons your website is not booking calls",
    subServicesEyebrow: "Lead-Gen Website Capabilities",
    subServicesHeadline: "Design. Build. Rank.",
    subServicesSubtext:
      "We handle the full stack, from conversion-focused design to AI-search structure, so your site ships faster and leads compound.",
    processHeadline: "How we build lead-gen websites that convert",
    processSubtext:
      "From funnel mapping to CRM-connected launch. Every step has a deliverable, an owner, and a clear definition of done.",
  },
  "crm-pipeline-automation": {
    problemsHeadline: "These are the reasons your pipeline is not closing leads",
    subServicesEyebrow: "CRM Automation Capabilities",
    subServicesHeadline: "Capture. Route. Follow up.",
    subServicesSubtext:
      "We wire the automations your team keeps forgetting, from instant lead alerts to multi-step nurture sequences.",
    processHeadline: "How we set up CRM & follow-up automation",
    processSubtext:
      "We audit how leads move today, architect clean stages, then automate the follow-up your team keeps forgetting.",
  },
  "ai-receptionist": {
    problemsHeadline: "These are the reasons your phone line is not capturing revenue",
    subServicesEyebrow: "AI Receptionist Capabilities",
    subServicesHeadline: "Answer. Book. Follow up.",
    subServicesSubtext:
      "From missed-call text-back to scripted intake and calendar booking. Every touchpoint handled before a human picks up.",
    processHeadline: "How we launch your AI receptionist",
    processSubtext:
      "Script the intake, build the agent, wire missed-call text-back, and tune from real call logs after go-live.",
  },
  "custom-in-house-software-for-smbs": {
    problemsHeadline: "These are the reasons your team is still running on spreadsheets",
    subServicesEyebrow: "Custom Software Capabilities",
    subServicesHeadline: "Scope. Build. Own.",
    subServicesSubtext:
      "We map your workflows, connect your existing tools, and ship portals, dashboards, and internal apps your team actually uses.",
    processHeadline: "How we build custom in-house software",
    processSubtext:
      "We inventory your data sources, design the views your team opens daily, and ship software that replaces manual tracking.",
  },
  "platform-migrations": {
    problemsHeadline: "These are the reasons your migration is not preserving growth",
    subServicesEyebrow: "Platform Migration Capabilities",
    subServicesHeadline: "Audit. Rebuild. Cut over.",
    subServicesSubtext:
      "We map every URL, preserve SEO equity, and migrate to a faster stack without downtime or ranking drops.",
    processHeadline: "How we migrate without losing SEO",
    processSubtext:
      "Audit, redirect map, rebuild on Next.js + Sanity, then cut over with zero downtime and a post-launch ranking check.",
  },
  "seo-aeo-content": {
    problemsHeadline: "These are the reasons your content is not ranking or getting cited",
    subServicesEyebrow: "SEO & AI Search Capabilities",
    subServicesHeadline: "Audit. Structure. Publish.",
    subServicesSubtext:
      "Technical SEO fixes, schema and llms.txt setup, and content built to rank on Google and appear in AI answers.",
    processHeadline: "How we build SEO & AI search systems",
    processSubtext:
      "Audit the foundation, structure pages for answers, research intent, then publish content that compounds month over month.",
  },
  "ai-systems-retainer": {
    problemsHeadline: "These are the reasons your stack is not improving every month",
    subServicesEyebrow: "Monthly Support Capabilities",
    subServicesHeadline: "Maintain. Improve. Report.",
    subServicesSubtext:
      "One shipped improvement every month, unlimited small fixes, and a performance report so nothing silently breaks.",
    processHeadline: "How ongoing support works",
    processSubtext:
      "Monthly strategy, one shipped improvement, unlimited small fixes, and a performance report so nothing silently breaks.",
  },
};

function enrichProcessSteps(
  cmsSteps: ProcessStep[],
  fallbackSteps: ProcessStep[],
  cmsOnly: boolean,
): ProcessStep[] {
  if (cmsSteps.length === 0) {
    if (cmsOnly) return [];
    return fallbackSteps.map((step) => ({
      ...step,
      icon: resolveProcessStepIcon(step.icon),
    }));
  }

  return cmsSteps.map((step, index) => {
    const match =
      fallbackSteps.find((entry) => entry.step === step.step) ?? fallbackSteps[index];
    if (!match) return step;

    return {
      ...step,
      title: step.title || (cmsOnly ? "" : match.title),
      description: step.description || (cmsOnly ? "" : match.description),
      icon: resolveProcessStepIcon(step.icon ?? match.icon),
      deliverables:
        step.deliverables && step.deliverables.length > 0
          ? step.deliverables
          : cmsOnly
            ? []
            : match.deliverables,
    };
  });
}

/** Merge CMS service data with static fallbacks so detail pages always render full sections. */
export function mergeServiceWithStaticFallback(service: Service): Service {
  const fallback = staticServices.find((entry) => entry.slug === service.slug);
  if (!fallback) return service;

  if (isParentCmsService(service)) {
    return {
      ...service,
      image: service.image || fallback.image,
      problems: service.problems?.length ? service.problems : [],
      subServices: service.subServices?.length ? service.subServices : [],
      values: [],
      testimonials: service.testimonials?.length ? service.testimonials : [],
      faqs: service.faqs?.length ? service.faqs : [],
      processSteps: enrichProcessSteps(
        service.processSteps ?? [],
        fallback.processSteps ?? [],
        true,
      ),
      deliverables: service.deliverables?.length ? service.deliverables : [],
      idealClients: service.idealClients?.length ? service.idealClients : [],
      results: service.results?.length ? service.results : [],
      relatedServices: service.relatedServices?.length ? service.relatedServices : [],
      relatedCaseStudies: service.relatedCaseStudies?.length
        ? service.relatedCaseStudies
        : [],
      relatedInsights: service.relatedInsights?.length ? service.relatedInsights : [],
    };
  }

  const subServices =
    service.subServices && service.subServices.length > 0
      ? service.subServices
      : [];

  return {
    ...fallback,
    ...service,
    heroEyebrow: service.heroEyebrow ?? fallback.heroEyebrow,
    focusKeyword: service.focusKeyword ?? fallback.focusKeyword,
    heroHeadline: service.heroHeadline ?? fallback.heroHeadline,
    heroSubhead: service.heroSubhead ?? fallback.heroSubhead,
    shortDescription: service.shortDescription || fallback.shortDescription,
    whatItIs: service.whatItIs || fallback.whatItIs,
    image: service.image || fallback.image,
    pricingSignal: service.pricingSignal || fallback.pricingSignal,
    timeline: service.timeline || fallback.timeline,
    problems:
      service.problems && service.problems.length > 0
        ? service.problems
        : [],
    problemsHeadline: service.problemsHeadline ?? fallback.problemsHeadline,
    subServices,
    values: [],
    testimonials:
      service.testimonials && service.testimonials.length > 0
        ? service.testimonials
        : fallback.testimonials ?? [],
    faqs:
      service.faqs && service.faqs.length > 0
        ? service.faqs
        : getServiceFaqs(service.slug).length > 0
          ? getServiceFaqs(service.slug)
          : fallback.faqs ?? [],
    faqEyebrow: service.faqEyebrow,
    faqHeadline: service.faqHeadline,
    faqSubtext: service.faqSubtext,
    processSteps: enrichProcessSteps(
      service.processSteps ?? [],
      fallback.processSteps ?? [],
      false,
    ),
    relatedServices:
      service.relatedServices && service.relatedServices.length > 0
        ? service.relatedServices
        : fallback.relatedServices ?? [],
    relatedCaseStudies:
      service.relatedCaseStudies && service.relatedCaseStudies.length > 0
        ? service.relatedCaseStudies
        : fallback.relatedCaseStudies,
    relatedInsights:
      service.relatedInsights && service.relatedInsights.length > 0
        ? service.relatedInsights
        : fallback.relatedInsights,
    deliverables:
      service.deliverables.length > 0 ? service.deliverables : fallback.deliverables,
    idealClients:
      service.idealClients.length > 0 ? service.idealClients : fallback.idealClients,
    results: service.results.length > 0 ? service.results : fallback.results,
  };
}

export function getServiceProblemsHeadline(service: Service): string {
  const fallback =
    SECTION_COPY[service.slug]?.problemsHeadline ??
    "Six problems this service solves for your business";

  return service.problemsHeadline?.trim() || fallback;
}

export function getServiceSectionCopy(slug: string): ServiceSectionCopy {
  return (
    SECTION_COPY[slug] ?? {
      problemsHeadline: "Six problems this service solves for your business",
      subServicesEyebrow: "Capabilities",
      subServicesHeadline: "What's included in this engagement",
      subServicesSubtext:
        "Every capability below ships as part of this service: scoped, built, and wired into your stack.",
      processHeadline: "How our process works",
      processSubtext:
        "A clear sequence from discovery to launch. Every step has an owner, a deliverable, and a definition of done.",
    }
  );
}

export function getServiceFaqSectionCopy(service: Service): ServiceFaqSectionCopy {
  const fallback = FAQ_SECTION_COPY[service.slug] ?? DEFAULT_FAQ_SECTION_COPY;

  return {
    eyebrow: service.faqEyebrow?.trim() || fallback.eyebrow,
    headline: service.faqHeadline?.trim() || fallback.headline,
    subtext: service.faqSubtext?.trim() || fallback.subtext,
  };
}
