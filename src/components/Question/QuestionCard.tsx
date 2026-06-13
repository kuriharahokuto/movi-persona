import { ja } from "../../i18n/ja.ts";
import type { Choice, Question } from "../../types/diagnosis.ts";
import { ChoiceButton } from "./ChoiceButton.tsx";
import { ProgressBar } from "./ProgressBar.tsx";
import { QuestionMovi } from "./QuestionMovi.tsx";

interface QuestionCardProps {
  question: Question;
  current: number;
  total: number;
  onSelect: (choice: Choice) => void;
}

export function QuestionCard({ question, current, total, onSelect }: QuestionCardProps) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-7 py-6">
      <ProgressBar current={current} total={total} />
      <article className="overflow-hidden rounded-md border border-cinema-gold/20 bg-black/35 shadow-poster">
        <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cinema-gold">
            ACT {current}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <h1 className="text-2xl font-black leading-tight text-neutral-50 sm:text-4xl">
              {question.title}
            </h1>
            <p className="rounded-full border border-cinema-gold/30 bg-cinema-gold/10 px-3 py-1 text-xs font-bold text-cinema-gold">
              {question.genre}
            </p>
          </div>
        </div>
        <div className="p-5 sm:p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cinema-gold">
            {ja.question.eyebrow}
          </p>
          <p className="whitespace-pre-line text-lg font-bold leading-8 text-neutral-50 sm:text-2xl sm:leading-10">
            {question.scene}
          </p>
        </div>
      </article>
      <div className="grid gap-3">
        {question.choices.map((choice) => (
          <ChoiceButton key={`${question.id}-${choice.id}`} choice={choice} onSelect={onSelect} />
        ))}
        <QuestionMovi />
      </div>
    </div>
  );
}
