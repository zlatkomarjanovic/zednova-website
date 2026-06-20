"use client";

import { CalendarCheck, Mail, MessageSquare, Split, Zap } from "lucide-react";

import { AnimationBackdrop } from "@/components/animations/AnimationBackdrop";

const VB_W = 100;
const VB_H = 62.5;
const sy = (y: number) => (y / 100) * VB_H;
const ACTIVE_GREEN = "#7aab8a";
const CYCLE = "18s";

type NodeDef = {
  key: string;
  x: number;
  y: number;
  icon: typeof Zap;
  label: string;
  glowClass: string;
};

const NODES: NodeDef[] = [
  { key: "lead", x: 22, y: 50, icon: Zap, label: "New lead", glowClass: "zn-auto-glow-lead" },
  { key: "route", x: 42, y: 50, icon: Split, label: "Route", glowClass: "zn-auto-glow-route" },
  { key: "email", x: 62, y: 30, icon: Mail, label: "Email", glowClass: "zn-auto-glow-email" },
  { key: "sms", x: 62, y: 70, icon: MessageSquare, label: "SMS", glowClass: "zn-auto-glow-sms" },
  { key: "done", x: 82, y: 50, icon: CalendarCheck, label: "Booked", glowClass: "zn-auto-glow-done" },
];

const byKey = (key: string) => NODES.find((n) => n.key === key)!;
const edge = (aKey: string, bKey: string) => {
  const a = byKey(aKey);
  const b = byKey(bKey);
  return `M ${a.x} ${sy(a.y)} L ${b.x} ${sy(b.y)}`;
};

const LINKS = [
  { d: edge("lead", "route"), flow: "zn-auto-flow-1", pktStart: 8, pktEnd: 18 },
  { d: edge("route", "email"), flow: "zn-auto-flow-2a", pktStart: 24, pktEnd: 34 },
  { d: edge("route", "sms"), flow: "zn-auto-flow-2b", pktStart: 26, pktEnd: 36 },
  { d: edge("email", "done"), flow: "zn-auto-flow-3a", pktStart: 40, pktEnd: 50 },
  { d: edge("sms", "done"), flow: "zn-auto-flow-3b", pktStart: 56, pktEnd: 66 },
] as const;

const flowKeyframes = LINKS.map(
  ({ flow, pktStart, pktEnd }) => `
        @keyframes ${flow} {
          0%, ${pktStart - 1}% { opacity: 0; stroke-dashoffset: 1; }
          ${pktStart}% { opacity: 1; stroke-dashoffset: 1; }
          ${pktEnd}% { stroke-dashoffset: 0; opacity: 1; }
          88% { stroke-dashoffset: 0; opacity: 1; }
          92%, 100% { opacity: 0; stroke-dashoffset: 1; }
        }`,
).join("");

const FOCUS = {
  lead: { ox: 22, oy: 50, tx: 28, ty: 0, s: 3.7 },
  route: { ox: 42, oy: 50, tx: 8, ty: 0, s: 3.7 },
  email: { ox: 62, oy: 30, tx: -12, ty: 20, s: 3.8 },
  sms: { ox: 62, oy: 70, tx: -12, ty: -20, s: 3.8 },
  done: { ox: 82, oy: 50, tx: -32, ty: 0, s: 3.9 },
} as const;

