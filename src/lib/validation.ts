import { z } from "zod";

export const BUDGET_OPTIONS = [
  "$1,000–$3,000",
  "$3,000–$7,500",
  "$7,500+",
  "Let's discuss",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  company: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().optional(),
  service: z.string().min(1, "Select what you're looking for"),
  industry: z.string().min(1, "Select your industry"),
  budget: z.string().min(1, "Select a budget range"),
  message: z.string().min(50, "Tell us a bit more — at least 50 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;
