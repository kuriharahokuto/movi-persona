import { ja } from "../../i18n/ja.ts";
import { archetypes } from "../../data/archetypes.ts";
import type { ResultViewModel } from "../../types/diagnosis.ts";

interface ResultPosterProps {
  result: ResultViewModel;
  imageSrc: string;
}

export function ResultPoster({ result, imageSrc }: ResultPosterProps) {
  const { archetype } = result;
  const secondArchetype = archetypes[result.confidenceSummary.secondArchetype];
  const branchingLevel =
    result.confidence >= 80
      ? "分岐少なめ"
      : result.confidence >= 60
        ? "少し分岐あり"
        : result.confidence >= 40
          ? "複数の分岐あり"
          : result.confidence >= 20
            ? "分岐多め"
            : "分岐が大きい";
  const branchingDescription =
    result.confidence >= 80
      ? `${archetype.japaneseName}の物語が、一本の強い筋として表れています。`
      : result.confidence >= 60
        ? `${archetype.japaneseName}の物語が中心にあります。ただし${secondArchetype.japaneseName}の影も少し残されています。`
        : `${archetype.japaneseName}の物語が最も強く表れています。ただし${secondArchetype.japaneseName}の可能性も残されています。`;

  return (
    <section className="py-6">
      <div className="relative overflow-hidden rounded-md border border-cinema-gold/30 bg-black/70 shadow-poster">
        <div className="grid gap-0 sm:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="bg-black">
            <img
              src={imageSrc}
              alt={`${archetype.japaneseName}の主人公ポスター`}
              className="aspect-[4/5] h-full w-full bg-black object-contain"
            />
          </div>
          <div className="relative flex flex-col justify-center gap-6 p-5 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cinema-gold">
                MOVI Persona / あなた主演の映画
              </p>
              <h1 className="mt-4 text-5xl font-black leading-none text-neutral-50 sm:text-7xl">
                {result.movieProfile.movieTitle}
              </h1>
              <p className="mt-5 text-xl font-bold leading-9 text-cinema-gold">
                {result.movieProfile.movieCatchCopy}
              </p>
              <p className="mt-4 text-sm leading-7 text-cinema-silver sm:text-base">
                {result.movieProfile.personalTrailerLine}
              </p>
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cinema-gold">
                主人公タイプ
              </p>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="text-3xl font-black text-neutral-50 sm:text-4xl">
                  {archetype.japaneseName}
                </h2>
                <p className="text-sm font-bold text-neutral-300">{archetype.name}</p>
              </div>
              <p className="mt-3 text-base leading-7 text-cinema-silver">{archetype.tagline}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-white/10 p-5 sm:grid-cols-[1fr_0.9fr] sm:p-6">
          <div className="grid gap-2 sm:grid-cols-2">
            {[result.heroComparison.title, result.heroComparison.primaryAxis, result.heroComparison.rankSummary, result.heroComparison.percentileSummary].map(
              (summary) => (
                <p
                  key={summary}
                  className="rounded-md border border-cinema-gold/25 bg-cinema-gold/10 px-4 py-2 text-sm font-bold text-cinema-gold"
                >
                  {summary}
                </p>
              ),
            )}
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cinema-silver">
              {ja.result.confidence}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <p className="rounded-full border border-cinema-gold/30 bg-cinema-gold/10 px-3 py-1 text-sm font-black text-cinema-gold">
                {branchingLevel}
              </p>
              <p className="text-sm font-bold text-neutral-100">{result.confidenceSummary.label}</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-cinema-silver">{branchingDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
