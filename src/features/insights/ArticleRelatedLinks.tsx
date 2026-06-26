import Link from "next/link";

import type { ResourceLink } from "@/lib/types";

/** Internal links to related services, industries, and migrations. */
export function ArticleRelatedLinks({ items }: { items: ResourceLink[] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Related services" className="mt-12 border-t border-zn-border pt-8">
      <p className="zn-label mb-4 text-zn-text-3">Related services</p>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-zn-text-2 underline-offset-4 transition-colors hover:text-zn-text hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
