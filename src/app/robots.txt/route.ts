import { SITE_ORIGIN } from "@/lib/site-url";

/** Plain-text robots.txt with guaranteed line breaks. */
export function GET(): Response {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/contact",
    "",
    "User-agent: GPTBot",
    "Allow: /",
    "",
    "User-agent: ChatGPT-User",
    "Allow: /",
    "",
    "User-agent: PerplexityBot",
    "Allow: /",
    "",
    "User-agent: Google-Extended",
    "Allow: /",
    "",
    "User-agent: ClaudeBot",
    "Allow: /",
    "",
    `Host: ${SITE_ORIGIN}`,
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
