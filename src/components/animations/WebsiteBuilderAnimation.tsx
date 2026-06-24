"use client";

import { Gauge, Layers, ShieldCheck } from "lucide-react";

import { AnimationBackdrop } from "@/components/animations/AnimationBackdrop";
import { BrowserChrome, CollabCursor } from "@/components/animations/BrowserChrome";
import { cn } from "@/lib/utils";

const CARDS = [
  { icon: Gauge, label: "Fast" },
  { icon: ShieldCheck, label: "Secure" },
  { icon: Layers, label: "Scalable" },
];

/**
 * Decorative loop: a marketing site assembled piece by piece inside a browser
 * window — nav, hero, feature row, a feature-card grid, footer — while two
 * collaborator cursors move around clicking buttons and cards into place.
 * Pure CSS keyframes (no JS timers) so it never desyncs or drops frames.
 */
export function WebsiteBuilderAnimation({ className }: { className?: string }) {
  return (
    <AnimationBackdrop className={className}>
      <div className="absolute inset-0 flex items-center justify-center p-[7%]">
        <BrowserChrome urlLabel="yourbusiness.com" className="max-w-[440px]">
          <div className="relative h-full w-full bg-[#fbfbfa] px-4 py-3.5">
            <div className="zn-wb-block zn-wb-nav flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-zn-text/40" />
                <span className="h-2 w-7 rounded-full bg-zn-text/25" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-4 rounded-full bg-zn-text/10" />
                <span className="h-1.5 w-4 rounded-full bg-zn-text/10" />
                <span className="h-1.5 w-4 rounded-full bg-zn-text/10" />
              </div>
              <span className="zn-wb-block zn-wb-nav-cta h-3 w-9 rounded-full bg-zn-text/80" />
            </div>

            <div className="mt-3 flex flex-col items-start gap-1">
              <span className="zn-wb-block zn-wb-eyebrow h-1.5 w-10 rounded-full bg-zn-text/20" />
              <span className="zn-wb-block zn-wb-h1 mt-1 h-2.5 w-[88%] rounded-full bg-zn-text/35" />
              <span className="zn-wb-block zn-wb-h2 h-2.5 w-2/3 rounded-full bg-zn-text/35" />
              <span className="zn-wb-block zn-wb-sub mt-1 h-1.5 w-3/4 rounded-full bg-zn-text/15" />
              <div className="mt-2 flex items-center gap-1.5">
                <span className="zn-wb-block zn-wb-btn-primary h-3.5 w-14 rounded-full bg-zn-text/90" />
                <span className="zn-wb-block zn-wb-btn-secondary h-3.5 w-12 rounded-full border border-zn-text/20" />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 rounded-[6px] bg-gradient-to-br from-[#e9ede4] to-[#dde6d8] p-2.5">
              <span className="zn-wb-block zn-wb-feature-img aspect-[4/3] rounded-[5px] bg-gradient-to-br from-zn-text/20 to-zn-text/5" />
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="zn-wb-block zn-wb-fline1 h-1.5 w-full rounded-full bg-zn-text/20" />
                <span className="zn-wb-block zn-wb-fline2 h-1.5 w-5/6 rounded-full bg-zn-text/20" />
                <span className="zn-wb-block zn-wb-fline3 h-1.5 w-4/6 rounded-full bg-zn-text/20" />
                <span className="zn-wb-block zn-wb-flink mt-1 h-1.5 w-8 rounded-full bg-zn-text/45" />
              </div>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              {CARDS.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className={cn(
                    "zn-wb-block zn-wb-card flex flex-col items-center gap-1 rounded-[5px] border border-zn-text/[0.08] bg-white py-2",
                    i === 0 && "zn-wb-card-1",
                    i === 1 && "zn-wb-card-2",
                    i === 2 && "zn-wb-card-3",
                  )}
                >
                  <Icon className="size-3 text-zn-text/40" strokeWidth={1.75} />
                  <span className="text-[6px] font-medium tracking-tight text-zn-text/40">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="zn-wb-block zn-wb-footer mt-2.5 flex items-center justify-between border-t border-zn-text/[0.06] pt-2">
              <span className="h-1.5 w-12 rounded-full bg-zn-text/10" />
              <div className="flex gap-1">
                <span className="size-1.5 rounded-full bg-zn-text/10" />
                <span className="size-1.5 rounded-full bg-zn-text/10" />
                <span className="size-1.5 rounded-full bg-zn-text/10" />
              </div>
            </div>
          </div>

          <CollabCursor color="#6366f1" name="Ava" animationClass="zn-wb-cursor-a" />
          <CollabCursor color="#f97316" name="Theo" animationClass="zn-wb-cursor-b" />
        </BrowserChrome>
      </div>

      <style>{`
        .zn-wb-block {
          opacity: 0;
          transform: translateY(7px) scale(0.97);
          animation: zn-wb-cycle 12s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        @keyframes zn-wb-cycle {
          0%, 4% { opacity: 0; transform: translateY(7px) scale(0.97); }
          11% { opacity: 1; transform: translateY(0) scale(1); }
          86% { opacity: 1; transform: translateY(0) scale(1); }
          94% { opacity: 0; transform: translateY(-5px) scale(0.98); }
          100% { opacity: 0; transform: translateY(7px) scale(0.97); }
        }
        .zn-wb-nav { animation-delay: 0s; }
        .zn-wb-nav-cta { animation-delay: 0.2s; }
        .zn-wb-eyebrow { animation-delay: 0.45s; }
        .zn-wb-h1 { animation-delay: 0.65s; }
        .zn-wb-h2 { animation-delay: 0.85s; }
        .zn-wb-sub { animation-delay: 1.05s; }
        .zn-wb-btn-primary { animation-delay: 1.3s; }
        .zn-wb-btn-secondary { animation-delay: 1.45s; }
        .zn-wb-feature-img { animation-delay: 1.75s; }
        .zn-wb-fline1 { animation-delay: 1.95s; }
        .zn-wb-fline2 { animation-delay: 2.1s; }
        .zn-wb-fline3 { animation-delay: 2.25s; }
        .zn-wb-flink { animation-delay: 2.45s; }
        .zn-wb-card-1 { animation-delay: 2.7s; }
        .zn-wb-card-2 { animation-delay: 2.85s; }
        .zn-wb-card-3 { animation-delay: 3s; }
        .zn-wb-footer { animation-delay: 3.25s; }

        .zn-wb-cursor-a, .zn-wb-cursor-b {
          animation-duration: 12s;
          animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
          animation-iteration-count: infinite;
        }
        .zn-wb-cursor-a { animation-name: zn-wb-path-a; }
        .zn-wb-cursor-b { animation-name: zn-wb-path-b; }

        @keyframes zn-wb-path-a {
          0% { left: -8%; top: 60%; opacity: 0; }
          14% { opacity: 0; left: -8%; top: 60%; }
          22% { opacity: 1; left: 30%; top: 40%; }
          27% { left: 30%; top: 40%; }
          33% { left: 22%; top: 56%; }
          44% { left: 22%; top: 80%; }
          50% { left: 22%; top: 80%; }
          62% { opacity: 1; left: 22%; top: 80%; }
          70% { opacity: 0; left: 8%; top: 90%; }
          100% { left: -8%; top: 60%; opacity: 0; }
        }
        @keyframes zn-wb-path-b {
          0% { left: 108%; top: 88%; opacity: 0; }
          24% { opacity: 0; left: 108%; top: 88%; }
          30% { opacity: 1; left: 48%; top: 40%; }
          36% { left: 48%; top: 40%; }
          46% { left: 62%; top: 56%; }
          55% { left: 80%; top: 78%; }
          61% { left: 80%; top: 78%; }
          72% { opacity: 1; left: 80%; top: 78%; }
          80% { opacity: 0; left: 100%; top: 70%; }
          100% { left: 108%; top: 88%; opacity: 0; }
        }

        .zn-cursor-ripple {
          opacity: 0;
          transform: scale(0.4);
        }
        .zn-wb-cursor-a .zn-cursor-ripple { animation: zn-wb-ripple-a 12s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
        .zn-wb-cursor-b .zn-cursor-ripple { animation: zn-wb-ripple-b 12s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
        @keyframes zn-wb-ripple-a {
          0%, 21% { opacity: 0; transform: scale(0.4); }
          24% { opacity: 0.45; transform: scale(1); }
          29% { opacity: 0; transform: scale(1.9); }
          30%, 60% { opacity: 0; transform: scale(0.4); }
          63% { opacity: 0.45; transform: scale(1); }
          68% { opacity: 0; transform: scale(1.9); }
          69%, 100% { opacity: 0; transform: scale(0.4); }
        }
        @keyframes zn-wb-ripple-b {
          0%, 29% { opacity: 0; transform: scale(0.4); }
          32% { opacity: 0.45; transform: scale(1); }
          37% { opacity: 0; transform: scale(1.9); }
          38%, 70% { opacity: 0; transform: scale(0.4); }
          73% { opacity: 0.45; transform: scale(1); }
          78% { opacity: 0; transform: scale(1.9); }
          79%, 100% { opacity: 0; transform: scale(0.4); }
        }
      `}</style>
    </AnimationBackdrop>
  );
}
