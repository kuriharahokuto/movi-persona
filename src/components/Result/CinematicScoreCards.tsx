import type { CinematicScore } from "../../types/diagnosis.ts";

interface CinematicScoreCardsProps {
  scores: CinematicScore[];
}

export function CinematicScoreCards({ scores }: CinematicScoreCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {scores.map((score) => (
        <div key={score.label} className="rounded-md border border-cinema-gold/25 bg-white/[0.04] p-3">
          <p className="text-xs font-semibold text-cinema-silver">{score.label}</p>
          <p className="mt-2 text-3xl font-black text-cinema-gold">{score.value}</p>
          <p className="mt-1 text-sm font-bold text-neutral-100">{score.level}</p>
          <p className="mt-2 text-xs leading-5 text-cinema-silver">{score.description}</p>
        </div>
      ))}
    </div>
  );
}
