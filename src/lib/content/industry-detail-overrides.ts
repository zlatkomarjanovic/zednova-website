/**
 * @deprecated Sub-industry detail pages were removed. Parent landing copy lives in
 * industry-detail-fallbacks.ts and Sanity industryParent documents. Do not import
 * in runtime code.
 */
import type { Industry } from "@/lib/types";

type IndustryOverride = Partial<
  Pick<
    Industry,
    | "heroHeadline"
    | "shortDescription"
    | "whoItIsFor"
    | "whatWeBuild"
    | "problemSolved"
    | "painPoints"
    | "popularServices"
    | "exampleProject"
    | "commonUseCase"
    | "faqs"
    | "relatedServices"
    | "relatedCaseStudies"
    | "relatedInsights"
  >
>;

const dentalClinics: IndustryOverride = {
  heroHeadline: "Websites, recall automation, and review systems for dental groups",
  shortDescription:
    "We help dental practices capture new-patient calls, automate hygiene recall, and grow Google reviews, without adding front-desk headcount.",
  whoItIsFor:
    "Multi-chair dental groups and single-location practices with busy front desks, long recall lists, and thin Google presence compared to nearby competitors.",
  whatWeBuild:
    "Dental websites with online booking, digital intake, hygiene recall sequences, missed-call text-back, AI phone coverage, and automated Google review requests.",
  problemSolved:
    "New-patient calls go to voicemail during peak hours, recalls slip, and reviews only happen when someone remembers to ask, so chairs stay empty and local search lags.",
  painPoints: [
    {
      title: "New-patient calls lost during peak hours",
      description:
        "Front desk teams cannot answer every call while checking patients in. Voicemail means the next practice on Google gets the booking.",
    },
    {
      title: "Hygiene recall lives in spreadsheets",
      description:
        "Patients due for cleanings fall off the list. Manual phone tag does not scale when the schedule is already full.",
    },
    {
      title: "Reviews depend on whoever has time",
      description:
        "Five-star patients leave without a prompt. Competitors with more reviews rank higher for high-intent local searches.",
    },
    {
      title: "Intake and forms slow first visits",
      description:
        "Paper forms and phone tag before the appointment create no-shows and a rough first impression.",
    },
  ],
  popularServices: [
    { label: "Clinic Website & SEO", href: "/services/ai-lead-site" },
    { label: "CRM & Recall Automation", href: "/services/crm-pipeline-automation" },
    { label: "AI Receptionist", href: "/services/ai-receptionist" },
    { label: "Review Automation", href: "/services/review-reputation" },
  ],
  exampleProject:
    "A multi-location dental group went from missed new-patient calls and manual recall to automated hygiene sequences, AI overflow coverage, and 47 new Google reviews in 60 days.",
  commonUseCase:
    "A patient searches for a dentist nearby, books online, completes intake on their phone, gets SMS reminders, and receives a review request after a great visit.",
  relatedServices: ["ai-lead-site", "crm-pipeline-automation", "ai-receptionist", "review-reputation"],
  relatedCaseStudies: ["dental-recall-reputation"],
  relatedInsights: ["crm-automation-for-clinics-without-extra-hires"],
  faqs: [
    {
      question: "Can you integrate with our existing PMS or CRM?",
      answer:
        "Yes. We typically connect booking, intake, and follow-up through your CRM or automation layer, HubSpot, GoHighLevel, or similar, without replacing your clinical software.",
    },
    {
      question: "How fast can recall automation go live?",
      answer:
        "Most dental recall and review stacks launch in two to three weeks once we have your patient communication rules and branding.",
    },
  ],
};

