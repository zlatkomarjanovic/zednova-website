/** Sanity project configuration — shared by Next.js and scripts. */

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o";

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15";

export const sanityStudioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "http://localhost:3333";

export function isSanityConfigured() {
  return Boolean(sanityProjectId && sanityDataset);
}

export function hasSanityReadToken() {
  return Boolean(process.env.SANITY_API_READ_TOKEN);
}
