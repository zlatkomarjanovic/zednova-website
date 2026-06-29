export type StartGoal =
  | "leads"
  | "ecommerce"
  | "automate"
  | "migrate"
  | "explore";

export type StartIndustry =
  | "healthcare"
  | "ecommerce"
  | "professional"
  | "saas"
  | "other";

export type StartRecommendation = {
  serviceSlug: string;
  serviceTitle: string;
  reason: string;
  href: string;
};

export const START_GOALS: { id: StartGoal; label: string; description: string }[] = [
  {
    id: "leads",
    label: "Get more leads & bookings",
    description: "Website, SEO, intake, and phone coverage that converts traffic into appointments.",
  },
  {
    id: "ecommerce",
    label: "Sell more online",
    description: "Shopify builds, product pages, cart recovery, and retention email.",
  },
  {
    id: "automate",
    label: "Automate follow-up & ops",
    description: "CRM workflows, reminders, dashboards, and AI tools that run without extra hires.",
  },
  {
    id: "migrate",
    label: "Migrate or rebuild a platform",
    description: "Move off Webflow, WordPress, or legacy stacks without losing SEO or data.",
  },
  {
    id: "explore",
    label: "Not sure yet",
    description: "Talk through options on a short call — we will point you to the right service.",
  },
];

export const START_INDUSTRIES: { id: StartIndustry; label: string }[] = [
  { id: "healthcare", label: "Healthcare, dental, medspa, or wellness" },
  { id: "ecommerce", label: "Ecommerce or DTC brand" },
  { id: "professional", label: "Professional services" },
  { id: "saas", label: "B2B SaaS or technology" },
  { id: "other", label: "Other industry" },
];

const SERVICE_LABELS: Record<string, string> = {
  "ai-lead-site": "AI Lead Site",
  "ai-receptionist": "AI Receptionist",
  "crm-pipeline-automation": "CRM & Pipeline Automation",
  "review-reputation": "Review & Reputation",
  "ops-automation": "Ops Automation",
  "seo-aeo-content": "SEO & AEO Content",
  "reporting-dashboards": "Reporting Dashboards",
  "outbound-lead-gen": "Outbound Lead Gen",
};

function rec(slug: string, reason: string): StartRecommendation {
  return {
    serviceSlug: slug,
    serviceTitle: SERVICE_LABELS[slug] ?? slug,
    reason,
    href: `/services/${slug}`,
  };
}

/** Map goal + industry to recommended services (max 3). */
export function recommendServices(
  goal: StartGoal,
  industry: StartIndustry,
): StartRecommendation[] {
  if (goal === "explore") {
    return [
      rec("ai-lead-site", "A strong starting point for most teams — we scope the rest on the call."),
    ];
  }

  if (goal === "migrate") {
    return [
      rec("ai-lead-site", "Rebuild on Next.js or Shopify with SEO preserved and a cleaner stack."),
      rec("ops-automation", "Wire forms, CRM, and automations into the new site on launch."),
    ];
  }

  if (goal === "ecommerce" || industry === "ecommerce") {
    return [
      rec("ai-lead-site", "Shopify development, product pages, and conversion-focused storefronts."),
      rec("crm-pipeline-automation", "Klaviyo flows, cart recovery, and post-purchase retention."),
      rec("reporting-dashboards", "Revenue and funnel visibility so you know what to fix next."),
    ];
  }

  if (goal === "automate") {
    return [
      rec("crm-pipeline-automation", "Pipelines, reminders, and nurture that stop leads from going cold."),
      rec("ops-automation", "Connect tools and remove manual handoffs between teams."),
      rec("ai-receptionist", "Cover phones and after-hours when volume spikes."),
    ];
  }

  // leads (default path) — tuned by industry
  if (industry === "healthcare") {
    return [
      rec("ai-lead-site", "Clinic websites with booking, intake, and local SEO built in."),
      rec("ai-receptionist", "Catch overflow and after-hours calls without new front-desk hires."),
      rec("review-reputation", "Automated Google review requests and reply drafts."),
    ];
  }

  if (industry === "saas") {
    return [
      rec("ai-lead-site", "Marketing sites, pricing pages, and demo-ready conversion paths."),
      rec("outbound-lead-gen", "Structured outbound when inbound alone is not enough."),
      rec("crm-pipeline-automation", "Route and nurture demo requests without manual chaos."),
    ];
  }

  if (industry === "professional") {
    return [
      rec("ai-lead-site", "Authority sites with service pages and case-study-driven proof."),
      rec("crm-pipeline-automation", "Intake forms and follow-up that match a longer sales cycle."),
      rec("seo-aeo-content", "Content that ranks and answers buyer questions directly."),
    ];
  }

  return [
    rec("ai-lead-site", "A conversion-focused site as the hub for everything else we build."),
    rec("crm-pipeline-automation", "Follow-up and pipeline automation so leads do not slip."),
    rec("ai-receptionist", "Faster response when calls and form fills spike."),
  ];
}

export function contactHrefFromStart(
  goal: StartGoal,
  industry: StartIndustry,
  serviceSlug?: string,
): string {
  const params = new URLSearchParams();
  if (serviceSlug) params.set("service", serviceSlug);

  const industryMap: Partial<Record<StartIndustry, string>> = {
    healthcare: "dental-clinics",
    ecommerce: "skincare-brands",
  };
  const industrySlug = industryMap[industry];
  if (industrySlug) params.set("industry", industrySlug);

  const messageParts: string[] = [];
  const goalLabel = START_GOALS.find((g) => g.id === goal)?.label;
  if (goalLabel) messageParts.push(`Goal: ${goalLabel}.`);
  if (params.toString()) {
    return `/contact?${params.toString()}${messageParts.length ? "" : ""}`;
  }
  return "/contact";
}

export function startPrefillMessage(goal: StartGoal, industry: StartIndustry): string {
  const goalLabel = START_GOALS.find((g) => g.id === goal)?.label ?? goal;
  const industryLabel = START_INDUSTRIES.find((i) => i.id === industry)?.label ?? industry;
  return `I used the /start guide. Goal: ${goalLabel}. Industry: ${industryLabel}. `;
}
