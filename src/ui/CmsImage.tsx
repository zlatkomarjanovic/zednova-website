import Image, { type ImageProps } from "next/image";

import {
  CMS_IMAGE_WIDTHS,
  buildCmsImageUrl,
  shouldUseCdnDelivery,
  type CmsImagePreset,
} from "@/sanity/image";

type CmsImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  /** Target CDN width preset — defaults to showcase (1920px). */
  preset?: CmsImagePreset;
  /** Override preset width when layout needs a specific max. */
  maxWidth?: number;
};

/**
 * CMS-backed image: requests a high-res asset from Sanity/Unsplash CDN and
 * bypasses the Next optimizer to avoid double compression and undersized srcset.
 */
export function CmsImage({
  src,
  alt,
  preset = "showcase",
  maxWidth,
  quality = 90,
  sizes,
  ...props
}: CmsImageProps) {
  const width = maxWidth ?? CMS_IMAGE_WIDTHS[preset];
  const resolvedQuality = typeof quality === "number" ? quality : 90;
  const deliverySrc = buildCmsImageUrl(src, { width, quality: resolvedQuality });
  const unoptimized = shouldUseCdnDelivery(src);

  return (
    <Image
      src={deliverySrc}
      alt={alt}
      quality={quality}
      sizes={sizes}
      unoptimized={unoptimized}
      {...props}
    />
  );
}
