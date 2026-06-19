"use client";

import { useRef, useState } from "react";

export type HighlightRect = {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
};

const HIDDEN: HighlightRect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  visible: false,
};

export function useHoverHighlight<T extends HTMLElement = HTMLDivElement>() {
  const rootRef = useRef<T>(null);
  const [rect, setRect] = useState<HighlightRect>(HIDDEN);

  const moveTo = (target: HTMLElement | null, padding = 0) => {
    const root = rootRef.current;
    if (!target || !root) return;
    const rootBox = root.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    setRect({
      top: targetBox.top - rootBox.top - padding,
      left: targetBox.left - rootBox.left - padding,
      width: targetBox.width + padding * 2,
      height: targetBox.height + padding * 2,
      visible: true,
    });
  };

  const reset = () => setRect(HIDDEN);

  return { rootRef, rect, moveTo, reset };
}

export function HoverHighlightSurface({
  rect,
  className,
}: {
  rect: HighlightRect;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        opacity: rect.visible ? 1 : 0,
      }}
    />
  );
}
