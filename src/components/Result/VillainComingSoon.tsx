export function VillainComingSoon() {
  const red = "#ff5a5a";
  const paleText = "#f2dede";

  return (
    <section className="py-8" style={{ borderTop: "1px solid rgba(139,0,0,0.55)" }}>
      <div
        className="overflow-hidden rounded-md"
        style={{
          background:
            "linear-gradient(135deg, rgba(12,3,3,0.98), rgba(2,2,2,0.98) 48%, rgba(10,0,0,0.94)), radial-gradient(circle at top left, rgba(178,34,34,0.16), transparent 42%)",
          border: "1px solid rgba(178,34,34,0.5)",
          boxShadow: "0 0 70px rgba(139,0,0,0.24)",
          color: paleText,
        }}
      >
        <div className="grid gap-6 p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <p
              className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.24em]"
              style={{
                backgroundColor: "rgba(8,8,8,0.86)",
                border: "1px solid rgba(255,90,90,0.72)",
                color: red,
              }}
            >
              NEXT MOVIE
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: red }}>
              COMING SOON
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: red }}>
                VILLAIN PERSONALITY DIAGNOSIS
              </p>
              <h2
                className="mt-4 text-3xl font-black leading-tight sm:text-5xl"
                style={{ color: "#f5f5f5", textShadow: "0 0 18px rgba(178,34,34,0.32)" }}
              >
                あなたの中に眠るヴィランは誰だ？
              </h2>
            </div>

            <div className="space-y-2 text-base leading-8" style={{ color: paleText }}>
              <p>信念は、時に世界を救う。</p>
              <p>そして時に、世界を壊す。</p>
              <p>もしあなたが主人公ではなくなったら、どんなヴィランになるだろう。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
