export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDocument = {
  slug: string;
  shortTitle: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

const LAST_UPDATED = "November 7, 2026";
import { BUSINESS_ADDRESS, BUSINESS_NAME, CONTACT_EMAIL } from "@/lib/content/site";
const LEGAL_ENTITY = BUSINESS_NAME;

export const privacyPolicyDocument: LegalDocument = {
  slug: "privacy-policy",
  shortTitle: "Privacy Policy",
  title: "Privacy Policy",
  intro:
    "This Privacy Policy explains how ZedNova Studio collects, uses, and protects personal information when you visit zednova.studio, contact us, or use our services.",
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      paragraphs: [
        `${LEGAL_ENTITY} ("ZedNova Studio," "we," "us") operates the website at zednova.studio and provides website, software, automation, and AI-related services to businesses.`,
        `Privacy questions can be sent to ${CONTACT_EMAIL}.`,
        `Business address: ${BUSINESS_ADDRESS}.`,
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: ["We may collect the following types of information:"],
      list: [
        "Contact details you submit through forms, such as name, email, company, project details, and service interests.",
        "Technical data when you browse the site, such as IP address, browser type, device type, pages viewed, and referral source.",
        "Cookie and consent preferences you save in your browser.",
        "Communications you send us by email or through scheduling tools linked from the site.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use information",
      paragraphs: ["We use personal information to:"],
      list: [
        "Respond to inquiries and provide proposals, support, or project delivery.",
        "Operate, secure, and improve the website and our services.",
        "Measure site performance and understand how content is used when you consent to analytics cookies.",
        "Comply with legal obligations and enforce our terms.",
      ],
    },
    {
      id: "legal-bases",
      title: "Legal bases (where applicable)",
      paragraphs: [
        "If you are in the European Economic Area, United Kingdom, or similar jurisdictions, we process personal data based on one or more of the following: your consent, performance of a contract or pre-contract steps, our legitimate interests in operating and improving our business, and compliance with legal obligations.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technologies",
      paragraphs: [
        "We use strictly necessary storage to remember your cookie choices and keep the site functioning.",
        "Optional analytics cookies are used only if you opt in through our cookie banner or Cookie Settings page.",
        "You can change your preferences at any time at /legal/cookie-settings.",
      ],
    },
    {
      id: "sharing",
      title: "How we share information",
      paragraphs: [
        "We do not sell your personal information. We may share data with service providers that help us run the site and business, such as hosting, email delivery, analytics (when consented), and scheduling tools. These providers may only use data to perform services for us and must protect it appropriately.",
      ],
    },
    {
      id: "retention",
      title: "Data retention",
      paragraphs: [
        "We retain contact and project information for as long as needed to respond, deliver services, maintain business records, and comply with law. Analytics data retained by our analytics providers is governed by their policies and our cookie settings.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We use reasonable administrative, technical, and organizational measures to protect personal information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights and choices",
      paragraphs: ["Depending on your location, you may have the right to:"],
      list: [
        "Access, correct, or delete personal information we hold about you.",
        "Object to or restrict certain processing.",
        "Withdraw consent where processing is consent-based (such as analytics cookies).",
        "Request portability of information you provided to us.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Our website and services are directed to businesses and professionals. We do not knowingly collect personal information from children under 16.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will reflect the latest version.",
      ],
    },
  ],
};

export const termsDocument: LegalDocument = {
  slug: "terms",
  shortTitle: "Terms of Service",
  title: "Terms of Service",
  intro:
    "These Terms and Conditions explain how to use zednova.studio, request our services, and review pricing, delivery, cancellation, and payment arrangements before paying.",
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        `The website is operated by ${LEGAL_ENTITY}, a Texas limited liability company. These terms apply to visitors and prospective clients using the public website.`,
        "Separate written agreements govern paid project work, statements of work, and client engagements.",
        `Our business address is ${BUSINESS_ADDRESS}. Contact us at ${CONTACT_EMAIL}.`,
      ],
    },
    {
      id: "ordering-and-pricing",
      title: "Service requests, pricing, and payment",
      paragraphs: [
        "Submit the service request form at /contact or book a consultation to request website development, custom software, CRM automation, AI receptionists, SEO content, or ongoing support. An inquiry or consultation creates no obligation to buy and does not authorize a charge.",
        "All published dollar prices are in US dollars (USD) and are starting prices. Before payment, we provide a written proposal with deliverables, exclusions, total price, applicable taxes, third-party costs, delivery milestones, payment schedule, and any recurring fees. Work starts after written acceptance and any agreed initial payment.",
        "Monthly services are optional unless expressly included in your accepted proposal. Any renewal date, minimum term, usage limit, and cancellation notice period must be disclosed before you subscribe. Additional work and third-party purchases require your approval.",
        "Review the Refund and Cancellation Policy at /legal/refund-cancellation and Delivery and Payment Policy at /legal/delivery-payment before accepting a proposal or making a payment. A signed project agreement may specify project details, but cannot remove rights provided by applicable law.",
      ],
    },
    {
      id: "use-of-site",
      title: "Use of the website",
      paragraphs: ["You agree not to:"],
      list: [
        "Use the site in any way that violates applicable law.",
        "Attempt to gain unauthorized access to our systems or data.",
        "Scrape, overload, or interfere with site operation except through standard browsers and approved bots.",
        "Misrepresent your identity or affiliation when contacting us.",
      ],
    },
    {
      id: "content",
      title: "Site content",
      paragraphs: [
        "Text, visuals, logos, case studies, and other materials on this site are owned by ZedNova Studio or used with permission. You may view and share links to pages for personal or business evaluation. You may not copy, republish, or commercially exploit site content without written permission.",
      ],
    },
    {
      id: "contact-submissions",
      title: "Contact submissions",
      paragraphs: [
        "Information you submit through contact forms must be accurate to the best of your knowledge. You represent that you have the right to share any business information you provide.",
      ],
    },
    {
      id: "third-party-links",
      title: "Third-party links and tools",
      paragraphs: [
        "The site may link to third-party websites, scheduling tools, or social profiles. We are not responsible for their content, privacy practices, or availability.",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer",
      paragraphs: [
        'The site and its content are provided "as is" for general information about our services. We do not guarantee uninterrupted access or that every description will remain current at all times.',
      ],
    },
    {
      id: "limitation",
      title: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, ZedNova Studio will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the public website. Our total liability for website-related claims is limited to one hundred U.S. dollars (USD $100) unless a higher amount is required by law.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of the State of Texas, without regard to conflict-of-law rules. Disputes relating to the website will be brought in courts located in Texas, unless otherwise required by applicable law.",
      ],
    },
    {
      id: "changes-terms",
      title: "Changes",
      paragraphs: [
        "We may update these Terms of Service from time to time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.",
      ],
    },
    {
      id: "contact-terms",
      title: "Contact",
      paragraphs: [`Questions about these terms: ${CONTACT_EMAIL}.`],
    },
  ],
};

export const cookiePolicyIntro = {
  title: "Cookie Settings",
  shortTitle: "Cookie Settings",
  intro:
    "Manage which optional cookies and similar technologies we use on zednova.studio. Strictly necessary storage always stays on so the site can remember your choices and function properly.",
  lastUpdated: LAST_UPDATED,
};
