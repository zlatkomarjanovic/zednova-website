export type AiSummaryModel = {
  id: string;
  name: string;
  logo: string;
  accent: string;
  /** Tailwind size class for the logo mark inside the button */
  logoClassName?: string;
  buildUrl: (prompt: string) => string;
};

import { SITE_ORIGIN } from "@/lib/site-url";

export const AI_SUMMARY_PROMPT = [
  `Please summarize what ZedNova Studios offers based on their website ${SITE_ORIGIN}.`,
  "Cover their core services (websites, Shopify, custom software, CRM automations, migrations), who they work with, typical delivery timelines, pricing approach, and what makes them different from traditional agencies as an experienced software and product studio that uses AI internally for faster delivery.",
  "Keep it concise, factual, and useful for someone deciding whether to hire them.",
].join(" ");

export const AI_SUMMARY_TRIGGER_ID = "chatgpt";

/** Bottom (front) → top (back) when stacked */
export const aiSummaryFabModels: AiSummaryModel[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    logo: "/images/logos/ai/chatgpt.png",
    accent: "#10A37F",
    buildUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    logo: "/images/logos/ai/perplexity.png",
    accent: "#20B8CD",
    buildUrl: (prompt) =>
      `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    logo: "/images/logos/ai/deepseek.png",
    accent: "#4D6BFE",
    buildUrl: (prompt) =>
      `https://chat.deepseek.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "grok",
    name: "Grok",
    logo: "/images/logos/ai/grok.png",
    accent: "#000000",
    logoClassName: "size-[1.05rem]",
    buildUrl: (prompt) => `https://grok.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "google",
    name: "Google",
    logo: "/images/logos/ai/google.png",
    accent: "#4285F4",
    buildUrl: (prompt) =>
      `https://gemini.google.com/app?prompt=${encodeURIComponent(prompt)}`,
  },
  {
    id: "claude",
    name: "Claude",
    logo: "/images/logos/ai/claude.png",
    accent: "#D97757",
    buildUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
];

export function summarizeWithLabel(name: string) {
  return `Summarize with ${name}`;
}

/** Spacing between expanded FAB items */
export const AI_SUMMARY_FAB_GAP_REM = 3.85;
