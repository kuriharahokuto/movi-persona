import { ja } from "../../i18n/ja.ts";
import type { DimensionResults } from "../../types/diagnosis.ts";

interface CoreDimensionChartProps {
  dimensions: DimensionResults;
}

export function CoreDimensionChart({ dimensions }: CoreDimensionChartProps) {
  return (
    <div className="grid gap-4">
      {Object.entries(dimensions).map(([code, dimension]) => (
        <div key={code} className="space-y-2">
          <div className="text-xs font-semibold text-cinema-gold">
            {ja.dimensions[code as keyof typeof ja.dimensions]}
          </div>
          <div className="flex items-center justify-between gap-3 text-xs text-cinema-silver">
            <span>{ja.poles[dimension.positivePole]}</span>
            <span className="text-cinema-gold">{ja.poles[dimension.dominant]}</span>
            <span>{ja.poles[dimension.negativePole]}</span>
          </div>
          <div className="flex h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-cinema-gold transition-all"
              style={{ width: `${dimension.positivePercentage}%` }}
            />
            <div
              className="h-full bg-cinema-blue transition-all"
              style={{ width: `${dimension.negativePercentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
