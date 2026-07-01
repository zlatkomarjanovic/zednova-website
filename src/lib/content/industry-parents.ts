import type { IndustryParent } from "@/lib/types";

export const CANONICAL_INDUSTRY_PARENT_SLUGS = [
  "healthcare-wellness",
  "fitness-coaching-performance",
  "professional-services",
  "ecommerce-dtc",
  "b2b-saas-technology",
  "real-estate-property",
] as const;

export const industryParents: IndustryParent[] = [
  {
    slug: "healthcare-wellness",
    title: "Healthcare & Wellness",
    category: "Healthcare & Wellness",
    whoItIsFor:
      "Dental, medical, medspa, aesthetic, longevity, skincare, physical therapy, and wellness practices that need better websites, booking, CRM automation, and AI-assisted patient workflows.",
    whatWeBuild:
      "Clinic websites, SEO pages, booking flows, patient intake, AI receptionists, CRM automation, follow-up sequences, dashboards, and conversion-focused landing pages.",
    problemSolved:
      "Patients call while staff are busy, intake is manual, follow-up is inconsistent, and many clinics still lose leads to slower competitors online.",
    heroHeadline:
      "Websites, booking, and automation for healthcare and wellness practices ready for digital growth.",
    hook: "Clinics and wellness practices that need websites, booking, CRM automation, and AI workflows.",
    shortDescription:
      "We build clinic websites, booking flows, patient intake, AI receptionists, CRM automation, and follow-up systems for healthcare and wellness businesses.",
    industryOverview:
      "Healthcare is one of the strongest long-term markets for websites, SEO, booking automation, CRM workflows, and AI-assisted operations, especially for smaller clinics still behind on digital.",
    painPoints: [
      {
        title: "Calls go unanswered during patient hours",
        description: "Front desk teams cannot pick up every inquiry while checking patients in.",
      },
      {
        title: "Booking and intake stay manual",
        description: "Paper forms, phone tag, and slow follow-up drop conversion before the first visit.",
      },
      {
        title: "No centralized follow-up or recall",
        description: "Reviews, rebooking, and nurture sequences depend on whoever has time that day.",
      },
    ],
    popularServices: [
      { label: "Lead-Gen Website", href: "/services/lead-gen-websites" },
      { label: "CRM Automation", href: "/services/crm-follow-up-automation" },
      { label: "AI Receptionist", href: "/services/ai-receptionist-booking" },
      { label: "Review Automation", href: "/services/crm-follow-up-automation" },
    ],
    exampleProject:
      "A clinic website with online booking, digital intake, SMS reminders, AI phone coverage, and automated review requests.",
    commonUseCase:
      "A new patient finds the clinic on Google, books online, completes intake on their phone, and gets reminder texts before the visit.",
    icon: "healthcare",
    order: 1,
  },
  {
    slug: "fitness-coaching-performance",
    title: "Fitness, Coaching & Performance",
    category: "Fitness, Coaching & Performance",
    whoItIsFor:
      "Gyms, fitness coaches, online coaches, personal trainers, martial arts gyms, nutrition coaches, and performance businesses selling programs and memberships.",
    whatWeBuild:
      "Landing pages, booking systems, client portals, payment flows, onboarding forms, automations, and simple performance dashboards.",
    problemSolved:
      "Leads book through DMs and spreadsheets, client onboarding is manual, and there is no simple system for payments, check-ins, or follow-up.",
    heroHeadline:
      "Websites, booking, and client systems for fitness, coaching, and performance businesses.",
    hook: "Coaches and gyms that need landing pages, booking, client portals, and payment automation.",
    shortDescription:
      "We build landing pages, booking flows, client portals, payment systems, onboarding forms, and automations for fitness and coaching businesses.",
    industryOverview:
      "Fitness and coaching businesses need fast landing pages, reliable booking, and lightweight client systems, without enterprise software complexity.",
    painPoints: [
      { title: "Leads live in DMs", description: "Inquiries get lost and booking happens through back-and-forth messages." },
      { title: "Onboarding is manual", description: "New clients repeat the same intake steps every time." },
      { title: "No client portal or progress tracking", description: "Check-ins, programs, and payments are scattered across tools." },
    ],
    popularServices: [
      { label: "Lead-Gen Website", href: "/services/lead-gen-websites" },
      { label: "Client Portal", href: "/custom-software" },
      { label: "CRM Automation", href: "/services/crm-follow-up-automation" },
      { label: "Booking Automation", href: "/services/crm-follow-up-automation" },
    ],
    exampleProject:
      "A coach site with program landing pages, Stripe checkout, client onboarding forms, and automated check-in reminders.",
    commonUseCase:
      "A lead books a discovery call, pays for a program online, and receives onboarding forms and session reminders automatically.",
    icon: "fitness",
    order: 2,
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    category: "Professional Services",
    whoItIsFor:
      "Consultants, accounting firms, recruiting firms, architecture studios, engineering consultants, B2B service firms, marketing agencies, and operations consultants.",
    whatWeBuild:
      "Authority websites, case study pages, lead capture, CRM automation, proposal workflows, dashboards, and content systems.",
    problemSolved:
      "Strong expertise is hidden behind weak websites, manual lead handling, and slow follow-up that loses deals to faster competitors.",
    heroHeadline:
      "Websites, lead systems, and automation for professional services firms that sell expertise.",
    hook: "Consultancies and agencies that need authority sites, lead capture, and CRM automation.",
    shortDescription:
      "We build authority websites, case studies, lead capture, CRM automation, proposal workflows, and dashboards for professional services firms.",
    industryOverview:
      "Professional services firms win on trust and speed, they need polished websites, clear positioning, and automated lead handling to convert inbound interest.",
    painPoints: [
      { title: "Website undersells expertise", description: "Prospects cannot quickly understand services, proof, or next steps." },
      { title: "Lead follow-up is inconsistent", description: "Inquiries sit in inboxes until someone manually responds." },
      { title: "Proposals and onboarding are slow", description: "Every new client requires repetitive manual setup." },
    ],
    popularServices: [
      { label: "Lead-Gen Website", href: "/services/lead-gen-websites" },
      { label: "CRM Automation", href: "/services/crm-follow-up-automation" },
      { label: "Reporting Dashboards", href: "/services/custom-in-house-software-for-smbs" },
      { label: "Custom Software", href: "/custom-software" },
    ],
    exampleProject:
      "A consulting site with service pages, case studies, lead scoring, and automated proposal follow-up sequences.",
    commonUseCase:
      "A prospect submits a form, receives a tailored follow-up sequence, and books a discovery call within 24 hours.",
    icon: "consulting",
    order: 3,
  },
  {
    slug: "ecommerce-dtc",
    title: "Ecommerce & DTC",
    category: "Ecommerce & DTC",
    whoItIsFor:
      "Shopify stores, skincare brands, supplement brands, beauty brands, fitness product brands, fashion brands, and small DTC companies selling online.",
    whatWeBuild:
      "Shopify development, product pages, landing pages, checkout optimization, Klaviyo flows, cart recovery, analytics dashboards, and AI-assisted content workflows.",
    problemSolved:
      "Ad costs rise, carts are abandoned, product pages under-convert, and repeat revenue stays flat without structured email and automation.",
    heroHeadline:
      "Shopify stores and DTC brands built to convert first-time buyers into repeat customers.",
    hook: "DTC brands that need Shopify builds, conversion fixes, retention flows, and automation.",
    shortDescription:
      "We build Shopify stores, product pages, landing pages, Klaviyo flows, cart recovery, and analytics dashboards for ecommerce and DTC brands.",
    industryOverview:
      "Ecommerce and DTC brands need more than a theme, they need conversion-focused product pages, retention email, automation, and clear analytics to grow profitably.",
    painPoints: [
      { title: "High CAC, flat repeat rate", description: "Each new customer costs more while second orders stay low." },
      { title: "Abandoned carts without recovery", description: "Shoppers leave and no structured sequence brings them back." },
      { title: "Product pages fail to explain the offer", description: "Traffic arrives but the page does not close the sale fast enough." },
    ],
    popularServices: [
      { label: "Shopify Development", href: "/services/lead-gen-websites" },
      { label: "Klaviyo Email Flows", href: "/services/crm-follow-up-automation" },
      { label: "Cart Abandonment Automation", href: "/services/crm-follow-up-automation" },
      { label: "Ecommerce Dashboard", href: "/services/custom-in-house-software-for-smbs" },
    ],
    exampleProject:
      "A Shopify rebuild with stronger product pages, cart recovery emails, post-purchase education, and a revenue dashboard.",
    commonUseCase:
      "A shopper abandons cart, returns via email, completes checkout, then receives a post-purchase flow that drives a second order.",
    icon: "ecommerce",
    order: 4,
  },
  {
    slug: "b2b-saas-technology",
    title: "B2B SaaS & Technology",
    category: "B2B SaaS & Technology",
    whoItIsFor:
      "SaaS startups, AI startups, developer tools, cybersecurity companies, B2B software companies, API companies, and tech consultancies.",
    whatWeBuild:
      "Next.js marketing sites, Framer or Sanity-powered pages, product landing pages, docs-style layouts, dashboards, and AI-assisted development workflows.",
    problemSolved:
      "Product teams need a modern marketing site and lightweight internal tools without hiring a full in-house product team.",
    heroHeadline:
      "Marketing sites, product pages, and dashboards for B2B SaaS and technology companies.",
    hook: "SaaS and tech companies that need Next.js sites, product pages, docs, and dashboards.",
    shortDescription:
      "We build Next.js marketing sites, product pages, documentation layouts, dashboards, and AI-assisted workflows for B2B SaaS and technology companies.",
    industryOverview:
      "B2B SaaS and technology companies need credible, fast marketing sites and product storytelling, plus lightweight dashboards and internal tools as they scale.",
    painPoints: [
      { title: "Marketing site lags the product", description: "The product is strong but the website does not explain it clearly." },
      { title: "No unified lead or demo flow", description: "Inbound interest is handled manually across tools." },
      { title: "Internal reporting is fragmented", description: "Teams patch together spreadsheets instead of a simple dashboard." },
    ],
    popularServices: [
      { label: "Next.js Development", href: "/services/lead-gen-websites" },
      { label: "Custom AI Agents", href: "/services/ai-receptionist-booking" },
      { label: "Reporting Dashboards", href: "/services/custom-in-house-software-for-smbs" },
      { label: "Platform Migrations", href: "/services/migrations" },
    ],
    exampleProject:
      "A SaaS marketing site on Next.js with product pages, demo booking, and a lightweight admin dashboard for leads.",
    commonUseCase:
      "A startup launches a polished product site with clear pricing, demo CTAs, and automated lead routing to sales.",
    icon: "saas",
    order: 5,
  },
  {
    slug: "real-estate-property",
    title: "Real Estate & Property",
    category: "Real Estate & Property",
    whoItIsFor:
      "Real estate agencies, property management companies, investment firms, short-term rental operators, developers, and commercial real estate teams.",
    whatWeBuild:
      "Listing pages, location pages, lead capture, portals, dashboards, CRM flows, email follow-up, and clean visual presentation.",
    problemSolved:
      "Listings and leads are scattered across portals and inboxes, with no unified site, CRM automation, or client-facing portal.",
    heroHeadline:
      "Websites, listing pages, and lead systems for real estate and property businesses.",
    hook: "Property businesses that need listing pages, lead capture, portals, and CRM automation.",
    shortDescription:
      "We build listing pages, location pages, lead capture, client portals, dashboards, and CRM automation for real estate and property companies.",
    industryOverview:
      "Real estate and property businesses need strong listing presentation, fast lead capture, and automated follow-up, plus portals and dashboards for clients and internal teams.",
    painPoints: [
      { title: "Leads come from too many channels", description: "Inquiries from portals, calls, and forms are not tracked in one place." },
      { title: "Listing pages under-convert", description: "Properties look generic and do not capture interest quickly." },
      { title: "Follow-up depends on agents", description: "Speed-to-lead varies and hot inquiries go cold." },
    ],
    popularServices: [
      { label: "Lead-Gen Website", href: "/services/lead-gen-websites" },
      { label: "CRM Automation", href: "/services/crm-follow-up-automation" },
      { label: "Client Portal", href: "/custom-software" },
      { label: "Reporting Dashboards", href: "/services/custom-in-house-software-for-smbs" },
    ],
    exampleProject:
      "A property site with listing search, location landing pages, lead forms, and automated follow-up for every inquiry.",
    commonUseCase:
      "A buyer submits a listing inquiry and receives immediate email and SMS follow-up with similar properties and a booking link.",
    icon: "real-estate",
    order: 6,
  },
];
