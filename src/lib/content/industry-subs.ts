import type { Industry, IndustryCategory } from "@/lib/types";
import { industryParents } from "@/lib/content/industry-parents";

type SegmentDef = {
  slug: string;
  title: string;
  shortDescription: string;
  hook: string;
  icon: string;
};

function parentServices(parentSlug: string) {
  return industryParents.find((p) => p.slug === parentSlug)?.popularServices ?? [];
}

function segment(
  parentSlug: string,
  category: IndustryCategory,
  def: SegmentDef,
  order: number,
): Industry {
  const parent = industryParents.find((p) => p.slug === parentSlug);
  return {
    slug: def.slug,
    parentSlug,
    category,
    title: def.title,
    whoItIsFor: def.hook,
    whatWeBuild: parent?.whatWeBuild ?? "",
    problemSolved: parent?.problemSolved ?? "",
    heroHeadline: `${def.title} — ${parent?.heroHeadline ?? ""}`.slice(0, 120),
    hook: def.hook,
    shortDescription: def.shortDescription,
    painPoints: parent?.painPoints.slice(0, 2) ?? [],
    popularServices: parentServices(parentSlug),
    exampleProject: parent?.exampleProject ?? "",
    commonUseCase: parent?.commonUseCase ?? "",
    icon: def.icon,
    order,
  };
}

function buildGroup(
  parentSlug: string,
  category: IndustryCategory,
  defs: SegmentDef[],
  startOrder: number,
): Industry[] {
  return defs.map((def, i) => segment(parentSlug, category, def, startOrder + i));
}

const healthcareSegments: SegmentDef[] = [
  { slug: "dental-clinics", title: "Dental Clinics", hook: "Dental practices with busy front desks and recall lists.", shortDescription: "Dental websites, online booking, hygiene recall, intake forms, and review automation.", icon: "dental" },
  { slug: "medical-clinics", title: "Medical Clinics", hook: "Primary care and specialty clinics with high call volume.", shortDescription: "Medical clinic websites, patient intake, appointment booking, and SMS reminders.", icon: "medical" },
  { slug: "medspas", title: "Medspas", hook: "Med spas booking treatments by phone, DM, and online.", shortDescription: "Med spa websites, treatment booking, rebooking emails, and review automation.", icon: "wellness" },
  { slug: "aesthetic-clinics", title: "Aesthetic Clinics", hook: "Cosmetic clinics selling consults for procedures.", shortDescription: "Aesthetic clinic sites, treatment pages, consult booking, and follow-up automation.", icon: "aesthetic" },
  { slug: "longevity-clinics", title: "Longevity Clinics", hook: "Longevity clinics selling memberships and advanced programs.", shortDescription: "Longevity clinic websites, membership pages, booking, and renewal reminders.", icon: "longevity" },
  { slug: "skincare-clinics", title: "Skincare Clinics", hook: "Skincare and dermatology clinics with treatment menus.", shortDescription: "Skincare clinic websites, service pages, booking flows, and patient follow-up.", icon: "skincare" },
  { slug: "physical-therapy-clinics", title: "Physical Therapy Clinics", hook: "PT clinics scheduling evals and recurring visits.", shortDescription: "PT clinic websites, eval booking, intake forms, and appointment reminders.", icon: "physical-therapy" },
  { slug: "wellness-practices", title: "Wellness Practices", hook: "Wellness practices offering IV, holistic, and integrative care.", shortDescription: "Wellness practice websites, service menus, booking, and automated follow-up.", icon: "wellness-clinic" },
];

const ecommerceSegments: SegmentDef[] = [
  { slug: "shopify-stores", title: "Shopify Stores", hook: "Shopify merchants upgrading theme, checkout, and retention.", shortDescription: "Shopify development, product pages, cart recovery, and Klaviyo email flows.", icon: "shopify" },
  { slug: "skincare-brands", title: "Skincare Brands", hook: "Skincare DTC brands selling routines and subscriptions.", shortDescription: "Skincare Shopify stores, routine landing pages, quizzes, and retention flows.", icon: "skincare" },
  { slug: "supplement-style-wellness-brands", title: "Supplement & Wellness Brands", hook: "Supplement and wellness brands with subscription offers.", shortDescription: "Supplement storefronts, subscription flows, education pages, and win-back emails.", icon: "supplement" },
  { slug: "beauty-brands", title: "Beauty Brands", hook: "Beauty brands selling DTC on Shopify.", shortDescription: "Beauty Shopify sites, product guidance pages, and Klaviyo retention flows.", icon: "beauty" },
  { slug: "fitness-product-brands", title: "Fitness Product Brands", hook: "Fitness gear and apparel brands selling online.", shortDescription: "Fitness product stores, education pages, bundles, and post-purchase flows.", icon: "fitness" },
  { slug: "fashion-brands", title: "Fashion Brands", hook: "Fashion DTC brands launching collections online.", shortDescription: "Fashion Shopify stores, collection pages, lookbooks, and launch email flows.", icon: "fashion" },
  { slug: "digital-product-stores", title: "Digital Product Stores", hook: "Brands selling digital products, courses, and downloads.", shortDescription: "Digital product storefronts, checkout flows, delivery automation, and upsells.", icon: "digital" },
  { slug: "small-dtc-brands", title: "Small DTC Brands", hook: "Small DTC brands with one hero product or tight catalog.", shortDescription: "DTC landing pages, Shopify builds, email flows, and post-purchase sequences.", icon: "dtc" },
];

