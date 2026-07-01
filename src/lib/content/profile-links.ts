import type { ProfileLinks } from "@/lib/types";

export type ProfileLinkKey = keyof ProfileLinks;

export type ProfileLinkDefinition = {
  key: ProfileLinkKey;
  label: string;
  logoSrc: string;
  logoClassName: string;
};

/** Directory listings shown in the footer beside social icons. */
export const PROFILE_LINK_DEFINITIONS: ProfileLinkDefinition[] = [
  {
    key: "goodfirms",
    label: "ZedNova Studio on GoodFirms",
    logoSrc: "/images/logos/directories/goodfirms.png",
    logoClassName: "h-6 w-6 object-contain",
  },
];

export const defaultProfileLinks: ProfileLinks = {
  crunchbase: "",
  clutch: "",
  goodfirms: "",
  linkedinCompany: "",
};
