import { fetchServiceBySlugFromSanity } from "../src/sanity/fetchers";
import { mergeServiceWithStaticFallback } from "../src/lib/content/service-detail-fallbacks";
import { getServiceProblemsHeadline } from "../src/lib/content/service-detail-fallbacks";

const slug = process.argv[2] ?? "crm-pipeline-automation";

fetchServiceBySlugFromSanity(slug).then((cms) => {
  if (!cms) {
    console.log("no cms");
    return;
  }
  const merged = mergeServiceWithStaticFallback(cms);
  console.log({
    slug,
    problemsHeadline: getServiceProblemsHeadline(merged),
    firstProblem: merged.problems?.[0]?.title,
    problemCount: merged.problems?.length,
  });
});
