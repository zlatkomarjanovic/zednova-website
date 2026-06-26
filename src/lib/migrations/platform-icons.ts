export type PlatformIcon = {
  src: string;
  alt: string;
};

export type MigrationPlatformIconSet = {
  from: PlatformIcon[];
  to: PlatformIcon[];
};

type MigrationIconRow = {
  url?: string;
  alt?: string;
};

function mapIconRows(items?: MigrationIconRow[]): PlatformIcon[] {
  return (items ?? [])
    .filter((item): item is { url: string; alt?: string } => Boolean(item.url))
    .map((item) => ({
      src: item.url,
      alt: item.alt?.trim() || "Platform",
    }));
}

/** Build migration pill icons from Sanity CMS icon galleries. */
export function resolveMigrationPlatformIcons(migration: {
  fromIcons?: MigrationIconRow[];
  toIcons?: MigrationIconRow[];
}): MigrationPlatformIconSet | null {
  const from = mapIconRows(migration.fromIcons);
  const to = mapIconRows(migration.toIcons);

  if (from.length === 0 || to.length === 0) return null;

  return { from, to };
}

/** Join platform alt labels for display copy (e.g. Webflow → Next.js + Sanity). */
export function migrationPlatformLabel(icons: MigrationPlatformIconSet): string {
  const from = icons.from.map((icon) => icon.alt).join(" + ");
  const to = icons.to.map((icon) => icon.alt).join(" + ");
  return `${from} → ${to}`;
}
