"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { Button } from "@/ui/Button";
import { InsightsHomePostsSection } from "@/features/insights/InsightsHomePostsSection";
import { SectionLabel } from "@/ui/SectionLabel";
import type { FaqItem } from "@/lib/content/faq";
import type { Post } from "@/lib/types";
import type { ArticleFaq } from "@/lib/types";
import { groupFaqsByCategory } from "@/lib/content/faq";
import { cn } from "@/lib/utils";

const HOMEPAGE_INSIGHTS_DESCRIPTION =
  "Practical notes on AI search, websites, Shopify, CRM automations, and software for clinics, ecommerce brands, and service businesses. The same guides we link from each article.";

type FaqSectionItem = Pick<FaqItem, "question" | "answer" | "category"> & {
  id?: string;
};

function normalizeFaqItems(faqs: FaqSectionItem[]): FaqItem[] {
  return faqs.map((item, index) => ({
    id: item.id ?? `faq-${index}`,
    question: item.question,
    answer: item.answer,
    category: item.category,
    order: index + 1,
  }));
}

function FaqAccordionItem({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full min-w-0 items-start justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-zn-bg md:px-7 md:py-5"
      >
        <span className="min-w-0 font-sans text-[0.95rem] leading-snug text-zn-text md:text-base">
          {item.question}
        </span>
        <span className="mt-0.5 shrink-0 text-zn-text-3" aria-hidden="true">
          {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="zn-prose px-6 pb-5 md:px-7 md:pb-6">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

function FaqCategoryFilters({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      className="mb-4 flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter FAQs by category"
    >
      {categories.map((option) => {
        const selected = active === option;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors",
              selected
                ? "border-zn-text bg-zn-text text-zn-bg"
                : "border-zn-border bg-zn-bg text-zn-text-2 hover:border-zn-text hover:text-zn-text",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function FaqSection({
  faqs,
  recentPosts,
  groupByCategory = false,
  filterable = false,
  embedded = false,
  showBlueprintCrosses = true,
  label = "FAQ",
  heading = "Answers before you reach out",
  description = "Websites, Shopify, automations, migrations, AI tools, pricing, and support. The essentials before you reach out.",
}: {
  faqs: FaqSectionItem[] | ArticleFaq[];
  recentPosts?: Post[];
  groupByCategory?: boolean;
  filterable?: boolean;
  /** Renders inside a parent blueprint frame (e.g. insights page) — no extra side borders or gap. */
  embedded?: boolean;
  /** Plus markers on the guide-line corners. Off on service detail pages. */
  showBlueprintCrosses?: boolean;
  label?: string;
  heading?: string;
  description?: string;
}) {
  const normalizedFaqs = normalizeFaqItems(faqs);
  const groups = groupByCategory ? groupFaqsByCategory(normalizedFaqs) : [{ category: "", items: normalizedFaqs }];
  const categories = groups.map((group) => group.category).filter(Boolean);
  const defaultCategory = categories.includes("General")
    ? "General"
    : (categories[0] ?? "");
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const visibleGroups = filterable
    ? groups.filter((group) => group.category === activeCategory)
    : groups;
  const [openId, setOpenId] = useState(
    () => visibleGroups[0]?.items[0]?.id ?? normalizedFaqs[0]?.id ?? "",
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const nextGroup = groups.find((group) => group.category === category);
    setOpenId(nextGroup?.items[0]?.id ?? "");
  };

  if (normalizedFaqs.length === 0) return null;

  const faqContent = (
    <>
      <div
        className={cn(
          "zn-container-inset",
          embedded ? "py-[12rem]" : "py-14 lg:py-16",
        )}
      >
        <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <SectionLabel withRule={false}>{label}</SectionLabel>
            <h2 className="mt-6 max-w-[25rem] zn-h2 font-sans font-normal">
              {heading}
            </h2>
            <p className="zn-prose mt-5 max-w-[25rem]">{description}</p>
          </aside>

          <div className="min-w-0">
            {filterable && categories.length > 0 ? (
              <FaqCategoryFilters
                categories={categories}
                active={activeCategory}
                onChange={handleCategoryChange}
              />
            ) : null}

            <div className="min-w-0 overflow-hidden border border-zn-border bg-zn-bg-2">
              {visibleGroups.map((group, groupIndex) => (
                <div
                  key={group.category || "all"}
                  className={cn(groupIndex > 0 && "border-t border-zn-border")}
                >
                  {group.category && !filterable ? (
                    <p className="zn-label border-b border-zn-border bg-zn-bg px-6 py-3 md:px-7">
                      {group.category}
                    </p>
                  ) : null}
                  <div className="divide-y divide-zn-border">
                    {group.items.map((item) => (
                      <FaqAccordionItem
                        key={item.id}
                        item={item}
                        open={openId === item.id}
                        onToggle={() =>
                          setOpenId((current) => (current === item.id ? "" : item.id))
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {recentPosts && recentPosts.length > 0 ? (
        <div className="relative border-t border-zn-border">
          {showBlueprintCrosses ? (
            <>
              <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />
            </>
          ) : null}

          <InsightsHomePostsSection
            posts={recentPosts}
            label="Insights"
            heading="Recent blog posts"
            headingId="homepage-recent-insights-heading"
            description={HOMEPAGE_INSIGHTS_DESCRIPTION}
            action={
              <Button href="/insights" variant="link" withArrow>
                All insights
              </Button>
            }
          />
        </div>
      ) : null}
    </>
  );

  if (embedded) {
    return (
      <div className="relative" aria-label="FAQ">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-[4] h-px bg-zn-border/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[4] h-px bg-zn-border/50"
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 zn-sage-surface"
          aria-hidden="true"
        />
        <div
          className="zn-sage-grain pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2"
          aria-hidden="true"
        />
        <BlueprintGrid className="z-[1]" immediate />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-px bg-zn-border"
        />
        {showBlueprintCrosses ? (
          <>
            <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />
          </>
        ) : null}
        <div className="relative z-[3]">{faqContent}</div>
      </div>
    );
  }

  return (
    <section
      data-theme="light"
      className="relative zn-section zn-sage-surface"
      aria-label="FAQ and recent insights"
    >
      <div className="zn-sage-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <BlueprintGrid />

      <div className="zn-container-guides relative">
        <div className="relative border-x border-zn-border">
          {showBlueprintCrosses ? (
            <>
              <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />
            </>
          ) : null}

          {faqContent}

          {showBlueprintCrosses && !recentPosts?.length ? (
            <>
              <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
              <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
