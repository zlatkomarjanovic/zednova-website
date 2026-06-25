export const HERO_H1 =
  "We build websites, custom software, automations, and AI tools for service businesses that want more leads with less manual work.";

const HEADING_CLASS =
  "max-w-4xl zn-h1 font-sans font-normal text-zn-text";

/** Static, crawlable homepage H1 — no letter/word animation in the headline. */
export function HeroRotatingHeadline() {
  return <h1 className={HEADING_CLASS}>{HERO_H1}</h1>;
}
