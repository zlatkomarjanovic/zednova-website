import type { Metadata } from "next";

import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { JsonLd } from "@/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { privacyPolicyDocument } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | ZedNova Studios",
  description:
    "How ZedNova Studios collects, uses, and protects personal information on zednova.studio, including contact forms, cookies, and analytics.",
  alternates: { canonical: "/legal/privacy-policy" },
  openGraph: {
    type: "website",
    url: "/legal/privacy-policy",
    title: "Privacy Policy | ZedNova Studios",
    description:
      "Privacy Policy for ZedNova Studios — data collection, cookies, contact forms, and your rights.",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: privacyPolicyDocument.shortTitle },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <LegalPageContent document={privacyPolicyDocument} />
    </>
  );
}
