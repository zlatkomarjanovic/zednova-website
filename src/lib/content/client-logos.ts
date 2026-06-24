export type ClientLogo = {
  src: string;
  alt: string;
  /** White/light logo assets meant for dark backgrounds — render as gray on light sections. */
  lightVariant?: boolean;
};

export const clientLogos: ClientLogo[] = [
  {
    src: "/images/logos/common-crawl.svg",
    alt: "Common Crawl",
    lightVariant: true,
  },
  {
    src: "/images/logos/65c6c74d7509c8cb43472586_656d3132ce05a3b01d96bad2_icon-logo.webp",
    alt: "Stitch3D",
  },
  {
    src: "/images/logos/65c6c2ea17fcb5339ee9a29a_GetLargeHeaderLogo.webp",
    alt: "Dynamite Garage",
    lightVariant: true,
  },
  {
    src: "/images/logos/6681880ec9fc2fc5e3a062d9_Group-1091431.webp",
    alt: "Vault Apps",
    lightVariant: true,
  },
  {
    src: "/images/logos/Dana-Yao-Zlatko-Marjanovic-SVG-Logo.svg",
    alt: "Dana Yao",
    lightVariant: true,
  },
  {
    src: "/images/logos/egc-logo.svg",
    alt: "EGC NYC",
    lightVariant: true,
  },
];
