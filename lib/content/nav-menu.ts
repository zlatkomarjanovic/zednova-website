export type NavMenuItem = {
  title: string;
  shortDescription: string;
  href: string;
};

export type NavMenuGroup = {
  group: string;
  items: NavMenuItem[];
};

export type ServiceMegaMenuCard = {
  title: string;
  shortDescription: string;
  includes: string;
  href: string;
};

export const serviceMegaMenuCards: ServiceMegaMenuCard[] = [
  {
    title: "Websites & Landing Pages",
    shortDescription:
      "Fast websites, landing pages, and CMS setups for clinics, brands, and small businesses.",
    includes: "Next.js, Sanity, Webflow, SEO setup",
    href: "/services/ai-lead-site",
  },
  {
    title: "Shopify & Ecommerce",
    shortDescription:
      "Shopify stores, product pages, email flows, and ecommerce dashboards.",
    includes: "Shopify, headless Shopify, Klaviyo, cart recovery",
    href: "/industries/ecommerce-shopify",
  },
  {
    title: "Custom Web Apps",
    shortDescription:
      "Portals, dashboards, booking systems, admin panels, and internal tools.",
    includes: "client portals, staff dashboards, booking flows",
    href: "/industries/small-business-custom-software",
  },
  {
    title: "CRM & Workflow Automation",
    shortDescription:
      "Automations that connect forms, leads, bookings, email, SMS, and internal tasks.",
    includes: "CRM setup, n8n, Make, Airtable, Zapier",
    href: "/services/crm-pipeline-automation",
  },
  {
    title: "AI Chatbots & Phone Assistants",
    shortDescription:
      "AI tools that answer questions, collect details, qualify leads, and handle missed calls.",
    includes: "website chatbots, intake chatbots, AI phone assistants",
    href: "/services/ai-receptionist",
  },
  {
    title: "Ongoing Support",
    shortDescription:
      "Updates, fixes, improvements, monitoring, and new features after launch.",
    includes: "website updates, automation fixes, new pages",
    href: "/services/ai-systems-retainer",
  },
];

