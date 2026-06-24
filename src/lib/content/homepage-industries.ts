export type HomepageIndustry = {
  title: string;
  shortDescription: string;
  href: string;
  icon: string;
  popularServices: string[];
  featured: boolean;
};

export const homepageIndustries: HomepageIndustry[] = [
  {
    title: "Healthcare & Wellness",
    shortDescription:
      "Websites, booking, intake, and follow-up for dental, medical, peptide, TRT, longevity, med spa, aesthetic, wellness, physical therapy, and chiropractic clinics.",
    href: "/industries/healthcare-clinics",
    icon: "healthcare",
    popularServices: ["Clinic websites", "Online booking", "Patient intake", "AI phone assistant"],
    featured: true,
  },
  {
    title: "Fitness Coaches & Personal Trainers",
    shortDescription:
      "Websites, booking flows, client portals, check-ins, progress dashboards, and payment flows for coaches and trainers.",
    href: "/industries/fitness-coaches-personal-trainers",
    icon: "coach",
    popularServices: ["Coach websites", "Booking flows", "Client portals", "Payment setup"],
    featured: true,
  },
  {
    title: "Gyms & Fitness Studios",
    shortDescription:
      "Websites, class booking, membership pages, lead forms, and email or SMS follow-up for gyms and studios.",
    href: "/industries/gyms-fitness-studios",
    icon: "gym",
    popularServices: ["Gym websites", "Class booking", "Membership pages", "Lead follow-up"],
    featured: true,
  },
  {
    title: "Supplement Brands",
    shortDescription:
      "Shopify stores, product pages, subscription flows, education pages, and email flows for supplement brands.",
    href: "/industries/supplement-brands",
    icon: "supplement",
    popularServices: ["Shopify stores", "Product pages", "Subscription flows", "Klaviyo emails"],
    featured: true,
  },
  {
    title: "Skincare & Beauty Brands",
    shortDescription:
      "Shopify stores, product pages, quizzes, bundles, landing pages, and email flows for skincare and beauty brands.",
    href: "/industries/skincare-beauty-brands",
    icon: "beauty",
    popularServices: ["Shopify design", "Product quizzes", "Bundle pages", "Email flows"],
    featured: true,
  },
  {
    title: "Startups & MVPs",
    shortDescription:
      "Fast MVPs and full product builds for startups that need a working app, site, or portal quickly.",
    href: "/industries/startups-mvp",
    icon: "saas",
    popularServices: ["MVP builds", "Landing pages", "Web apps", "CRM setup"],
    featured: true,
  },
  {
    title: "Fitness & Wellness Product Brands",
    shortDescription:
      "Shopify stores, landing pages, product education, bundles, and post-purchase flows for fitness and wellness products.",
    href: "/industries/fitness-wellness-product-brands",
    icon: "fitness",
    popularServices: ["Shopify stores", "Landing pages", "Post-purchase flows"],
    featured: false,
  },
  {
    title: "Crypto & Web3 Projects",
    shortDescription:
      "Websites, landing pages, dashboards, and AI chat tools for crypto, token, and web3 teams.",
    href: "/industries/crypto-web3",
    icon: "crypto",
    popularServices: ["Landing pages", "Dashboards", "AI chat tools"],
    featured: false,
  },
  {
    title: "Real Estate",
    shortDescription:
      "Agent websites, property pages, lead capture, and follow-up for brokers, teams, and property businesses.",
    href: "/industries/real-estate",
    icon: "real-estate",
    popularServices: ["Agent websites", "Lead capture", "CRM automation"],
    featured: false,
  },
  {
    title: "Nonprofits & NGOs",
    shortDescription:
      "Donation pages, program websites, volunteer intake, and email follow-up for nonprofits and NGOs.",
    href: "/industries/nonprofits-ngos",
    icon: "nonprofit",
    popularServices: ["Donation pages", "Program sites", "Volunteer intake"],
    featured: false,
  },
  {
    title: "Marketing Agencies",
    shortDescription:
      "Client portals, white-label sites, landing pages, and internal dashboards for marketing agencies.",
    href: "/industries/marketing-agencies",
    icon: "agency",
    popularServices: ["Client portals", "White-label sites", "Landing pages"],
    featured: false,
  },
  {
    title: "Car Dealerships",
    shortDescription:
      "Inventory pages, lead forms, trade-in flows, and follow-up for new and used car dealers.",
    href: "/industries/car-dealerships",
    icon: "automotive",
    popularServices: ["Inventory pages", "Lead forms", "Trade-in flows"],
    featured: false,
  },
  {
    title: "Membership Communities",
    shortDescription:
      "Member portals, signup flows, content access, and billing pages for paid communities and memberships.",
    href: "/industries/membership-communities",
    icon: "community",
    popularServices: ["Member portals", "Signup flows", "Billing pages"],
    featured: false,
  },
  {
    title: "Private Schools & Academies",
    shortDescription:
      "School websites, enrollment pages, parent portals, and program information for private schools.",
    href: "/industries/private-schools-academies",
    icon: "education",
    popularServices: ["School websites", "Enrollment pages", "Parent portals"],
    featured: false,
  },
  {
    title: "Tutoring Centers",
    shortDescription:
      "Websites, booking, program pages, parent intake, and follow-up for tutoring centers and learning programs.",
    href: "/industries/tutoring-centers",
    icon: "tutoring",
    popularServices: ["Program pages", "Booking", "Parent intake"],
    featured: false,
  },
];

export const featuredHomepageIndustries = homepageIndustries.filter((item) => item.featured);
export const moreHomepageIndustries = homepageIndustries.filter((item) => !item.featured);