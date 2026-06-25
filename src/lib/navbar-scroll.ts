/** Fired on every Lenis scroll frame and native scroll — keeps navbar theme in sync. */
export const NAVBAR_SCROLL_EVENT = "zn:navbar-scroll";

export function dispatchNavbarScrollUpdate() {
  window.dispatchEvent(new Event(NAVBAR_SCROLL_EVENT));
}