export const serviceNavGroups: NavMenuGroup[] = [
  {
    group: "Websites",
    items: [
      {
        title: "Website Design & Development",
        shortDescription: "Custom business websites built on Next.js or Webflow.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Next.js Website Development",
        shortDescription: "Fast, SEO-friendly websites with a modern React stack.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Sanity CMS Development",
        shortDescription: "Content editing setup so your team can update pages easily.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Landing Page Design",
        shortDescription: "Focused pages for offers, consults, and lead capture.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Clinic Website Design",
        shortDescription:
          "Websites for dental, medical, peptide, TRT, longevity, and wellness clinics.",
        href: "/industries/healthcare-clinics",
      },
      {
        title: "Dental Website Design",
        shortDescription: "Websites with booking, recall, and new-patient intake.",
        href: "/industries/dental-clinics",
      },
      {
        title: "Shopify Website Design",
        shortDescription: "Storefront pages and brand sites connected to Shopify.",
        href: "/industries/ecommerce-shopify",
      },
    ],
  },
  {
    group: "Shopify & Ecommerce",
    items: [
      {
        title: "Shopify Development",
        shortDescription:
          "Custom Shopify stores, product pages, checkout improvements, and ecommerce sections.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Headless Shopify Development",
        shortDescription: "Custom Next.js storefront with Shopify for products and checkout.",
        href: "/migrations/shopify-to-headless-shopify",
      },
      {
        title: "Product Page Design",
        shortDescription: "Product pages that explain the offer and drive add-to-cart.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Klaviyo Email Flows",
        shortDescription: "Welcome, browse, cart, and post-purchase email sequences.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Cart Abandonment Emails",
        shortDescription: "Timed emails and SMS to recover shoppers who leave checkout.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Post-Purchase Email Flows",
        shortDescription: "Onboarding, education, and repeat-order emails after purchase.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Ecommerce Dashboard",
        shortDescription: "Simple dashboards for orders, revenue, and campaign performance.",
        href: "/services/reporting-dashboards",
      },
    ],
  },
  {
    group: "Custom Software",
    items: [
      {
        title: "Custom Web App Development",
        shortDescription:
          "Simple web apps, portals, dashboards, and internal tools for small businesses.",
        href: "/industries/small-business-custom-software",
      },
      {
        title: "Client Portal Development",
        shortDescription: "Login areas for clients to view status, files, and updates.",
        href: "/industries/portal-dashboard-booking-needs",
      },
      {
        title: "Internal Dashboard Development",
        shortDescription: "Staff dashboards that replace spreadsheets and manual tracking.",
        href: "/services/reporting-dashboards",
      },
      {
        title: "Booking System Development",
        shortDescription: "Online scheduling with confirmations, reminders, and intake.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Form & Intake System Development",
        shortDescription: "Patient, client, and lead intake forms connected to your CRM.",
        href: "/services/custom-ai-agents",
      },
      {
        title: "Admin Panel Development",
        shortDescription: "Back-office tools to manage records, orders, and team workflows.",
        href: "/industries/small-business-custom-software",
      },
    ],
  },
  {
    group: "Automation",
    items: [
      {
        title: "CRM Automation",
        shortDescription:
          "Connect forms, leads, email, SMS, reminders, and follow-up tasks.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Appointment Booking Automation",
        shortDescription: "Online booking, reminders, and calendar sync for clinics and services.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Email & SMS Follow-Up",
        shortDescription: "Automated sequences after form fills, calls, and purchases.",
        href: "/services/outbound-lead-gen",
      },
      {
        title: "Google Review Automation",
        shortDescription: "Review requests and reply drafts after completed jobs or visits.",
        href: "/services/review-reputation",
      },
      {
        title: "n8n Automation",
        shortDescription: "Custom workflows in n8n for reporting, routing, and notifications.",
        href: "/services/ops-automation",
      },
      {
        title: "Make Automation",
        shortDescription: "Make scenarios that connect your apps and remove manual steps.",
        href: "/services/ops-automation",
      },
      {
        title: "Airtable Automation",
        shortDescription: "Automations and views that extend Airtable into daily workflows.",
        href: "/services/ops-automation",
      },
    ],
  },
  {
    group: "AI Tools",
    items: [
      {
        title: "AI Chatbot for Website",
        shortDescription: "Website chat that answers questions and captures leads.",
        href: "/services/custom-ai-agents",
      },
      {
        title: "AI Phone Assistant",
        shortDescription: "Answers calls, qualifies callers, and sends missed-call texts.",
        href: "/services/ai-receptionist",
      },
      {
        title: "Patient Intake Chatbot",
        shortDescription: "Collects patient details and routes them before the visit.",
        href: "/services/custom-ai-agents",
      },
      {
        title: "Customer Support Chatbot",
        shortDescription: "Handles common support questions and escalates when needed.",
        href: "/services/custom-ai-agents",
      },
      {
        title: "Document Processing AI",
        shortDescription: "Extracts data from forms, PDFs, and uploads into your systems.",
        href: "/services/custom-ai-agents",
      },
    ],
  },
];

