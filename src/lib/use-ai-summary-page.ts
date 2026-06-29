"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { defaultAiSummaryPageUrl } from "@/lib/content/ai-summary-models";

export function useAiSummaryPage() {
  const pathname = usePathname();
  const pageUrl = defaultAiSummaryPageUrl(pathname || "/");
  const [pageTitle, setPageTitle] = useState("ZedNova Studios");

  useEffect(() => {
    setPageTitle(document.title || "ZedNova Studios");
  }, [pathname]);

  return { pageUrl, pageTitle };
}
