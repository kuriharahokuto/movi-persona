import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-cinema-black text-neutral-50">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_36%),linear-gradient(180deg,#0B1020_0%,#0A0A0A_45%)]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.07] grain" />
      <section className="relative mx-auto flex min-h-screen w-full max-w-[900px] flex-col px-5 py-6 sm:px-8">
        {children}
      </section>
    </main>
  );
}
