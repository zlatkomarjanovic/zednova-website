import {
  PROFILE_LINK_DEFINITIONS,
  type ProfileLinkDefinition,
} from "@/lib/content/profile-links";
import type { ProfileLinks } from "@/lib/types";
import { cn } from "@/lib/utils";

function ProfileLinkItem({
  definition,
  href,
}: {
  definition: ProfileLinkDefinition;
  href?: string;
}) {
  const logo = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={definition.logoSrc}
      alt=""
      className={cn(definition.logoClassName, "block")}
    />
  );

  if (!href) {
    return (
      <span
        className="inline-flex h-6 cursor-default items-center opacity-45"
        aria-label={`${definition.label} (link coming soon)`}
        title="Profile link coming soon"
      >
        {logo}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={definition.label}
      className="inline-flex h-6 items-center opacity-80 transition-opacity hover:opacity-100"
    >
      {logo}
    </a>
  );
}

export function FooterProfileLinks({ profileLinks }: { profileLinks: ProfileLinks }) {
  return (
    <>
      {PROFILE_LINK_DEFINITIONS.map((definition) => (
        <ProfileLinkItem
          key={definition.key}
          definition={definition}
          href={profileLinks[definition.key]}
        />
      ))}
    </>
  );
}
