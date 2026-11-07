import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { refundCancellationDocument } from "@/lib/content/service-policies";

export const metadata: Metadata = {
  title: refundCancellationDocument.title,
  description: refundCancellationDocument.intro,
  alternates: { canonical: "/legal/refund-cancellation" },
};

export default function PolicyPage() {
  return <LegalPageContent document={refundCancellationDocument} />;
}
