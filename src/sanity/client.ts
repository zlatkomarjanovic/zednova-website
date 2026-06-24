import { createClient, type QueryParams } from "next-sanity";
import {
  hasSanityReadToken,
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "@/sanity/env";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: !hasSanityReadToken(),
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
});

/** Default fetch options for published content in App Router. */
export const sanityFetchOptions = {
  next: { revalidate: 10 },
} as const;

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 10,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
}) {
  if (!isSanityConfigured()) {
    throw new Error("Sanity is not configured.");
  }

  return sanityClient.fetch<T>(query, params, {
    next: revalidate === false ? { revalidate: 0 } : { revalidate },
  });
}
