export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  order: number;
};

export const faqs: FaqItem[] = [
  {
    id: "faq-timeline",
    order: 1,
    question: "How fast can you get a system live?",
    answer:
      "Most builds ship in two to six weeks depending on scope. We start with an audit, lock the architecture, then execute in focused sprints — no committees, no months of discovery decks.",
  },
  {
    id: "faq-stack",
    order: 2,
    question: "Do we need to replace our existing tools?",
    answer:
      "Rarely. We integrate with what you already use — CRM, phone system, website, ad platforms — and only replace pieces that are actively leaking revenue.",
  },
  {
    id: "faq-ownership",
    order: 3,
    question: "Do we own everything you build?",
    answer:
      "Yes. You get full documentation, admin access, and training. We build systems you can run without us, though most clients keep us on for iteration and optimization.",
  },
  {
    id: "faq-pricing",
    order: 4,
    question: "How does pricing work?",
    answer:
      "Project-based for builds, with optional retainers for ongoing optimization. Every engagement starts with a scoped proposal after the audit — no surprise invoices or open-ended hourly billing.",
  },
  {
    id: "faq-industries",
    order: 5,
    question: "Which industries do you work with?",
    answer:
      "Home services, dental, legal, real estate, insurance, and other US service businesses where speed-to-lead and follow-up directly affect revenue. If you take inbound calls or form fills, we can help.",
  },
  {
    id: "faq-ai",
    order: 6,
    question: "Is this just ChatGPT bolted onto our site?",
    answer:
      "No. We build end-to-end revenue infrastructure — lead capture, routing, CRM automation, and AI agents wired to your actual business logic, not a generic chat widget.",
  },
];
