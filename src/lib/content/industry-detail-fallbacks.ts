import type { ArticleFaq, IndustryParent, PainPoint } from "@/lib/types";
import type { ParentIndustrySlug } from "@/lib/content/industry-routes";
import { INDUSTRY_FAQ_FALLBACKS } from "@/lib/content/industry-faq-fallbacks";

export type IndustryLandingCopy = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  problemsHeadline: string;
  systemHeadline: string;
  systemSubtext: string;
  aiPressuresHeadline: string;
  aiPressuresSubtext: string;
  problems: PainPoint[];
  aiPressures: PainPoint[];
  subIndustriesEyebrow: string;
  subIndustriesHeadline: string;
  subIndustriesSubtext: string;
  workEyebrow: string;
  workHeadline: string;
  servicesEyebrow: string;
  servicesHeadline: string;
  faqEyebrow: string;
  faqHeadline: string;
  faqSubtext: string;
  faqs: ArticleFaq[];
  ctaHeading: string;
  ctaSub: string;
};

const LANDING_COPY: Record<ParentIndustrySlug, IndustryLandingCopy> = {
  "healthcare-wellness": {
    heroEyebrow: "Healthcare & Wellness",
    heroHeadline:
      "Turn missed calls and manual intake into booked patients, without hiring another front desk.",
    heroSubhead:
      "We build clinic websites, online booking, CRM follow-up, and AI receptionists for dental, medspa, aesthetic, PT, and wellness practices that lose leads to slower competitors online.",
    problemsHeadline: "Where clinics leak patients before the first visit",
    systemHeadline: "The connected path from first click to booked patient",
    systemSubtext:
      "Each step is a handoff where clinics lose revenue when the website, CRM, calendar, and follow-up tools do not talk. We wire them into one system.",
    aiPressuresHeadline: "Why AI search and automation pressure is rising in healthcare",
    aiPressuresSubtext:
      "Patients compare options in Google and AI answers before they ever call. Practices that cannot respond instantly, explain services clearly, and follow up automatically lose share to better-digitized competitors.",
    problems: [
      {
        title: "Calls go unanswered during patient hours",
        description:
          "Front desk teams cannot pick up every inquiry while checking patients in, leaving voicemails and after-hours calls unconverted.",
      },
      {
        title: "Booking and intake stay manual",
        description:
          "Paper forms, phone tag, and slow follow-up drop conversion before the first appointment is confirmed.",
      },
      {
        title: "No centralized recall or nurture",
        description:
          "Rebooking, reviews, and treatment reminders depend on whoever has time that day, not a reliable system.",
      },
      {
        title: "Website does not explain services clearly",
        description:
          "Visitors leave confused about pricing, insurance, or what to expect, so they call a competitor with clearer pages.",
      },
      {
        title: "Staff repeat the same answers all day",
        description:
          "Hours, services, and prep instructions live in people's heads instead of on the site, chat, or phone assistant.",
      },
      {
        title: "Marketing and ops tools do not talk",
        description:
          "Forms, ads, CRM, and calendar tools create duplicate work and gaps where leads fall through.",
      },
    ],
    aiPressures: [
      {
        title: "AI Overviews answer before patients call",
        description:
          "Google and ChatGPT surface clinics with structured, quotable service pages. Thin or outdated sites get skipped.",
      },
      {
        title: "Patients expect instant answers 24/7",
        description:
          "After-hours DMs, chat, and phone inquiries need coverage without adding night-shift staff.",
      },
      {
        title: "Competitors automate follow-up",
        description:
          "Rivals send instant SMS, intake links, and review requests while your team is still copying notes into spreadsheets.",
      },
    ],
    subIndustriesEyebrow: "Specialties we serve",
    subIndustriesHeadline: "Healthcare & wellness segments we build for",
    subIndustriesSubtext:
      "We tailor copy, offers, and automations to each specialty listed below.",
    workEyebrow: "Work in this niche",
    workHeadline: "Projects for clinics and wellness brands",
    servicesEyebrow: "How we help",
    servicesHeadline: "Services clinics book most often",
    faqEyebrow: "FAQ",
    faqHeadline: "Questions from clinic owners",
    faqSubtext:
      "Booking, AI receptionists, HIPAA-aware workflows, and what a typical clinic build includes.",
    faqs: [
      {
        question: "Can you connect to our existing PMS or CRM?",
        answer:
          "Usually yes. We integrate with common calendars, form tools, HubSpot, GoHighLevel, and many practice-management workflows via API, Zapier, or Make. We audit your stack before recommending changes.",
      },
      {
        question: "Will an AI receptionist replace our front desk?",
        answer:
          "No. It covers overflow, after-hours, and repetitive questions so your team focuses on in-person care. Humans take over when the call needs clinical judgment.",
      },
      {
        question: "How fast can a clinic site launch?",
        answer:
          "Most clinic sites launch in 4–8 weeks depending on service count, intake complexity, and integrations. MVP pages can go live sooner with a phase-2 roadmap for SEO and automations.",
      },
      {
        question: "Do you handle review and recall automation?",
        answer:
          "Yes. Post-visit review requests, rebooking nudges, and recall sequences are standard CRM automation work for us, tied to your calendar and patient tags.",
      },
    ],
    ctaHeading: "Ready to stop losing patients to slow follow-up?",
    ctaSub:
      "Tell us about your practice. We will map the website, booking, and automation plan on a discovery call.",
  },

  "fitness-coaching-performance": {
    heroEyebrow: "Fitness, Coaching & Performance",
    heroHeadline:
      "Replace DM chaos with a site that books, onboards, and retains clients on autopilot.",
    heroSubhead:
      "Landing pages, Stripe checkout, client portals, and CRM automations for gyms, coaches, and performance businesses tired of leads living in Instagram DMs.",
    problemsHeadline: "What breaks when coaching businesses scale past DMs",
    systemHeadline: "The connected path from ad click to retained client",
    systemSubtext:
      "Coaching businesses leak revenue when landing pages, checkout, onboarding, and check-ins live in separate tools. We connect each step so clients move forward without manual chasing.",
    aiPressuresHeadline: "Why coaches feel pressure to automate now",
    aiPressuresSubtext:
      "Clients expect instant booking, payment, and program access. AI tools qualify leads and answer program questions while you sleep, if your stack is wired correctly.",
    problems: [
      {
        title: "Leads live in DMs and spreadsheets",
        description:
          "Inquiries get lost, pricing is explained manually, and there is no single pipeline from click to paid client.",
      },
      {
        title: "Onboarding repeats every signup",
        description:
          "Waivers, intake, and program details are sent by hand instead of a triggered sequence after payment.",
      },
      {
        title: "No client portal or progress hub",
        description:
          "Workouts, check-ins, and resources scatter across email, PDFs, and chat apps.",
      },
      {
        title: "Booking links do not match your offers",
        description:
          "Generic Calendly pages fail to sell the program or capture payment before the call.",
      },
      {
        title: "Churn happens quietly",
        description:
          "Without automated check-ins and renewal prompts, clients drop off before you notice.",
      },
      {
        title: "Brand looks amateur next to competitors",
        description:
          "Template link-in-bio pages do not convert like a purpose-built funnel with proof and clear outcomes.",
      },
    ],
    aiPressures: [
      {
        title: "AI qualifies leads before you do",
        description:
          "Chat and voice assistants can answer program FAQs and book discovery calls without you copying the same script daily.",
      },
      {
        title: "Short-form content drives cold traffic",
        description:
          "You need fast landing pages that match each offer, not one generic homepage for every program.",
      },
      {
        title: "Clients expect app-like experiences",
        description:
          "Portals, mobile-friendly intake, and instant confirmations are baseline, not premium extras.",
      },
    ],
    subIndustriesEyebrow: "Segments we serve",
    subIndustriesHeadline: "Fitness & coaching niches we build for",
    subIndustriesSubtext:
      "We tailor offers and automations to each segment on this page.",
    workEyebrow: "Work in this niche",
    workHeadline: "Projects for coaches and performance brands",
    servicesEyebrow: "How we help",
    servicesHeadline: "Services coaches book most often",
    faqEyebrow: "FAQ",
    faqHeadline: "Questions from coaches and gym owners",
    faqSubtext: "Booking, payments, portals, and automations for fitness businesses.",
    faqs: [
      {
        question: "Can you connect Stripe and our CRM?",
        answer:
          "Yes. Checkout, subscriptions, and payment-triggered onboarding sequences are core to how we build coaching funnels.",
      },
      {
        question: "Do you build client portals?",
        answer:
          "Yes, custom portals for programs, check-ins, and resources are part of our custom software and lead-gen work.",
      },
      {
        question: "We sell multiple programs, one site or many pages?",
        answer:
          "Usually one brand site with dedicated landing pages per offer, each with its own checkout or booking path and tracking.",
      },
    ],
    ctaHeading: "Ready to get leads out of your DMs?",
    ctaSub:
      "Share your offers and tools. We will scope the funnel, portal, and automation plan.",
  },

  "professional-services": {
    heroEyebrow: "Professional Services",
    heroHeadline:
      "Authority websites and intake systems that turn referrals into retained clients, not ghosted proposals.",
    heroSubhead:
      "For consultants, firms, and B2B service businesses that need credible sites, case studies, CRM follow-up, and proposal workflows without enterprise bloat.",
    problemsHeadline: "Where professional firms lose deals after the first touch",
    systemHeadline: "The connected path from referral to signed engagement",
    systemSubtext:
      "Firms lose deals when the website, intake form, CRM, and proposal follow-up are disconnected. We map and automate the full path so nothing stalls after the first touch.",
    aiPressuresHeadline: "Why firms are investing in AI-ready authority sites",
    aiPressuresSubtext:
      "Buyers research in AI search and compare three firms in an afternoon. Clear positioning, proof, and fast follow-up decide who gets the meeting.",
    problems: [
      {
        title: "Website looks dated versus competitors",
        description:
          "Referrals still visit your site, if it feels small or vague, momentum dies before the call.",
      },
      {
        title: "Intake is email and PDF chaos",
        description:
          "Discovery details live in threads instead of structured forms that feed your CRM.",
      },
      {
        title: "Proposals take too long",
        description:
          "Manual assembly delays sends and lets faster firms set the pace.",
      },
      {
        title: "Case studies are buried or missing",
        description:
          "Proof exists but is not structured for SEO, AI citation, or sales conversations.",
      },
      {
        title: "No nurture after the first call",
        description:
          "Leads that are not ready now disappear because follow-up is ad hoc.",
      },
      {
        title: "Stack of half-connected tools",
        description:
          "Forms, scheduling, docs, and CRM require manual copy-paste between steps.",
      },
    ],
    aiPressures: [
      {
        title: "AI search favors structured expertise",
        description:
          "Service pages with clear outcomes, FAQs, and schema markup get cited in AI answers, brochures do not.",
      },
      {
        title: "Buyers expect instant scheduling",
        description:
          "Qualified prospects want to book partner time without a week of email ping-pong.",
      },
      {
        title: "Internal AI assistants need source material",
        description:
          "Firms want chat trained on their methodology. That requires organized, quotable site content.",
      },
    ],
    subIndustriesEyebrow: "Firm types",
    subIndustriesHeadline: "Professional segments we build for",
    subIndustriesSubtext:
      "We tailor positioning and proof to each segment listed here.",
    workEyebrow: "Work in this niche",
    workHeadline: "Projects for professional service firms",
    servicesEyebrow: "How we help",
    servicesHeadline: "Services firms book most often",
    faqEyebrow: "FAQ",
    faqHeadline: "Questions from firm partners",
    faqSubtext: "Authority sites, CRM, proposals, and AI search readiness.",
    faqs: [
      {
        question: "Can you redesign without losing SEO?",
        answer:
          "Yes. We preserve URLs where possible, map redirects, and migrate meta data and structured content carefully.",
      },
      {
        question: "Do you write case studies?",
        answer:
          "We structure and build case study pages; you provide outcomes and quotes. We can also interview clients if needed.",
      },
    ],
    ctaHeading: "Ready to look as sharp online as you are in the room?",
    ctaSub:
      "Tell us about your firm and pipeline. We will propose the site and automation stack.",
  },

  "ecommerce-dtc": {
    heroEyebrow: "Ecommerce & DTC",
    heroHeadline:
      "Shopify stores and funnels that convert traffic, and recover the revenue your checkout leaks.",
    heroSubhead:
      "For DTC brands that need faster storefronts, landing pages, email/SMS automation, and AI-assisted product support without replatforming for sport.",
    problemsHeadline: "Where DTC brands bleed revenue after the ad click",
    systemHeadline: "The connected path from ad click to repeat purchase",
    systemSubtext:
      "DTC brands lose margin when product pages, checkout, email flows, and support do not share data. We wire the stack so every visit has a clear next step toward purchase and retention.",
    aiPressuresHeadline: "Why DTC brands adopt AI-assisted commerce",
    aiPressuresSubtext:
      "Shoppers ask product questions in chat and AI tools before buying. Brands without fast pages, clear answers, and automated recovery leave margin on the table.",
    problems: [
      {
        title: "Paid traffic hits weak product pages",
        description:
          "Creative promises more than the PDP delivers, so CAC rises and ROAS falls.",
      },
      {
        title: "Cart and browse abandonment",
        description:
          "No coordinated email, SMS, or offer sequence to bring shoppers back.",
      },
      {
        title: "Support repeats the same product questions",
        description:
          "Sizing, ingredients, and shipping FAQs are not answered on-site or by automation.",
      },
      {
        title: "Slow mobile experience",
        description:
          "Heavy themes and apps hurt conversion on the device most shoppers use.",
      },
      {
        title: "Promo chaos across channels",
        description:
          "Landing pages, ads, and email promos tell different stories and confuse buyers.",
      },
      {
        title: "No single view of customer LTV",
        description:
          "Repeat purchase and win-back flows are manual or missing entirely.",
      },
    ],
    aiPressures: [
      {
        title: "AI shopping assistants compare products",
        description:
          "Structured product content and FAQ schema help your catalog show up in AI-driven discovery.",
      },
      {
        title: "Instant answers expected pre-purchase",
        description:
          "Chat and SMS bots trained on your catalog reduce support load and unblock checkout.",
      },
      {
        title: "Creative fatigue demands faster LPs",
        description:
          "You need new landing pages per campaign without a two-week dev queue.",
      },
    ],
    subIndustriesEyebrow: "Store types",
    subIndustriesHeadline: "Ecommerce segments we support",
    subIndustriesSubtext:
      "We align offers and build scope to each segment below.",
    workEyebrow: "Work in this niche",
    workHeadline: "Projects for ecommerce brands",
    servicesEyebrow: "How we help",
    servicesHeadline: "Services DTC brands book most often",
    faqEyebrow: "FAQ",
    faqHeadline: "Questions from DTC operators",
    faqSubtext: "Shopify, conversion, automations, and retention.",
    faqs: [
      {
        question: "Do you only work on Shopify?",
        answer:
          "Shopify is our primary ecommerce stack, but we also build landing pages and automations that connect to your existing storefront.",
      },
    ],
    ctaHeading: "Ready to fix where your funnel leaks?",
    ctaSub: "Share your store and metrics. We will prioritize the highest-ROI fixes.",
  },

  "b2b-saas-technology": {
    heroEyebrow: "B2B SaaS & Technology",
    heroHeadline:
      "Marketing sites and demo funnels that explain complex products, and feed your pipeline with qualified signups.",
    heroSubhead:
      "For SaaS and tech companies that need clear positioning, product-led pages, CRM-connected forms, and AI assistants trained on docs, not another generic Webflow template.",
    problemsHeadline: "What slows SaaS pipeline after the demo request",
    systemHeadline: "The connected path from signup to qualified pipeline",
    systemSubtext:
      "SaaS teams stall when marketing pages, demo booking, CRM routing, and nurture sequences are siloed. We connect each stage so product interest becomes qualified pipeline faster.",
    aiPressuresHeadline: "Why SaaS teams invest in AI-ready product marketing",
    aiPressuresSubtext:
      "Buyers ask AI tools to compare vendors. Docs-heavy products need structured pages, instant answers, and demo routing that respects ICP fit.",
    problems: [
      {
        title: "Homepage does not explain the product",
        description:
          "Visitors cannot tell who it is for, what it replaces, or why it is different in 10 seconds.",
      },
      {
        title: "Demo form is a black hole",
        description:
          "Leads submit and wait days with no nurture or self-serve path for smaller accounts.",
      },
      {
        title: "Docs and marketing are disconnected",
        description:
          "Product truth lives in Notion or GitBook while the site shows stale messaging.",
      },
      {
        title: "No lifecycle automation",
        description:
          "Trial, demo, and expansion stages are not sequenced in the CRM.",
      },
      {
        title: "Case studies and security pages are weak",
        description:
          "Enterprise buyers bounce when proof and compliance story are hard to find.",
      },
      {
        title: "Ship velocity on marketing site is slow",
        description:
          "Engineering cannot spare cycles for every new campaign page.",
      },
    ],
    aiPressures: [
      {
        title: "AI compares vendors from your public content",
        description:
          "If positioning is vague, AI summaries favor competitors with clearer pages and FAQs.",
      },
      {
        title: "Product-led trials need instant onboarding",
        description:
          "Automated email, in-app nudges, and chat reduce time-to-value without more SDR hours.",
      },
      {
        title: "Support bots must cite real documentation",
        description:
          "Teams want assistants grounded in docs. That requires structured, crawlable content.",
      },
    ],
    subIndustriesEyebrow: "Company types",
    subIndustriesHeadline: "B2B SaaS segments we build for",
    subIndustriesSubtext:
      "Each segment below reflects how we tailor positioning and deliverables.",
    workEyebrow: "Work in this niche",
    workHeadline: "Projects for SaaS and tech companies",
    servicesEyebrow: "How we help",
    servicesHeadline: "Services SaaS teams book most often",
    faqEyebrow: "FAQ",
    faqHeadline: "Questions from SaaS founders and marketers",
    faqSubtext: "Product sites, demos, docs alignment, and automations.",
    faqs: [
      {
        question: "Can you work with our existing Next.js or Webflow site?",
        answer:
          "Yes. We migrate, extend, or rebuild depending on speed, SEO, and how much marketing wants to self-serve.",
      },
    ],
    ctaHeading: "Ready to clarify the story and fix demo follow-up?",
    ctaSub: "Walk us through your ICP and stack. We will map the site and automation plan.",
  },

  "real-estate-property": {
    heroEyebrow: "Real Estate & Property",
    heroHeadline:
      "Sites and follow-up systems that answer leads in minutes, not after the listing goes cold.",
    heroSubhead:
      "For brokerages, agents, and property businesses that need listing showcases, lead capture, CRM automation, and AI coverage for after-hours inquiries.",
    problemsHeadline: "Where property businesses lose deals on speed",
    systemHeadline: "The connected path from listing view to booked showing",
    systemSubtext:
      "Property businesses lose deals when listings, inquiry forms, CRM alerts, and follow-up texts are slow or disconnected. We connect the full journey so leads get answered in minutes.",
    aiPressuresHeadline: "Why real estate is adopting AI-assisted lead response",
    aiPressuresSubtext:
      "Buyers and renters expect instant answers on availability, tours, and financing basics. The first responsive agent or team often wins the relationship.",
    problems: [
      {
        title: "Leads sit until an agent is free",
        description:
          "Portal inquiries and form fills wait hours while shoppers contact the next listing.",
      },
      {
        title: "Listing sites are hard to update",
        description:
          "Agents depend on developers or outdated IDX experiences that hurt mobile conversion.",
      },
      {
        title: "No central CRM hygiene",
        description:
          "Contacts live in phones, spreadsheets, and portal inboxes with no nurture.",
      },
      {
        title: "Marketing pages do not match farm area",
        description:
          "Generic team sites fail local SEO and AI local queries for specific neighborhoods.",
      },
      {
        title: "After-hours calls go to voicemail",
        description:
          "Weekend and evening inquiries, peak shopping time, get no immediate response.",
      },
      {
        title: "Seller proof is weak online",
        description:
          "Sold stories and reviews are not structured to build trust before the first meeting.",
      },
    ],
    aiPressures: [
      {
        title: "AI local search reshapes discovery",
        description:
          "Structured local pages, FAQs, and schema help teams show up when buyers ask AI for agents in an area.",
      },
      {
        title: "Voice and SMS bots qualify tours",
        description:
          "Assistants can capture budget, timeline, and property preferences before an agent calls back.",
      },
      {
        title: "Speed-to-lead is the competitive moat",
        description:
          "Automated SMS and calendar booking beat teams still working manual lead rotation.",
      },
    ],
    subIndustriesEyebrow: "Property segments",
    subIndustriesHeadline: "Real estate niches we build for",
    subIndustriesSubtext:
      "Each segment below informs how we tailor this landing experience.",
    workEyebrow: "Work in this niche",
    workHeadline: "Projects for property businesses",
    servicesEyebrow: "How we help",
    servicesHeadline: "Services property teams book most often",
    faqEyebrow: "FAQ",
    faqHeadline: "Questions from agents and brokerages",
    faqSubtext: "IDX, lead routing, automations, and local SEO.",
    faqs: [
      {
        question: "Can you integrate with our CRM or KVCore / Follow Up Boss?",
        answer:
          "Yes. We connect forms, chat, and automations to common real estate CRMs and calendars.",
      },
    ],
    ctaHeading: "Ready to respond faster than the next agent?",
    ctaSub:
      "Tell us about your market and lead sources. We will design the site and follow-up system.",
  },
};

