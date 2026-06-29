import { homepageIndustries } from "@/lib/content/homepage-industries";
import { products } from "@/lib/content/products";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industry-subs";

export const CONTACT_SERVICE_OPTIONS = [
  ...services.map((service) => ({
    value: service.slug,
    label: service.title,
  })),
  { value: "multiple", label: "Multiple services" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const CONTACT_INDUSTRY_OPTIONS = [
  ...homepageIndustries.map((industry) => ({
    value: industry.href.replace("/industries/", ""),
    label: industry.title,
  })),
  { value: "other", label: "Other / not listed" },
] as const;

export type ContactPrefill = {
  service: string;
  industry: string;
  message: string;
};

function findServiceLabel(slug: string): string | undefined {
  return services.find((service) => service.slug === slug)?.title;
}

function findIndustryLabel(slug: string): string | undefined {
  return (
    homepageIndustries.find(
      (industry) => industry.href === `/industries/${slug}`,
    )?.title ??
    industries.find((industry) => industry.slug === slug)?.title
  );
}

function findProductLabel(slug: string): string | undefined {
  return products.find((product) => product.slug === slug)?.title;
}

/** Map ?service=, ?industry=, ?product=, and ?message= query params to form defaults. */
export function resolveContactPrefill(params: {
  service?: string;
  industry?: string;
  product?: string;
  message?: string;
}): ContactPrefill {
  const service = params.service ?? "";
  const industry = params.industry ?? "";

  if (params.product) {
    const productTitle = findProductLabel(params.product);
    return {
      service: service || "not-sure",
      industry: industry || "",
      message: productTitle
        ? `I'm interested in ${productTitle}. `
        : params.message ?? "",
    };
  }

  return { service, industry, message: params.message ?? "" };
}

export function labelForService(value: string): string {
  return (
    CONTACT_SERVICE_OPTIONS.find((option) => option.value === value)?.label ??
    findServiceLabel(value) ??
    value
  );
}

export function labelForIndustry(value: string): string {
  return (
    CONTACT_INDUSTRY_OPTIONS.find((option) => option.value === value)?.label ??
    findIndustryLabel(value) ??
    value
  );
}
