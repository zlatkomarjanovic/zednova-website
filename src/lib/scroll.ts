import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

/** Smooth scroll to top — uses Lenis when available. */
export function scrollToTop(options?: { immediate?: boolean }) {
  const immediate = options?.immediate ?? false;

  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: immediate ? "auto" : "smooth" });
}
