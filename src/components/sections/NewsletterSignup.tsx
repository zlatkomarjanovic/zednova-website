"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterSignup({
  theme = "light",
  className,
}: {
  theme?: "light" | "dark";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const dark = theme === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className={cn("text-sm", dark ? "text-zn-inv" : "text-zn-text", className)}>
        You&apos;re in. One insight per week, no slop.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)} noValidate>
      <div
        className={cn(
          "flex items-center gap-2 border-b py-2",
          dark ? "border-zn-border-dk" : "border-zn-border",
        )}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@company.com"
          className={cn(
            "w-full bg-transparent text-base outline-none placeholder:text-zn-text-3",
            dark ? "text-zn-inv" : "text-zn-text",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-[2px] transition-colors disabled:opacity-50",
            dark ? "bg-zn-inv text-zn-text" : "bg-zn-text text-zn-inv",
          )}
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-500">Enter a valid email address.</p>
      )}
    </form>
  );
}
