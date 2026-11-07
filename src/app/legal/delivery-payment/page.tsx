import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { deliveryPaymentDocument } from "@/lib/content/service-policies";

export const metadata: Metadata = {
  title: deliveryPaymentDocument.title,
  description: deliveryPaymentDocument.intro,
  alternates: { canonical: "/legal/delivery-payment" },
};

export default function PolicyPage() {
  return <LegalPageContent document={deliveryPaymentDocument} />;
}
