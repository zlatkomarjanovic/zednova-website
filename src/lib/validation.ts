import { z } from "zod";

export const BUDGET_OPTIONS = [
  "$1,000–$3,000",
  "$3,000–$7,500",
  "$7,500+",
  "Let's discuss",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().max(200).min(2, "Please enter your name"),
  company: z.string().trim().max(200).optional(),
  email: z.string().trim().max(254).min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().trim().max(50).optional(),
  service: z.string().trim().max(200).min(1, "Select what you're looking for"),
  industry: z.string().trim().max(200).min(1, "Select your industry"),
  budget: z.string().refine((value) => BUDGET_OPTIONS.some((option) => option === value), "Select a budget range"),
  message: z.string().trim().max(10000).min(50, "Tell us a bit more, at least 50 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;
