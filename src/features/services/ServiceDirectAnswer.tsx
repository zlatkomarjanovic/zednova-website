import type { ServiceQuickAnswer } from "@/lib/content/service-quick-answers";

export function ServiceDirectAnswer({ answer }: { answer: ServiceQuickAnswer }) {
  return (
    <aside className="article-direct-answer mb-8 max-w-2xl rounded-[2px] border border-zn-border bg-zn-bg-2/60 p-6">
      <p className="zn-label text-zn-text-3">{answer.question}</p>
      <p className="mt-3 text-base leading-relaxed text-zn-text">{answer.shortAnswer}</p>
    </aside>
  );
}
