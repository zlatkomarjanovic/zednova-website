import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";

const { projectId, dataset } = sanityClient.config();

const builder =
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
    : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity image builder is not configured.");
  }
  return builder.image(source);
}

export function imageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  height?: number,
) {
  if (!source || !builder) return null;
  let img = builder.image(source).width(width).auto("format");
  if (height) img = img.height(height);
  return img.url();
}
