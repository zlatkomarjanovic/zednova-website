import { Tag } from "@/ui/Tag";

/** Tags block — shown below the article body, never on the hero image. */
export function ArticleTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null;

  return (
    <section aria-label="Article tags" className="mt-14 border-t border-zn-border pt-8">
      <p className="zn-label mb-4 text-zn-text-3">Tagged</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag} className="border-transparent bg-zn-text text-zn-inv">
            {tag}
          </Tag>
        ))}
      </div>
    </section>
  );
}
