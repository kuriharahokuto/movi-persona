import { ja } from "../../i18n/ja.ts";
import type { CompatibilityMatch } from "../../types/diagnosis.ts";

interface CompatibilityListProps {
  matches: CompatibilityMatch[];
}

export function CompatibilityList({ matches }: CompatibilityListProps) {
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {matches.map((match, index) => (
        <article
          key={match.archetype.name}
          className="overflow-hidden rounded-md border border-white/10 bg-white/[0.04]"
        >
          <img
            src={match.archetype.imagePath}
            alt={`${match.archetype.japaneseName}の主人公ポスター`}
            className="aspect-[4/5] w-full bg-black object-contain"
          />
          <div className="space-y-2 p-4">
            <p className="text-2xl" aria-hidden="true">
              {medals[index]}
            </p>
            <p className="text-xs font-bold tracking-[0.18em] text-cinema-gold">
              {match.matchType}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cinema-gold">
              {match.archetype.name}
            </p>
            <h4 className="text-base font-black text-neutral-50">{match.archetype.japaneseName}</h4>
            <p className="rounded-full border border-cinema-gold/25 bg-cinema-gold/10 px-2 py-1 text-[11px] font-semibold leading-5 text-cinema-gold">
              {ja.archetypeTitles[match.archetype.name]}
            </p>
            <p className="text-sm font-black text-neutral-100">相性 {match.affinity}%</p>
            <p className="text-xs font-bold leading-5 text-cinema-gold">{match.role}</p>
            <p className="text-xs leading-6 text-cinema-silver">{match.reason}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
