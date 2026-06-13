import { ja } from "../../i18n/ja.ts";

interface AnalysisLoadingProps {
  onComplete: () => void;
}

export function AnalysisLoading({ onComplete }: AnalysisLoadingProps) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-8 py-10">
      <div className="mx-auto h-32 w-32 rounded-full border border-cinema-gold/30 bg-cinema-gold/5 p-3 shadow-gold sm:h-40 sm:w-40">
        <div className="h-full w-full animate-pulse rounded-full border border-cinema-gold/50" />
      </div>
      <div className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cinema-gold sm:tracking-[0.34em]">
          {ja.analysis.eyebrow}
        </p>
        <h2 className="text-3xl font-black leading-tight sm:text-5xl">{ja.analysis.title}</h2>
        <p className="mx-auto max-w-xl text-sm leading-7 text-cinema-silver sm:text-base">
          {ja.analysis.lead}
        </p>
      </div>
      <button
        type="button"
        onClick={onComplete}
        className="mx-auto min-h-12 rounded-md border border-cinema-gold/50 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-cinema-gold transition hover:border-cinema-gold"
      >
        {ja.analysis.reveal}
      </button>
    </div>
  );
}