const fitnessSegments: SegmentDef[] = [
  { slug: "gyms", title: "Gyms", hook: "Gyms selling memberships and class packs.", shortDescription: "Gym websites, membership pages, class booking, and lead follow-up automation.", icon: "gym" },
  { slug: "fitness-coaches", title: "Fitness Coaches", hook: "Fitness coaches selling online and in-person programs.", shortDescription: "Coach landing pages, booking, payment flows, and client onboarding forms.", icon: "coach" },
  { slug: "online-coaches", title: "Online Coaches", hook: "Online coaches running remote programs at scale.", shortDescription: "Online coaching sites, checkout, client portals, and automated check-ins.", icon: "online-coach" },
  { slug: "personal-trainers", title: "Personal Trainers", hook: "Personal trainers booking sessions and selling packages.", shortDescription: "Trainer websites, session booking, payments, and progress tracking flows.", icon: "trainer" },
  { slug: "martial-arts-gyms", title: "Martial Arts Gyms", hook: "Martial arts studios with trials and membership funnels.", shortDescription: "Martial arts gym sites, trial booking, membership pages, and follow-up SMS.", icon: "martial-arts" },
  { slug: "nutrition-coaches", title: "Nutrition Coaches", hook: "Nutrition coaches selling plans and check-in programs.", shortDescription: "Nutrition coach sites, intake forms, payment flows, and client check-in automation.", icon: "nutrition" },
  { slug: "performance-coaches", title: "Performance Coaches", hook: "Performance coaches working with athletes and teams.", shortDescription: "Performance coaching sites, program pages, booking, and client dashboards.", icon: "performance" },
  { slug: "wellness-coaches", title: "Wellness Coaches", hook: "Wellness coaches selling holistic programs and memberships.", shortDescription: "Wellness coaching websites, discovery calls, onboarding, and nurture emails.", icon: "wellness-coach" },
];

const professionalSegments: SegmentDef[] = [
  { slug: "consultants", title: "Consultants", hook: "Independent consultants and boutique advisory firms.", shortDescription: "Consulting websites, service pages, case studies, and lead capture automation.", icon: "consulting" },
  { slug: "accounting-firms", title: "Accounting Firms", hook: "Accounting and bookkeeping firms generating inbound leads.", shortDescription: "Accounting firm websites, service pages, intake forms, and CRM follow-up.", icon: "accounting" },
  { slug: "recruiting-firms", title: "Recruiting Firms", hook: "Recruiters and staffing firms sourcing clients and candidates.", shortDescription: "Recruiting sites, job landing pages, lead forms, and pipeline automation.", icon: "recruiting" },
  { slug: "architecture-studios", title: "Architecture Studios", hook: "Architecture studios showcasing projects and winning RFPs.", shortDescription: "Architecture portfolio sites, project pages, and inquiry workflows.", icon: "architecture" },
  { slug: "engineering-consultants", title: "Engineering Consultants", hook: "Engineering consultancies selling technical expertise.", shortDescription: "Engineering consultancy sites, capability pages, and qualified lead capture.", icon: "engineering" },
  { slug: "b2b-service-firms", title: "B2B Service Firms", hook: "B2B service companies with complex sales cycles.", shortDescription: "B2B service websites, case studies, CRM automation, and proposal workflows.", icon: "b2b" },
  { slug: "marketing-agencies", title: "Marketing Agencies", hook: "Agencies needing portfolio sites and client portals.", shortDescription: "Agency websites, case studies, white-label pages, and internal dashboards.", icon: "agency" },
  { slug: "law-firms", title: "Law Firms", hook: "Law firms that need authority sites and faster intake.", shortDescription: "Law firm websites, practice area pages, intake forms, and lead follow-up automation.", icon: "legal" },
  { slug: "operations-consultants", title: "Operations Consultants", hook: "Ops consultants improving systems for growing teams.", shortDescription: "Operations consulting sites, offer pages, audits, and lead nurture sequences.", icon: "operations" },
];

