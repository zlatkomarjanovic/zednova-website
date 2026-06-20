import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { BlueprintGuides } from "@/components/shared/BlueprintGuides";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import type { Service, SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

const COMPANY_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Industries", href: "/industries" },
  { label: "Products", href: "/products" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer({
  services,
  settings,
  className,
}: {
  services: Service[];
  settings: SiteSettings;
  className?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" className={cn("relative bg-zn-dark text-zn-inv", className)}>
      <div className="zn-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden="true" />
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

        <div className="zn-container-inset grid gap-12 py-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-10 lg:py-16">
          <div className="flex flex-col gap-6">
            <Logo variant="light" />
            <div className="flex items-center gap-3">
              <Social href={settings.socialLinks.linkedin} label="LinkedIn">
                <LinkedInIcon />
              </Social>
              <Social href={settings.socialLinks.twitter} label="X (Twitter)">
                <XIcon />
              </Social>
              <Social href={settings.socialLinks.github} label="GitHub">
                <GitHubIcon />
              </Social>
            </div>
          </div>

          <FooterCol title="Services">
            {services.slice(0, 6).map((service) => (
              <FooterLink key={service.slug} href={`/services/${service.slug}`}>
                {service.title}
              </FooterLink>
            ))}
            <FooterLink href="/services">All services</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            {COMPANY_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Contact">
            <li>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-sm text-zn-inv transition-opacity hover:opacity-70"
              >
                {settings.contactEmail}
              </a>
            </li>
            <li className="text-sm text-zn-inv-2">{settings.responseTime}</li>
            <li className="text-sm text-zn-inv-2">CST (Texas) · We work async</li>
            <li className="pt-1 text-sm text-zn-inv-2">ZedNova Studios, a Texas LLC</li>
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

        <div className="zn-container-inset flex flex-col gap-4 py-8 text-sm text-zn-inv-2 sm:flex-row sm:items-center sm:justify-between">
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
      <p className="zn-label mb-5 text-zn-inv-2">{title}</p>
      <ul className="grid gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-zn-inv-2 transition-colors hover:text-zn-inv"
      >
        {children}
      </Link>
    </li>
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
