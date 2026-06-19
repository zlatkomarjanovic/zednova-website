export type TechStackGroup = {
  category: string;
  tools: string[];
};

export const techStackGroups: TechStackGroup[] = [
  {
    category: "Build",
    tools: [
      "Next.js",
      "Astro",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "Sanity",
      "Hygraph",
      "PostgreSQL",
      "Prisma",
      "React Native",
      "Expo",
      "Electron",
      "Marketing sites",
      "Web apps",
      "Mobile apps",
      "Desktop apps",
    ],
  },
  {
    category: "CRM",
    tools: [
      "HubSpot",
      "GoHighLevel",
      "Salesforce",
      "Follow Up Boss",
      "Pipedrive",
      "AgencyZoom",
      "Custom CRMs",
    ],
  },
  {
    category: "Automation",
    tools: [
      "n8n",
      "Make",
      "Python",
      "Custom dashboards",
      "Custom automations",
      "Cal.com",
      "Webhooks",
      "Zapier",
    ],
  },
  {
    category: "AI",
    tools: [
      "Claude",
      "GPT-4o",
      "Gemini",
      "ElevenLabs",
      "Whisper",
      "Voice agents",
      "RAG",
      "Embeddings",
      "llms.txt",
    ],
  },
  {
    category: "Comms",
    tools: ["Twilio", "SMS", "Email", "Slack", "WhatsApp", "Messenger"],
  },
  {
    category: "Data",
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
