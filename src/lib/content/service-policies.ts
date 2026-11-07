import type { LegalDocument } from "./legal";
import { BUSINESS_ADDRESS, BUSINESS_NAME, CONTACT_EMAIL } from "./site";

const businessContact = `${BUSINESS_NAME}, ${BUSINESS_ADDRESS}. Email: ${CONTACT_EMAIL}.`;

export const refundCancellationDocument: LegalDocument = {
  slug: "refund-cancellation",
  shortTitle: "Refunds and Cancellations",
  title: "Refund and Cancellation Policy",
  intro: "Review this policy before agreeing to a project or paying an invoice. Sending a service request or booking a consultation is free and does not commit you to a purchase.",
  lastUpdated: "November 7, 2026",
  sections: [
    { id: "contact", title: "How to request a cancellation or refund", paragraphs: [businessContact, "Email us with your name, project or invoice reference, and the reason for your request. Never include card details. We acknowledge requests within 2 business days and provide a written outcome or progress update within 10 business days."] },
    { id: "before-work", title: "Before project work begins", paragraphs: ["You may cancel a project before work begins for a full refund of amounts paid for work that has not been performed. Any third-party purchase requires your prior written approval, including disclosure of any non-refundable cost. No cancellation fee applies to an unpaid inquiry or consultation."] },
    { id: "after-work", title: "After work begins", paragraphs: ["You may cancel by email at any time. We stop new work after receiving your request and provide an itemized account of completed work, agreed milestones, and any previously approved third-party commitments. You pay only for work performed and approved commitments incurred before cancellation. We refund any remaining prepaid balance for undelivered work.", "If an agreed deliverable is defective or does not match the accepted scope, contact us so we can review and correct it. If we cannot supply the agreed work, we refund the corresponding undelivered portion. Your statutory remedies remain available."] },
    { id: "monthly", title: "Monthly support and recurring services", paragraphs: ["The proposal states the monthly USD fee, billing date, renewal terms, and any minimum commitment before you agree. Unless a different notice period is expressly agreed before purchase, email us before the next renewal date to cancel future renewals. Service continues through the paid period. Used service periods are not normally refundable; unused prepaid future periods are refundable, subject to work already performed and your legal rights. We do not enroll you in recurring billing through this website form."] },
    { id: "processing", title: "Refund method and timing", paragraphs: ["Approved refunds are initiated within 10 business days to the original payment method wherever possible. Your bank or payment provider may require additional processing time. We confirm the amount and initiation date by email. If the original method is unavailable, we agree a secure alternative with you."] },
    { id: "rights", title: "Your legal rights", paragraphs: ["This policy does not exclude mandatory consumer rights, withdrawal rights, or remedies under applicable law. Where required, we obtain separate express consent before beginning services during a statutory withdrawal period. A project agreement may add detail, but cannot remove rights that the law protects."] },
  ],
};

export const deliveryPaymentDocument: LegalDocument = {
  slug: "delivery-payment",
  shortTitle: "Delivery and Payment",
  title: "Delivery and Payment Policy",
  intro: "We provide digital services remotely. This page explains delivery, currency, payment security, and service availability before you make a payment.",
  lastUpdated: "November 7, 2026",
  sections: [
    { id: "business", title: "Your service provider", paragraphs: [businessContact, "ZedNova Studio LLC is a Texas, United States limited liability company. Proposals and invoices identify this US business as the service provider."] },
    { id: "delivery", title: "Digital delivery and timelines", paragraphs: ["We deliver websites, software, CRM workflows, AI assistants, SEO content, and support electronically through agreed staging links, repositories, platform accounts, documents, or remote sessions. No physical shipping is involved.", "Published timelines are estimates. Your written proposal confirms scope, start date, milestones, delivery method, acceptance process, and required access or content. The schedule begins when we receive the agreed initial payment and required materials. We notify you of delays and agree revised dates if requirements change.", "You review the work against the agreed scope before final handover. Ownership, licenses, source-code access, and any third-party subscriptions are specified in the written agreement. Support after handover is included only as described in your proposal."] },
    { id: "pricing", title: "Currency and costs", paragraphs: ["All dollar prices on this website are US dollars (USD). Setup fees and monthly fees are shown separately. Starting prices vary with scope. Before payment you receive the exact total, applicable taxes, approved third-party charges, recurring fees, and payment schedule in writing. No charge is authorized by submitting our form."] },
    { id: "payment-security", title: "Payment security and sensitive information", paragraphs: ["The public website does not collect card numbers, security codes, or bank login credentials. Do not send them through our contact form, email, or chat. Where card payment is available for your invoice, enter card details only on the payment provider's secure hosted payment page over HTTPS. Availability depends on the provider and your invoice; we do not promise card acceptance.", "We do not receive or store full card details through this website. Payment providers process payment information under their own privacy and security terms. Confirm the business name, currency, amount, and policies before paying. Contact us if a payment link looks unexpected."] },
    { id: "availability", title: "Service availability and export restrictions", paragraphs: ["We serve clients in the US and internationally where legally permitted. We do not provide services to sanctioned parties or destinations or supply restricted software or technology without any required authorization. Availability is reviewed before accepting a project. We decline work that cannot lawfully be delivered."] },
    { id: "cancellations", title: "Refunds, cancellations, and support", paragraphs: ["Read our Refund and Cancellation Policy at /legal/refund-cancellation and Terms and Conditions at /legal/terms before paying. These policies are available publicly and linked beside our request form and pricing. Contact us by email for project support, billing questions, or delivery concerns."] },
  ],
};
