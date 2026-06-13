import type { TrailerReport } from "../../types/diagnosis.ts";

interface TrailerReportSectionProps {
  trailerReport: TrailerReport;
}

export function TrailerReportSection({ trailerReport }: TrailerReportSectionProps) {
  return (
    <div className="grid gap-3">
      <p className="rounded-md border border-cinema-gold/30 bg-cinema-gold/10 p-4 text-lg font-bold leading-8 text-neutral-50">
        {trailerReport.trailerTagline}
      </p>
      <div className="grid gap-3">
        <p className="rounded-md border border-white/10 bg-black/30 p-4 leading-8">
          {trailerReport.openingNarration}
        </p>
        <p className="rounded-md border border-white/10 bg-black/30 p-4 leading-8">
          {trailerReport.middleConflict}
        </p>
        <p className="rounded-md border border-white/10 bg-black/30 p-4 leading-8">
          {trailerReport.finalChoice}
        </p>
      </div>
      <p className="text-sm leading-7 text-cinema-silver">{trailerReport.trailerCopy}</p>
    </div>
  );
}
