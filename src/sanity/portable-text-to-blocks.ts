import type { ArticleBlock } from "@/lib/types";

type PortableTextChild = {
  _type?: string;
  text?: string;
  marks?: string[];
};

type PortableTextBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: PortableTextChild[];
  markDefs?: Array<{ _key?: string; _type?: string; href?: string }>;
  type?: string;
  title?: string;
  body?: string;
  imageUrl?: string;
  alt?: string;
  caption?: string;
  image?: { asset?: { url?: string } };
  code?: string;
  question?: string;
  answer?: string;
};

function spanText(children?: PortableTextChild[]): string {
  return (children ?? []).map((child) => child.text ?? "").join("").trim();
}

function mapCalloutVariant(type?: string): string {
  if (type === "warning") return "warning";
  if (type === "tip") return "success";
  if (type === "note") return "quote";
  return "info";
}

/** Convert Sanity Portable Text (body[]) into ArticleBlock[] for ArticleBody. */
export function portableTextToArticleBlocks(
  nodes?: PortableTextBlock[] | null,
): ArticleBlock[] {
  if (!nodes?.length) return [];

  const blocks: ArticleBlock[] = [];
  let listBuffer: string[] = [];
  let listKind: "bullet" | "number" | null = null;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    blocks.push({ type: "ul", items: [...listBuffer] });
    listBuffer = [];
    listKind = null;
  };

  for (const node of nodes) {
    if (node._type === "calloutBlock") {
      flushList();
      const text = [node.title, node.body].filter(Boolean).join("\n\n");
      if (text) {
        blocks.push({
          type: "callout",
          text,
          calloutVariant: mapCalloutVariant(node.type),
        });
      }
      continue;
    }

    if (node._type === "mediaAsset") {
      flushList();
      const image =
        node.imageUrl ?? node.image?.asset?.url ?? undefined;
      if (image) {
        blocks.push({
          type: "image",
          image,
          imageAlt: node.alt,
          text: node.caption,
        });
      }
      continue;
    }

    if (node._type === "codeBlock") {
      flushList();
      if (node.code) {
        blocks.push({
          type: "callout",
          text: node.code,
          calloutVariant: "info",
        });
      }
      continue;
    }

    if (node._type !== "block") continue;

    const text = spanText(node.children);
    if (!text) continue;

    if (node.listItem) {
      if (listKind && listKind !== node.listItem) flushList();
      listKind = node.listItem;
      listBuffer.push(text);
      continue;
    }

    flushList();

    switch (node.style) {
      case "h2":
        blocks.push({ type: "h2", text });
        break;
      case "h3":
      case "h4":
        blocks.push({ type: "h3", text });
        break;
      case "blockquote":
        blocks.push({ type: "quote", text });
        break;
      default:
        blocks.push({ type: "p", text });
    }
  }

  flushList();
  return blocks;
}
