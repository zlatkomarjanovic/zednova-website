import type { Metadata } from "next";
import { getFounder, getSiteSettings } from "@/lib/queries";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/shared/Button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { BlueprintGuides } from "@/components/shared/BlueprintGuides";
import { StatsRow } from "@/components/sections/StatsRow";
import { DarkCTA } from "@/components/sections/DarkCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "ZedNova is a Texas LLC built by Zed Marjanovic. 10+ years shipping products, 120+ projects. A builder, not an agency.",
  alternates: { canonical: "/about" },
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
  const [founder, settings] = await Promise.all([getFounder(), getSiteSettings()]);

  return (
    <>
      {/* Hero — guides framing */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />
            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">
                <Reveal>
                  <SectionLabel withRule={false}>The studio</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Built in Bosnia. Trusted by America."
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    ZedNova was built by Zed, a designer, developer, and systems
                    thinker from Živinice, Bosnia. Over 10-plus years shipping
                    products he has delivered more than 120 projects for clients
                    across the US. ZedNova is a Texas LLC because your business
                    deserves a real partner, not a freelancer profile. The work
                    goes out under one standard, and the systems are built to
                    run without us.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Work with ZedNova
                    </Button>
                    <Button href="/work" variant="link" withArrow>
                      See our work
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — guides framing */}
      <section data-theme="light" className="relative bg-zn-bg">
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="zn-container-inset border-b border-zn-border py-4 text-center">
              <p className="zn-label text-zn-text-3">
                120+ projects. 10+ years shipping products. $0 wasted on agency overhead.
              </p>
            </div>
            <div className="zn-container-inset">
              <StatsRow stats={settings.stats} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section data-theme="light" className="zn-section">
        <div className="zn-container">
          <Reveal>
            <SectionLabel withRule={false}>What we believe</SectionLabel>
          </Reveal>
          <Stagger className="mt-12 grid gap-12 md:grid-cols-3" stagger={0.06}>
            {VALUES.map((value) => (
              <div key={value.name} className="border-t border-zn-text pt-6">
                <h2 className="zn-h2 font-sans font-normal text-zn-text">
                  {value.name}
                </h2>
                <p className="mt-4 leading-relaxed text-zn-text-2">{value.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Founder (dark) */}
      <section data-theme="dark" className="zn-section bg-zn-dark text-zn-inv">
        <BlueprintGuides theme="dark" reveal="immediate" showEdgeCrosses className="z-10" />
        <div className="zn-container relative z-20 grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:items-center">
          <div
            className="font-sans font-normal leading-none text-zn-inv/90"
            aria-hidden="true"
            style={{ fontSize: "clamp(8rem,18vw,16rem)" }}
          >
            Z.
          </div>
          <div>
            <Reveal>
              <SectionLabel withRule={false} className="text-zn-inv-2">
                Founder
              </SectionLabel>
            </Reveal>
            <TextReveal
              as="h2"
              text={founder.name}
              className="mt-6 font-sans text-4xl font-normal text-zn-inv lg:text-5xl"
            />
            <div className="mt-6 space-y-4 leading-relaxed text-zn-inv-2">
              {founder.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <Reveal delay={0.1}>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why remote works */}
      <section data-theme="light" className="zn-section">
        <div className="zn-container">
          <Reveal>
            <SectionLabel withRule={false}>The remote advantage</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Why a remote studio serves US clients better"
            className="mt-6 max-w-3xl zn-h2 font-sans font-normal"
          />
          <Stagger className="mt-12 grid gap-8 md:grid-cols-3" stagger={0.06}>
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

      {/* Manifesto (dark) */}
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
