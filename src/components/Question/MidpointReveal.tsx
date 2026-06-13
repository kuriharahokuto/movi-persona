import { ja } from "../../i18n/ja.ts";
import type { CorePole } from "../../types/diagnosis.ts";
import { StartButton } from "../Home/StartButton.tsx";

export interface MidpointTendency {
  name: string;
  symbol: string;
  imagePath: string;
  foreshadowTitle: string;
  foreshadowLines: string[];
}

interface MidpointRevealProps {
  dominantPole: CorePole | null;
  tendencies: MidpointTendency[];
  onContinue: () => void;
}

export function MidpointReveal({ dominantPole, tendencies, onContinue }: MidpointRevealProps) {
  const insight = dominantPole
    ? `${ja.poles[dominantPole]}${ja.midpoint.suffix}`
    : ja.midpoint.fallback;

  return (
    <div className="flex flex-1 flex-col justify-center gap-7 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cinema-gold sm:tracking-[0.34em]">
        {ja.midpoint.eyebrow}
      </p>
      <div className="space-y-3">
        <p className="text-sm font-bold text-cinema-gold">{ja.midpoint.title}</p>
        <h2 className="text-3xl font-black leading-tight sm:text-6xl">{insight}</h2>
      </div>
      {tendencies.length > 0 && (
        <section className="rounded-md border border-cinema-gold/25 bg-black/30 p-4 shadow-gold sm:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cinema-gold">
            {ja.midpoint.currentTendency}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {tendencies.map((tendency) => (
              <div
                key={tendency.name}
                className="overflow-hidden rounded-md border border-white/10 bg-white/[0.04]"
              >
                <img
                  src={tendency.imagePath}
                  alt={`${tendency.name}の主人公ポスター`}
                  className="aspect-[4/5] w-full bg-black object-contain"
                />
                <div className="px-4 py-3">
                  <p className="text-2xl" aria-hidden="true">
                    {tendency.symbol}
                  </p>
                  <p className="mt-2 text-base font-black leading-6 text-neutral-50">
                    {tendency.foreshadowTitle}
                  </p>
                  <div className="mt-2 space-y-1">
                    {tendency.foreshadowLines.map((line) => (
                      <p key={line} className="text-xs leading-5 text-cinema-silver">
                        {line}
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-cinema-gold">
                    近い主人公像: {tendency.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <p className="max-w-2xl text-lg leading-8 text-cinema-silver">{ja.midpoint.lead}</p>
      <StartButton onClick={onContinue}>{ja.midpoint.continue}</StartButton>
    </div>
  );
}
