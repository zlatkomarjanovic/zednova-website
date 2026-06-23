"use client";

import { useCallback, useRef } from "react";
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export type HighlightRect = {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
};

const SNAP_SPRING = { stiffness: 340, damping: 32, mass: 0.9 };
const BEND_SPRING = { stiffness: 260, damping: 26, mass: 0.85 };

export function rubberRectPath(
  left: number,
  top: number,
  width: number,
  height: number,
  bendX: number,
  bendScale = 1,
  cornerRadius = 0,
) {
  const magnitude = Math.abs(bendX) * 1.7 * bendScale;
  const movingRight = bendX >= 0;
  const right = left + width;
  const bottom = top + height;
  const midY = top + height / 2;
  const r = Math.min(cornerRadius, width / 2, height / 2);

  const rightControlX = movingRight ? right + magnitude : right - magnitude;
  const leftControlX = movingRight ? left + magnitude : left - magnitude;

  if (r <= 0) {
    return [
      `M ${left} ${top}`,
      `L ${right} ${top}`,
      `Q ${rightControlX} ${midY} ${right} ${bottom}`,
      `L ${left} ${bottom}`,
      `Q ${leftControlX} ${midY} ${left} ${top}`,
      "Z",
    ].join(" ");
  }

  return [
    `M ${left + r} ${top}`,
    `L ${right - r} ${top}`,
    `Q ${right} ${top} ${right} ${top + r}`,
    `Q ${rightControlX} ${midY} ${right} ${bottom - r}`,
    `Q ${right} ${bottom} ${right - r} ${bottom}`,
    `L ${left + r} ${bottom}`,
    `Q ${left} ${bottom} ${left} ${bottom - r}`,
    `Q ${leftControlX} ${midY} ${left} ${top + r}`,
    `Q ${left} ${top} ${left + r} ${top}`,
    "Z",
  ].join(" ");
}

type RubberHoverOptions = {
  cellSelector?: string;
  bendScale?: number;
  settleMs?: number;
  cornerRadius?: number;
};

export function useRubberHoverHighlight<T extends HTMLElement = HTMLDivElement>({
  cellSelector = "[data-hover-cell]",
  bendScale = 1,
  settleMs = 140,
  cornerRadius = 0,
}: RubberHoverOptions = {}) {
  const rootRef = useRef<T>(null);
  const prevPointer = useRef({ x: 0, y: 0, t: 0 });
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerRaf = useRef<number | null>(null);
  const pendingPointer = useRef<{ x: number; y: number } | null>(null);

  const top = useSpring(0, SNAP_SPRING);
  const left = useSpring(0, SNAP_SPRING);
  const width = useSpring(0, SNAP_SPRING);
  const height = useSpring(0, SNAP_SPRING);
  const opacity = useSpring(0, SNAP_SPRING);
  const bendX = useSpring(0, BEND_SPRING);

  const pathD = useTransform(
    [left, top, width, height, bendX],
    ([l, t, w, h, bx]: number[]) => {
      if (w <= 0 || h <= 0) return "";
      return rubberRectPath(l, t, w, h, bx, bendScale, cornerRadius);
    },
  );

  const snapTo = useCallback(
    (target: HTMLElement | null, padding = 0) => {
      const root = rootRef.current;
      if (!target || !root) return;

      const rootBox = root.getBoundingClientRect();
      const targetBox = target.getBoundingClientRect();

      top.set(targetBox.top - rootBox.top - padding);
      left.set(targetBox.left - rootBox.left - padding);
      width.set(targetBox.width + padding * 2);
      height.set(targetBox.height + padding * 2);
      opacity.set(1);
    },
    [height, left, opacity, top, width],
  );

  const reset = useCallback(() => {
    opacity.set(0);
    bendX.set(0);
    prevPointer.current = { x: 0, y: 0, t: 0 };
    pendingPointer.current = null;
    if (pointerRaf.current !== null) {
      cancelAnimationFrame(pointerRaf.current);
      pointerRaf.current = null;
    }
    if (settleTimer.current) clearTimeout(settleTimer.current);
  }, [bendX, opacity]);

  const processPointer = useCallback(
    (clientX: number, clientY: number) => {
      const now = performance.now();
      const dt = Math.max(now - prevPointer.current.t, 1);
      const vx = (clientX - prevPointer.current.x) / dt;

      prevPointer.current = { x: clientX, y: clientY, t: now };

      const bendLimit = 104 * bendScale;
      const bendGain = 56 * bendScale;
      bendX.set(Math.max(-bendLimit, Math.min(bendLimit, vx * bendGain)));

      const hovered = document
        .elementFromPoint(clientX, clientY)
        ?.closest<HTMLElement>(cellSelector);

      if (hovered) {
        snapTo(hovered);
      }

      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        bendX.set(0);
        if (hovered) snapTo(hovered);
      }, settleMs);
    },
    [bendScale, bendX, cellSelector, settleMs, snapTo],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      pendingPointer.current = { x: event.clientX, y: event.clientY };
      if (pointerRaf.current !== null) return;
      pointerRaf.current = requestAnimationFrame(() => {
        pointerRaf.current = null;
        const pt = pendingPointer.current;
        if (!pt) return;
        processPointer(pt.x, pt.y);
      });
    },
    [processPointer],
  );

  const pointerHandlers = {
    onPointerMove,
    onPointerLeave: reset,
  };

  return {
    rootRef,
    snapTo,
    reset,
    pointerHandlers,
    pathD,
    opacity,
  };
}

export function RubberHoverHighlightLayer({
  pathD,
  opacity,
  fill = "white",
  fillOpacity = 1,
  stroke,
  strokeWidth = 1,
  className,
}: {
  pathD: MotionValue<string>;
  opacity: MotionValue<number>;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 z-[0] h-full w-full",
        className,
      )}
      aria-hidden="true"
    >
      <motion.path
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={stroke ? strokeWidth : 0}
        vectorEffect="non-scaling-stroke"
        style={{ d: pathD, opacity }}
      />
    </svg>
  );
}