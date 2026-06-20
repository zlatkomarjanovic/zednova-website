import { CheckCircle2, Send, Sparkles } from "lucide-react";

import { AnimationBackdrop } from "@/components/animations/AnimationBackdrop";

/**
 * Decorative loop: a glowing, gently hovering AI orb sits idle, a cursor
 * flies in and clicks it, and the orb sinks straight down — same x
 * position throughout, only its height changes — to dock like a chat
 * launcher. A panel then opens centered above the dock and grows upward
 * from its own bottom edge. Inside, a real back-and-forth plays out: the
 * assistant opens with a question, a simulated reply gets typed and sent,
 * the assistant answers, and a confirmation card pops in as the action
 * that reply triggered. The orb's position, click-bump, float and glow
 * each live on their own layer so none of the transforms fight each
 * other, and the icon itself never rotates — only a moving highlight
 * fakes the 3D shading, so it never warps.
 */
export function AIChatbotAnimation({ className }: { className?: string }) {
  return (
    <AnimationBackdrop className={className}>
      <div className="zn-ai-stage relative mx-auto h-full w-full max-w-[420px]">
        <span className="zn-ai-particle" style={{ left: "16%", top: "22%", animationDelay: "0.2s" }} />
        <span className="zn-ai-particle" style={{ left: "82%", top: "18%", animationDelay: "1.1s" }} />
        <span className="zn-ai-particle" style={{ left: "22%", top: "72%", animationDelay: "1.8s" }} />
        <span className="zn-ai-particle" style={{ left: "12%", top: "50%", animationDelay: "0.7s" }} />

        {/* layer 1: position (idle center -> straight down to a docked low-center spot -> back) */}
        <div className="zn-ai-orb-pos absolute" style={{ transform: "translate(-50%, -50%)" }}>
          {/* layer 2: click bump + dock shrink/grow (scale only) */}
          <div className="zn-ai-orb-scale">
            {/* layer 3: continuous hover bob, independent of the narrative timeline */}
            <div className="zn-ai-orb-bob relative flex size-16 items-center justify-center">
              <span className="zn-ai-orb-halo absolute -inset-2 rounded-full" aria-hidden="true" />
              {/* layer 4: the sphere itself — never rotated, so the icon never warps */}
              <div className="zn-ai-orb-sphere relative flex size-16 items-center justify-center rounded-full">
                <span className="zn-ai-orb-shine absolute size-6 rounded-full" aria-hidden="true" />
                <Sparkles className="relative z-10 size-7 text-white" strokeWidth={1.75} />
              </div>
            </div>
          </div>
        </div>

        <div className="zn-ai-cursor pointer-events-none absolute left-0 top-0 z-20">
          <span className="zn-ai-click-ripple absolute -left-2.5 -top-2.5 size-7 rounded-full bg-zn-text" />
          <svg width="14" height="17" viewBox="0 0 13 16" fill="none" className="relative drop-shadow-sm">
            <path
              d="M1 1L12 9.5L7.2 10.5L9.4 15L7 16L4.6 11.1L1 14.4V1Z"
              fill="#1f2620"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="zn-ai-panel absolute left-1/2 bottom-[26%] z-20 rounded-[10px] border border-black/[0.06] bg-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-1.5 border-b border-black/[0.06] px-2.5 py-2">
            <span className="flex size-4 items-center justify-center rounded-full bg-zn-text">
              <Sparkles className="size-2.5 text-white" strokeWidth={2} />
            </span>
            <span className="text-[8px] font-medium text-zn-text">AI Assistant</span>
            <span className="zn-ai-online ml-auto size-1.5 rounded-full bg-[#61c454]" />
          </div>

          <div className="flex flex-col gap-1.5 px-2.5 py-2.5">
            {/* Turn 1 — assistant opens */}
            <div className="relative flex h-[19px] w-full items-center">
              <div className="zn-ai-turn1-typing absolute left-0 flex items-center gap-0.5 rounded-[6px] bg-zn-bg-3 px-2 py-1.5">
                <span className="zn-ai-dot size-1 rounded-full bg-zn-text/50" />
                <span className="zn-ai-dot size-1 rounded-full bg-zn-text/50" />
                <span className="zn-ai-dot size-1 rounded-full bg-zn-text/50" />
              </div>
              <div className="zn-ai-turn1-msg absolute left-0 flex max-w-[90%] items-start gap-1 rounded-[6px] bg-zn-bg-3 px-2 py-1.5 text-[8px] leading-tight text-zn-text/80">
                <Sparkles className="mt-px size-2 shrink-0 text-zn-text/35" strokeWidth={2} />
                Hi! Need help booking a visit?
              </div>
            </div>

            {/* Turn 2 — simulated user reply */}
            <div className="relative flex h-[19px] w-full items-center justify-end">
              <div className="zn-ai-turn2-typing absolute right-0 flex items-center gap-0.5 rounded-[6px] bg-zn-text/15 px-2 py-1.5">
                <span className="zn-ai-dot size-1 rounded-full bg-zn-text/55" />
                <span className="zn-ai-dot size-1 rounded-full bg-zn-text/55" />
                <span className="zn-ai-dot size-1 rounded-full bg-zn-text/55" />
              </div>
              <div className="zn-ai-turn2-msg absolute right-0 max-w-[82%] rounded-[6px] bg-zn-text px-2 py-1.5 text-[8px] leading-tight text-white">
                Yes, Friday afternoon
              </div>
            </div>

            {/* Turn 3 — assistant confirms */}
            <div className="relative flex h-[19px] w-full items-center">
              <div className="zn-ai-turn3-typing absolute left-0 flex items-center gap-0.5 rounded-[6px] bg-zn-bg-3 px-2 py-1.5">
                <span className="zn-ai-dot size-1 rounded-full bg-zn-text/50" />
                <span className="zn-ai-dot size-1 rounded-full bg-zn-text/50" />
                <span className="zn-ai-dot size-1 rounded-full bg-zn-text/50" />
              </div>
              <div className="zn-ai-turn3-msg absolute left-0 flex max-w-[94%] items-start gap-1 rounded-[6px] bg-zn-bg-3 px-2 py-1.5 text-[8px] leading-tight text-zn-text/80">
                <Sparkles className="mt-px size-2 shrink-0 text-zn-text/35" strokeWidth={2} />
                Got it — you&rsquo;re booked for Friday at 2:00 PM.
              </div>
            </div>

            {/* Triggered follow-up action */}
            <div className="zn-ai-confirm flex items-center justify-center gap-1 rounded-[6px] border border-[#61c454]/30 bg-[#61c454]/10 px-2 py-1.5 text-[8px] font-medium text-[#3f8f4a]">
              <CheckCircle2 className="size-2.5" strokeWidth={2} />
              Appointment booked
            </div>
          </div>

          <div className="flex items-center gap-1.5 border-t border-black/[0.06] px-2.5 py-1.5">
            <span className="flex-1 truncate text-[7.5px] text-zn-text/30">Ask anything…</span>
            <Send className="size-3 text-zn-text/40" strokeWidth={1.75} />
          </div>
        </div>
      </div>

      <style>{`
        .zn-ai-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--color-zn-text) 35%, transparent);
          opacity: 0;
          animation: zn-ai-twinkle 3.2s ease-in-out infinite;
        }
        @keyframes zn-ai-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }

        .zn-ai-orb-pos {
          left: 50%;
          top: 46%;
          animation: zn-ai-orb-pos 18s var(--ease-zn) infinite;
        }
        @keyframes zn-ai-orb-pos {
          0%, 33% { left: 50%; top: 46%; }
          44%, 94% { left: 50%; top: 78%; }
          99%, 100% { left: 50%; top: 46%; }
        }

        .zn-ai-orb-scale {
          animation: zn-ai-orb-scale 18s var(--ease-zn) infinite;
        }
        @keyframes zn-ai-orb-scale {
          0%, 30% { transform: scale(1); }
          33% { transform: scale(0.82); }
          37% { transform: scale(1.08); }
          41% { transform: scale(1); }
          44%, 94% { transform: scale(0.7); }
          97% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }

        .zn-ai-orb-bob {
          animation: zn-ai-orb-bob 3.6s ease-in-out infinite;
        }
        @keyframes zn-ai-orb-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .zn-ai-orb-halo {
          background: radial-gradient(circle, color-mix(in srgb, #8fd6a8 55%, transparent) 0%, transparent 70%);
          filter: blur(2px);
          animation: zn-ai-orb-halo 4.2s ease-in-out infinite;
        }
        @keyframes zn-ai-orb-halo {
          0%, 100% { opacity: 0.35; transform: scale(0.92); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }

        .zn-ai-orb-sphere {
          background: radial-gradient(circle at 32% 28%, #5c6e60 0%, #232b22 55%, #11150f 100%);
          box-shadow:
            inset -6px -6px 14px rgba(255, 255, 255, 0.18),
            inset 6px 10px 18px rgba(0, 0, 0, 0.5),
            0 14px 28px -10px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          animation: zn-ai-orb-flash 18s var(--ease-zn) infinite;
        }
        @keyframes zn-ai-orb-flash {
          0%, 31% {
            box-shadow:
              inset -6px -6px 14px rgba(255, 255, 255, 0.18),
              inset 6px 10px 18px rgba(0, 0, 0, 0.5),
              0 14px 28px -10px rgba(0, 0, 0, 0.45),
              0 0 0 0 transparent;
            filter: brightness(1);
          }
          34% {
            box-shadow:
              inset -6px -6px 14px rgba(255, 255, 255, 0.25),
              inset 6px 10px 18px rgba(0, 0, 0, 0.5),
              0 14px 28px -10px rgba(0, 0, 0, 0.45),
              0 0 24px 7px color-mix(in srgb, #8fd6a8 60%, transparent);
            filter: brightness(1.3);
          }
          41%, 85% {
            box-shadow:
              inset -6px -6px 14px rgba(255, 255, 255, 0.18),
              inset 6px 10px 18px rgba(0, 0, 0, 0.5),
              0 14px 28px -10px rgba(0, 0, 0, 0.45),
              0 0 0 0 transparent;
            filter: brightness(1);
          }
          89% {
            box-shadow:
              inset -6px -6px 14px rgba(255, 255, 255, 0.25),
              inset 6px 10px 18px rgba(0, 0, 0, 0.5),
              0 14px 28px -10px rgba(0, 0, 0, 0.45),
              0 0 22px 7px color-mix(in srgb, #61c454 65%, transparent);
            filter: brightness(1.3);
          }
          94%, 100% {
            box-shadow:
              inset -6px -6px 14px rgba(255, 255, 255, 0.18),
              inset 6px 10px 18px rgba(0, 0, 0, 0.5),
              0 14px 28px -10px rgba(0, 0, 0, 0.45),
              0 0 0 0 transparent;
            filter: brightness(1);
          }
        }

        .zn-ai-orb-shine {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, transparent 75%);
          filter: blur(1px);
          animation: zn-ai-orb-shine 5s ease-in-out infinite;
        }
        @keyframes zn-ai-orb-shine {
          0%, 100% { left: 28%; top: 24%; opacity: 0.55; }
          25% { left: 60%; top: 20%; opacity: 0.7; }
          50% { left: 64%; top: 58%; opacity: 0.4; }
          75% { left: 30%; top: 60%; opacity: 0.6; }
        }

        .zn-ai-cursor {
          opacity: 0;
          animation:
            zn-ai-cursor-move 18s var(--ease-zn) infinite,
            zn-ai-cursor-click 18s linear infinite;
        }
        @keyframes zn-ai-cursor-move {
          0%, 17% { left: 92%; top: 86%; opacity: 0; }
          21% { left: 92%; top: 86%; opacity: 1; }
          30% { left: 50%; top: 46%; opacity: 1; }
          34% { left: 50%; top: 46%; opacity: 1; }
          39% { left: 50%; top: 46%; opacity: 0; }
          100% { left: 92%; top: 86%; opacity: 0; }
        }
        @keyframes zn-ai-cursor-click {
          0%, 32% { transform: scale(1); }
          34% { transform: scale(0.8); }
          37% { transform: scale(1.1); }
          40%, 100% { transform: scale(1); }
        }
        .zn-ai-click-ripple {
          opacity: 0;
          transform: scale(0.4);
          animation: zn-ai-ripple 18s var(--ease-zn) infinite;
        }
        @keyframes zn-ai-ripple {
          0%, 32% { opacity: 0; transform: scale(0.4); }
          35% { opacity: 0.4; transform: scale(1); }
          40% { opacity: 0; transform: scale(1.9); }
          41%, 100% { opacity: 0; transform: scale(0.4); }
        }

        .zn-ai-panel {
          width: min(82%, 240px);
          transform-origin: 50% 100%;
          opacity: 0;
          transform: translateX(-50%) scale(0.3);
          animation: zn-ai-panel 18s var(--ease-zn) infinite;
        }
        @keyframes zn-ai-panel {
          0%, 46% { opacity: 0; transform: translateX(-50%) scale(0.3); }
          52% { opacity: 1; transform: translateX(-50%) scale(1); }
          93% { opacity: 1; transform: translateX(-50%) scale(1); }
          97%, 100% { opacity: 0; transform: translateX(-50%) scale(0.3); }
        }

        .zn-ai-online {
          animation: zn-ai-online-pulse 2.2s ease-in-out infinite;
        }
        @keyframes zn-ai-online-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .zn-ai-dot {
          animation: zn-ai-bounce 1.1s ease-in-out infinite;
        }
        .zn-ai-dot:nth-child(2) { animation-delay: 0.15s; }
        .zn-ai-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes zn-ai-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-2px); opacity: 1; }
        }

        .zn-ai-turn1-typing { opacity: 0; animation: zn-ai-turn1-typing 18s linear infinite; }
        @keyframes zn-ai-turn1-typing {
          0%, 52% { opacity: 0; }
          54%, 57% { opacity: 1; }
          59%, 100% { opacity: 0; }
        }
        .zn-ai-turn1-msg { opacity: 0; transform: translateY(4px); animation: zn-ai-turn1-msg 18s var(--ease-zn) infinite; }
        @keyframes zn-ai-turn1-msg {
          0%, 58% { opacity: 0; transform: translateY(4px); }
          61%, 100% { opacity: 1; transform: translateY(0); }
        }

        .zn-ai-turn2-typing { opacity: 0; animation: zn-ai-turn2-typing 18s linear infinite; }
        @keyframes zn-ai-turn2-typing {
          0%, 63% { opacity: 0; }
          65%, 70% { opacity: 1; }
          72%, 100% { opacity: 0; }
        }
        .zn-ai-turn2-msg { opacity: 0; transform: translateY(4px); animation: zn-ai-turn2-msg 18s var(--ease-zn) infinite; }
        @keyframes zn-ai-turn2-msg {
          0%, 71% { opacity: 0; transform: translateY(4px); }
          74%, 100% { opacity: 1; transform: translateY(0); }
        }

        .zn-ai-turn3-typing { opacity: 0; animation: zn-ai-turn3-typing 18s linear infinite; }
        @keyframes zn-ai-turn3-typing {
          0%, 76% { opacity: 0; }
          78%, 81% { opacity: 1; }
          83%, 100% { opacity: 0; }
        }
        .zn-ai-turn3-msg { opacity: 0; transform: translateY(4px); animation: zn-ai-turn3-msg 18s var(--ease-zn) infinite; }
        @keyframes zn-ai-turn3-msg {
          0%, 82% { opacity: 0; transform: translateY(4px); }
          85%, 100% { opacity: 1; transform: translateY(0); }
        }

        .zn-ai-confirm {
          opacity: 0;
          transform: scale(0.85);
          animation: zn-ai-confirm 18s var(--ease-zn) infinite;
        }
        @keyframes zn-ai-confirm {
          0%, 85% { opacity: 0; transform: scale(0.85); }
          89% { opacity: 1; transform: scale(1.08); }
          92%, 100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </AnimationBackdrop>
  );
}