export const industryNavItems: NavMenuItem[] = [
  {
    title: "Healthcare & Wellness",
    shortDescription:
      "Websites, booking, intake, and follow-up for dental, medical, peptide, TRT, longevity, med spa, aesthetic, wellness, physical therapy, and chiropractic clinics.",
    href: "/industries/healthcare-clinics",
  },
  {
    title: "Fitness Coaches & Personal Trainers",
    shortDescription:
      "Websites, booking flows, client portals, check-ins, progress dashboards, and payment flows for coaches and trainers.",
    href: "/industries/fitness-coaches-personal-trainers",
  },
  {
    title: "Gyms & Fitness Studios",
    shortDescription:
      "Websites, class booking, membership pages, lead forms, and email or SMS follow-up for gyms and studios.",
    href: "/industries/gyms-fitness-studios",
  },
  {
    title: "Supplement Brands",
    shortDescription:
      "Shopify stores, product pages, subscription flows, education pages, and email flows for supplement brands.",
    href: "/industries/supplement-brands",
  },
  {
    title: "Skincare & Beauty Brands",
    shortDescription:
      "Shopify stores, product pages, quizzes, bundles, landing pages, and email flows for skincare and beauty brands.",
    href: "/industries/skincare-beauty-brands",
  },
  {
    title: "Fitness & Wellness Product Brands",
    shortDescription:
      "Shopify stores, landing pages, product education, bundles, and post-purchase flows for fitness and wellness products.",
    href: "/industries/fitness-wellness-product-brands",
  },
  {
    title: "Crypto & Web3 Projects",
    shortDescription:
      "Websites, landing pages, dashboards, and AI chat tools for crypto, token, and web3 teams.",
    href: "/industries/crypto-web3",
  },
  {
    title: "Startups & MVPs",
    shortDescription:
      "Fast MVPs and full product builds for startups that need a working app, site, or portal quickly.",
    href: "/industries/startups-mvp",
  },
  {
    title: "Real Estate",
    shortDescription:
      "Agent websites, property pages, lead capture, and follow-up for brokers, teams, and property businesses.",
    href: "/industries/real-estate",
  },
  {
    title: "Nonprofits & NGOs",
    shortDescription:
      "Donation pages, program websites, volunteer intake, and email follow-up for nonprofits and NGOs.",
    href: "/industries/nonprofits-ngos",
  },
  {
    title: "Marketing Agencies",
    shortDescription:
      "Client portals, white-label sites, landing pages, and internal dashboards for marketing agencies.",
    href: "/industries/marketing-agencies",
  },
  {
    title: "Car Dealerships",
    shortDescription:
      "Inventory pages, lead forms, trade-in flows, and follow-up for new and used car dealers.",
    href: "/industries/car-dealerships",
  },
  {
    title: "Membership Communities",
    shortDescription:
      "Member portals, signup flows, content access, and billing pages for paid communities and memberships.",
    href: "/industries/membership-communities",
  },
  {
    title: "Private Schools & Academies",
    shortDescription:
      "School websites, enrollment pages, parent portals, and program information for private schools.",
    href: "/industries/private-schools-academies",
  },
  {
    title: "Tutoring Centers",
    shortDescription:
      "Websites, booking, program pages, parent intake, and follow-up for tutoring centers and learning programs.",
    href: "/industries/tutoring-centers",
  },
];

export const customSoftwareNavItems: NavMenuItem[] = [
  {
    title: "Custom Web App Development",
    shortDescription:
      "Simple web apps on Next.js for workflows, records, and tools your team uses every day.",
    href: "/industries/small-business-custom-software",
  },
  {
    title: "Client Portal Development",
    shortDescription:
      "Login portals where clients check project status, upload files, and get updates without emailing you.",
    href: "/industries/portal-dashboard-booking-needs",
  },
  {
    title: "Patient Portal Development",
    shortDescription:
      "Secure portals for patients to book visits, complete intake forms, and view their appointment info.",
    href: "/industries/healthcare-clinics",
  },
  {
    title: "Internal Dashboard Development",
    shortDescription:
      "Staff dashboards that replace spreadsheets and show live business numbers at a glance.",
    href: "/services/reporting-dashboards",
  },
  {
    title: "Booking System Development",
    shortDescription:
      "Online scheduling with confirmations, reminders, intake forms, and calendar sync built in.",
    href: "/services/crm-pipeline-automation",
  },
  {
    title: "Admin Panel Development",
    shortDescription:
      "Back-office panels to manage users, records, orders, content, and settings.",
    href: "/industries/small-business-custom-software",
  },
  {
    title: "Form & Intake Systems",
    shortDescription:
      "Custom forms wired to CRM, email, SMS, and follow-up sequences triggered on submission.",
    href: "/services/custom-ai-agents",
  },
  {
    title: "CRM & Lead Tracking Tools",
    shortDescription:
      "Simple CRM views for leads, deals, tasks, notes, and pipeline status.",
    href: "/services/crm-pipeline-automation",
  },
  {
    title: "Document Upload Portals",
    shortDescription:
      "Secure upload, review, and approval flows for files from clients or staff.",
    href: "/industries/small-business-custom-software",
  },
  {
    title: "Membership & Subscription Portals",
    shortDescription:
      "Member login, billing access, and gated content for paid users and subscribers.",
    href: "/industries/membership-communities",
  },
];
