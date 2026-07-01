export type HomepagePricingPackage = {
  slug: string;
  group: string;
  title: string;
  shortDescription: string;
  pricing: {
    setupAmount: string;
    setupLabel?: string;
    monthlyAmount?: string;
  };
  timeline: string;
  badge?: string;
  deliverables: string[];
};

/**
 * Homepage pricing cards aligned to the 5 parent services.
 * The first card (Lead-Gen Website + CRM + AI Receptionist) is the flagship package.
 */
export const homepagePricingPackages: HomepagePricingPackage[] = [
  {
    slug: "lead-gen-stack",
    group: "Website + CRM + AI Receptionist",
    title: "Lead-Gen Website + CRM + AI Receptionist",
    shortDescription:
      "Most service businesses lose leads because their site doesn't convert, follow-up is slow, and calls go unanswered. This fixes all three.",
    pricing: {
      setupAmount: "$3,500",
      setupLabel: "setup",
      monthlyAmount: "$349/mo",
    },
    timeline: "Live in 7 to 10 business days, then we improve it together",
    badge: "Most common starting point",
    deliverables: [
      "A fast website that explains your offer and converts visitors",
      "Homepage and offer pages built to turn traffic into calls and forms",
      "Every lead hits your CRM and alerts your team instantly",
      "Pipeline stages so every lead has a next step",
      "Quiet leads get automatic email and SMS follow-up",
      "Missed calls get a text back in under 60 seconds",
      "AI books qualified leads into your calendar 24/7",
      "See which pages and campaigns bring customers",
      "Google and ChatGPT can find and recommend you",
      "30 days of post-launch fixes included",
    ],
  },
  {
    slug: "crm-follow-up",
    group: "CRM & Follow-Up Automation",
    title: "CRM & Follow-Up Automation",
    shortDescription:
      "Every form, call, and booking request gets captured, assigned, followed up with, and tracked until it becomes a booked call or customer.",
    pricing: {
      setupAmount: "$2,500",
      setupLabel: "setup",
      monthlyAmount: "$299/mo",
    },
    timeline: "Live in 3 to 7 business days, then we improve it together",
    deliverables: [
      "CRM setup on HubSpot, GoHighLevel, or Salesforce",
      "Pipeline stages with clear entry and exit criteria",
      "Form-to-CRM connection with instant lead alerts",
      "Email and SMS follow-up sequences per stage",
      "Missed-lead and stale-lead re-engagement flows",
      "Appointment reminders that reduce no-shows",
      "Review request automation after job completion",
      "Owner notification flows for new leads",
      "A pipeline number you can trust at a glance",
      "30-day adoption check-in and workflow tweaks",
    ],
  },
  {
    slug: "ai-receptionist",
    group: "AI Receptionist & Booking",
    title: "AI Receptionist & Booking",
    shortDescription:
      "AI voice and chat assistants that answer common questions, capture lead details, book appointments, and text back missed calls.",
    pricing: {
      setupAmount: "$1,200",
      setupLabel: "setup",
      monthlyAmount: "$299/mo",
    },
    timeline: "Live in 1 to 3 business days, then we tune it together",
    deliverables: [
      "AI phone or chat agent for your top 5 call types",
      "Missed-call text-back within 60 seconds",
      "Lead qualification questions and routing rules",
      "Calendar booking for qualified callers",
      "CRM contact creation on every call",
      "Business-hours and after-hours behavior rules",
      "Human escalation for complex calls",
      "Call summary logged to CRM after each interaction",
      "Test call suite before go-live",
      "48-hour post-launch script tuning",
    ],
  },
  {
    slug: "custom-portal-dashboard",
    group: "Custom In-House Software for SMBs",
    title: "Custom Portal or Dashboard",
    shortDescription:
      "If your team is living in spreadsheets, email threads, and shared drives to run the business, this replaces all of it with one tool built specifically for you.",
    pricing: {
      setupAmount: "$4,999",
      setupLabel: "MVP",
      monthlyAmount: "$549/mo",
    },
    timeline: "MVP in 10 to 15 business days, then we iterate and maintain after launch",
    deliverables: [
      "Each role sees only what they need",
      "One dashboard to run the whole operation",
      "Status changes notify the right person automatically",
      "Files live in one place, not lost in email",
      "Find any client, job, or record in seconds",
      "Secure logins for your team and clients",
      "Works on desktop, tablet, and phone",
      "You approve everything on staging before go-live",
      "We hand over the keys and train your team",
      "Your data in one secure system you own",
    ],
  },
];
