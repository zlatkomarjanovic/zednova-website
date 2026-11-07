import { NextResponse } from "next/server";
import { Resend } from "resend";

import { CONTACT_EMAIL } from "@/lib/content/site";
import { labelForIndustry, labelForService } from "@/lib/queries";
import { getSiteSettings } from "@/lib/queries";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid form data." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const [serviceLabel, industryLabel] = await Promise.all([
    labelForService(data.service), labelForIndustry(data.industry),
  ]);

  const text = [
    "Formal service request (no payment authorized)",
    `Submitted: ${new Date().toISOString()}`,
    `Name: ${data.name}`,
    data.company ? `Company: ${data.company}` : null,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    `Service: ${serviceLabel}`,
    `Industry: ${industryLabel}`,
    `Budget: ${data.budget}`,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "ZedNova Contact <onboarding@resend.dev>";
  const settings = await getSiteSettings();

  if (apiKey) {
    const resend = new Resend(apiKey);
    try {
      const { error } = await resend.emails.send({
        from,
        to: [settings.contactEmail],
        replyTo: data.email,
        subject: `New project inquiry from ${data.name}`,
        text,
      });

      if (error) {
        console.error("[contact] Email provider rejected delivery");
        return NextResponse.json(
          { error: `Could not send your message. Email ${CONTACT_EMAIL} directly.` },
          { status: 500 },
        );
      }
    } catch {
      console.error("[contact] Email delivery unavailable");
      return NextResponse.json(
        { error: `Could not send your request. Email ${CONTACT_EMAIL} directly.` },
        { status: 503 },
      );
    }
  } else {
    return NextResponse.json(
      { error: `The form is temporarily unavailable. Email ${CONTACT_EMAIL} to submit your service request.` },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
