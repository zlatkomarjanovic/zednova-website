/** Inline SVG icons for service problem cards — uploaded to Sanity via seed script. */
export const SERVICE_PROBLEM_ICONS = {
  "slow-mobile": {
    alt: "Slow mobile performance",
    color: "#6B5BD6",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6B5BD6" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>`,
  },
  "no-next-step": {
    alt: "No clear next step",
    color: "#141414",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#141414" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  },
  "forms-inbox": {
    alt: "Forms stuck in inbox",
    color: "#6B5BD6",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6B5BD6" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  },
  "ai-invisible": {
    alt: "Invisible on AI search",
    color: "#141414",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#141414" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,
  },
  "no-schema": {
    alt: "Missing schema markup",
    color: "#6B5BD6",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6B5BD6" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  },
  "no-measurement": {
    alt: "No conversion measurement",
    color: "#141414",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#141414" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9"/><path d="M21 3v5h-5"/></svg>`,
  },
} as const;

export type ServiceProblemIconKey = keyof typeof SERVICE_PROBLEM_ICONS;

export type ServiceProblemSeed = {
  title: string;
  subheading: string;
  description: string;
  iconKey: ServiceProblemIconKey;
};

/** Default 6 reasons for lead-gen websites — seeded to Sanity. */
export const LEAD_GEN_SERVICE_PROBLEMS: ServiceProblemSeed[] = [
  {
    iconKey: "slow-mobile",
    title: "Mobile speed kills paid traffic",
    subheading: "Visitors bounce before your offer loads",
    description:
      "Clinic and service buyers search on their phone between appointments. If your hero takes three seconds, they never see your CTA, and you still pay for the click.",
  },
  {
    iconKey: "no-next-step",
    title: "Too many choices, no clear action",
    subheading: "Homepage links compete instead of convert",
    description:
      "Services, about, blog, and contact all shout at once. Without one primary path to book or call, visitors leave without starting a conversation.",
  },
  {
    iconKey: "forms-inbox",
    title: "Form fills never hit your CRM",
    subheading: "Leads sit in email while competitors call first",
    description:
      "Inquiry forms route to a shared inbox instead of your pipeline. By the time someone responds, the buyer already booked with whoever answered faster.",
  },
  {
    iconKey: "ai-invisible",
    title: "AI search cannot cite your business",
    subheading: "ChatGPT and Perplexity skip unstructured sites",
    description:
      "Answer engines need clear service definitions, FAQ blocks, and entity markup. If they cannot parse your offer, you are absent from the answers buyers trust.",
  },
  {
    iconKey: "no-schema",
    title: "Missing schema and llms.txt",
    subheading: "Crawlers cannot classify what you sell",
    description:
      "Without Organization, Service, and FAQ schema plus an llms.txt entry, machines treat your site as generic content, and rank or cite competitors who structured it correctly.",
  },
  {
    iconKey: "no-measurement",
    title: "No link between traffic and booked calls",
    subheading: "You cannot see which page or source converts",
    description:
      "Traffic reports show visits, not outcomes. Without form, call, and booking events tied to CRM stages, every marketing decision is guesswork.",
  },
];

export const CRM_SERVICE_PROBLEMS: ServiceProblemSeed[] = [
  {
    iconKey: "forms-inbox",
    title: "Leads land in inboxes, not your CRM",
    subheading: "Speed-to-lead dies in an unread email thread",
    description:
      "Form fills and call requests sit in shared inboxes while your team is on jobs. Without instant CRM routing, the first business to respond wins, and it is rarely you.",
  },
  {
    iconKey: "no-next-step",
    title: "Pipeline stages nobody agrees on",
    subheading: "Deals stall because 'next step' means something different to everyone",
    description:
      "Leads move between New, Contacted, and Waiting with no clear entry or exit rules. Your pipeline looks full on paper but half the deals have been idle for weeks.",
  },
  {
    iconKey: "slow-mobile",
    title: "Follow-up depends on someone remembering",
    subheading: "Manual reminders fail the moment the day gets busy",
    description:
      "Your team intends to follow up, then a job runs long, a clinic day fills up, and hot leads go cold. Without automated sequences, consistency is impossible.",
  },
  {
    iconKey: "no-measurement",
    title: "No trusted pipeline number",
    subheading: "You ask three people and get three different answers",
    description:
      "Leadership cannot see pipeline value, velocity, or conversion by source without pulling spreadsheets. Decisions get delayed because nobody trusts the data.",
  },
  {
    iconKey: "ai-invisible",
    title: "Stale leads never get re-engaged",
    subheading: "Old opportunities sit untouched until they buy elsewhere",
    description:
      "Contacts that did not book on the first touch disappear from view. Without re-engagement automations, revenue you already paid to acquire quietly walks away.",
  },
  {
    iconKey: "no-schema",
    title: "Tools do not talk to each other",
    subheading: "Copy-paste between forms, calendars, and CRM eats the day",
    description:
      "Booking tools, ad platforms, and your CRM each hold part of the truth. Manual handoffs create errors, delays, and leads that fall through the gaps.",
  },
];

export const AI_RECEPTIONIST_PROBLEMS: ServiceProblemSeed[] = [
  {
    iconKey: "slow-mobile",
    title: "Calls go unanswered on the job",
    subheading: "Prospects call once and dial the next contractor",
    description:
      "When your team is on-site or with a patient, the phone rings into nothing. Most callers will not leave a voicemail. They call someone who picks up.",
  },
  {
    iconKey: "forms-inbox",
    title: "Voicemail is a black hole",
    subheading: "Messages pile up until someone has time to listen",
    description:
      "By the time staff return calls, intent has cooled. Voicemail without instant text-back means you lose the window when the buyer is ready to book.",
  },
  {
    iconKey: "no-next-step",
    title: "After-hours calls go nowhere",
    subheading: "Evenings and weekends are when buyers have time to call",
    description:
      "Your front desk closes at five but purchase intent does not. Without 24/7 intake, you hand after-hours demand to competitors with round-the-clock coverage.",
  },
  {
    iconKey: "ai-invisible",
    title: "Booking still requires phone tag",
    subheading: "Qualified callers bounce before an appointment is set",
    description:
      "Callers want to book now, not wait for a callback to compare calendars. Every extra step between interest and a confirmed slot costs you booked revenue.",
  },
  {
    iconKey: "no-measurement",
    title: "No log of what was said on calls",
    subheading: "CRM notes depend on whoever remembers to type them",
    description:
      "Without call summaries logged automatically, context disappears before follow-up happens. Your team repeats questions and buyers feel like nobody listened.",
  },
  {
    iconKey: "no-schema",
    title: "Front desk overwhelmed at peak hours",
    subheading: "Two calls at once means one caller gets dropped",
    description:
      "Peak hours stack up fast in clinics and service businesses. When intake is purely human, overflow calls become missed revenue with no recovery path.",
  },
];

export const DASHBOARDS_SERVICE_PROBLEMS: ServiceProblemSeed[] = [
  {
    iconKey: "no-measurement",
    title: "Numbers live in five different tools",
    subheading: "Tab-switching replaces decision-making",
    description:
      "CRM, ads, analytics, and spreadsheets each tell part of the story. Leadership spends meetings reconciling sources instead of acting on what the data says.",
  },
  {
    iconKey: "slow-mobile",
    title: "Reports are always a week old",
    subheading: "You decide today on last Tuesday's numbers",
    description:
      "Manual exports and copy-paste dashboards mean metrics lag reality. By the time a drop shows up in a report, you have already spent on the wrong thing.",
  },
  {
    iconKey: "forms-inbox",
    title: "Spreadsheets nobody trusts",
    subheading: "One typo breaks the entire leadership view",
    description:
      "Critical KPIs live in fragile sheets maintained by one person. When they are out or the formula breaks, the business flies blind until someone rebuilds it.",
  },
  {
    iconKey: "no-next-step",
    title: "No alerts when metrics move",
    subheading: "Problems surface in hindsight, not in time to fix them",
    description:
      "Spend spikes, lead volume drops, and conversion falls, but nobody notices until month-end. Without threshold alerts, small issues become expensive surprises.",
  },
  {
    iconKey: "ai-invisible",
    title: "Teams build one-off reports",
    subheading: "Every manager maintains their own version of the truth",
    description:
      "Department heads export their own numbers because the central view does not exist or does not match their workflow. Fragmentation kills alignment.",
  },
  {
    iconKey: "no-schema",
    title: "Data pipeline breaks silently",
    subheading: "Integrations stop syncing and dashboards lie quietly",
    description:
      "A broken API connection or expired token can freeze a metric for days. Without monitoring, you make confident decisions on stale or empty data.",
  },
];

export const MIGRATIONS_SERVICE_PROBLEMS: ServiceProblemSeed[] = [
  {
    iconKey: "slow-mobile",
    title: "Rankings drop after cutover",
    subheading: "A migration without a redirect map costs organic traffic",
    description:
      "URLs change, metadata disappears, and Google re-crawls a site it no longer recognizes. Without a deliberate SEO preservation plan, migration becomes a traffic cliff.",
  },
  {
    iconKey: "no-schema",
    title: "Broken redirects and 404s",
    subheading: "Backlinks and bookmarks land on dead pages",
    description:
      "Every legacy URL needs a mapped destination. Miss one high-value page and you lose years of equity, plus the leads that still click old links in emails and ads.",
  },
  {
    iconKey: "forms-inbox",
    title: "Content lost in translation",
    subheading: "Copy and structure do not survive the platform change",
    description:
      "CMS fields, rich text, and embedded assets do not map one-to-one. Without a content inventory, critical pages launch incomplete or formatted wrong.",
  },
  {
    iconKey: "no-next-step",
    title: "Downtime during launch",
    subheading: "Going dark erodes trust and ad spend",
    description:
      "A hard cutover without staging and DNS planning means hours offline. Paid traffic hits an error page and organic users bounce before the new site ever loads.",
  },
  {
    iconKey: "ai-invisible",
    title: "New stack, same slow performance",
    subheading: "Migration without architecture review wastes the move",
    description:
      "Switching platforms without fixing templates and assets can leave you on a modern stack that still fails Core Web Vitals. Speed and structure must be built in, not hoped for.",
  },
  {
    iconKey: "no-measurement",
    title: "Team cannot edit after launch",
    subheading: "Developer dependency for every copy change",
    description:
      "If the new CMS is too technical for your team, content stagnates within weeks. A migration should improve editability, not lock marketing out of their own site.",
  },
];

export const RETAINER_SERVICE_PROBLEMS: ServiceProblemSeed[] = [
  {
    iconKey: "slow-mobile",
    title: "Small bugs never get prioritized",
    subheading: "Broken forms and workflows wait until someone complains",
    description:
      "After launch, minor issues stack up because nobody owns the fix queue. Each small break shaves conversion until the site or automation underperforms silently.",
  },
  {
    iconKey: "no-schema",
    title: "Automations break without anyone noticing",
    subheading: "API changes and token expiry fail quietly",
    description:
      "Integrations stop firing when a vendor updates an endpoint or a credential expires. Without monitoring, leads stop routing and nobody knows for days.",
  },
  {
    iconKey: "no-next-step",
    title: "No roadmap after go-live",
    subheading: "Launch day becomes the last day anything improves",
    description:
      "Projects end with a handoff deck, then nothing ships for months. Without ongoing iteration, competitors pass you while your stack stays frozen at v1.",
  },
  {
    iconKey: "forms-inbox",
    title: "Vendor roulette for every fix",
    subheading: "Each issue means finding someone available who knows the stack",
    description:
      "Freelancer churn and agency turnover mean context resets every time. You re-explain the architecture instead of compounding improvements month over month.",
  },
  {
    iconKey: "ai-invisible",
    title: "Performance drifts over time",
    subheading: "New scripts, plugins, and content slow the site down",
    description:
      "Core Web Vitals and conversion paths degrade as the stack grows. Without regular audits, load time creeps up and paid traffic gets more expensive to convert.",
  },
  {
    iconKey: "no-measurement",
    title: "No monthly proof the stack is working",
    subheading: "You invest monthly but cannot see what changed",
    description:
      "Retainers feel like insurance until you cannot point to what shipped. Without a performance report and shipped improvements log, support feels like a black box.",
  },
];

export const SERVICE_PROBLEMS_BY_SLUG: Record<string, ServiceProblemSeed[]> = {
  "ai-lead-site": LEAD_GEN_SERVICE_PROBLEMS,
  "crm-pipeline-automation": CRM_SERVICE_PROBLEMS,
  "ai-receptionist": AI_RECEPTIONIST_PROBLEMS,
  "custom-in-house-software-for-smbs": DASHBOARDS_SERVICE_PROBLEMS,
  "platform-migrations": MIGRATIONS_SERVICE_PROBLEMS,
  "ai-systems-retainer": RETAINER_SERVICE_PROBLEMS,
};
