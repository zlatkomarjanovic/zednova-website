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
  const serviceLabel = await labelForService(data.service);
  const industryLabel = await labelForIndustry(data.industry);

  const text = [
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
    const { error } = await resend.emails.send({
      from,
      to: [settings.contactEmail],
      replyTo: data.email,
      subject: `New project inquiry from ${data.name}`,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: `Could not send your message. Email ${CONTACT_EMAIL} directly.` },
        { status: 500 },
      );
    }
  } else {
    console.info("[contact] Submission received (RESEND_API_KEY not set):\n", text);
  }

  return NextResponse.json({ ok: true });
}
