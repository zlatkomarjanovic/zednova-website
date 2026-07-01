/** Parent service groups — same order as mega menu cards and /services page. */
export const PRIMARY_SERVICE_GROUPS = [
  "Lead-Gen Websites & AI Search",
  "CRM & Follow-Up Automation",
  "AI Receptionist & Booking Automation",
  "Custom In-House Software for SMBs",
  "Platform Migrations",
  "Monthly Support & Improvements",
] as const;

export type PrimaryServiceGroup = (typeof PRIMARY_SERVICE_GROUPS)[number];

export const PRIMARY_SERVICE_TAB_LABELS: Record<PrimaryServiceGroup, string> = {
  "Lead-Gen Websites & AI Search": "Lead-Gen Websites",
  "CRM & Follow-Up Automation": "CRM & Follow-Up",
  "AI Receptionist & Booking Automation": "AI Receptionist",
  "Custom In-House Software for SMBs": "Custom In-House Software",
  "Platform Migrations": "Platform Migrations",
  "Monthly Support & Improvements": "Monthly Support",
};

export const PRIMARY_SERVICE_TAGLINES: Record<PrimaryServiceGroup, string> = {
  "Lead-Gen Websites & AI Search":
    "Fast websites that explain your offer, rank on Google and AI search, and turn visitors into calls, forms, and bookings.",
  "CRM & Follow-Up Automation":
    "Every form, call, and booking request gets captured, followed up with, and tracked until it becomes a booked call or customer.",
  "AI Receptionist & Booking Automation":
    "AI voice and chat assistants that answer calls, qualify leads, book appointments, and text back missed calls.",
  "Custom In-House Software for SMBs":
    "Client portals, internal tools, booking systems, and dashboards built for SMB teams outgrowing spreadsheets.",
  "Platform Migrations":
    "Move from Webflow, WordPress, Framer, Wix, or Squarespace to Next.js + Sanity without losing SEO or content.",
  "Monthly Support & Improvements":
    "Monthly help for your website, CRM automations, AI receptionist, dashboards, forms, and integrations.",
};
