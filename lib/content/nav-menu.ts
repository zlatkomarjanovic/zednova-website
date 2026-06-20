export type NavMenuItem = {
  title: string;
  shortDescription: string;
  href: string;
};

export type NavMenuGroup = {
  group: string;
  items: NavMenuItem[];
};

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

export const industryNavGroups: NavMenuGroup[] = [
  {
    group: "Healthcare Clinics",
    items: [
      {
        title: "Dental Clinics",
        shortDescription: "Websites, booking, recall, and review automation for dental practices.",
        href: "/industries/dental-clinics",
      },
      {
        title: "Medical Clinics",
        shortDescription: "Patient intake, appointment booking, and clinic websites.",
        href: "/industries/medical-clinics",
      },
      {
        title: "Peptide Clinics",
        shortDescription: "Consult landing pages, intake, and follow-up for peptide therapy.",
        href: "/industries/peptide-clinics",
      },
      {
        title: "TRT Clinics",
        shortDescription: "Lead capture and booking for hormone therapy clinics.",
        href: "/industries/trt-clinics",
      },
      {
        title: "Longevity Clinics",
        shortDescription: "Premium clinic sites with consult booking and patient education.",
        href: "/industries/longevity-clinics",
      },
      {
        title: "Med Spas",
        shortDescription: "Treatment pages, online booking, and follow-up for med spas.",
        href: "/industries/med-spas",
      },
      {
        title: "Aesthetic Clinics",
        shortDescription: "Service pages and booking for aesthetic and cosmetic clinics.",
        href: "/industries/aesthetic-clinics",
      },
      {
        title: "Wellness Clinics",
        shortDescription: "Websites and booking for wellness and holistic health clinics.",
        href: "/industries/wellness-clinics",
      },
    ],
  },
  {
    group: "Ecommerce & Shopify",
    items: [
      {
        title: "Shopify Stores",
        shortDescription: "Custom Shopify builds, product pages, and conversion improvements.",
        href: "/industries/shopify-stores",
      },
      {
        title: "DTC Brands",
        shortDescription: "Direct-to-consumer stores with email flows and repeat-order paths.",
        href: "/industries/dtc-brands",
      },
      {
        title: "Product Brands",
        shortDescription: "Product launches, landing pages, and storefront sections.",
        href: "/industries/product-brands",
      },
      {
        title: "Supplement Brands",
        shortDescription: "Supplement stores with education pages and subscription flows.",
        href: "/industries/supplement-brands",
      },
      {
        title: "Wellness Ecommerce Brands",
        shortDescription: "Wellness product stores with guided buying and follow-up emails.",
        href: "/industries/wellness-ecommerce-brands",
      },
      {
        title: "Beauty Brands",
        shortDescription: "Beauty stores with product quizzes, bundles, and email sequences.",
        href: "/industries/beauty-brands",
      },
      {
        title: "Fitness Product Brands",
        shortDescription: "Fitness gear stores with product education and upsell flows.",
        href: "/industries/fitness-product-brands",
      },
    ],
  },
  {
    group: "Small Business Custom Software",
    items: [
      {
        title: "Appointment-Based Businesses",
        shortDescription: "Booking sites, reminders, and intake for service businesses.",
        href: "/industries/appointment-based-businesses",
      },
      {
        title: "Small Teams With Manual Processes",
        shortDescription: "Dashboards and automations for teams stuck in manual follow-up.",
        href: "/industries/small-teams-manual-processes",
      },
      {
        title: "Businesses Outgrowing Spreadsheets",
        shortDescription: "Web apps and dashboards that replace spreadsheet workflows.",
        href: "/industries/outgrowing-spreadsheets",
      },
      {
        title: "Businesses Outgrowing WordPress, Webflow, Wix, Squarespace, or Airtable",
        shortDescription: "Custom builds when no-code tools hit performance or feature limits.",
        href: "/industries/outgrowing-no-code-tools",
      },
      {
        title: "Businesses That Need a Portal, Dashboard, Booking Flow, or Internal Tool",
        shortDescription: "Portals, dashboards, booking, and internal tools built to spec.",
        href: "/industries/portal-dashboard-booking-needs",
      },
    ],
  },
];
