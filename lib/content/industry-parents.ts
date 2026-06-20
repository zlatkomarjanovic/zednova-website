import type { IndustryParent } from "@/lib/types";

export const industryParents: IndustryParent[] = [
  {
    slug: "healthcare-clinics",
    title: "Healthcare Clinics",
    category: "Healthcare Clinics",
    whoItIsFor:
      "Dental, medical, peptide, TRT, longevity, med spa, aesthetic, and wellness clinics that book patients by phone and online.",
    whatWeBuild:
      "Clinic websites, appointment booking, patient intake forms, AI phone assistants, CRM automations, and Google review requests.",
    problemSolved:
      "Patients call while the front desk is busy, forms are still manual, and follow-up depends on whoever has time that day.",
    heroHeadline:
      "Websites, booking, and follow-up built for clinics that run on appointments.",
    hook: "Dental, medical, peptide, TRT, longevity, med spa, aesthetic, and wellness clinics.",
    shortDescription:
      "We design clinic websites, online booking, patient intake, AI phone assistants, and automated follow-up for healthcare practices that lose patients to slow response.",
    painPoints: [
      {
        title: "Calls go unanswered during patient hours",
        description:
          "Front desk staff cannot pick up every call while checking patients in. New inquiries book elsewhere.",
      },
      {
        title: "Booking and intake are still manual",
        description:
          "Patients fill out paper forms, wait on hold, or email back and forth. Every extra step drops conversion.",
      },
      {
        title: "No-shows and gaps in the schedule",
        description:
          "Without automated reminders and recall, chairs sit empty.",
      },
    ],
    popularServices: [
      { label: "Clinic Website Design", href: "/services/ai-lead-site" },
      { label: "Appointment Booking Automation", href: "/services/crm-pipeline-automation" },
      { label: "Patient Intake Forms", href: "/services/custom-ai-agents" },
      { label: "AI Chatbot for Website", href: "/services/custom-ai-agents" },
      { label: "CRM Automation", href: "/services/crm-pipeline-automation" },
      { label: "Google Review Automation", href: "/services/review-reputation" },
    ],
    exampleProject:
      "A clinic website with online booking, intake forms before the visit, SMS reminders, and automated review requests after appointments.",
    commonUseCase:
      "A new patient finds the clinic on Google, books online, completes intake on their phone, and gets reminder texts before the visit.",
    icon: "healthcare",
    order: 1,
  },
  {
    slug: "ecommerce-shopify",
    title: "Ecommerce & Shopify Brands",
    category: "Ecommerce & Shopify",
    whoItIsFor:
      "Shopify stores, DTC brands, supplement companies, beauty brands, and fitness product businesses selling online.",
    whatWeBuild:
      "Shopify development, product pages, Klaviyo email flows, cart abandonment automation, post-purchase sequences, and ecommerce dashboards.",
    problemSolved:
      "Ad costs rise, carts are abandoned, and customers buy once because nothing brings them back for a second order.",
    heroHeadline:
      "Shopify stores and DTC brands that convert first-time buyers into repeat customers.",
    hook: "Shopify stores, DTC brands, supplements, beauty, and fitness products.",
    shortDescription:
      "We build Shopify stores, product pages, Klaviyo flows, cart abandonment recovery, and post-purchase automation for brands that need more repeat revenue.",
    painPoints: [
      {
        title: "High ad costs, flat repeat rate",
        description: "You pay more to acquire each customer while second orders stay low.",
      },
      {
        title: "Abandoned carts are left on the table",
        description: "Shoppers leave without buying and no recovery sequence fires.",
      },
      {
        title: "Shopify theme limits conversion",
        description: "The default storefront does not explain the product fast enough.",
      },
    ],
    popularServices: [
      { label: "Shopify Development", href: "/services/ai-lead-site" },
      { label: "Headless Shopify Development", href: "/migrations/shopify-to-headless-shopify" },
      { label: "Product Page Design", href: "/services/ai-lead-site" },
      { label: "Klaviyo Email Flows", href: "/services/crm-pipeline-automation" },
      { label: "Cart Abandonment Automation", href: "/services/ops-automation" },
      { label: "Ecommerce Dashboard", href: "/services/reporting-dashboards" },
    ],
    exampleProject:
      "A Shopify store with redesigned product pages, cart recovery emails, post-purchase education, and a simple revenue dashboard.",
    commonUseCase:
      "A shopper abandons cart, gets a timed email sequence, returns to buy, then receives a post-purchase flow that drives a second order.",
    icon: "ecommerce",
    order: 2,
  },
  {
    slug: "small-business-custom-software",
    title: "Small Business Custom Software",
    category: "Small Business Custom Software",
    whoItIsFor:
      "Small teams, appointment-based businesses, and local companies that have outgrown spreadsheets, WordPress, Webflow, Wix, Squarespace, or Airtable.",
    whatWeBuild:
      "Custom web apps, client portals, dashboards, booking flows, CRM automations, and n8n or Make workflows.",
    problemSolved:
      "Work lives in spreadsheets and disconnected tools, so follow-up is manual, reporting is slow, and nothing scales with the team.",
    heroHeadline:
      "Custom websites, dashboards, and automations for small teams that need software features without building them in-house.",
    hook: "Small teams outgrowing spreadsheets, no-code tools, and manual processes.",
    shortDescription:
      "We build custom web apps, dashboards, booking flows, client portals, and n8n or Make automations for small businesses that need done-for-you software features.",
    painPoints: [
      {
        title: "Spreadsheets run the business",
        description: "Leads, jobs, and follow-up live in tabs nobody trusts.",
      },
      {
        title: "No-code tools hit limits",
        description: "WordPress, Webflow, Wix, Squarespace, or Airtable cannot do what the business needs next.",
      },
      {
        title: "Manual follow-up eats the week",
        description: "Owners and small teams chase updates instead of running the work.",
      },
    ],
    popularServices: [
      { label: "Custom Web App Development", href: "/services/ai-lead-site" },
      { label: "Dashboard Development", href: "/services/reporting-dashboards" },
      { label: "CRM Automation", href: "/services/crm-pipeline-automation" },
      { label: "n8n Automation", href: "/services/ops-automation" },
      { label: "Make Automation", href: "/services/ops-automation" },
      { label: "Client Portal Development", href: "/services/custom-ai-agents" },
    ],
    exampleProject:
      "A client portal with job status, file uploads, automated notifications, and a dashboard that replaces five spreadsheets.",
    commonUseCase:
      "A small team moves off Airtable into a simple web app with login, status tracking, and automated email updates for clients.",
    icon: "custom-software",
    order: 3,
  },
];
