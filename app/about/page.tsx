import type { Metadata } from "next";
import { getFounder } from "@/lib/queries";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Button } from "@/components/shared/Button";
import { DarkCTA } from "@/components/sections/DarkCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "ZedNova is a Texas LLC built by Zed Marjanovic. 7+ years, 120+ projects, 100% Job Success Score. A builder, not an agency.",
};

const VALUES = [
  {
    name: "Inat",
    body: "A Bosnian word with no English translation. It means spite-fueled persistence. Building something even harder when someone says it can't be done. That's how we approach every project.",
  },
  {
    name: "Systems over heroics",
    body: "Anyone can work 80-hour weeks. Building a system that runs without you is harder and more valuable. We build systems.",
  },
  {
    name: "Ownership, always",
    body: "We don't disappear at launch. We document, train, and hand over something you actually own.",
  },
];

const REMOTE_POINTS = [
  {
    title: "Lower overhead, better rates",
    body: "No downtown office, no layers of account managers. That saving goes into the work, not the invoice.",
  },
  {
    title: "Async means faster turnaround",
    body: "Work moves while you sleep. You wake up to progress, not a calendar full of status calls.",
  },
  {
    title: "A US entity, real accountability",
    body: "ZedNova is a Texas LLC. You get the speed of remote with the accountability of a domestic partner.",
  },
];

export default async function AboutPage() {
  const founder = await getFounder();

  return (
    <>
      <section className="border-b border-zn-border">
        <div className="zn-container pb-16 pt-36 lg:pb-24 lg:pt-44">
          <Reveal>
            <SectionLabel>The studio</SectionLabel>
          </Reveal>
          <TextReveal
            as="h1"
            text="Built in Bosnia. Trusted by America."
            className="mt-6 max-w-4xl font-sans font-normal text-5xl leading-[1.04] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zn-text-2">
              ZedNova was built by Zed, a designer, developer, and systems thinker
              from Živinice, Bosnia. Over 7-plus years he has delivered more than
              120 projects for clients across the US. ZedNova is a Texas LLC
              because your business deserves a real partner, not a freelancer
              profile. The work goes out under one standard, and the systems are
              built to run without us.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="zn-section">
        <div className="zn-container">
          <SectionLabel>What we believe</SectionLabel>
          <Stagger className="mt-12 grid gap-12 md:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.name} className="border-t border-zn-text pt-6">
                <h2 className="zn-h2 font-sans font-normal text-zn-text">{value.name}</h2>
                <p className="mt-4 leading-relaxed text-zn-text-2">{value.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Founder (dark) */}
      <section data-theme="dark" className="zn-section bg-zn-dark text-zn-inv">
        <div className="zn-container grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:items-center">
          <div
            className="font-sans font-normal leading-none text-zn-inv/90"
            aria-hidden="true"
            style={{ fontSize: "clamp(8rem, 18vw, 16rem)" }}
          >
            Z.
          </div>
          <div>
            <SectionLabel className="text-zn-inv-2">Founder</SectionLabel>
            <h2 className="mt-6 font-sans font-normal text-4xl text-zn-inv lg:text-5xl">
              {founder.name}
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-zn-inv-2">
              {founder.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {founder.upwork && (
                <Button href={founder.upwork} variant="inverted" size="sm" withArrow>
                  Upwork profile
                </Button>
              )}
              {founder.linkedin && (
                <Button
                  href={founder.linkedin}
                  variant="outline-inverted"
                  size="sm"
                  withArrow
                >
                  LinkedIn
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why remote works */}
      <section className="zn-section">
        <div className="zn-container">
          <SectionLabel>The remote advantage</SectionLabel>
          <TextReveal
            as="h2"
            text="Why a remote studio serves US clients better"
            className="mt-6 max-w-3xl zn-h2 font-sans font-normal"
          />
          <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
            {REMOTE_POINTS.map((point, i) => (
              <div key={point.title}>
                <span className="font-mono text-sm text-zn-text-3">0{i + 1}</span>
                <h3 className="mt-3 font-sans text-lg font-normal text-zn-text">
                  {point.title}
                </h3>
                <p className="mt-2 leading-relaxed text-zn-text-2">{point.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Manifesto (dark editorial) */}
      <section data-theme="dark" className="bg-zn-dark text-zn-inv">
        <div className="zn-container zn-section">
          <blockquote className="mx-auto max-w-4xl text-center zn-accent-italic text-3xl leading-snug text-zn-inv sm:text-4xl lg:text-5xl">
            &ldquo;Most agencies sell you the idea of systems. We build ones that
            actually run.&rdquo;
          </blockquote>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
