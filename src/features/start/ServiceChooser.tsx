"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";
import { trackConversion } from "@/lib/analytics/track";
import {
  START_GOALS,
  START_INDUSTRIES,
  recommendServices,
  startPrefillMessage,
  type StartGoal,
  type StartIndustry,
} from "@/lib/content/start-chooser";

type Step = "goal" | "industry" | "results";

function ChoiceButton({
  selected,
  onSelect,
  title,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-[2px] border px-5 py-4 text-left transition-colors",
        selected
          ? "border-zn-text bg-zn-bg-2"
          : "border-zn-border bg-zn-bg hover:border-zn-text-3",
      )}
    >
      <span className="block font-medium text-zn-text">{title}</span>
      {description ? (
        <span className="mt-1 block text-sm leading-relaxed text-zn-text-2">{description}</span>
      ) : null}
    </button>
  );
}

export function ServiceChooser() {
  const [step, setStep] = useState<Step>("goal");
  const [goal, setGoal] = useState<StartGoal | null>(null);
  const [industry, setIndustry] = useState<StartIndustry | null>(null);

  const recommendations =
    goal && industry ? recommendServices(goal, industry) : [];

  const goToResults = () => {
    if (!goal || !industry) return;
    trackConversion("start_chooser_complete", {
      goal,
      industry,
      services: recommendations.map((r) => r.serviceSlug).join(","),
    });
    setStep("results");
  };

  const contactBase = goal && industry ? startPrefillMessage(goal, industry) : "";
  const primaryService = recommendations[0]?.serviceSlug;

  return (
    <div className="mx-auto max-w-2xl">
      {step === "goal" && (
        <div className="space-y-3">
          <p className="zn-label text-zn-text-3">Step 1 of 2</p>
          <h2 className="zn-h2 font-sans font-normal">What are you trying to accomplish?</h2>
          <div className="mt-8 space-y-3">
            {START_GOALS.map((item) => (
              <ChoiceButton
                key={item.id}
                selected={goal === item.id}
                onSelect={() => setGoal(item.id)}
                title={item.label}
                description={item.description}
              />
            ))}
          </div>
          <div className="mt-10 flex justify-end">
            <Button
              disabled={!goal}
              onClick={() => setStep("industry")}
              withArrow
              analyticsLocation="start-chooser"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === "industry" && (
        <div className="space-y-3">
          <p className="zn-label text-zn-text-3">Step 2 of 2</p>
          <h2 className="zn-h2 font-sans font-normal">Which best describes your business?</h2>
          <div className="mt-8 space-y-3">
            {START_INDUSTRIES.map((item) => (
              <ChoiceButton
                key={item.id}
                selected={industry === item.id}
                onSelect={() => setIndustry(item.id)}
                title={item.label}
              />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-3">
            <Button variant="outline" onClick={() => setStep("goal")}>
              Back
            </Button>
            <Button
              disabled={!industry}
              onClick={goToResults}
              withArrow
              analyticsLocation="start-chooser"
            >
              See recommendations
            </Button>
          </div>
        </div>
      )}

      {step === "results" && goal && industry && (
        <div>
          <p className="zn-label text-zn-text-3">Your path</p>
          <h2 className="mt-4 zn-h2 font-sans font-normal">Recommended services</h2>
          <p className="mt-4 text-zn-text-2">
            Based on your goal and industry, start with one of these — or book a call and we will
            confirm scope together.
          </p>
          <ul className="mt-10 space-y-4">
            {recommendations.map((item, index) => (
              <li
                key={item.serviceSlug}
                className="rounded-[2px] border border-zn-border bg-zn-bg p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-zn-text-3">
                      {index === 0 ? "Best fit" : `Option ${index + 1}`}
                    </span>
                    <p className="mt-2 font-sans text-lg text-zn-text">{item.serviceTitle}</p>
                    <p className="mt-2 text-sm leading-relaxed text-zn-text-2">{item.reason}</p>
                  </div>
                  <Link
                    href={item.href}
                    className="shrink-0 text-sm text-zn-text underline-offset-4 hover:underline"
                    onClick={() =>
                      trackConversion("service_card_click", {
                        service: item.serviceSlug,
                        href: item.href,
                        location: "start-chooser-results",
                      })
                    }
                  >
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              href={`/contact?service=${primaryService ?? "not-sure"}&industry=${industry === "healthcare" ? "dental-clinics" : industry === "ecommerce" ? "skincare-brands" : "other"}&message=${encodeURIComponent(contactBase)}`}
              withArrow
              analyticsLocation="start-chooser-cta"
            >
              Start with the top match
            </Button>
            <Button href="/contact" variant="outline" analyticsLocation="start-chooser-cta">
              Talk to us instead
            </Button>
          </div>
          <button
            type="button"
            className="mt-6 flex items-center gap-1 text-sm text-zn-text-3 hover:text-zn-text"
            onClick={() => {
              setStep("goal");
              setGoal(null);
              setIndustry(null);
            }}
          >
            Start over
            <ArrowRight className="size-3.5 rotate-180" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
