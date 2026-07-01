import type { CustomSoftware } from "@/lib/types/custom-software";

const AI_DELIVERY_NOTE =
  " MVP ships first — typically within 5–10 business days using AI-accelerated design and build. After launch we iterate on feedback, add phase-2 features, and can stay on retainer for maintenance and ongoing improvements.";

const DEFAULT_PROCESS = [
  {
    step: 1,
    title: "Discovery & MVP scope",
    description:
      "We define the smallest useful version — must-have workflows only — so MVP ships fast. AI helps draft user stories and specs from your kickoff call.",
  },
  {
    step: 2,
    title: "UX & architecture",
    description:
      "Wireframes and data model you approve before code. We optimize for speed-to-MVP while leaving room for phase-2 expansion.",
  },
  {
    step: 3,
    title: "MVP build",
    description:
      "Core features live on staging in days. AI accelerates boilerplate; senior engineers review every integration and auth path.",
  },
  {
    step: 4,
    title: "Launch & iterate",
    description:
      "MVP goes production. We gather feedback, prioritize improvements, and can continue on retainer to maintain and extend the product.",
  },
];

function cs(
  slug: string,
  data: Omit<CustomSoftware, "slug" | "order"> & { order?: number },
): CustomSoftware {
  return {
    slug,
    order: data.order ?? 1,
    processSteps: DEFAULT_PROCESS,
    timeline:
      data.timeline ??
      "MVP in 5–10 business days · iterate & maintain after launch",
    ...data,
    whatItIs: `${data.whatItIs ?? data.shortDescription}${AI_DELIVERY_NOTE}`,
    problemSolved: data.problemSolved
      ? `${data.problemSolved} We ship an MVP first so you see value in days, then improve and maintain it with you.`
      : undefined,
  };
}

