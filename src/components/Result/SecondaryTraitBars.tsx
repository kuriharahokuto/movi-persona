import { ja } from "../../i18n/ja.ts";
import type { SecondaryTraitScores } from "../../types/diagnosis.ts";

interface SecondaryTraitBarsProps {
  traits: SecondaryTraitScores;
}

export function SecondaryTraitBars({ traits }: SecondaryTraitBarsProps) {
  return (
    <div className="grid gap-4">
      {Object.entries(traits).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-100">{ja.secondaryTraits[key as keyof typeof ja.secondaryTraits]}</span>
            <span className="text-cinema-gold">{value}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-cinema-gold" style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
