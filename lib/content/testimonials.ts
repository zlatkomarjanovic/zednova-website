import type { Testimonial } from "@/lib/types";

export const testimonials: Testimonial[] = [
  {
    id: "t-hvac",
    quote:
      "We stopped losing jobs to voicemail in the first week. The system books appointments while my guys are on the roof. It paid for itself almost immediately.",
    authorName: "Operations Manager",
    authorTitle: "Operations Manager",
    company: "Multi-location HVAC Company",
    industry: "Home Services",
    featured: true,
  },
  {
    id: "t-dental",
    quote:
      "Our front desk finally has room to breathe, and the reviews keep coming in on their own. New patients tell us they found us on Google now.",
    authorName: "Practice Owner",
    authorTitle: "Practice Owner",
    company: "Dental Group, Southeast US",
    industry: "Dental & Healthcare",
    featured: true,
  },
  {
    id: "t-legal",
    quote:
      "We answer leads in seconds now instead of hours. That single change is the difference between signing a case and reading about it on a competitor's site.",
    authorName: "Managing Partner",
    authorTitle: "Managing Partner",
    company: "Personal Injury Firm, Texas",
    industry: "Legal",
    featured: true,
  },
  {
    id: "t-saas",
    quote:
      "ZedNova built us an outbound engine that books demos without us hiring a single SDR. It runs whether we're paying attention or not.",
    authorName: "Founder",
    authorTitle: "Founder",
    company: "Seed-stage SaaS",
    industry: "B2B SaaS",
    featured: false,
  },
];
