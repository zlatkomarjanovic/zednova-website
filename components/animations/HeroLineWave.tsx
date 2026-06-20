"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const BASE_SPACING = 22;
const EXPANDED_SPACING = 80;
const INFLUENCE_RADIUS = 380;
const MAX_PUSH = (EXPANDED_SPACING - BASE_SPACING) / 2;
const MOUSE_LERP = 0.06;
const LINE_LERP = 0.07;
const Y_STEP = 5;
const AMBIENT_AMP = 7;
const HOVER_AMP = 28;
const AMBIENT_SPEED = 0.24;
const HOVER_SPEED_BOOST = 0.32;
const LINE_WIDTH = 0.45;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function computeTargetX(baseX: number, mouseX: number, active: boolean) {
  if (!active) return baseX;

  const dx = baseX - mouseX;
  const absDx = Math.abs(dx);
  if (absDx > INFLUENCE_RADIUS) return baseX;

  const t = 1 - absDx / INFLUENCE_RADIUS;
  const strength = smoothstep(t);
  return baseX + Math.sign(dx || 1) * strength * MAX_PUSH;
}

function hoverStrength(baseX: number, mouseX: number, active: boolean) {
  if (!active) return 0;

  const absDx = Math.abs(baseX - mouseX);
  if (absDx > INFLUENCE_RADIUS) return 0;

  const t = 1 - absDx / INFLUENCE_RADIUS;
  return smoothstep(t);
}

function isInside(rect: DOMRect, clientX: number, clientY: number) {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

type HeroLineWaveProps = {
  className?: string;
};

export function HeroLineWave({ className }: HeroLineWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef({
    width: 0,
    height: 0,
    baseX: [] as number[],
    currentX: [] as number[],
    mouseX: 0,
    smoothMouseX: 0,
    mouseActive: false,
    reducedMotion: false,
    time: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;
    state.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rebuildLines = (width: number) => {
      const count = Math.ceil(width / BASE_SPACING) + 2;
      state.baseX = Array.from({ length: count }, (_, i) => (i + 0.5) * BASE_SPACING);
      state.currentX = [...state.baseX];
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = rect.width;
      state.height = rect.height;

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      rebuildLines(rect.width);
    };

    const onMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (!isInside(rect, event.clientX, event.clientY)) {
        state.mouseActive = false;
        return;
      }

      state.mouseX = event.clientX - rect.left;
      state.mouseActive = true;
    };

    const drawCurvedLine = (
      centerX: number,
      height: number,
      index: number,
      strength: number,
      time: number,
    ) => {
      const amp = AMBIENT_AMP + strength * HOVER_AMP;
      const freq = 0.0065 + strength * 0.0028;
      const speed = AMBIENT_SPEED + strength * HOVER_SPEED_BOOST;
      const phase = index * 0.62 - time * speed;

      ctx.beginPath();
      for (let y = 0; y <= height; y += Y_STEP) {
        const primary = Math.sin(y * freq + phase) * amp;
        const secondary = Math.sin(y * freq * 1.85 + phase * 1.25) * amp * 0.38;
        const tertiary = Math.sin(y * freq * 0.55 + phase * 0.7) * amp * 0.22;
        const px = centerX + primary + secondary + tertiary;
        if (y === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();
    };

    const draw = (timestamp: number) => {
      const { width, height, baseX, currentX } = state;
      const active = state.mouseActive && !state.reducedMotion;

      if (!state.reducedMotion) {
        state.time = timestamp * 0.001;
      }

      if (state.reducedMotion) {
        state.smoothMouseX = state.mouseX;
      } else if (active) {
        state.smoothMouseX += (state.mouseX - state.smoothMouseX) * MOUSE_LERP;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(216, 215, 209, 0.84)";
      ctx.lineWidth = LINE_WIDTH;

      for (let i = 0; i < baseX.length; i += 1) {
        const target = computeTargetX(baseX[i], state.smoothMouseX, active);
        const strength = hoverStrength(baseX[i], state.smoothMouseX, active);

        if (state.reducedMotion) {
          currentX[i] = target;
        } else {
          currentX[i] += (target - currentX[i]) * LINE_LERP;
        }

        const x = currentX[i];
        if (x < -12 || x > width + 12) continue;

        const ambientOnly = state.reducedMotion ? 0 : 0.42;

        if (state.reducedMotion) {
          const px = Math.round(x) + 0.5;
          ctx.beginPath();
          ctx.moveTo(px, 0);
          ctx.lineTo(px, height);
          ctx.stroke();
        } else {
          drawCurvedLine(x, height, i, Math.max(strength, ambientOnly), state.time);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
