import type { ArticleBlock } from "@/lib/types";

function sanityKey(prefix: string, seed: string) {
  return `${prefix}-${seed}`
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .slice(0, 24);
}

function textBlock(style: string, text: string, index: number) {
  return {
    _type: "block" as const,
    _key: sanityKey("blk", `${index}-${style}`),
    style,
    markDefs: [],
    children: [{ _type: "span" as const, text, marks: [] as string[] }],
  };
}

/** Convert structured ArticleBlock[] into Sanity Portable Text for post.body. */
export function articleBlocksToPortableText(blocks: ArticleBlock[]) {
  const nodes: Record<string, unknown>[] = [];

  for (const block of blocks) {
    const index = nodes.length;

    if (block.type === "ul") {
      for (const item of block.items) {
        nodes.push({
          _type: "block",
          _key: sanityKey("li", `${index}-${item.slice(0, 12)}`),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", text: item, marks: [] }],
        });
      }
      continue;
    }

    if (block.type === "h2") {
      nodes.push(textBlock("h2", block.text, index));
      continue;
    }
    if (block.type === "h3") {
      nodes.push(textBlock("h3", block.text, index));
      continue;
    }
    if (block.type === "quote") {
      nodes.push(textBlock("blockquote", block.text, index));
      continue;
    }
    if (block.type === "callout") {
      nodes.push({
        _type: "calloutBlock",
        _key: sanityKey("callout", String(index)),
        type:
          block.calloutVariant === "warning"
            ? "warning"
            : block.calloutVariant === "success"
              ? "tip"
              : "note",
        title: "",
        body: block.text,
      });
      continue;
    }
    if (block.type === "image" && block.image) {
      nodes.push({
        _type: "mediaAsset",
        _key: sanityKey("media", String(index)),
        imageUrl: block.image,
        alt: block.imageAlt ?? "",
        caption: block.text ?? "",
      });
      continue;
    }
    if (block.type === "table") {
      nodes.push({
        _type: "tableBlock",
        _key: sanityKey("table", String(index)),
        caption: block.caption ?? "",
        hasHeaderRow: block.hasHeaderRow ?? true,
        rows: block.rows.map((cells, rowIndex) => ({
          _type: "tableRow",
          _key: sanityKey("row", `${index}-${rowIndex}`),
          cells,
        })),
      });
      continue;
    }
    if (block.type === "p") {
      const text = block.text.trim();
      if (text) nodes.push(textBlock("normal", text, index));
    }
  }

  return nodes;
}
