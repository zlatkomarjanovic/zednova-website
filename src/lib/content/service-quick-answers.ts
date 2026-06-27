/** 40–70 word direct-answer blocks for service pages (AEO / AI Overview lift). */
export type ServiceQuickAnswer = {
  question: string;
  shortAnswer: string;
};

export const SERVICE_QUICK_ANSWERS: Record<string, ServiceQuickAnswer> = {
  "ai-lead-site": {
    question: "What is an AI-cited lead gen site and why does a service business need one?",
    shortAnswer:
      "An AI-cited lead gen site is a Next.js or Webflow marketing site built so Google, ChatGPT, and Perplexity can find and cite your business—not just rank it. Service businesses need one when traffic lands but does not book, or when AI search never mentions you. Schema markup, answer-first copy, and CRM-connected forms turn visits into qualified leads.",
  },
  "ai-receptionist": {
    question: "What is an AI receptionist and why does a service business need one?",
    shortAnswer:
      "An AI receptionist is a voice or chat system that answers inbound calls and texts 24/7, qualifies leads, books appointments, and sends missed-call text-back before prospects call a competitor. Service businesses with high call volume—HVAC, dental, legal, home services—need it because every voicemail during a job is revenue walking to the next company on Google.",
  },
  "crm-pipeline-automation": {
    question: "What is CRM pipeline automation and why does a service business need it?",
    shortAnswer:
      "CRM pipeline automation connects your website forms, calls, and chat to a CRM that assigns owners, sends instant replies, and runs follow-up sequences automatically. Service businesses need it when leads sit in an inbox, estimates go cold, or response time exceeds five minutes. ZedNova clients average 40% faster first response after wiring intake to HubSpot or GoHighLevel.",
  },
  "outbound-lead-gen": {
    question: "What is outbound lead gen and why does a service business need it?",
    shortAnswer:
      "Outbound lead gen is a system that identifies ideal prospects, sends personalized outreach, and books qualified conversations into your calendar—without relying on ads alone. Service businesses with long sales cycles or narrow ICPs need it when inbound is inconsistent or too expensive. It pairs with a conversion-ready site so booked calls actually close.",
  },
  "seo-aeo-content": {
    question: "What is SEO and AEO content and why does a service business need it?",
    shortAnswer:
      "SEO and AEO content is structured copy, schema markup, and insight articles built so traditional search and AI answer engines cite your business as a source. Service businesses need it when competitors show up in AI Overviews and you do not. Answer-first articles, FAQ schema, and llms.txt turn expertise into discoverable, quotable pages.",
  },
  "ops-automation": {
    question: "What is internal ops automation and why does a service business need it?",
    shortAnswer:
      "Internal ops automation connects the tools your team already uses—CRM, scheduling, invoicing, Slack—with workflows that move data and trigger actions without manual copy-paste. Service businesses need it when staff spend hours on handoffs, reporting, or duplicate entry. n8n and Make workflows typically save 5–15 hours per week on recurring admin.",
  },
  "custom-ai-agents": {
    question: "What are custom AI agents and why does a service business need them?",
    shortAnswer:
      "Custom AI agents are purpose-built assistants trained on your SOPs, product catalog, or knowledge base to handle intake, support, or internal tasks—not generic chatbots. Service businesses need them when off-the-shelf tools cannot access your CRM, pricing rules, or compliance constraints. They extend receptionist and ops automation with domain-specific logic.",
  },
  "reporting-dashboards": {
    question: "What are reporting dashboards and why does a service business need them?",
    shortAnswer:
      "Reporting dashboards pull live metrics from ads, CRM, Shopify, and ops tools into one view your team checks daily. Service businesses need them when revenue data lives in five tabs and nobody agrees on the number. Custom dashboards replace spreadsheet exports with automated KPIs for lead response, pipeline, and campaign ROI.",
  },
  "review-reputation": {
    question: "What is review and reputation automation and why does a service business need it?",
    shortAnswer:
      "Review and reputation automation sends timed review requests after completed jobs, routes unhappy feedback privately, and surfaces ratings on your site and Google profile. Service businesses need it because social proof beside the booking button converts cold traffic—and manual review asks get forgotten. Clinics using automated recall plus review flows typically see 2× review volume in 90 days.",
  },
  "ai-systems-retainer": {
    question: "What is an AI systems retainer and why does a service business need one?",
    shortAnswer:
      "An AI systems retainer is ongoing iteration on your website, automations, and AI tools—new flows, content updates, and performance fixes without scoping every change as a project. Service businesses need it when the initial build is live but the market, offers, and ad channels keep shifting. It keeps speed-to-lead, SEO, and conversion systems current.",
  },
};

export function getServiceQuickAnswer(slug: string): ServiceQuickAnswer | null {
  return SERVICE_QUICK_ANSWERS[slug] ?? null;
}
