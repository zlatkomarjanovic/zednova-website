import Link from "next/link";

import type { Service } from "@/lib/types";

/** Internal links to related services — topical depth + crawl paths. */
export function ArticleRelatedLinks({ services }: { services: Service[] }) {
  if (!services.length) return null;

  return (
    <nav aria-label="Related services" className="mt-12 border-t border-zn-border pt-8">
      <p className="zn-label mb-4 text-zn-text-3">Related services</p>
      <ul className="grid gap-2">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="text-sm text-zn-text-2 underline-offset-4 transition-colors hover:text-zn-text hover:underline"
            >
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
