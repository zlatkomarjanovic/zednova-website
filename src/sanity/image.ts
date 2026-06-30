/** Build sharp Sanity / Unsplash CDN URLs and skip double compression in Next Image. */

export type CmsImagePreset = "hero" | "showcase" | "card" | "article" | "thumb";

export const CMS_IMAGE_WIDTHS: Record<CmsImagePreset, number> = {
  hero: 3840,
  showcase: 1920,
  card: 1280,
  article: 1440,
  thumb: 800,
};

export function shouldUseCdnDelivery(src: string): boolean {
  if (!src || src.startsWith("/")) return false;

  try {
    const { hostname } = new URL(src);
    return hostname === "cdn.sanity.io" || hostname === "images.unsplash.com";
  } catch {
    return false;
  }
}

export function buildCmsImageUrl(
  src: string,
  {
    width,
    height,
    quality = 85,
    fit = "max",
  }: {
    width: number;
    height?: number;
    quality?: number;
    fit?: "max" | "min" | "crop" | "clip" | "scale";
  },
): string {
  if (!src || src.startsWith("/")) return src;

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src;
  }

  if (url.hostname === "cdn.sanity.io") {
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", fit);
    url.searchParams.set("w", String(width));
    if (height) url.searchParams.set("h", String(height));
    url.searchParams.set("q", String(quality));
    return url.toString();
  }

  if (url.hostname === "images.unsplash.com") {
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality));
    return url.toString();
  }

  return src;
}

export function cmsImageSrc(
  src: string,
  preset: CmsImagePreset = "showcase",
  quality = 85,
): string {
  return buildCmsImageUrl(src, {
    width: CMS_IMAGE_WIDTHS[preset],
    quality,
  });
}
