import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "hvac-ai-receptionist",
    title: "From 20 missed calls a week to zero",
    client: "Multi-location HVAC Company",
    industry: "home-services",
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
    industry: "dental-healthcare",
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
    industry: "legal",
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
];
