"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/ui/Button";
import {
  type ContactPrefill,
} from "@/lib/content/contact-options";
import { BUDGET_OPTIONS, contactSchema, type ContactInput } from "@/lib/validation";
import { trackConversion } from "@/lib/analytics/track";
import { cn } from "@/lib/utils";

const FIELD =
  "w-full border border-zn-border bg-white px-4 py-3 text-sm text-zn-text placeholder:text-zn-text-3 transition-colors focus:border-zn-text focus:outline-none rounded-[2px]";
const LABEL = "mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-zn-text-3";
const ERROR = "mt-1.5 text-xs text-red-600";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className={ERROR}>{message}</p>;
}

export function ContactForm({
  defaults,
  serviceOptions,
  industryOptions,
}: {
  defaults: ContactPrefill;
  serviceOptions: { value: string; label: string }[];
  industryOptions: { value: string; label: string }[];
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: defaults.service,
      industry: defaults.industry,
      budget: "",
      message: defaults.message,
    },
  });

  const messageValue = watch("message");

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Something went wrong. Please try again.");
      }

      trackConversion("form_submit", {
        form: "contact",
        service: data.service,
        industry: data.industry,
      });
      setStatus("success");
    } catch (error) {
      trackConversion("form_error", {
        form: "contact",
        message: error instanceof Error ? error.message : undefined,
      });
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  });

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 px-6 py-12 md:px-10 md:py-16">
        <CheckCircle2 className="size-8 text-zn-text" aria-hidden="true" />
        <div className="space-y-2">
          <h2 className="font-sans text-2xl font-normal tracking-tight text-zn-text">
            Message received
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-zn-text-2">
            Thanks for reaching out. We usually reply within 24 hours with next steps or a
            few clarifying questions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="px-6 py-10 md:px-10 md:py-12" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="contact-name" className={LABEL}>
            Name *
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={FIELD}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="contact-company" className={LABEL}>
            Company
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            placeholder="Company or brand"
            className={FIELD}
            {...register("company")}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="contact-email" className={LABEL}>
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={FIELD}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="contact-phone" className={LABEL}>
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Optional"
            className={FIELD}
            {...register("phone")}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="contact-service" className={LABEL}>
            What do you need? *
          </label>
          <select id="contact-service" className={FIELD} {...register("service")}>
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.service?.message} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="contact-industry" className={LABEL}>
            Industry *
          </label>
          <select id="contact-industry" className={FIELD} {...register("industry")}>
            <option value="">Select your industry</option>
            {industryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.industry?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-budget" className={LABEL}>
            Budget range *
          </label>
          <select id="contact-budget" className={FIELD} {...register("budget")}>
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError message={errors.budget?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={LABEL}>
            Project details *
          </label>
          <textarea
            id="contact-message"
            rows={6}
            placeholder="What are you building, what's broken today, and what does success look like?"
            className={cn(FIELD, "resize-y min-h-[9rem]")}
            {...register("message")}
          />
          <div className="mt-1.5 flex items-start justify-between gap-4">
            <FieldError message={errors.message?.message} />
            <p className="shrink-0 font-mono text-[10px] text-zn-text-3">
              {messageValue?.length ?? 0} / 50 min
            </p>
          </div>
        </div>
      </div>

      {status === "error" && errorMessage && (
        <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" withArrow disabled={status === "submitting"}>
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending
            </span>
          ) : (
            "Send message"
          )}
        </Button>
        <p className="text-xs text-zn-text-3">We reply within 24 hours.</p>
      </div>

      <p className="mt-4 max-w-xl text-xs leading-relaxed text-zn-text-3">
        By submitting this form, you agree that ZedNova Studios may contact you about
        your inquiry. We do not sell your information. See our{" "}
        <a href="/legal/privacy-policy" className="text-zn-text underline-offset-2 hover:underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