const saasSegments: SegmentDef[] = [
  { slug: "saas-startups", title: "SaaS Startups", hook: "Early-stage SaaS teams launching or repositioning.", shortDescription: "SaaS marketing sites, pricing pages, demo flows, and lightweight dashboards.", icon: "saas" },
  { slug: "ai-startups", title: "AI Startups", hook: "AI startups explaining complex products to buyers.", shortDescription: "AI startup websites, product storytelling, demo booking, and lead routing.", icon: "ai" },
  { slug: "developer-tools", title: "Developer Tools", hook: "Dev tools companies selling to technical buyers.", shortDescription: "Developer tool sites, docs-style pages, onboarding flows, and conversion pages.", icon: "devtools" },
  { slug: "cybersecurity-companies", title: "Cybersecurity Companies", hook: "Cybersecurity vendors building trust with enterprise buyers.", shortDescription: "Cybersecurity websites, service pages, compliance content, and lead capture.", icon: "security" },
  { slug: "b2b-software-companies", title: "B2B Software Companies", hook: "B2B software vendors with multi-stakeholder sales.", shortDescription: "B2B software sites, use-case pages, demos, and CRM-integrated lead flows.", icon: "software" },
  { slug: "api-companies", title: "API Companies", hook: "API-first companies needing clear developer marketing.", shortDescription: "API product sites, documentation layouts, signup flows, and usage dashboards.", icon: "api" },
  { slug: "productized-service-companies", title: "Productized Service Companies", hook: "Teams productizing services with fixed offers.", shortDescription: "Productized service sites, offer pages, checkout, and client onboarding.", icon: "productized" },
  { slug: "tech-consultancies", title: "Tech Consultancies", hook: "Tech consultancies selling implementation and advisory.", shortDescription: "Tech consultancy websites, case studies, and scoped lead capture flows.", icon: "tech-consulting" },
];

const realEstateSegments: SegmentDef[] = [
  { slug: "real-estate-agencies", title: "Real Estate Agencies", hook: "Agencies capturing buyer and seller leads online.", shortDescription: "Agency websites, listing pages, lead forms, and automated follow-up.", icon: "real-estate" },
  { slug: "property-management-companies", title: "Property Management Companies", hook: "Property managers handling tenants and owners.", shortDescription: "Property management sites, owner portals, tenant intake, and maintenance workflows.", icon: "property-mgmt" },
  { slug: "real-estate-investment-firms", title: "Real Estate Investment Firms", hook: "Investment firms marketing deals to accredited investors.", shortDescription: "Investment firm websites, deal pages, investor intake, and CRM automation.", icon: "investment" },
  { slug: "short-term-rental-operators", title: "Short-Term Rental Operators", hook: "STR operators driving direct bookings.", shortDescription: "Direct booking sites, property galleries, pricing pages, and inquiry automation.", icon: "str" },
  { slug: "developers", title: "Developers", hook: "Developers marketing new projects and pre-sales.", shortDescription: "Development project sites, floor plans, lead capture, and buyer nurture flows.", icon: "developer" },
  { slug: "commercial-real-estate-firms", title: "Commercial Real Estate Firms", hook: "CRE firms listing commercial properties and spaces.", shortDescription: "Commercial property sites, listing search, and broker lead workflows.", icon: "commercial" },
  { slug: "broker-teams", title: "Broker Teams", hook: "Agent teams needing personal brand sites and listing hubs.", shortDescription: "Broker team websites, agent profiles, listing feeds, and lead routing.", icon: "broker" },
  { slug: "property-listing-platforms", title: "Property Listing Platforms", hook: "Platforms aggregating listings and capturing demand.", shortDescription: "Listing platforms, search UX, lead capture, and agent notification flows.", icon: "platform" },
];

export const industries: Industry[] = [
  ...buildGroup("healthcare-wellness", "Healthcare & Wellness", healthcareSegments, 1),
  ...buildGroup("ecommerce-dtc", "Ecommerce & DTC", ecommerceSegments, 9),
  ...buildGroup("fitness-coaching-performance", "Fitness, Coaching & Performance", fitnessSegments, 17),
  ...buildGroup("professional-services", "Professional Services", professionalSegments, 25),
  ...buildGroup("b2b-saas-technology", "B2B SaaS & Technology", saasSegments, 34),
  ...buildGroup("real-estate-property", "Real Estate & Property", realEstateSegments, 43),
];
