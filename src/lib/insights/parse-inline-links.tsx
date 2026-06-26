import Link from "next/link";
import { Fragment } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders `[label](/path)` markers inside article paragraphs as internal links. */
export function parseInlineLinks(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    parts.push(
      isExternal ? (
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zn-text underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          {label}
        </a>
      ) : (
        <Link
          key={key++}
          href={href}
          className="text-zn-text underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          {label}
        </Link>
      ),
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <Fragment>{parts}</Fragment>;
}
