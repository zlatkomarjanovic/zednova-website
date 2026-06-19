import type { Industry } from "@/lib/types";

export const industries: Industry[] = [
  {
    slug: "home-services",
    title: "Home Services",
    heroHeadline: "You're losing jobs to voicemail. We fix that.",
    heroStat:
      "73% of home service calls that go to voicemail choose the next contractor they reach.",
    hook: "HVAC, roofing, plumbing, and solar teams that can't answer mid-job.",
    shortDescription:
      "HVAC, roofing, plumbing, and solar. We build the systems that catch the calls you miss and follow up on the estimates that go cold.",
    painPoints: [
      { title: "Missed calls are missed revenue", description: "Techs can't answer while they're on a roof or under a sink. Every voicemail is a job going to someone else." },
      { title: "Estimates go out, then silence", description: "There's no follow-up system. Quotes sit unanswered and warm jobs cool off." },
      { title: "Seasonal spikes overwhelm the office", description: "Volume surges and there's no automation to absorb it. Leads slip through." },
      { title: "Reviews aren't collected", description: "Happy customers never get asked, so your Google ranking stalls behind competitors." },
    ],
    coreServices: ["ai-receptionist", "review-reputation", "crm-pipeline-automation", "ai-lead-site"],
    miniCaseNarrative:
      "A Texas HVAC company was losing 20-plus calls per week to voicemail. After deploying our AI receptionist and missed-call text-back, they recovered 14 calls in the first week alone. Three of those became booked jobs.",
    socialProof:
      "14 calls recovered in week one. 3 booked jobs from calls that used to go to voicemail.",
    icon: "home-services",
    order: 1,
  },
  {
    slug: "dental-healthcare",
    title: "Dental & Healthcare Clinics",
    heroHeadline: "More booked chairs. Less front desk chaos.",
    heroStat:
      "A single missed new-patient call can mean thousands in lost lifetime value.",
    hook: "Front desks drowning in calls, no-shows, and missed recalls.",
    shortDescription:
      "Dental and medical clinics. We take the pressure off the front desk and put recall, confirmation, and reputation on autopilot.",
    painPoints: [
      { title: "The front desk is overwhelmed", description: "Inbound calls get dropped when the team is with patients. Those callers book elsewhere." },
      { title: "No-shows kill the schedule", description: "Without automated confirmations and reminders, daily revenue walks out the door." },
      { title: "Patients aren't recalled", description: "Cleanings, hygiene, and follow-ups go unbooked because nobody reaches out." },
      { title: "After-hours inquiries hit a wall", description: "Calls and messages outside business hours are answered by nobody." },
    ],
    coreServices: ["ai-receptionist", "crm-pipeline-automation", "review-reputation", "ai-lead-site"],
    miniCaseNarrative:
      "A multi-location dental group was missing roughly a quarter of new-patient calls during peak hours. We deployed an AI receptionist for overflow and an automated recall sequence. Within 60 days they filled more chairs without adding front-desk headcount.",
    socialProof:
      "47 new Google reviews in 60 days from one dental group's automated recall and reputation system.",
    icon: "dental",
    order: 2,
  },
  {
    slug: "legal",
    title: "Legal",
    heroHeadline: "The case goes to whoever calls back first. Make that you.",
    heroStat:
      "Law firms that respond to leads within 5 minutes are 9x more likely to sign the client.",
    hook: "Personal injury and general practice firms losing cases to slow intake.",
    shortDescription:
      "Personal injury and general practice. We make sure you're the first firm to call back, and the easiest to find.",
    painPoints: [
      { title: "Intake is slow and manual", description: "Competitors respond faster. By the time you call back, the client has signed elsewhere." },
      { title: "No automated follow-up", description: "Cold leads never get re-engaged. Potential cases die in a spreadsheet." },
      { title: "The website doesn't rank locally", description: "Your Google Maps listing is thin and your site is invisible for the terms that matter." },
      { title: "Referral sources go untracked", description: "You don't know which sources drive signed cases, so you can't double down." },
    ],
    coreServices: ["ai-receptionist", "ai-lead-site", "seo-aeo-content", "crm-pipeline-automation"],
    miniCaseNarrative:
      "A Texas personal injury firm was taking up to two hours to respond to new leads. We built an AI intake system that qualifies and routes inquiries instantly. Response time dropped from two hours to 38 seconds.",
    socialProof:
      "Lead response cut from 2 hours to 38 seconds with an automated intake system.",
    icon: "legal",
    order: 3,
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    heroHeadline: "Most agents lose leads in the first hour. You won't.",
    heroStat:
      "Lead value drops sharply after the first few minutes. Speed is the whole game.",
    hook: "Agents and teams whose leads go cold before the first callback.",
    shortDescription:
      "Agents and teams. We make instant follow-up and disciplined nurture the default, not the exception.",
    painPoints: [
      { title: "Leads go cold in minutes", description: "If a new lead isn't contacted immediately, it's gone. Most are." },
      { title: "No CRM discipline", description: "Contacts live in email threads and phone notes. Nothing is followed up systematically." },
      { title: "Showing reminders are manual", description: "No-show rates climb because confirmations depend on someone remembering." },
      { title: "No automated nurture", description: "Buyers who aren't ready today drop off, and you never hear from them again." },
    ],
    coreServices: ["ai-receptionist", "crm-pipeline-automation", "outbound-lead-gen", "ai-lead-site"],
    miniCaseNarrative:
      "A growing real estate team was responding to portal leads hours late. We wired instant text-back plus a structured nurture sequence into their CRM. More first conversations, fewer leads lost to faster agents.",
    socialProof:
      "Instant text-back plus structured nurture means more first conversations and fewer leads lost.",
    icon: "real-estate",
    order: 4,
  },
  {
    slug: "saas-startups",
    title: "B2B SaaS & Startups",
    heroHeadline: "Scale your pipeline without scaling your headcount.",
    heroStat:
      "Most early-stage outbound dies because it can't personalize at volume. We fix that.",
    hook: "Founders and teams who need pipeline without an SDR army.",
    shortDescription:
      "B2B SaaS and startups. We build the outbound, onboarding, and reporting systems that let a small team punch above its weight.",
    painPoints: [
      { title: "Outbound is manual", description: "It doesn't personalize at scale, so reply rates stay low and reps burn out." },
      { title: "Trial-to-paid is a black box", description: "You can't see why users convert or churn, so you're guessing at fixes." },
      { title: "Onboarding isn't automated", description: "Too much CS time goes to sequences that software should run." },
      { title: "Reporting is fragmented", description: "Product, marketing, and sales data never live in one place." },
    ],
    coreServices: ["outbound-lead-gen", "custom-ai-agents", "crm-pipeline-automation", "reporting-dashboards"],
    miniCaseNarrative:
      "A seed-stage SaaS team was doing outbound by hand between product work. We built an AI-personalized outbound engine and a unified pipeline dashboard. They booked more demos without hiring a single SDR.",
    socialProof:
      "More demos booked from AI-personalized outbound, with zero new SDR headcount.",
    icon: "saas",
    order: 5,
  },
  {
    slug: "financial-insurance",
    title: "Financial Services & Insurance",
    heroHeadline: "Your competitors are automating. Your clients expect it.",
    heroStat:
      "Clients now expect instant follow-up and digital service. Referral-only growth has a ceiling.",
    hook: "Agencies and advisors stuck on referral-only growth.",
    shortDescription:
      "Financial services and insurance. We build compliant systems for follow-up, content, and renewals so growth isn't capped by referrals.",
    painPoints: [
      { title: "Compliance slows everything", description: "Forms and disclosures are everywhere, so marketing stays stuck in approval." },
      { title: "Follow-up is manual", description: "Agents chase leads instead of closing them, and warm prospects go cold." },
      { title: "No content strategy", description: "Referrals are the only channel, which means growth is capped by your network." },
      { title: "Renewals slip", description: "There's no system tracking referral sources or reminding clients about policy renewals." },
    ],
    coreServices: ["crm-pipeline-automation", "ai-lead-site", "seo-aeo-content", "review-reputation"],
    miniCaseNarrative:
      "An independent insurance agency relied entirely on referrals. We built a compliant CRM with automated follow-up and renewal reminders, plus a content engine for local search. New leads started arriving from outside the referral network.",
    socialProof:
      "A referral-only agency opened a second channel with compliant automation and local content.",
    icon: "financial",
    order: 6,
  },
  {
    slug: "wellness-med-spas",
    title: "Wellness & Med Spas",
    heroHeadline: "Stop filling your calendar manually. Build a system that does it.",
    heroStat:
      "When 80% of business comes from one social platform, one algorithm change can erase it.",
    hook: "Med spas and studios over-reliant on a single social channel.",
    shortDescription:
      "Med spas and wellness studios. We turn one-time visits into rebookings and build an owned audience you control.",
    painPoints: [
      { title: "Rebooking is manual", description: "Clients ghost after the first visit because nothing brings them back automatically." },
      { title: "One platform owns your revenue", description: "Most business comes from Instagram. One algorithm change can wipe out a month." },
      { title: "No email list", description: "You don't own your audience, so you rent attention instead of keeping it." },
      { title: "Reviews aren't systematic", description: "Five-star clients never get asked, so social proof stays thin." },
    ],
    coreServices: ["crm-pipeline-automation", "review-reputation", "ai-receptionist", "ai-lead-site"],
    miniCaseNarrative:
      "A med spa depended on Instagram for nearly all bookings. We built automated rebooking, an email capture system, and review automation. They turned first visits into repeat revenue they actually control.",
    socialProof:
      "First-visit clients turned into repeat revenue with automated rebooking and an owned email list.",
    icon: "wellness",
    order: 7,
  },
  {
    slug: "ecommerce-dtc",
    title: "E-Commerce & DTC Brands",
    heroHeadline: "First purchase is just the beginning.",
    heroStat:
      "Acquisition gets more expensive every year. Repeat revenue is where the margin lives.",
    hook: "DTC brands with high acquisition cost and low repeat rate.",
    shortDescription:
      "E-commerce and DTC. We build the post-purchase and segmentation systems that turn one order into a customer for life.",
    painPoints: [
      { title: "High CAC, low repeat rate", description: "You pay more to acquire each year while repeat purchases stay flat." },
      { title: "Cart recovery is basic or off", description: "Abandoned carts are left on the table instead of recovered automatically." },
      { title: "No post-purchase sequence", description: "Nothing drives the critical second order, so customers buy once and vanish." },
      { title: "No segmentation", description: "Everyone gets the same email, so nothing feels relevant and engagement drops." },
    ],
    coreServices: ["crm-pipeline-automation", "ops-automation", "reporting-dashboards", "custom-ai-agents"],
    miniCaseNarrative:
      "A DTC brand was spending hard on acquisition with little repeat revenue. We built abandoned-cart recovery, a post-purchase sequence, and customer segmentation. Second-order rate climbed without a dollar more in ad spend.",
    socialProof:
      "Higher repeat-purchase rate from automated post-purchase flows, no extra ad spend.",
    icon: "ecommerce",
    order: 8,
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    heroHeadline: "You're great at the work. Build the system that brings it to you.",
    heroStat:
      "Referral-only firms ride feast-or-famine cycles. A pipeline smooths the revenue.",
    hook: "Accounting, consulting, and coaching firms on referral-only growth.",
    shortDescription:
      "Accounting, consulting, and coaching. We build the pipeline and presence that end the feast-or-famine cycle.",
    painPoints: [
      { title: "Feast or famine", description: "Revenue swings hard because there's no pipeline between engagements." },
      { title: "Referral-only growth", description: "No content or SEO presence means new business depends entirely on who you know." },
      { title: "Onboarding is manual", description: "Client onboarding is still emails and PDFs, which eats billable hours." },
      { title: "No differentiation", description: "You look like a thousand other consultants online, so price becomes the only lever." },
    ],
    coreServices: ["ai-lead-site", "seo-aeo-content", "crm-pipeline-automation", "outbound-lead-gen"],
    miniCaseNarrative:
      "A boutique consulting firm grew entirely on referrals and felt every dry spell. We built a positioning-led site, a content engine, and a simple outbound system. They opened a steady second channel of qualified inbound.",
    socialProof:
      "A referral-only consultancy built a steady second channel of qualified inbound leads.",
    icon: "professional",
    order: 9,
  },
  {
    slug: "construction",
    title: "Construction & General Contractors",
    heroHeadline: "Stop chasing unqualified leads. Let the system qualify them first.",
    heroStat:
      "Estimating time spent on tire-kickers is time stolen from jobs you'd actually win.",
    hook: "Contractors burning estimating hours on leads that never sign.",
    shortDescription:
      "Construction and general contractors. We qualify leads before they reach you and follow up on the estimates that go quiet.",
    painPoints: [
      { title: "Estimating time is wasted", description: "Hours go to tire-kickers who were never going to sign in the first place." },
      { title: "No follow-up on estimates", description: "Quotes go out and jobs go cold because nothing chases the decision." },
      { title: "Reviews aren't collected", description: "Your Google ranking is low because nobody asks satisfied clients to post." },
      { title: "Thin digital presence", description: "Often there's a basic website, sometimes not even that, and no system behind it." },
    ],
    coreServices: ["ai-receptionist", "crm-pipeline-automation", "review-reputation", "ai-lead-site"],
    miniCaseNarrative:
      "A general contractor was spending evenings estimating jobs that never closed. We added a qualification step before intake and automated estimate follow-up. Estimating hours went to leads that were actually ready to buy.",
    socialProof:
      "Estimating hours redirected to qualified, ready-to-buy leads with an automated front end.",
    icon: "construction",
    order: 10,
  },
];