export const customSoftwareItems: CustomSoftware[] = [
  cs("custom-web-app-development", {
    title: "Custom Web App Development",
    shortDescription:
      "Simple web apps on Next.js for workflows, records, and tools your team uses every day.",
    whatItIs:
      "A bespoke web application built on Next.js and a modern backend — not a template, not a plugin stack. We design around how your team actually works.",
    problemSolved:
      "Spreadsheets, email threads, and one-off tools that do not talk to each other slow teams down and create errors. A focused web app centralizes the workflow.",
    targetAudience: [
      "Operations teams outgrowing spreadsheets",
      "Agencies managing client work internally",
      "SMBs needing a lightweight internal tool",
    ],
    keyFeatures: [
      { title: "Role-based access", description: "Admin, staff, and client views with permissions." },
      { title: "Live data", description: "Dashboards and lists that update without manual exports." },
      { title: "Integrations", description: "CRM, email, payments, and calendar hooks where you need them." },
    ],
    whatsIncluded: [
      { title: "Workflow mapping workshop with your ops lead" },
      { title: "Clickable wireframes for MVP screens" },
      { title: "Next.js app shell with auth & roles" },
      { title: "Core CRUD for your primary records" },
      { title: "One external integration in MVP (CRM, email, or payments)" },
      { title: "Search, filters & export on main lists" },
      { title: "Admin panel for settings & user invites" },
      { title: "Staging URL for team UAT before launch" },
      { title: "Production deploy on Vercel or your host" },
      { title: "Error monitoring & uptime alerts" },
      { title: "Handoff Loom + written runbook" },
      { title: "30-day post-MVP bug fixes & tweaks" },
      { title: "Phase-2 feature backlog workshop" },
    ],
    deliverables: ["Scoped web app", "Admin access", "Deployment", "30-day post-launch support"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Sanity or Supabase"],
    integrations: ["Stripe", "GoHighLevel", "Google Calendar", "Slack"],
    relatedServices: ["ops-automation", "custom-in-house-software-for-smbs"],
    startingPrice: 12000,
    order: 1,
  }),
  cs("client-portal-development", {
    title: "Client Portal Development",
    shortDescription:
      "Login portals where clients check project status, upload files, and get updates without emailing you.",
    whatItIs:
      "A branded client login area — project timeline, files, messages, invoices, and status updates in one place.",
    problemSolved:
      "Clients email for updates, lose attachments, and do not know what happens next. A portal cuts repeat questions and makes you look organized.",
    targetAudience: ["Agencies & studios", "Consultancies", "Professional services firms"],
    keyFeatures: [
      { title: "Project status", description: "Milestones, deliverables, and due dates clients can see." },
      { title: "File exchange", description: "Secure uploads and downloads with version history." },
      { title: "Notifications", description: "Email or SMS when something needs their attention." },
    ],
    whatsIncluded: [
      { title: "Client portal brand & login screen design" },
      { title: "Secure client authentication (email magic link or password)" },
      { title: "Project status timeline clients can read" },
      { title: "Milestone checklist with due dates" },
      { title: "File upload & download per project" },
      { title: "In-portal messages or comment threads" },
      { title: "Invoice or payment status view (Stripe/QuickBooks)" },
      { title: "Email notifications when something updates" },
      { title: "Staff admin to manage clients & projects" },
      { title: "Mobile-responsive client experience" },
      { title: "Staging review with your team before launch" },
      { title: "Production deploy & SSL" },
      { title: "Phase-2: approvals, e-sign, or custom reports" },
    ],
    deliverables: ["Client portal", "Admin panel", "Auth & hosting setup"],
    technologies: ["Next.js", "Auth.js", "S3-compatible storage"],
    integrations: ["QuickBooks", "Stripe", "DocuSign"],
    relatedServices: ["crm-pipeline-automation", "ops-automation"],
    startingPrice: 10000,
    order: 2,
  }),
  cs("patient-portal-development", {
    title: "Patient Portal Development",
    shortDescription:
      "Secure portals for patients to book visits, complete intake forms, and view their appointment info.",
    whatItIs:
      "HIPAA-aware patient-facing software for booking, intake, forms, and appointment visibility — wired to your existing stack where possible.",
    problemSolved:
      "Phone tag for scheduling, paper intake, and front-desk overload. Patients expect online booking and digital forms.",
    targetAudience: ["Dental & medical clinics", "Wellness & therapy practices", "Multi-location care groups"],
    keyFeatures: [
      { title: "Online booking", description: "Real-time availability with confirmations and reminders." },
      { title: "Digital intake", description: "Forms completed before arrival, synced to your workflow." },
      { title: "Secure messaging", description: "Appointment details and prep instructions in one login." },
    ],
    whatsIncluded: [
      { title: "HIPAA-aware architecture review (as applicable)" },
      { title: "Patient registration & login flow" },
      { title: "Online booking with real-time availability" },
      { title: "Digital intake forms (PDF replacement)" },
      { title: "Appointment confirmation & reminder SMS/email" },
      { title: "Patient dashboard: upcoming visits & forms due" },
      { title: "Staff calendar & appointment admin" },
      { title: "GoHighLevel or EHR integration plan in MVP" },
      { title: "Consent & privacy policy acceptance capture" },
      { title: "Staging UAT with front-desk staff" },
      { title: "Production launch on your domain" },
      { title: "30-day tuning on reminders & form fields" },
      { title: "Phase-2: telehealth links, pay-at-booking, family accounts" },
    ],
    deliverables: ["Patient portal", "Booking + intake", "Integration plan"],
    technologies: ["Next.js", "Twilio", "GoHighLevel or EHR API"],
    integrations: ["GoHighLevel", "Calendly", "Stripe"],
    relatedServices: ["ai-receptionist", "crm-pipeline-automation"],
    relatedIndustries: ["healthcare-wellness", "dental-clinics"],
    startingPrice: 14000,
    order: 3,
  }),
  cs("internal-dashboard-development", {
    title: "Internal Dashboard Development",
    shortDescription:
      "Staff dashboards that replace spreadsheets and show live business numbers at a glance.",
    whatItIs:
      "A single screen your team opens every morning — KPIs, pipeline, tasks, and alerts pulled from the tools you already use.",
    problemSolved:
      "Leadership spends hours compiling reports from five systems. Staff work from outdated exports. Dashboards fix that.",
    targetAudience: ["Founders & operators", "Sales & ops leads", "Franchise & multi-location teams"],
    keyFeatures: [
      { title: "Live KPIs", description: "Revenue, leads, utilization, and custom metrics." },
      { title: "Filters & drill-down", description: "By location, rep, date range, or product." },
      { title: "Alerts", description: "Threshold notifications when numbers move." },
    ],
    whatsIncluded: [
      { title: "KPI workshop with leadership (pick 6–8 metrics)" },
      { title: "Data source inventory (CRM, ads, billing, sheets)" },
      { title: "ETL pipeline for MVP metrics (daily refresh)" },
      { title: "Executive summary row (revenue, pipeline, leads)" },
      { title: "Drill-down filters by date, location, rep" },
      { title: "Chart library: line, bar, funnel as needed" },
      { title: "Export to CSV for board meetings" },
      { title: "Role-based views (owner vs team lead)" },
      { title: "Threshold alerts to Slack or email" },
      { title: "Mobile-friendly dashboard link" },
      { title: "Documentation on how numbers are calculated" },
      { title: "30-day metric validation & fixes" },
      { title: "Phase-2 metrics added from backlog" },
    ],
    deliverables: ["Internal dashboard", "Data connections", "User training doc"],
    technologies: ["Next.js", "PostgreSQL", "Make/n8n"],
    integrations: ["Shopify", "HubSpot", "GoHighLevel", "Google Sheets"],
    relatedServices: ["custom-in-house-software-for-smbs", "ops-automation"],
    startingPrice: 9000,
    order: 4,
  }),
  cs("booking-system-development", {
    title: "Booking System Development",
    shortDescription:
      "Online scheduling with confirmations, reminders, intake forms, and calendar sync built in.",
    whatItIs:
      "Custom scheduling software — not a generic widget — with your rules, buffers, staff calendars, and follow-up automations.",
    problemSolved:
      "Double bookings, no-shows, and manual calendar juggling cost real revenue, especially for appointment-based businesses.",
    targetAudience: ["Clinics & wellness", "Coaches & trainers", "Salons & service businesses"],
    keyFeatures: [
      { title: "Smart availability", description: "Staff, room, and service rules in one engine." },
      { title: "Reminders", description: "SMS and email sequences that cut no-shows." },
      { title: "Payments & deposits", description: "Collect fees at booking when you need to." },
    ],
    whatsIncluded: [
      { title: "Service & staff availability rules workshop" },
      { title: "Public booking page on your brand" },
      { title: "Embeddable widget for existing site" },
      { title: "Google Calendar two-way sync (MVP)" },
      { title: "Buffer times & blackout dates" },
      { title: "SMS/email confirmation on book" },
      { title: "24h & 1h reminder sequences" },
      { title: "Deposit or card hold via Stripe (optional MVP)" },
      { title: "Staff admin to manage appointments" },
      { title: "No-show & cancellation policy enforcement" },
      { title: "Staging test bookings before go-live" },
      { title: "Production cutover & monitoring" },
      { title: "Phase-2: multi-location, packages, waitlist" },
    ],
    deliverables: ["Booking system", "Calendar integrations", "Reminder flows"],
    technologies: ["Next.js", "Twilio", "Google Calendar API"],
    integrations: ["Google Calendar", "Stripe", "GoHighLevel"],
    relatedServices: ["crm-pipeline-automation", "ai-receptionist"],
    startingPrice: 11000,
    order: 5,
  }),
  cs("admin-panel-development", {
    title: "Admin Panel Development",
    shortDescription:
      "Back-office panels to manage users, records, orders, content, and settings.",
    whatItIs:
      "The control room for your product or operation — CRUD, approvals, audit logs, and settings without touching the database.",
    problemSolved:
      "Developers become the bottleneck for every data change. A proper admin panel lets ops move at business speed.",
    targetAudience: ["SaaS teams", "Marketplaces", "Operations-heavy SMBs"],
    keyFeatures: [
      { title: "User & role management", description: "Invite, suspend, and permission staff." },
      { title: "Record management", description: "Search, filter, bulk actions on your entities." },
      { title: "Audit trail", description: "Who changed what and when." },
    ],
    whatsIncluded: [
      { title: "Entity & permission model workshop" },
      { title: "Admin login with role tiers (admin, editor, viewer)" },
      { title: "Searchable tables for your core records" },
      { title: "Create, edit, archive — with validation" },
      { title: "Bulk actions & CSV export" },
      { title: "Audit log: who changed what & when" },
      { title: "Settings panel for business rules" },
      { title: "User invite & password reset flows" },
      { title: "API hooks for future integrations" },
      { title: "Staging environment for safe testing" },
      { title: "Production deploy & access hardening" },
      { title: "Operator guide & training call" },
      { title: "Phase-2: approvals, webhooks, advanced reports" },
    ],
    deliverables: ["Admin panel", "Permission model", "Operator guide"],
    technologies: ["Next.js", "PostgreSQL", "Sanity"],
    integrations: ["Stripe", "SendGrid", "Slack webhooks"],
    relatedServices: ["ops-automation", "custom-ai-agents"],
    startingPrice: 8500,
    order: 6,
  }),
  cs("form-intake-systems", {
    title: "Form & Intake Systems",
    shortDescription:
      "Custom forms wired to CRM, email, SMS, and follow-up sequences triggered on submission.",
    whatItIs:
      "Multi-step intake that qualifies leads, collects the right data, and triggers the next action automatically.",
    problemSolved:
      "Generic forms dump unqualified leads into your inbox. Custom intake routes, scores, and follows up instantly.",
    targetAudience: ["Clinics & professional services", "Agencies qualifying leads", "Regulated industries needing structured intake"],
    keyFeatures: [
      { title: "Conditional logic", description: "Questions change based on earlier answers." },
      { title: "Instant routing", description: "CRM, email, SMS, and task creation on submit." },
      { title: "Compliance-friendly", description: "Consent, signatures, and retention rules." },
    ],
    whatsIncluded: [
      { title: "Intake flow mapping (questions & branching)" },
      { title: "Multi-step form UX with save & resume" },
      { title: "Field validation & required logic" },
      { title: "File upload fields where needed" },
      { title: "E-sign or consent capture (if required)" },
      { title: "Instant CRM contact create on submit" },
      { title: "Email & SMS confirmation to submitter" },
      { title: "Internal notification to assigned owner" },
      { title: "Submission inbox for staff review" },
      { title: "Spam protection (honeypot + rate limit)" },
      { title: "Staging test submissions" },
      { title: "Production launch & analytics on completion rate" },
      { title: "Phase-2: scoring, routing rules, payment step" },
    ],
    deliverables: ["Intake system", "Automation map", "Submission exports"],
    technologies: ["Next.js", "GoHighLevel", "Make"],
    integrations: ["GoHighLevel", "HubSpot", "Twilio", "DocuSign"],
    relatedServices: ["crm-pipeline-automation", "outbound-lead-gen"],
    startingPrice: 6500,
    order: 7,
  }),
  cs("crm-lead-tracking-tools", {
    title: "CRM & Lead Tracking Tools",
    shortDescription:
      "Simple CRM views for leads, deals, tasks, notes, and pipeline status.",
    whatItIs:
      "A CRM shaped around your sales motion — not a bloated platform your team avoids. Pipeline, tasks, and notes in one lightweight app.",
    problemSolved:
      "Leads sit in inboxes, follow-ups slip, and nobody trusts the pipeline number. A focused CRM fixes visibility.",
    targetAudience: ["B2B sales teams", "Agencies tracking deals", "Local service businesses"],
    keyFeatures: [
      { title: "Pipeline boards", description: "Stages that match how you actually sell." },
      { title: "Task & follow-up", description: "Due dates, owners, and reminders built in." },
      { title: "Lead source tracking", description: "Know which channel produced the deal." },
    ],
    whatsIncluded: [
      { title: "Sales process & stage definition workshop" },
      { title: "Contact & company records with custom fields" },
      { title: "Kanban pipeline board (your stages)" },
      { title: "Tasks & due dates on deals" },
      { title: "Notes & activity timeline per lead" },
      { title: "Lead source tracking on create" },
      { title: "Basic email templates from CRM" },
      { title: "CSV import from spreadsheets" },
      { title: "Pipeline value & win-rate summary" },
      { title: "User roles: rep vs manager views" },
      { title: "Staging with sample data" },
      { title: "Team onboarding call" },
      { title: "Phase-2: automations, scoring, integrations" },
    ],
    deliverables: ["CRM tool", "Data import", "Team onboarding"],
    technologies: ["Next.js", "PostgreSQL"],
    integrations: ["Gmail", "Calendly", "Stripe", "Make"],
    relatedServices: ["crm-pipeline-automation", "outbound-lead-gen"],
    startingPrice: 9500,
    order: 8,
  }),
  cs("document-upload-portals", {
    title: "Document Upload Portals",
    shortDescription:
      "Secure upload, review, and approval flows for files from clients or staff.",
    whatItIs:
      "A secure document hub — clients upload, staff review, approve or request changes, with a clear audit trail.",
    problemSolved:
      "Email attachments get lost, versions conflict, and sensitive files land in the wrong inbox.",
    targetAudience: ["Legal & accounting", "Lenders & underwriters", "Agencies collecting client assets"],
    keyFeatures: [
      { title: "Secure uploads", description: "Encrypted storage with access controls." },
      { title: "Review workflow", description: "Approve, reject, or request revisions." },
      { title: "Checklists", description: "Required documents per client or deal." },
    ],
    whatsIncluded: [
      { title: "Document checklist template per client/deal" },
      { title: "Secure upload portal (client-facing)" },
      { title: "Virus scan & file type restrictions" },
      { title: "Reviewer queue for staff" },
      { title: "Approve, reject, or request revision workflow" },
      { title: "Comments on specific files" },
      { title: "Status emails to client on review outcome" },
      { title: "Retention & auto-delete rules" },
      { title: "Download audit trail" },
      { title: "Admin reporting on pending uploads" },
      { title: "Staging security review" },
      { title: "Production deploy with encrypted storage" },
      { title: "Phase-2: e-sign, OCR, bulk zip download" },
    ],
    deliverables: ["Document portal", "Review workflow", "Security checklist"],
    technologies: ["Next.js", "S3-compatible storage", "Auth.js"],
    integrations: ["DocuSign", "Slack", "Email"],
    relatedServices: ["ops-automation", "crm-pipeline-automation"],
    startingPrice: 8000,
    order: 9,
  }),
  cs("membership-subscription-portals", {
    title: "Membership & Subscription Portals",
    shortDescription:
      "Member login, billing access, and gated content for paid users and subscribers.",
    whatItIs:
      "A member area with subscription billing, content gates, and self-service account management.",
    problemSolved:
      "Members email for invoices, lose login links, and churn when access is confusing. A portal reduces support load.",
    targetAudience: ["Coaches & educators", "Communities & associations", "SaaS with gated content"],
    keyFeatures: [
      { title: "Gated content", description: "Courses, downloads, and resources by plan." },
      { title: "Billing self-service", description: "Invoices, plan changes, and payment methods." },
      { title: "Member directory", description: "Optional profiles and tiers." },
    ],
    whatsIncluded: [
      { title: "Membership tier & pricing workshop" },
      { title: "Member registration & login" },
      { title: "Stripe subscription checkout in MVP" },
      { title: "Customer billing portal (update card, cancel)" },
      { title: "Content gating by plan tier" },
      { title: "Member profile & account settings" },
      { title: "Admin: member list, plan changes, refunds" },
      { title: "Webhook handling for payment events" },
      { title: "Welcome email on successful subscribe" },
      { title: "Failed payment dunning emails" },
      { title: "Staging test subscriptions" },
      { title: "Production launch on your domain" },
      { title: "Phase-2: courses, community, affiliate tracking" },
    ],
    deliverables: ["Member portal", "Stripe integration", "Content gating rules"],
    technologies: ["Next.js", "Stripe", "Sanity"],
    integrations: ["Stripe", "ConvertKit", "Discord"],
    relatedServices: ["ai-lead-site", "crm-pipeline-automation"],
    startingPrice: 13000,
    order: 10,
  }),
];

export const customSoftwareBySlug = new Map(
  customSoftwareItems.map((item) => [item.slug, item]),
);