const medspas: IndustryOverride = {
  heroHeadline: "Booking, rebooking, and review flows built for med spas",
  shortDescription:
    "We build med spa websites, treatment booking, consult funnels, and automated rebooking so your team stops juggling DMs, phones, and spreadsheets.",
  whoItIsFor:
    "Med spas selling injectables, facials, and memberships with high Instagram traffic but inconsistent follow-up on consult requests.",
  whatWeBuild:
    "Treatment pages, consult booking, CRM nurture sequences, rebooking emails, SMS reminders, AI receptionist for overflow, and review automation after visits.",
  problemSolved:
    "Leads come from Instagram DMs, Google, and referrals, but response is slow, rebooking is manual, and reviews are inconsistent.",
  painPoints: [
    {
      title: "Consult requests sit in DMs and voicemail",
      description:
        "High-intent leads message on Instagram or call during treatments. Delayed replies lose bookings to faster competitors.",
    },
    {
      title: "Rebooking depends on front desk memory",
      description:
        "Clients who loved their treatment are not automatically invited back on a schedule that fills your calendar.",
    },
    {
      title: "Treatment pages do not convert traffic",
      description:
        "Generic site copy fails to explain packages, pricing signals, and what to expect, so ad spend leaks.",
    },
    {
      title: "Reviews are sporadic",
      description:
        "Before-and-after results are strong, but Google review volume stays flat without a timed ask.",
    },
  ],
  popularServices: [
    { label: "Clinic Website Design", href: "/services/ai-lead-site" },
    { label: "CRM Automation", href: "/services/crm-pipeline-automation" },
    { label: "AI Receptionist", href: "/services/ai-receptionist" },
    { label: "Review Automation", href: "/services/review-reputation" },
  ],
  exampleProject:
    "A med spa rebuilt treatment pages, wired consult booking into CRM, and added rebooking plus review sequences, cutting response time from hours to minutes.",
  commonUseCase:
    "A prospect finds a Botox landing page on Google, books a consult online, gets SMS reminders, and receives a rebooking offer two weeks after their first visit.",
  relatedServices: ["ai-lead-site", "crm-pipeline-automation", "review-reputation", "ai-receptionist"],
  relatedCaseStudies: ["dental-recall-reputation"],
  relatedInsights: ["crm-automation-for-clinics-without-extra-hires"],
};

const aestheticClinics: IndustryOverride = {
  heroHeadline: "Consult funnels and follow-up for aesthetic and cosmetic clinics",
  shortDescription:
    "We help aesthetic clinics turn procedure interest into booked consults with clear treatment pages, intake, and automated nurture.",
  whoItIsFor:
    "Cosmetic and aesthetic clinics selling high-ticket procedures where consult quality and speed-to-reply determine conversion.",
  whatWeBuild:
    "Procedure landing pages, consult booking, qualification forms, CRM pipelines, SMS follow-up, and post-visit review requests tailored to aesthetic workflows.",
  problemSolved:
    "Prospects research procedures online but drop off when the site is vague, response is slow, or follow-up stops after the first touch.",
  painPoints: [
    {
      title: "Procedure pages fail to qualify buyers",
      description:
        "Traffic arrives from ads and search but pages do not answer cost signals, recovery, or candidacy, so consults stay low quality.",
    },
    {
      title: "Consult follow-up is inconsistent",
      description:
        "Coordinators chase leads manually. Hot prospects cool off when nobody owns the next step.",
    },
    {
      title: "Before/after proof is hard to find",
      description:
        "Great outcomes live on social but are not structured on the site for SEO and trust.",
    },
  ],
  popularServices: [
    { label: "Conversion Website", href: "/services/ai-lead-site" },
    { label: "CRM Pipeline Automation", href: "/services/crm-pipeline-automation" },
    { label: "SEO & AEO Content", href: "/services/seo-aeo-content" },
    { label: "Review Automation", href: "/services/review-reputation" },
  ],
  exampleProject:
    "An aesthetic clinic launched procedure-specific landing pages with consult booking and a five-touch nurture sequence for leads who did not book on first visit.",
  commonUseCase:
    "A patient researches lip filler, lands on a dedicated page, submits a consult request, and gets a coordinator callback plus SMS confirmation within minutes.",
  relatedServices: ["ai-lead-site", "crm-pipeline-automation", "seo-aeo-content", "review-reputation"],
  relatedInsights: ["crm-automation-for-clinics-without-extra-hires"],
};

