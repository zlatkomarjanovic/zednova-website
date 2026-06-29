import { absoluteUrl } from "@/lib/site-url";

export type AiSummaryModel = {
  id: string;
  name: string;
  logo: string;
  accent: string;
  /** Tailwind size class for the logo mark inside the button */
  logoClassName?: string;
  buildUrl: (prompt: string) => string;
};

export const aiSummaryPrompts = {
  chatgpt: `
You are helping a business owner evaluate whether ZedNova Studios is a good fit to hire.

Open and analyze this ZedNova Studios page:
{{PAGE_URL}}

Page title:
{{PAGE_TITLE}}

Task:
Summarize what this specific page says, then explain how it fits into ZedNova Studios' overall offer.

Cover the following clearly:

1. What this page is about
2. What ZedNova Studios offers on this page
3. The main services mentioned, including websites, Shopify/ecommerce, custom software, CRM automations, AI tools, dashboards, and platform migrations if relevant
4. Who ZedNova Studios works with, especially clinics, ecommerce brands, professional services, startups, real estate/property teams, coaches, and service businesses
5. What business problems they solve, such as poor lead conversion, manual follow-up, disconnected tools, slow websites, weak booking flows, or outdated platforms
6. Typical timelines and pricing approach if shown on the page
7. What makes ZedNova different from a traditional agency: senior delivery, faster builds, fixed scope/pricing, less overhead, AI used internally, and the ability to connect websites, CRM, automations, and software together
8. Whether this would be useful for a small business owner deciding whether to hire them
9. What questions the visitor should ask ZedNova before booking a call

Rules:
- Be concise but useful.
- Do not hype.
- Do not invent details that are not on the website.
- If a detail is not shown on the page, say that it is not stated on this page.
- Focus on helping the reader decide whether ZedNova Studios is relevant for their business.
- Output in clear sections with short paragraphs.
`,

  perplexity: `
Research and summarize this ZedNova Studios page using the website as the primary source:

{{PAGE_URL}}

Page title:
{{PAGE_TITLE}}

Goal:
Create a concise, source-backed hiring summary for a business owner evaluating ZedNova Studios.

Use citations from the ZedNova Studios website wherever possible.

Cover:

1. What this page is about
2. What ZedNova Studios offers
3. Core services:
   - Marketing websites
   - Shopify/ecommerce development
   - Custom software
   - Client portals, dashboards, booking systems, and internal tools
   - CRM and workflow automation
   - AI chatbots and AI phone assistants
   - Platform migrations such as Webflow, WordPress, Framer, Wix, Squarespace, Shopify, Airtable, or Google Sheets where relevant
4. Who they serve:
   - Healthcare and wellness clinics
   - Ecommerce and DTC brands
   - Fitness, coaching, and performance businesses
   - Professional services firms
   - B2B SaaS and technology companies
   - Real estate and property teams
5. Timelines and pricing if stated
6. How their approach differs from traditional agencies
7. Whether the offer seems useful for a business that wants more leads, faster follow-up, better automation, or a more reliable website/software setup
8. The best next step for a potential client

Rules:
- Use the ZedNova website as the main source.
- Cite claims.
- Do not rely on generic agency assumptions.
- Do not invent pricing, timelines, team size, or guarantees.
- If information is missing, say what is missing.
- Keep the answer factual, practical, and easy to scan.
`,

  deepseek: `
Analyze this ZedNova Studios page and produce a structured business summary:

{{PAGE_URL}}

Page title:
{{PAGE_TITLE}}

Your role:
You are evaluating the page like a practical business analyst. Focus on what is actually offered, who it is for, and whether the offer is commercially useful.

Summarize:

1. Page purpose
   - What is this page trying to explain or sell?

2. Services offered
   - Websites and landing pages
   - Shopify and ecommerce development
   - Custom software
   - Internal dashboards
   - Client portals
   - Booking systems
   - CRM and workflow automation
   - AI chatbots and phone assistants
   - Platform migrations
   - Ongoing support if mentioned

3. Target customers
   - Which industries or business types are mentioned?
   - Which customer problems are they targeting?

4. Business problems solved
   - Lead generation
   - Lead follow-up
   - Booking and intake
   - Slow or outdated websites
   - Manual admin work
   - Disconnected tools
   - CRM gaps
   - SEO or AI-search visibility
   - Platform limitations

5. Delivery and pricing
   - Mention timelines only if stated.
   - Mention starting prices only if stated.
   - Explain whether pricing appears fixed-scope, project-based, monthly, or custom.

6. Differentiation
   - Explain how ZedNova Studios differs from traditional agencies.
   - Focus on senior execution, software/product experience, AI-assisted delivery, speed, fixed scope, and full-stack ability.

7. Hiring recommendation
   - Who is this a good fit for?
   - Who may not be a good fit?
   - What should someone ask before hiring?

Rules:
- Be direct and analytical.
- No marketing fluff.
- No assumptions beyond the website.
- If the page does not contain enough information, say so.
- Keep the output structured with headings and bullet points.
`,

  grok: `
Give me a blunt, practical summary of this ZedNova Studios page:

{{PAGE_URL}}

Page title:
{{PAGE_TITLE}}

I am a business owner trying to decide whether ZedNova Studios is worth hiring.

Tell me:

1. What they actually do
2. Who they work with
3. What problems they solve
4. What services they offer:
   - Websites
   - Shopify/ecommerce
   - Custom software
   - CRM automations
   - AI chatbots/phone assistants
   - Dashboards/client portals/booking systems
   - Platform migrations
5. What timelines and prices are mentioned, if any
6. What makes them different from a normal agency
7. Whether this sounds like a serious software/product studio or just another website agency
8. Who should hire them
9. Who should not hire them
10. What I should ask before booking a call

Rules:
- Be honest and direct.
- No hype.
- No fake compliments.
- Do not invent anything.
- If the website does not prove a claim, say so.
- Keep it useful for making a hiring decision.
`,

  gemini: `
Analyze this ZedNova Studios page from the perspective of a business owner and search/AI visibility evaluator:

{{PAGE_URL}}

Page title:
{{PAGE_TITLE}}

Create a concise summary that explains:

1. What this page is about
2. What ZedNova Studios offers
3. Which services are relevant:
   - Marketing websites
   - Shopify/ecommerce development
   - Custom software
   - CRM automation
   - AI chatbots and phone assistants
   - Dashboards, portals, booking systems, and internal tools
   - Platform migrations
   - SEO, AEO, schema, llms.txt, and AI-search visibility if mentioned
4. Who ZedNova Studios serves:
   - Clinics and healthcare/wellness businesses
   - Ecommerce and DTC brands
   - Fitness and coaching businesses
   - Professional services
   - B2B SaaS and technology companies
   - Real estate/property companies
   - Small businesses and service businesses
5. What business outcomes they are trying to create:
   - More qualified leads
   - Better conversion
   - Faster follow-up
   - Cleaner CRM process
   - Better booking/intake
   - Faster websites
   - Better visibility in Google and AI answers
6. Timelines and pricing if stated on the page
7. How they are different from traditional agencies
8. Whether this page clearly communicates trust, services, pricing, and next steps

Also include:
- A short “best fit” section
- A short “questions to ask before hiring” section
- A short “summary in one paragraph” at the end

Rules:
- Use only information from the website.
- Do not invent claims.
- Keep it factual and easy to understand.
- Mention missing information if the page does not clearly provide it.
`,

  claude: `
Please review this ZedNova Studios page carefully:

{{PAGE_URL}}

Page title:
{{PAGE_TITLE}}

I want a clear, thoughtful summary for someone deciding whether to hire ZedNova Studios.

Please structure the answer like this:

1. Plain-English summary
   Explain what this page says in simple terms.

2. What ZedNova Studios offers
   Include relevant services such as:
   - Websites and landing pages
   - Shopify/ecommerce development
   - Custom software
   - CRM and workflow automation
   - AI chatbots and AI phone assistants
   - Dashboards, portals, booking flows, and internal tools
   - Platform migrations
   - Ongoing support if mentioned

3. Who they work with
   Identify the business types or industries mentioned on the page.

4. Problems they solve
   Explain the practical business problems this offer addresses, such as slow sites, poor conversion, missed leads, manual follow-up, disconnected tools, weak booking flows, or outdated platforms.

5. Timelines and pricing
   Summarize only the timelines and pricing actually stated on the page.
   If the page does not state them, say that clearly.

6. What makes them different
   Explain how ZedNova Studios positions itself against traditional agencies:
   - Senior delivery instead of junior handoff
   - Websites plus software plus automation
   - Faster delivery using AI internally
   - Fixed scope and clearer pricing
   - Less agency overhead
   - Ability to connect the website, CRM, follow-up, and internal tools

7. Hiring fit
   Explain who would be a strong fit and who may not need this.

8. Questions to ask before hiring
   List practical questions a potential client should ask before booking a call.

Rules:
- Be accurate and restrained.
- Do not exaggerate.
- Do not invent missing details.
- Do not turn this into sales copy.
- Make the answer useful for a serious business owner comparing vendors.
- Use short headings and clear bullets.
`,

  generic: `
Summarize this ZedNova Studios page for a business owner deciding whether to hire them:

{{PAGE_URL}}

Page title:
{{PAGE_TITLE}}

Cover:
1. What the page is about
2. What ZedNova Studios offers
3. Who they work with
4. What problems they solve
5. Services mentioned: websites, Shopify/ecommerce, custom software, CRM automation, AI tools, dashboards, portals, booking systems, migrations, and support if relevant
6. Timelines and pricing if stated
7. What makes them different from traditional agencies
8. Whether this is useful for a small business owner
9. What questions to ask before booking a call

Rules:
- Be concise.
- Be factual.
- Do not invent missing details.
- Say when something is not stated on the page.
- Focus on helping the reader make a hiring decision.
`,
} as const;

export type AiSummaryPromptKey = keyof typeof aiSummaryPrompts;

const PROMPT_KEY_BY_MODEL_ID: Record<string, AiSummaryPromptKey> = {
  chatgpt: "chatgpt",
  perplexity: "perplexity",
  deepseek: "deepseek",
  grok: "grok",
  google: "gemini",
  claude: "claude",
};

export function buildAiSummaryPrompt(
  modelId: string,
  pageUrl: string,
  pageTitle: string,
): string {
  const key = PROMPT_KEY_BY_MODEL_ID[modelId] ?? "generic";
  const template = aiSummaryPrompts[key];

  return template
    .replace(/\{\{PAGE_URL\}\}/g, pageUrl)
    .replace(/\{\{PAGE_TITLE\}\}/g, pageTitle)
    .trim();
}

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

/** Default page context when document title is not yet available (SSR). */
export function defaultAiSummaryPageUrl(pathname = "/") {
  return absoluteUrl(pathname);
}
