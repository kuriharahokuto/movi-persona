import type { ReactNode } from "react";

interface ResultSectionProps {
  title: string;
  children: ReactNode;
}

export function ResultSection({ title, children }: ResultSectionProps) {
  return (
    <section className="space-y-4 border-t border-white/10 py-7">
      <h3 className="text-xl font-black text-neutral-50">{title}</h3>
      <div className="text-sm leading-7 text-cinema-silver">{children}</div>
    </section>
  );
}
