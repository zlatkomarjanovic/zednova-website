import Link from "next/link";
import { Logo } from "@/ui/Logo";
import { BlueprintGuides } from "@/ui/BlueprintGuides";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { FooterAiSummaryLinks } from "@/components/layout/FooterAiSummaryLinks";
import { FooterNavLink } from "@/components/layout/FooterNavLink";
import type { HomepageIndustry } from "@/lib/content/homepage-industries";
import { featuredHomepageIndustries as staticFeaturedHomepageIndustries } from "@/lib/content/homepage-industries";
import type { Migration, NavMenuItem, ServiceMegaMenuCard } from "@/lib/types/content-nav";
import type { SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

const COMPANY_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export function Footer({
  migrations,
  settings,
  serviceMegaMenuCards,
  customSoftwareNavItems,
  featuredHomepageIndustries = staticFeaturedHomepageIndustries,
  className,
}: {
  migrations: Migration[];
  settings: SiteSettings;
  serviceMegaMenuCards: ServiceMegaMenuCard[];
  customSoftwareNavItems: NavMenuItem[];
  featuredHomepageIndustries?: HomepageIndustry[];
  className?: string;
}) {
  const year = new Date().getFullYear();
  const customSoftwareFooter = customSoftwareNavItems.slice(0, 6);

  return (
    <footer data-theme="dark" className={cn("relative bg-zn-dark text-zn-inv", className)}>
      <div className="zn-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.28]" aria-hidden="true" />
      <div className="zn-grain pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <BlueprintGuides theme="dark" reveal="none" className="z-10" />

      <div className="zn-container-guides relative">
        <BlueprintCross
          anchor="left"
          theme="dark"
          className="top-0 z-30 -translate-y-1/2"
        />
        <BlueprintCross
          anchor="right"
          theme="dark"
          className="top-0 z-30 -translate-y-1/2"
        />

        <div className="zn-container-inset py-14 lg:py-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md space-y-5">
              <Logo variant="light" />
              <p className="text-sm leading-relaxed text-zn-inv-2">
                A software and product studio with 10+ years shipping products for US
                businesses. We use AI internally to deliver faster, without trading off
                quality or follow-up.
              </p>
              <FooterAiSummaryLinks />
            </div>
            <div className="flex flex-col gap-5 lg:items-end lg:text-right">
              <div className="space-y-2 text-sm text-zn-inv-2">
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="block text-zn-inv transition-opacity hover:opacity-70"
                >
                  {settings.contactEmail}
                </a>
                <p>{settings.responseTime}</p>
                <p>CST (Texas) · We work async</p>
              </div>
              <div className="flex items-center gap-3">
                {settings.socialLinks.linkedin && (
                  <Social href={settings.socialLinks.linkedin} label="LinkedIn">
                    <LinkedInIcon />
                  </Social>
                )}
                {settings.socialLinks.twitter && (
                  <Social href={settings.socialLinks.twitter} label="X (Twitter)">
                    <XIcon />
                  </Social>
                )}
                {settings.socialLinks.github && (
                  <Social href={settings.socialLinks.github} label="GitHub">
                    <GitHubIcon />
                  </Social>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-zn-border-dk">
          <BlueprintCross
            anchor="left"
            theme="dark"
            className="top-0 z-30 -translate-y-1/2"
          />
          <BlueprintCross
            anchor="right"
            theme="dark"
            className="top-0 z-30 -translate-y-1/2"
          />
        </div>

        <div className="zn-container-inset grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-3 lg:py-14 xl:grid-cols-5 xl:gap-8">
            <FooterCol title="Services">
              {serviceMegaMenuCards.map((item) => (
                <FooterNavLink key={item.href + item.title} href={item.href} label={item.title} />
              ))}
              <FooterNavLink href="/services" label="All services" />
            </FooterCol>

            <FooterCol title="Industries">
              {featuredHomepageIndustries.map((industry) => (
                <FooterNavLink
                  key={industry.href}
                  href={industry.href}
                  label={industry.title}
                />
              ))}
              <FooterNavLink href="/industries" label="All industries" />
            </FooterCol>

            <FooterCol title="Custom software">
              {customSoftwareFooter.map((item) => (
                <FooterNavLink
                  key={item.href + item.title}
                  href={item.href}
                  label={item.title}
                />
              ))}
              <FooterNavLink
                href="/custom-software"
                label="All custom software"
              />
            </FooterCol>

            <FooterCol title="Migrations">
              {migrations.map((migration) => (
                <FooterNavLink
                  key={migration.slug}
                  href={`/migrations/${migration.slug}`}
                  label={migration.title}
                />
              ))}
              <FooterNavLink href="/migrations" label="All migrations" />
            </FooterCol>

            <FooterCol title="Company">
              {COMPANY_LINKS.map((link) => (
                <FooterNavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </FooterCol>
          </div>

        <div className="relative border-t border-zn-border-dk">
          <BlueprintCross
            anchor="left"
            theme="dark"
            className="top-0 z-30 -translate-y-1/2"
          />
          <BlueprintCross
            anchor="right"
            theme="dark"
            className="top-0 z-30 -translate-y-1/2"
          />
        </div>

        <div className="zn-container-inset flex flex-col gap-4 py-10 pb-12 text-sm text-zn-inv-2 sm:flex-row sm:items-center sm:justify-between lg:py-12 lg:pb-14">
          <p>© {year} ZedNova Studios. Texas LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/privacy-policy"
              className="transition-opacity hover:text-zn-inv"
            >
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="transition-opacity hover:text-zn-inv">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-zn-inv">
        {title}
      </p>
      <ul className="grid gap-3">{children}</ul>
    </div>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center border border-zn-border-dk text-zn-inv transition-colors hover:border-zn-inv hover:text-zn-inv"
    >
      {children}
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3L17.61 20.65z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}
