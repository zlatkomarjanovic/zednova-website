/**
 * LOGO TICKER SCROLL DIRECTION — LOCKED. DO NOT CHANGE.
 *
 * Product decision (confirmed by owner): logos move **left → right** on screen.
 * The track animates from `-loopWidth` to `0`.
 *
 * Do not invert, flip, reverse, or "fix" this direction during refactors,
 * marquee tweaks, or AI-assisted edits. Change anything else in LogoTicker,
 * but leave `LOGO_TICKER_SCROLL_DIRECTION` and the LTR branch alone.
 */
export const LOGO_TICKER_SCROLL_DIRECTION = "ltr" as const;

export type LogoTickerScrollDirection = typeof LOGO_TICKER_SCROLL_DIRECTION;

/** @internal Used only by LogoTicker — direction is locked to LTR. */
export function assertLogoTickerDirection(
  direction: string,
): asserts direction is LogoTickerScrollDirection {
  if (direction !== "ltr") {
    throw new Error(
      "LogoTicker scroll direction is locked to LTR. Do not change LOGO_TICKER_SCROLL_DIRECTION.",
    );
  }
}
