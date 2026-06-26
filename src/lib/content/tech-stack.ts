export type TechStackGroup = {
  category: string;
  description: string;
  tools: string[];
};

export const techStackGroups: TechStackGroup[] = [
  {
    category: "Frontend",
    description:
      "We build marketing sites, web apps, mobile apps, and desktop apps on a modern React foundation.",
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Turborepo",
      "React Native",
      "Expo",
      "Tauri",
    ],
  },
  {
    category: "Backend & data",
    description:
      "APIs, databases, auth, and storage for web apps, portals, and internal tools.",
    tools: [
      "Vercel",
      "Supabase",
      "PostgreSQL",
      "Drizzle",
      "Webhooks",
      "Custom APIs",
    ],
  },
  {
    category: "CMS",
    description:
      "Content systems your team can edit without a developer — structured content for websites and apps.",
    tools: ["Sanity", "Payload CMS", "Webflow", "Framer"],
  },
  {
    category: "Automation",
    description:
      "Workflows that run without you watching — CRM, booking, email, SMS, and custom integrations.",
    tools: ["n8n", "Make", "Zapier", "Python", "Cal.com", "Custom automations"],
  },
  {
    category: "AI",
    description:
      "Voice agents, chatbots, RAG, embeddings, and AI-cited content systems for lead generation and ops.",
    tools: [
      "Claude",
      "GPT-5",
      "Gemini",
      "ElevenLabs",
      "Vapi",
      "Whisper",
      "RAG",
      "MCP",
      "Embeddings",
      "llms.txt",
    ],
  },
  {
    category: "CRM & sales",
    description:
      "CRMs we connect, automate, and build on for clinics, ecommerce, agencies, and service businesses.",
    tools: [
      "HubSpot",
      "GoHighLevel",
      "Salesforce",
      "Attio",
      "Pipedrive",
      "Follow Up Boss",
      "AgencyZoom",
      "Custom CRMs",
    ],
  },
  {
    category: "Communication",
    description:
      "Phone, SMS, email, and messaging platforms we wire into booking and follow-up flows.",
    tools: ["Twilio", "SMS", "Email", "Slack", "WhatsApp", "Messenger"],
  },
  {
    category: "Analytics & payments",
    description:
      "Dashboards, analytics, and payments we integrate for reporting and conversion tracking.",
    tools: [
      "Google Analytics",
      "Looker Studio",
      "Metabase",
      "Mixpanel",
      "PostHog",
      "Stripe",
      "Airtable",
      "Typeform",
    ],
  },
  {
    category: "Healthcare & wellness",
    description:
      "Booking, PMS, and patient communication platforms for dental, medical, medspa, and wellness practices.",
    tools: [
      "Jane App",
      "NexHealth",
      "Weave",
      "SimplePractice",
      "Practice Better",
      "Dentrix",
      "Open Dental",
      "Lighthouse 360",
      "Athenahealth",
    ],
  },
  {
    category: "Ecommerce & DTC",
    description:
      "Shopify, retention, support, and analytics for skincare, supplement, beauty, and DTC brands.",
    tools: [
      "Shopify",
      "Shopify Plus",
      "Klaviyo",
      "Recharge",
      "Gorgias",
      "Yotpo",
      "Judge.me",
      "Triple Whale",
      "Meta Ads",
    ],
  },
  {
    category: "Fitness & coaching",
    description:
      "Scheduling, coaching, and membership tools for gyms, trainers, and online coaching programs.",
    tools: [
      "Mindbody",
      "Trainerize",
      "TrueCoach",
      "Acuity Scheduling",
      "Stripe Billing",
      "Practice Better",
    ],
  },
  {
    category: "Real estate & property",
    description:
      "CRM, IDX, and transaction tools for agencies, broker teams, property managers, and STR operators.",
    tools: [
      "KVCore",
      "Sierra Interactive",
      "Dotloop",
      "BoomTown",
      "IDX Broker",
      "Follow Up Boss",
    ],
  },
  {
    category: "B2B SaaS & professional services",
    description:
      "Product analytics, contracts, and sales tools for SaaS startups, consultancies, and agencies.",
    tools: [
      "Supabase",
      "Intercom",
      "Segment",
      "Amplitude",
      "DocuSign",
      "PandaDoc",
      "QuickBooks",
      "Notion",
    ],
  },
];
