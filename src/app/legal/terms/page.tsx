import type { Metadata } from "next";

import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { JsonLd } from "@/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { termsDocument } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service | ZedNova Studio",
  description:
    "Terms of Service for using zednova.studio, the ZedNova Studio marketing website and contact channels.",
  alternates: { canonical: "/legal/terms" },
  openGraph: {
    type: "website",
    url: "/legal/terms",
    title: "Terms of Service | ZedNova Studio",
    description: "Terms governing use of the ZedNova Studio website.",
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: termsDocument.shortTitle },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <LegalPageContent document={termsDocument} />
    </>
  );
}
