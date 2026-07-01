/** Fired on every Lenis scroll frame and native scroll — keeps navbar theme in sync. */
export const NAVBAR_SCROLL_EVENT = "zn:navbar-scroll";

/** Matches Navbar bar row: h-16 / lg:h-18 plus safe-area inset. */
export const NAVBAR_STICKY_TOP =
  "calc(4rem + env(safe-area-inset-top, 0px))";
export const NAVBAR_STICKY_TOP_LG =
  "calc(4.5rem + env(safe-area-inset-top, 0px))";

/** Card height when pinned — fills viewport below the fixed navbar. */
export const NAVBAR_STICKY_CARD_MIN_H =
  "calc(100dvh - 4rem - env(safe-area-inset-top, 0px))";
export const NAVBAR_STICKY_CARD_MIN_H_LG =
  "calc(100dvh - 4.5rem - env(safe-area-inset-top, 0px))";

export function getNavbarOffsetPx(): number {
  if (typeof window === "undefined") return 64;
  const header = document.querySelector("header");
  if (header) return Math.round(header.getBoundingClientRect().height);
  return window.matchMedia("(min-width: 1024px)").matches ? 72 : 64;
}

export function dispatchNavbarScrollUpdate() {
  window.dispatchEvent(new Event(NAVBAR_SCROLL_EVENT));
}
