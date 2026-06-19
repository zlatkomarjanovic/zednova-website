import type { Post } from "@/lib/types";

export const posts: Post[] = [
  {
    slug: "ai-overviews-are-the-new-seo",
    title: "Why AI Overviews Are the New SEO, and What to Do About It",
    excerpt:
      "Search is moving from ten blue links to one synthesized answer. Here is how to make sure your business is the one being cited.",
    category: "AI & Search",
    author: "zed-marjanovic",
    publishedAt: "2026-05-28",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    readTime: 6,
    featured: true,
    accent: "#1c1917",
    body: [
      { type: "p", text: "For twenty years, SEO meant one thing: rank in the ten blue links. That era is ending. Google AI Overviews, ChatGPT, and Perplexity now answer the question directly, and most users never scroll to a traditional result." },
      { type: "h2", text: "The shift from ranking to being cited" },
      { type: "p", text: "Answer engines do not rank pages. They synthesize an answer and cite a handful of sources. Your goal is no longer to be result number three. It is to be one of the sources the model trusts enough to quote." },
      { type: "p", text: "That changes what you optimize for. Clean structure, clear claims, and machine-readable markup matter more than keyword density ever did." },
      { type: "h2", text: "What to do this quarter" },
      { type: "ul", items: [
        "Add schema markup so engines understand what each page is.",
        "Publish an llms.txt file that tells models what your site covers.",
        "Write answers, not just articles. Lead with the conclusion.",
        "Earn citations with specific, numbered claims models can lift.",
      ] },
      { type: "quote", text: "The businesses that win the next five years of search will be the ones AI engines quote, not the ones that merely rank." },
      { type: "p", text: "None of this replaces good content. It makes good content legible to the systems that now stand between you and your customer." },
    ],
  },
  {
    slug: "five-minute-revenue-leak-audit",
    title: "The 5-Minute Audit That Reveals Where Your Business Is Leaking Revenue",
    excerpt:
      "Most businesses lose more to slow follow-up than to any marketing problem. Here is a five-minute check that shows you where.",
    category: "Systems",
    author: "zed-marjanovic",
    publishedAt: "2026-05-14",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    readTime: 5,
    featured: false,
    accent: "#262624",
    body: [
      { type: "p", text: "Before you spend another dollar on ads, run this. It takes five minutes and it usually finds money you already paid for and never collected." },
      { type: "h2", text: "Step one: call your own business" },
      { type: "p", text: "Call during business hours, then again after hours. Count how many rings before someone answers, or whether you hit voicemail. Every voicemail is a lead deciding whether to wait for you or call the next name on the list." },
      { type: "h2", text: "Step two: submit your own form" },
      { type: "p", text: "Fill out your website contact form and start a timer. How long until someone replies? If the answer is more than five minutes, you are losing leads to faster competitors every single day." },
      { type: "h2", text: "Step three: check your last 20 estimates" },
      { type: "ul", items: [
        "How many got a single follow-up?",
        "How many got a second?",
        "How many simply went quiet with no system chasing them?",
      ] },
      { type: "quote", text: "Most businesses lose 40% of their leads to slow follow-up. The fix is rarely more leads. It is a system that catches the ones you already have." },
      { type: "p", text: "If any of these checks made you wince, the leak is not your marketing. It is the gap between a lead raising their hand and someone responding. That gap is fixable in days." },
    ],
  },
  {
    slug: "why-your-website-is-losing-clients",
    title: "Why Your Website Is Losing You Clients (And It's Not What You Think)",
    excerpt:
      "It is rarely the design. It is the absence of a single clear action and a system to capture the people who take it.",
    category: "Conversion",
    author: "zed-marjanovic",
    publishedAt: "2026-04-30",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
    readTime: 5,
    featured: false,
    accent: "#1c1917",
    body: [
      { type: "p", text: "When a site does not convert, owners usually blame the design. They redesign, the numbers do not move, and they conclude the web does not work for their business. The design was rarely the problem." },
      { type: "h2", text: "One page, one action" },
      { type: "p", text: "Most underperforming sites ask visitors to do five things at once. Call, email, download, follow, and read the blog. Faced with five choices, people make none. Every page should drive one action." },
      { type: "h2", text: "Speed is a conversion feature" },
      { type: "p", text: "If your site takes four seconds to load on a phone, a large share of your paid traffic is gone before they see a word. Speed is not a technical nicety. It is the first conversion step." },
      { type: "h2", text: "Capture beats persuasion" },
      { type: "p", text: "A beautiful site with no connected capture system is a leak. The moment someone submits a form, that lead should be in your CRM and someone should be notified. Seconds matter." },
      { type: "quote", text: "A website is not a brochure. It is the front end of a system. Build the system, and the site finally starts paying for itself." },
    ],
  },
];
