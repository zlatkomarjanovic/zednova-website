import { SITE_ORIGIN } from "@/lib/site-url";

/** Plain-text robots.txt with proper line breaks (MetadataRoute.Robots can collapse newlines). */
export function GET(): Response {
  const lines = [
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
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
