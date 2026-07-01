import type { Metadata } from "next";



import { getAllPosts, getAllServices } from "@/lib/queries";

import {

  getParentSlugForServiceSlug,

  parentServicePath,

} from "@/lib/content/service-routes";

import {

  PRIMARY_SERVICE_GROUPS,

  PRIMARY_SERVICE_TAB_LABELS,

} from "@/lib/content/service-groups";

import { homepageFaqs } from "@/lib/content/faq";

import type { Service } from "@/lib/types";

import { Reveal } from "@/components/animations/Reveal";

import { TextReveal } from "@/components/animations/TextReveal";

import { Button } from "@/ui/Button";

import { SectionLabel } from "@/ui/SectionLabel";

import { BlueprintCross } from "@/ui/BlueprintCross";

import { BlueprintColumnFrame } from "@/ui/BlueprintColumnFrame";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";

import {

  ServicesPageShowcase,

  type ServicesPageCard,

} from "@/features/services/ServicesPageShowcase";

import { ServicePageCTA } from "@/features/services/ServicePageCTA";

import { InsightsHomePostsSection } from "@/features/insights/InsightsHomePostsSection";

import { FaqSection } from "@/features/home/FaqSection";

import { JsonLd } from "@/ui/JsonLd";

import { Breadcrumbs } from "@/ui/Breadcrumbs";

import { collectionPageJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";



const HOMEPAGE_INSIGHTS_DESCRIPTION =

  "Practical notes on AI search, websites, Shopify, CRM automations, and software for clinics, ecommerce brands, and service businesses. The same guides we link from each article.";



export const metadata: Metadata = {

  title: "Services | Lead-Gen Websites, CRM, AI Receptionists & Custom Software | ZedNova",

  description:

    "Lead-gen websites, CRM follow-up automation, AI receptionists, custom in-house software for SMBs, platform migrations, and monthly support for small businesses.",

  alternates: { canonical: "/services" },

  openGraph: {

    type: "website",

    url: "/services",

    title: "Services | ZedNova Studio",

    description:

      "Lead-gen websites, CRM automation, AI receptionists, custom software, platform migrations, and monthly support for small businesses.",

  },

  robots: { index: true, follow: true },

};



type ServiceCard = ServicesPageCard;



function pickPrimaryServices(services: Service[]): ServiceCard[] {

  const cards: ServiceCard[] = [];



  for (const group of PRIMARY_SERVICE_GROUPS) {

    const service = services.find(

      (s) => s.group === group && getParentSlugForServiceSlug(s.slug) != null,

    );

    if (!service) continue;



    const parentSlug = getParentSlugForServiceSlug(service.slug)!;



    cards.push({

      slug: service.slug,

      parentSlug,

      label: PRIMARY_SERVICE_TAB_LABELS[group],

      title: service.heroHeadline ?? service.title,

      shortDescription: service.shortDescription,

      image: service.image,

      startingPrice: service.pricingSignal,

      timeline: service.timeline,

      icon: service.icon,

      href: parentServicePath(parentSlug),

    });

  }



  return cards;

}



export default async function ServicesPage() {

  const [allServices, allPosts] = await Promise.all([getAllServices(), getAllPosts()]);

  const cards = pickPrimaryServices(allServices);

  const recentPosts = allPosts.slice(0, 3);



  return (

    <>

      <JsonLd

        data={[

          collectionPageJsonLd({

            path: "/services",

            name: "Services — ZedNova Studio",

            description:

              "Lead-gen websites, CRM automation, AI receptionists, portals and dashboards, and monthly support for small businesses.",

          }),

          breadcrumbJsonLd([

            { label: "Home", href: "/" },

            { label: "Services" },

          ]),

          ...(homepageFaqs.length > 0 ? [faqPageJsonLd(homepageFaqs)] : []),

        ]}

      />



      <section data-theme="light" className="relative bg-zn-bg">

        <BlueprintGrid />

        <div className="zn-container-guides relative">

          <BlueprintColumnFrame bottomInset={false} showBottomCrosses={false} showBottomRail={false}>

            <div className="relative border-b border-zn-border">

              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />

              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />

              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">

                <Breadcrumbs

                  items={[

                    { label: "Home", href: "/" },

                    { label: "Services" },

                  ]}

                  className="mb-8"

                />

                <Reveal>

                  <SectionLabel withRule={false}>What we build</SectionLabel>

                </Reveal>

                <TextReveal

                  as="h1"

                  text="Six services that fix where your business leaks leads, calls, and time"

                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"

                />

                <Reveal delay={0.1}>

                  <p className="mt-6 max-w-2xl zn-prose">

                    Each service targets a specific part of the funnel — the website,

                    the follow-up, the receptionist, the portals, the migration, and

                    the ongoing support. Pick the one leaking the most, or combine them.

                  </p>

                </Reveal>

                <Reveal delay={0.15}>

                  <div className="mt-10 flex flex-wrap items-center gap-4">

                    <Button href="/contact" withArrow>

                      Tell us what you need

                    </Button>

                    <Button href="/work" variant="link" withArrow>

                      See our work

                    </Button>

                  </div>

                </Reveal>

              </div>

            </div>



            <ServicesPageShowcase cards={cards} />

          </BlueprintColumnFrame>

        </div>

      </section>



      <ServicePageCTA

        heading="Ready to put this system to work?"

        sub="Tell us about your business. We will scope the project on a discovery call and send a clear plan within 24 hours."

        ctaLabel="Start a project"

        ctaHref="/contact"

      />



      {recentPosts.length > 0 && (

        <section data-theme="light" className="relative bg-zn-bg">

          <div className="zn-container-guides relative">

            <div className="relative border-x border-b border-zn-border">

              <InsightsHomePostsSection

                posts={recentPosts}

                label="Insights"

                heading="Recent blog posts"

                headingId="services-recent-insights-heading"

                description={HOMEPAGE_INSIGHTS_DESCRIPTION}

                insetClassName="py-[clamp(3rem,6vw,5rem)] pb-6 md:pb-8"

                action={

                  <Button href="/insights" variant="link" withArrow>

                    All insights

                  </Button>

                }

              />

            </div>

          </div>

        </section>

      )}



      <FaqSection faqs={homepageFaqs} showBlueprintCrosses={false} />

    </>

  );

}

