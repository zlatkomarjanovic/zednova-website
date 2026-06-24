"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const BASE_SPACING = 22;
const EXPANDED_SPACING = 80;
const INFLUENCE_RADIUS = 380;
const MAX_PUSH = (EXPANDED_SPACING - BASE_SPACING) / 2;
const MOUSE_SMOOTH_RATE = 2.8;
const LINE_SMOOTH_RATE = 2.4;
const HOVER_IN_RATE = 1.1;
const HOVER_OUT_RATE = 4.8;
const Y_STEP = 5;
const AMBIENT_AMP = 7;
const HOVER_AMP = 28;
const AMBIENT_SPEED = 0.24;
const HOVER_SPEED_BOOST = 0.32;
const AMBIENT_STRENGTH = 0.42;
const LINE_WIDTH = 0.45;
const MAX_DELTA_MS = 24;
const MAX_ROTATION = 0.05;
const ROTATION_Y_RADIUS = 280;
const PHASE_WRAP = Math.PI * 2;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function smoothTowards(current: number, target: number, rate: number, deltaMs: number) {
  const t = 1 - Math.exp(-rate * deltaMs * 0.001);
  return current + (target - current) * t;
}

function computeTargetX(baseX: number, mouseX: number, blend: number) {
  if (blend <= 0.001) return baseX;

  const dx = baseX - mouseX;
  const absDx = Math.abs(dx);
  if (absDx > INFLUENCE_RADIUS) return baseX;

  const t = 1 - absDx / INFLUENCE_RADIUS;
  return baseX + Math.sign(dx || 1) * smoothstep(t) * blend * MAX_PUSH;
}

function hoverStrength(baseX: number, mouseX: number, active: boolean) {
  if (!active) return 0;

  const absDx = Math.abs(baseX - mouseX);
  if (absDx > INFLUENCE_RADIUS) return 0;

  return smoothstep(1 - absDx / INFLUENCE_RADIUS);
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
    smoothHover: [] as number[],
    mouseX: 0,
    mouseY: 0,
    smoothMouseX: 0,
    smoothMouseY: 0,
    mouseActive: false,
    reducedMotion: false,
    waveTime: 0,
    lastFrameMs: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;
    state.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    state.waveTime = 0;
    state.lastFrameMs = 0;

    let running = true;

    const rebuildLines = (width: number) => {
      const count = Math.ceil(width / BASE_SPACING) + 2;
      state.baseX = Array.from({ length: count }, (_, i) => (i + 0.5) * BASE_SPACING);
      state.currentX = [...state.baseX];
      state.smoothHover = new Array(count).fill(0);
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
      state.mouseY = rect.height * 0.5;
      state.smoothMouseY = rect.height * 0.5;
    };

    const onMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (!isInside(rect, event.clientX, event.clientY)) {
        state.mouseActive = false;
        return;
      }

      state.mouseX = event.clientX - rect.left;
      state.mouseY = event.clientY - rect.top;
      state.mouseActive = true;
    };

    const drawCurvedLine = (
      centerX: number,
      height: number,
      index: number,
      strength: number,
      waveTime: number,
      hoverBlend: number,
      pivotX: number,
      pivotY: number,
    ) => {
      const amp = AMBIENT_AMP + strength * HOVER_AMP;
      const freq = 0.0065 + strength * 0.0028;
      const speed = AMBIENT_SPEED + strength * HOVER_SPEED_BOOST;
      const phase = index * 0.62 - waveTime * speed;
      const rotSign = Math.sign(centerX - pivotX) || 1;

      ctx.beginPath();
      for (let y = 0; y <= height; y += Y_STEP) {
        const primary = Math.sin(y * freq + phase) * amp;
        const secondary = Math.sin(y * freq * 1.85 + phase * 1.25) * amp * 0.38;
        const tertiary = Math.sin(y * freq * 0.55 + phase * 0.7) * amp * 0.22;
        let px = centerX + primary + secondary + tertiary;

        if (hoverBlend > 0.08) {
          const yFalloff = 1 - Math.min(Math.abs(y - pivotY) / ROTATION_Y_RADIUS, 1);
          const local = hoverBlend * smoothstep(yFalloff);
          const angle = rotSign * local * MAX_ROTATION;
          const lx = px - pivotX;
          const ly = y - pivotY;
          px = pivotX + lx * Math.cos(angle) - ly * Math.sin(angle);
        }

        if (y === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();
    };

    const draw = (timestamp: number) => {
      if (!running) return;

      const deltaMs =
        state.lastFrameMs === 0
          ? 16.67
          : Math.min(Math.max(timestamp - state.lastFrameMs, 0), MAX_DELTA_MS);
      state.lastFrameMs = timestamp;

      const { width, height, baseX, currentX, smoothHover } = state;
      const active = state.mouseActive && !state.reducedMotion;

      if (!state.reducedMotion) {
        state.waveTime += deltaMs * 0.001;
        if (state.waveTime > 600) state.waveTime -= 600;
      }

      if (state.reducedMotion) {
        state.smoothMouseX = state.mouseX;
        state.smoothMouseY = state.mouseY;
      } else if (active) {
        state.smoothMouseX = smoothTowards(
          state.smoothMouseX,
          state.mouseX,
          MOUSE_SMOOTH_RATE,
          deltaMs,
        );
        state.smoothMouseY = smoothTowards(
          state.smoothMouseY,
          state.mouseY,
          MOUSE_SMOOTH_RATE,
          deltaMs,
        );
      }

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(216, 215, 209, 0.84)";
      ctx.lineWidth = LINE_WIDTH;

      for (let i = 0; i < baseX.length; i += 1) {
        const targetHover = active ? hoverStrength(baseX[i], state.smoothMouseX, active) : 0;
        const blendRate = targetHover > smoothHover[i] ? HOVER_IN_RATE : HOVER_OUT_RATE;
        smoothHover[i] = smoothTowards(smoothHover[i], targetHover, blendRate, deltaMs);

        const target = computeTargetX(baseX[i], state.smoothMouseX, smoothHover[i]);

        if (state.reducedMotion) {
          currentX[i] = target;
        } else {
          currentX[i] = smoothTowards(currentX[i], target, LINE_SMOOTH_RATE, deltaMs);
        }

        const x = currentX[i];
        if (x < -12 || x > width + 12) continue;

        const waveStrength = Math.max(smoothHover[i], AMBIENT_STRENGTH);

        if (state.reducedMotion) {
          const px = Math.round(x) + 0.5;
          ctx.beginPath();
          ctx.moveTo(px, 0);
          ctx.lineTo(px, height);
          ctx.stroke();
        } else {
          drawCurvedLine(
            x,
            height,
            i,
            waveStrength,
            state.waveTime,
            smoothHover[i],
            state.smoothMouseX,
            state.smoothMouseY,
          );
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", () => {
      state.lastFrameMs = 0;
    });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      state.lastFrameMs = 0;
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
