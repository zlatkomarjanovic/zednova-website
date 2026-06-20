import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "hvac-ai-receptionist",
    title: "From 20 missed calls a week to zero",
    client: "Multi-location HVAC Company",
    industry: "appointment-based-businesses",
    servicesUsed: ["ai-receptionist", "crm-pipeline-automation", "review-reputation"],
    timeline: "6 days to live",
    resultHeadline: "14 calls recovered in week one",
    challenge:
      "A multi-location HVAC company was losing more than 20 calls a week to voicemail. Technicians couldn't answer while on a job, and the office couldn't keep up during seasonal spikes. Every missed call was a customer dialing the next contractor.",
    solution: [
      "We deployed an AI receptionist to answer overflow and after-hours calls, qualify the caller, and book the appointment directly into the calendar.",
      "Missed-call text-back fired an SMS within seconds of any unanswered call, so a customer who reached voicemail got a reply before they finished dialing a competitor.",
      "Every booked job flowed into the CRM with the source attached, and a review request triggered automatically after the work was complete.",
    ],
    results: [
      { value: "0", label: "Missed calls after week two" },
      { value: "14", label: "Calls recovered in week one" },
      { value: "3", label: "Booked jobs from recovered calls" },
    ],
    techStack: ["GoHighLevel", "Twilio", "AI Voice Agent", "Make"],
    testimonialId: "t-hvac",
    featured: true,
    accent: "#161614",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "dental-recall-reputation",
    title: "47 new Google reviews in 60 days",
    client: "Dental Group, Southeast US",
    industry: "dental-clinics",
    servicesUsed: ["crm-pipeline-automation", "review-reputation", "ai-receptionist"],
    timeline: "2 weeks to live",
    resultHeadline: "47 new reviews, more filled chairs",
    challenge:
      "A multi-location dental group was missing roughly a quarter of new-patient calls during peak hours, and recalls for cleanings and hygiene were falling through the cracks. Their Google presence was thin compared to nearby practices.",
    solution: [
      "We built an automated recall sequence that reaches patients due for cleanings and hygiene, with reminders that cut no-shows.",
      "A reputation system requests Google reviews at the moment satisfaction peaks, drafts on-brand replies, and flags any negative feedback privately before it goes public.",
      "An AI receptionist now catches overflow calls so the front desk stops dropping new-patient inquiries.",
    ],
    results: [
      { value: "47", label: "New Google reviews in 60 days" },
      { value: "25%", label: "Fewer no-shows" },
      { value: "0", label: "New front-desk hires needed" },
    ],
    techStack: ["HubSpot", "Google Business Profile", "AI Reply Drafting", "n8n"],
    testimonialId: "t-dental",
    featured: true,
    accent: "#1c1917",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "legal-ai-intake",
    title: "Lead response cut from 2 hours to 38 seconds",
    client: "Personal Injury Law Firm, Texas",
    industry: "portal-dashboard-booking-needs",
    servicesUsed: ["ai-receptionist", "crm-pipeline-automation", "ai-lead-site"],
    timeline: "8 days to live",
    resultHeadline: "38-second average lead response",
    challenge:
      "A Texas personal injury firm was taking up to two hours to respond to new leads. In a market where the first firm to call back usually signs the client, that delay was handing cases to competitors.",
    solution: [
      "We built an AI intake system that answers every inquiry instantly, asks the qualifying questions, and routes high-value cases to an attorney in seconds.",
      "Qualified leads flow into the CRM with an automated follow-up sequence so no potential case goes cold.",
      "A rebuilt site ranks for local injury terms and feeds the same intake system from organic search.",
    ],
    results: [
      { value: "38s", label: "Average lead response time" },
      { value: "2 hrs", label: "Down from this" },
      { value: "9x", label: "More likely to sign at 5-minute response" },
    ],
    techStack: ["Next.js", "Salesforce", "AI Intake Agent", "Twilio"],
    testimonialId: "t-legal",
    featured: true,
    accent: "#0c0c0b",
    image:
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "realty-portal-lead-response",
    title: "Portal leads answered in under 90 seconds",
    client: "Growing Real Estate Team, Florida",
    industry: "dtc-brands",
    servicesUsed: ["crm-pipeline-automation", "ai-receptionist", "ai-lead-site"],
    timeline: "10 days to live",
    resultHeadline: "First conversations before faster agents",
    challenge:
      "A growing real estate team was responding to Zillow and Realtor.com leads hours late. By the time an agent called back, prospects had already toured with a competitor or stopped answering.",
    solution: [
      "We wired instant text-back and a structured nurture sequence into their CRM so every portal lead got a reply within seconds.",
      "An AI assistant qualified budget, timeline, and location before routing hot buyers to the right agent.",
      "A rebuilt listing site captured organic traffic and fed the same follow-up engine as paid portal leads.",
    ],
    results: [
      { value: "90s", label: "Average first response time" },
      { value: "3.2x", label: "More first conversations" },
      { value: "41%", label: "Fewer leads lost to speed" },
    ],
    techStack: ["Follow Up Boss", "Twilio", "AI SMS Agent", "Webflow"],
    featured: false,
    accent: "#1a1816",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "saas-outbound-demo-engine",
    title: "Demo bookings without hiring SDRs",
    client: "Seed-stage B2B SaaS",
    industry: "small-teams-manual-processes",
    servicesUsed: ["outbound-lead-gen", "crm-pipeline-automation", "ai-lead-site"],
    timeline: "3 weeks to live",
    resultHeadline: "Outbound that runs while founders sleep",
    challenge:
      "A seed-stage SaaS team needed pipeline but could not justify a full SDR hire. Manual outreach was inconsistent, and inbound demos were slipping through because nobody owned follow-up.",
    solution: [
      "We built an outbound engine that enriches leads, personalizes sequences, and books demos directly on the calendar.",
      "Inbound form fills trigger instant qualification and routing so hot accounts get a call the same day.",
      "CRM dashboards show source, stage, and reply rate so the team knows what is working without digging through inboxes.",
    ],
    results: [
      { value: "12", label: "Demos booked in month one" },
      { value: "0", label: "SDR hires needed" },
      { value: "28%", label: "Positive reply rate" },
    ],
    techStack: ["Apollo", "n8n", "HubSpot", "Cal.com"],
    testimonialId: "t-saas",
    featured: false,
    accent: "#12141a",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "insurance-renewal-crm",
    title: "Referrals-only agency opened a new lead channel",
    client: "Independent Insurance Agency, Midwest",
    industry: "small-teams-manual-processes",
    servicesUsed: ["crm-pipeline-automation", "review-reputation", "ai-lead-site"],
    timeline: "2 weeks to live",
    resultHeadline: "Local search leads outside referrals",
    challenge:
      "An independent insurance agency relied entirely on word of mouth. Renewals were tracked in spreadsheets, follow-up was manual, and there was no system to capture demand from local search.",
    solution: [
      "We deployed a compliant CRM with automated renewal reminders and policy review sequences.",
      "A content and local SEO engine started ranking for high-intent insurance terms in their county.",
      "Review requests and reply drafting kept their Google profile active without adding admin hours.",
    ],
    results: [
      { value: "19", label: "New leads in 90 days" },
      { value: "100%", label: "Renewals tracked in CRM" },
      { value: "22", label: "New Google reviews" },
    ],
    techStack: ["AgencyZoom", "WordPress", "n8n", "Google Business Profile"],
    featured: false,
    accent: "#141816",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
  },
];