const MIN_INDUSTRY_FAQ_COUNT = 10;

function resolveIndustryFaqs(
  slug: string,
  parentFaqs?: ArticleFaq[],
): ArticleFaq[] {
  const fallback = INDUSTRY_FAQ_FALLBACKS[slug as ParentIndustrySlug];
  if (parentFaqs && parentFaqs.length >= MIN_INDUSTRY_FAQ_COUNT) return parentFaqs;
  return fallback ?? parentFaqs ?? [];
}

export function getIndustryLandingCopy(slug: string): IndustryLandingCopy | null {
  if (!(slug in LANDING_COPY)) return null;
  return LANDING_COPY[slug as ParentIndustrySlug];
}

/** Merge CMS parent record with static landing fallbacks (mirrors mergeServiceWithStaticFallback). */
export function mergeIndustryLandingCopy(
  parent: IndustryParent,
): IndustryLandingCopy {
  const fallback = getIndustryLandingCopy(parent.slug);

  return {
    heroEyebrow: parent.heroEyebrow ?? fallback?.heroEyebrow ?? parent.category,
    heroHeadline: parent.heroHeadline ?? fallback?.heroHeadline ?? parent.title,
    heroSubhead: parent.heroSubhead ?? fallback?.heroSubhead ?? parent.shortDescription,
    problemsHeadline:
      parent.problemsHeadline ??
      fallback?.problemsHeadline ??
      "Operational problems we solve",
    systemHeadline:
      parent.systemHeading ??
      fallback?.systemHeadline ??
      "The connected path from interest to conversion",
    systemSubtext:
      parent.systemSubheading ??
      fallback?.systemSubtext ??
      "We map how leads move through your stack and wire each step so nothing falls through.",
    aiPressuresHeadline:
      parent.aiPressuresHeadline ??
      fallback?.aiPressuresHeadline ??
      "Why AI adoption pressure is rising",
    aiPressuresSubtext:
      parent.aiPressuresSubtext ?? fallback?.aiPressuresSubtext ?? "",
    problems:
      parent.problems?.length
        ? parent.problems
        : (fallback?.problems ?? parent.painPoints),
    aiPressures:
      parent.aiPressures?.length
        ? parent.aiPressures
        : (fallback?.aiPressures ?? []),
    subIndustriesEyebrow:
      parent.subIndustriesEyebrow ?? fallback?.subIndustriesEyebrow ?? "Segments",
    subIndustriesHeadline:
      parent.subIndustriesHeadline ??
      fallback?.subIndustriesHeadline ??
      "Sub-industries we serve",
    subIndustriesSubtext:
      parent.subIndustriesSubtext ?? fallback?.subIndustriesSubtext ?? "",
    workEyebrow: parent.workEyebrow ?? fallback?.workEyebrow ?? "Work",
    workHeadline:
      parent.workHeadline ?? fallback?.workHeadline ?? "Projects in this industry",
    servicesEyebrow:
      parent.servicesEyebrow ?? fallback?.servicesEyebrow ?? "Services",
    servicesHeadline:
      parent.servicesHeadline ??
      fallback?.servicesHeadline ??
      "Popular services for this industry",
    faqEyebrow: parent.faqEyebrow ?? fallback?.faqEyebrow ?? "FAQ",
    faqHeadline: parent.faqHeadline ?? fallback?.faqHeadline ?? "Common questions",
    faqSubtext: parent.faqSubtext ?? fallback?.faqSubtext ?? "",
    faqs: resolveIndustryFaqs(parent.slug, parent.faqs),
    ctaHeading:
      parent.ctaHeading ?? fallback?.ctaHeading ?? "Ready to get started?",
    ctaSub: parent.ctaSub ?? fallback?.ctaSub ?? "",
  };
}

