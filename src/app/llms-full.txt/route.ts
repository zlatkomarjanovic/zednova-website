import { buildLlmsFullTxt } from "@/lib/content/llms";
import {
  getAllCaseStudies,
  getAllCustomSoftwareSlugs,
  getAllIndustrySlugs,
  getAllMigrations,
  getAllPosts,
  getAllServices,
} from "@/lib/queries";

export const dynamic = "force-static";

export async function GET() {
  const [services, industrySlugs, customSoftwareSlugs, migrations, caseStudies, posts] =
    await Promise.all([
      getAllServices(),
      getAllIndustrySlugs(),
      getAllCustomSoftwareSlugs(),
      getAllMigrations(),
      getAllCaseStudies(),
      getAllPosts(),
    ]);

  const body = buildLlmsFullTxt({
    services,
    industrySlugs,
    customSoftwareSlugs,
    migrations,
    caseStudies,
    posts,
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