const skincareClinics: IndustryOverride = {
  heroHeadline: "Treatment menus, booking, and patient follow-up for skincare clinics",
  shortDescription:
    "We build skincare and dermatology clinic sites with clear treatment menus, online booking, and automated follow-up that keeps patients on plan.",
  whoItIsFor:
    "Skincare and dermatology clinics with multi-step treatment plans, membership packages, and repeat visit schedules.",
  whatWeBuild:
    "Service menu sites, membership pages, booking flows, intake forms, appointment reminders, and post-visit education sequences.",
  problemSolved:
    "Patients drop off between visits when reminders are manual, treatment plans are unclear online, and rebooking is left to chance.",
  painPoints: [
    {
      title: "Treatment menus confuse new patients",
      description:
        "Too many services listed without guidance on what to book first, so prospects bounce to a clearer competitor.",
    },
    {
      title: "Membership renewals are manual",
      description:
        "Package clients expire quietly without automated renewal prompts or upgrade paths.",
    },
    {
      title: "Follow-up between visits is weak",
      description:
        "Home-care instructions and check-ins are ad hoc instead of timed to improve outcomes and rebooking.",
    },
  ],
  popularServices: [
    { label: "Clinic Website", href: "/services/ai-lead-site" },
    { label: "CRM Automation", href: "/services/crm-pipeline-automation" },
    { label: "AI Receptionist", href: "/services/ai-receptionist" },
    { label: "Ops Automation", href: "/services/ops-automation" },
  ],
  exampleProject:
    "A skincare clinic reorganized its treatment menu online, added package booking, and automated between-visit check-ins to reduce no-shows.",
  commonUseCase:
    "A patient books a facial online, receives prep instructions by SMS, and gets a membership upgrade offer after their third visit.",
  relatedServices: ["ai-lead-site", "crm-pipeline-automation", "ops-automation"],
  relatedInsights: ["crm-automation-for-clinics-without-extra-hires"],
};

const skincareBrands: IndustryOverride = {
  heroHeadline: "Shopify stores and retention flows for skincare DTC brands",
  shortDescription:
    "We build skincare Shopify stores, routine landing pages, quizzes, and Klaviyo flows that turn first orders into subscription and repeat revenue.",
  whoItIsFor:
    "Skincare DTC brands selling routines, subscriptions, or hero SKUs with rising ad costs and flat repeat purchase rates.",
  whatWeBuild:
    "Shopify theme development, routine and quiz landing pages, subscription flows, cart recovery, post-purchase education, and revenue dashboards.",
  problemSolved:
    "Traffic is expensive, product pages under-explain the routine, and second orders stall without structured email and SMS retention.",
  painPoints: [
    {
      title: "Routine story does not convert cold traffic",
      description:
        "Shoppers need guidance on order of use and results timeline, generic product grids fail to close.",
    },
    {
      title: "Subscriptions churn silently",
      description:
        "No win-back or education flow when a subscriber pauses or skips, LTV stays flat.",
    },
    {
      title: "Cart abandonment without recovery",
      description:
        "High-intent visitors leave and never hear a structured sequence that brings them back.",
    },
    {
      title: "Creative and CAC outpace retention",
      description:
        "New customer acquisition rises while repeat rate and email revenue lag behind.",
    },
  ],
  popularServices: [
    { label: "Shopify Development", href: "/services/ai-lead-site" },
    { label: "Klaviyo & CRM Flows", href: "/services/crm-pipeline-automation" },
    { label: "Cart & Ops Automation", href: "/services/ops-automation" },
    { label: "Revenue Dashboard", href: "/services/custom-in-house-software-for-smbs" },
  ],
  exampleProject:
    "A skincare DTC brand rebuilt product pages around a three-step routine, added quiz-led landing pages, and launched cart recovery plus post-purchase replenishment flows.",
  commonUseCase:
    "A shopper completes a skin quiz, lands on a personalized routine page, subscribes to refills, and receives usage tips that drive a second SKU purchase.",
  relatedServices: ["ai-lead-site", "crm-pipeline-automation", "ops-automation", "custom-in-house-software-for-smbs"],
  relatedCaseStudies: ["dental-recall-reputation"],
  relatedInsights: ["shopify-conversion-fixes-that-actually-move-revenue"],
};

const overrides: Record<string, IndustryOverride> = {
  "dental-clinics": dentalClinics,
  medspas: medspas,
  "aesthetic-clinics": aestheticClinics,
  "skincare-clinics": skincareClinics,
  "skincare-brands": skincareBrands,
};

/** Merge rich static copy for priority industry segments. */
export function applyIndustryDetailOverride(industry: Industry): Industry {
  const patch = overrides[industry.slug];
  if (!patch) return industry;

  return {
    ...industry,
    ...patch,
    painPoints: patch.painPoints ?? industry.painPoints,
    popularServices: patch.popularServices ?? industry.popularServices,
    faqs: patch.faqs ?? industry.faqs,
    relatedServices: patch.relatedServices ?? industry.relatedServices,
    relatedCaseStudies: patch.relatedCaseStudies ?? industry.relatedCaseStudies,
    relatedInsights: patch.relatedInsights ?? industry.relatedInsights,
  };
}