export function CRMAutomationAnimation({ className }: { className?: string }) {
  return (
    <AnimationBackdrop className={className}>
      <div className="zn-auto-camera absolute inset-0">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {LINKS.map(({ d }, i) => (
            <path
              key={`base-${i}`}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="text-zn-text/25"
            />
          ))}
          {LINKS.map(({ d, flow }, i) => (
            <path
              key={`flow-${i}`}
              d={d}
              fill="none"
              stroke={ACTIVE_GREEN}
              strokeWidth="1"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 0"
              vectorEffect="non-scaling-stroke"
              className={flow}
            />
          ))}
          {LINKS.map(({ d, pktStart, pktEnd }, i) => {
            const t0 = (pktStart - 1) / 100;
            const t1 = pktStart / 100;
            const t2 = pktEnd / 100;
            const t3 = Math.min((pktEnd + 1) / 100, 0.99);
            return (
              <circle key={`pkt-${i}`} r="0.46" fill={ACTIVE_GREEN} opacity={0}>
                <animate
                  attributeName="opacity"
                  dur={CYCLE}
                  repeatCount="indefinite"
                  values="0;0;1;1;0;0"
                  keyTimes={`0;${t0};${t1};${t2};${t3};1`}
                />
                <animateMotion
                  dur={CYCLE}
                  repeatCount="indefinite"
                  path={d}
                  keyPoints="0;0;1;1"
                  keyTimes={`0;${t1};${t2};1`}
                  calcMode="linear"
                />
              </circle>
            );
          })}
        </svg>

        {NODES.map(({ key, x, y, icon: Icon, label, glowClass }) => (
          <div
            key={key}
            className={`absolute ${glowClass}`}
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className="zn-auto-node relative z-[2] flex size-7 items-center justify-center rounded-full border bg-white">
              {key === "lead" && (
                <span className="zn-auto-trigger-ping absolute inset-0 rounded-full" aria-hidden="true" />
              )}
              <Icon className="size-3.5 text-zn-text/45" strokeWidth={1.75} />
            </div>
            <span className="absolute left-1/2 top-[calc(100%+5px)] z-[1] -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-1.5 py-0.5 text-[7px] font-medium tracking-tight text-zn-text/55">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-[4%] top-[8%] flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-white/92 px-2.5 py-1.5 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.28)]">
          <span className="zn-auto-hud-dot size-1.5 shrink-0 rounded-full bg-[#7aab8a]" />
          <span className="relative inline-block h-[10px] w-[48px]">
            <span className="zn-auto-hud-stage zn-auto-hud-stage-1 absolute inset-0 flex items-center whitespace-nowrap text-[8px] font-medium text-zn-text/60">
              New lead
            </span>
            <span className="zn-auto-hud-stage zn-auto-hud-stage-2 absolute inset-0 flex items-center whitespace-nowrap text-[8px] font-medium text-zn-text/60">
              Routing
            </span>
            <span className="zn-auto-hud-stage zn-auto-hud-stage-3 absolute inset-0 flex items-center whitespace-nowrap text-[8px] font-medium text-zn-text/60">
              Email
            </span>
            <span className="zn-auto-hud-stage zn-auto-hud-stage-4 absolute inset-0 flex items-center whitespace-nowrap text-[8px] font-medium text-zn-text/60">
              SMS
            </span>
            <span className="zn-auto-hud-stage zn-auto-hud-stage-5 absolute inset-0 flex items-center whitespace-nowrap text-[8px] font-medium text-zn-text/60">
              Booked
            </span>
          </span>
        </div>

        <div className="zn-auto-toast absolute right-[4%] top-[8%] flex items-center gap-1.5 rounded-full border border-[#7aab8a]/40 bg-white px-2.5 py-1.5 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)]">
          <span className="size-1.5 rounded-full bg-[#7aab8a]" />
          <span className="text-[8px] font-medium tracking-tight text-zn-text/75">
            Appointment booked
          </span>
        </div>
      </div>

      <style>{`
        .zn-auto-camera {
          animation: zn-auto-camera ${CYCLE} cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        @keyframes zn-auto-camera {
          0%, 4% {
            transform-origin: 50% 50%;
            transform: translate(0%, 0%) scale(1);
          }
          6%, 20% {
            transform-origin: ${FOCUS.lead.ox}% ${FOCUS.lead.oy}%;
            transform: translate(${FOCUS.lead.tx}%, ${FOCUS.lead.ty}%) scale(${FOCUS.lead.s});
          }
          22%, 36% {
            transform-origin: ${FOCUS.route.ox}% ${FOCUS.route.oy}%;
            transform: translate(${FOCUS.route.tx}%, ${FOCUS.route.ty}%) scale(${FOCUS.route.s});
          }
          38%, 52% {
            transform-origin: ${FOCUS.email.ox}% ${FOCUS.email.oy}%;
            transform: translate(${FOCUS.email.tx}%, ${FOCUS.email.ty}%) scale(${FOCUS.email.s});
          }
          54%, 68% {
            transform-origin: ${FOCUS.sms.ox}% ${FOCUS.sms.oy}%;
            transform: translate(${FOCUS.sms.tx}%, ${FOCUS.sms.ty}%) scale(${FOCUS.sms.s});
          }
          70%, 86% {
            transform-origin: ${FOCUS.done.ox}% ${FOCUS.done.oy}%;
            transform: translate(${FOCUS.done.tx}%, ${FOCUS.done.ty}%) scale(${FOCUS.done.s});
          }
          90%, 100% {
            transform-origin: 50% 50%;
            transform: translate(0%, 0%) scale(1);
          }
        }

        .zn-auto-glow-lead { animation: zn-auto-glow-lead ${CYCLE} ease-in-out infinite; z-index: 1; }
        .zn-auto-glow-route { animation: zn-auto-glow-route ${CYCLE} ease-in-out infinite; z-index: 1; }
        .zn-auto-glow-email { animation: zn-auto-glow-email ${CYCLE} ease-in-out infinite; z-index: 1; }
        .zn-auto-glow-sms { animation: zn-auto-glow-sms ${CYCLE} ease-in-out infinite; z-index: 1; }
        .zn-auto-glow-done { animation: zn-auto-glow-done ${CYCLE} ease-in-out infinite; z-index: 1; }

        .zn-auto-node {
          border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent);
        }

        .zn-auto-trigger-ping {
          border: 1.5px solid ${ACTIVE_GREEN};
          animation: zn-auto-trigger-ping ${CYCLE} ease-out infinite;
        }
        @keyframes zn-auto-trigger-ping {
          0%, 4% { opacity: 0; transform: scale(1); }
          7% { opacity: 0.85; transform: scale(1); }
          14% { opacity: 0; transform: scale(2.2); }
          15%, 100% { opacity: 0; transform: scale(1); }
        }

        @keyframes zn-auto-glow-lead {
          0%, 5% { z-index: 1; }
          7%, 16% { z-index: 20; }
          20%, 100% { z-index: 1; }
        }
        @keyframes zn-auto-glow-route {
          0%, 21% { z-index: 1; }
          23%, 32% { z-index: 20; }
          36%, 100% { z-index: 1; }
        }
        @keyframes zn-auto-glow-email {
          0%, 37% { z-index: 1; }
          39%, 48% { z-index: 20; }
          52%, 100% { z-index: 1; }
        }
        @keyframes zn-auto-glow-sms {
          0%, 53% { z-index: 1; }
          55%, 64% { z-index: 20; }
          68%, 100% { z-index: 1; }
        }
        @keyframes zn-auto-glow-done {
          0%, 69% { z-index: 1; }
          71%, 82% { z-index: 20; }
          86%, 100% { z-index: 1; }
        }

        .zn-auto-glow-lead .zn-auto-node { animation: zn-auto-node-glow-lead ${CYCLE} ease-in-out infinite; }
        .zn-auto-glow-route .zn-auto-node { animation: zn-auto-node-glow-route ${CYCLE} ease-in-out infinite; }
        .zn-auto-glow-email .zn-auto-node { animation: zn-auto-node-glow-email ${CYCLE} ease-in-out infinite; }
        .zn-auto-glow-sms .zn-auto-node { animation: zn-auto-node-glow-sms ${CYCLE} ease-in-out infinite; }
        .zn-auto-glow-done .zn-auto-node { animation: zn-auto-node-glow-done ${CYCLE} ease-in-out infinite; }

        @keyframes zn-auto-node-glow-lead {
          0%, 5% { box-shadow: 0 0 0 0 transparent; border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent); }
          7%, 16% { box-shadow: 0 0 0 7px color-mix(in srgb, ${ACTIVE_GREEN} 42%, transparent); border-color: ${ACTIVE_GREEN}; }
          20%, 100% { box-shadow: 0 0 0 0 transparent; border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent); }
        }
        @keyframes zn-auto-node-glow-route {
          0%, 21% { box-shadow: 0 0 0 0 transparent; border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent); }
          23%, 32% { box-shadow: 0 0 0 7px color-mix(in srgb, ${ACTIVE_GREEN} 42%, transparent); border-color: ${ACTIVE_GREEN}; }
          36%, 100% { box-shadow: 0 0 0 0 transparent; border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent); }
        }
        @keyframes zn-auto-node-glow-email {
          0%, 37% { box-shadow: 0 0 0 0 transparent; border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent); }
          39%, 48% { box-shadow: 0 0 0 7px color-mix(in srgb, ${ACTIVE_GREEN} 42%, transparent); border-color: ${ACTIVE_GREEN}; }
          52%, 100% { box-shadow: 0 0 0 0 transparent; border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent); }
        }
        @keyframes zn-auto-node-glow-sms {
          0%, 53% { box-shadow: 0 0 0 0 transparent; border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent); }
          55%, 64% { box-shadow: 0 0 0 7px color-mix(in srgb, ${ACTIVE_GREEN} 42%, transparent); border-color: ${ACTIVE_GREEN}; }
          68%, 100% { box-shadow: 0 0 0 0 transparent; border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent); }
        }
        @keyframes zn-auto-node-glow-done {
          0%, 69% { box-shadow: 0 0 0 0 transparent; border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent); }
          71%, 82% { box-shadow: 0 0 0 7px color-mix(in srgb, ${ACTIVE_GREEN} 42%, transparent); border-color: ${ACTIVE_GREEN}; }
          86%, 100% { box-shadow: 0 0 0 0 transparent; border-color: color-mix(in srgb, var(--color-zn-text) 14%, transparent); }
        }

        .zn-auto-flow-1, .zn-auto-flow-2a, .zn-auto-flow-2b, .zn-auto-flow-3a, .zn-auto-flow-3b {
          opacity: 0;
          stroke-dashoffset: 1;
          animation-duration: ${CYCLE};
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .zn-auto-flow-1 { animation-name: zn-auto-flow-1; }
        .zn-auto-flow-2a { animation-name: zn-auto-flow-2a; }
        .zn-auto-flow-2b { animation-name: zn-auto-flow-2b; }
        .zn-auto-flow-3a { animation-name: zn-auto-flow-3a; }
        .zn-auto-flow-3b { animation-name: zn-auto-flow-3b; }
        ${flowKeyframes}

        .zn-auto-hud-dot { animation: zn-auto-hud-dot ${CYCLE} ease-in-out infinite; }
        @keyframes zn-auto-hud-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

        .zn-auto-hud-stage { opacity: 0; animation-duration: ${CYCLE}; animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); animation-iteration-count: infinite; }
        .zn-auto-hud-stage-1 { animation-name: zn-auto-hud-stage-1; }
        .zn-auto-hud-stage-2 { animation-name: zn-auto-hud-stage-2; }
        .zn-auto-hud-stage-3 { animation-name: zn-auto-hud-stage-3; }
        .zn-auto-hud-stage-4 { animation-name: zn-auto-hud-stage-4; }
        .zn-auto-hud-stage-5 { animation-name: zn-auto-hud-stage-5; }
        @keyframes zn-auto-hud-stage-1 { 0%, 4% { opacity: 0; } 7%, 19% { opacity: 1; } 22%, 100% { opacity: 0; } }
        @keyframes zn-auto-hud-stage-2 { 0%, 20% { opacity: 0; } 23%, 35% { opacity: 1; } 38%, 100% { opacity: 0; } }
        @keyframes zn-auto-hud-stage-3 { 0%, 36% { opacity: 0; } 39%, 51% { opacity: 1; } 54%, 100% { opacity: 0; } }
        @keyframes zn-auto-hud-stage-4 { 0%, 52% { opacity: 0; } 55%, 67% { opacity: 1; } 70%, 100% { opacity: 0; } }
        @keyframes zn-auto-hud-stage-5 { 0%, 68% { opacity: 0; } 71%, 85% { opacity: 1; } 88%, 100% { opacity: 0; } }

        .zn-auto-toast {
          opacity: 0;
          transform: translateY(-6px) scale(0.94);
          animation: zn-auto-toast ${CYCLE} cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        @keyframes zn-auto-toast {
          0%, 72% { opacity: 0; transform: translateY(-6px) scale(0.94); }
          76% { opacity: 1; transform: translateY(0) scale(1); }
          88% { opacity: 1; transform: translateY(0) scale(1); }
          92%, 100% { opacity: 0; transform: translateY(-6px) scale(0.94); }
        }

        @media (prefers-reduced-motion: reduce) {
          .zn-auto-camera, .zn-auto-trigger-ping, .zn-auto-glow-lead, .zn-auto-glow-route,
          .zn-auto-glow-email, .zn-auto-glow-sms, .zn-auto-glow-done,
          .zn-auto-glow-lead .zn-auto-node, .zn-auto-glow-route .zn-auto-node,
          .zn-auto-glow-email .zn-auto-node, .zn-auto-glow-sms .zn-auto-node, .zn-auto-glow-done .zn-auto-node,
          .zn-auto-flow-1, .zn-auto-flow-2a, .zn-auto-flow-2b, .zn-auto-flow-3a, .zn-auto-flow-3b,
          .zn-auto-hud-dot, .zn-auto-hud-stage, .zn-auto-toast {
            animation: none !important;
          }
          .zn-auto-flow-1, .zn-auto-flow-2a, .zn-auto-flow-2b, .zn-auto-flow-3a, .zn-auto-flow-3b {
            opacity: 1;
            stroke-dashoffset: 0;
          }
          .zn-auto-toast { opacity: 1; transform: none; }
        }
      `}</style>
    </AnimationBackdrop>
  );
}
