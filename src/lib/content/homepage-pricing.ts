export type HomepagePricingPackage = {
  slug: string;
  group: string;
  title: string;
  shortDescription: string;
  pricingSignal: string;
  timeline: string;
  badge?: string;
  deliverables: string[];
};

/** Homepage pricing row: growth stack, migration, custom software. */
export const homepagePricingPackages: HomepagePricingPackage[] = [
  {
    slug: "growth-stack",
    group: "Websites + automation + AI",
    title: "Complete growth stack",
    shortDescription:
      "Most service businesses lose leads because their site doesn't convert and nobody follows up fast enough. This fixes both.",
    pricingSignal: "From $3,500 setup + $349/mo",
    timeline: "Live in 7 to 10 business days, then we improve it together",
    badge: "Most common starting point",
    deliverables: [
      "Visitors know what to do: book, quote, or buy",
      "Homepage and offer pages built to convert traffic",
      "Every lead hits your CRM and alerts your team",
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
    slug: "platform-migration",
    group: "Migrations",
    title: "Fast platform migration",
    shortDescription:
      "Stuck on WordPress, Wix, Squarespace, Webflow, or Framer? We move everything over cleanly, protect your SEO, and launch you on a site that actually loads fast.",
    pricingSignal: "From $4,500",
    timeline: "MVP in 5 to 8 business days, then we iterate and maintain after launch",
    deliverables: [
      "Every page, post, and asset moves with you",
      "301 redirects keep your Google rankings intact",
      "A faster site that converts better than before",
      "Edit pages and blog posts without breaking design",
      "Blog and resource content migrated and formatted",
      "Forms still work and feed your CRM",
      "SEO metadata and structured data preserved",
      "Analytics and tracking stay connected after launch",
      "You approve staging before we go live",
      "30 days of redirect monitoring and fixes",
    ],
  },
  {
    slug: "custom-software",
    group: "Custom software",
    title: "Custom internal software",
    shortDescription:
      "If your team is living in spreadsheets, email threads, and shared drives to run the business — this replaces all of it with one tool built specifically for you.",
    pricingSignal: "From $4,999 MVP + $549/mo",
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
