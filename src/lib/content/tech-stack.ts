export type TechStackGroup = {
  category: string;
  tools: string[];
};

export const techStackGroups: TechStackGroup[] = [
  {
    category: "Build",
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Vercel",
      "Supabase",
      "Sanity",
      "Payload CMS",
      "PostgreSQL",
      "Drizzle",
      "React Native",
      "Expo",
      "Tauri",
      "Turborepo",
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
      "Attio",
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
      "Zapier",
      "Python",
      "AI agents",
      "Custom dashboards",
      "Custom automations",
      "Cal.com",
      "Webhooks",
    ],
  },
  {
    category: "AI",
    tools: [
      "Claude",
      "GPT-5",
      "Gemini",
      "ElevenLabs",
      "Vapi",
      "Whisper",
      "Voice agents",
      "RAG",
      "MCP",
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
