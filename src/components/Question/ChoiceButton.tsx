import type { Choice } from "../../types/diagnosis.ts";

interface ChoiceButtonProps {
  choice: Choice;
  onSelect: (choice: Choice) => void;
}

export function ChoiceButton({ choice, onSelect }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(choice)}
      className="group w-full rounded-md border border-white/10 bg-cinema-surface/90 p-4 text-left transition hover:border-white/25 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35 sm:p-5"
    >
      <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-cinema-gold/40 text-sm font-bold text-cinema-gold">
        {choice.id}
      </span>
      <span className="block whitespace-pre-line text-base font-semibold leading-7 text-neutral-50">
        {choice.label}
      </span>
    </button>
  );
}