export function mergeIndustryParentWithStaticFallback(
  parent: IndustryParent,
): IndustryParent {
  const fallback = getIndustryLandingCopy(parent.slug);
  if (!fallback) return parent;

  return {
    ...parent,
    heroEyebrow: parent.heroEyebrow ?? fallback.heroEyebrow,
    heroSubhead: parent.heroSubhead ?? fallback.heroSubhead,
    heroHeadline: parent.heroHeadline || fallback.heroHeadline,
    problemsHeadline: parent.problemsHeadline ?? fallback.problemsHeadline,
    problems: parent.problems?.length ? parent.problems : fallback.problems,
    aiPressuresHeadline: parent.aiPressuresHeadline ?? fallback.aiPressuresHeadline,
    aiPressuresSubtext: parent.aiPressuresSubtext ?? fallback.aiPressuresSubtext,
    aiPressures: parent.aiPressures?.length ? parent.aiPressures : fallback.aiPressures,
    subIndustriesEyebrow: parent.subIndustriesEyebrow ?? fallback.subIndustriesEyebrow,
    subIndustriesHeadline:
      parent.subIndustriesHeadline ?? fallback.subIndustriesHeadline,
    subIndustriesSubtext: parent.subIndustriesSubtext ?? fallback.subIndustriesSubtext,
    workEyebrow: parent.workEyebrow ?? fallback.workEyebrow,
    workHeadline: parent.workHeadline ?? fallback.workHeadline,
    servicesEyebrow: parent.servicesEyebrow ?? fallback.servicesEyebrow,
    servicesHeadline: parent.servicesHeadline ?? fallback.servicesHeadline,
    faqEyebrow: parent.faqEyebrow ?? fallback.faqEyebrow,
    faqHeadline: parent.faqHeadline ?? fallback.faqHeadline,
    faqSubtext: parent.faqSubtext ?? fallback.faqSubtext,
    faqs: resolveIndustryFaqs(parent.slug, parent.faqs),
    ctaHeading: parent.ctaHeading ?? fallback.ctaHeading,
    ctaSub: parent.ctaSub ?? fallback.ctaSub,
  };
}

export function mergeIndustryLandingFaqs(
  slug: string,
  existing?: ArticleFaq[],
): ArticleFaq[] {
  const copy = getIndustryLandingCopy(slug);
  if (existing?.length) return existing;
  return copy?.faqs ?? [];
}
