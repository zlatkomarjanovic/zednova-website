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
    tools: ["Sanity", "Payload CMS", "Webflow"],
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
    category: "CRM",
    description:
      "CRMs we connect, automate, and build on for clinics, ecommerce, and service businesses.",
    tools: [
      "HubSpot",
      "GoHighLevel",
      "Salesforce",
      "Attio",
      "Follow Up Boss",
      "Pipedrive",
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
      "Looker Studio",
      "Metabase",
      "Google Analytics",
      "Apollo",
      "Google Business Profile",
      "Stripe",
      "Airtable",
      "Typeform",
    ],
  },
];
