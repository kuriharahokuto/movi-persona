import { ja } from "../../i18n/ja.ts";
import { StartButton } from "./StartButton.tsx";

interface IntroductionScreenProps {
  onBegin: () => void;
}

export function IntroductionScreen({ onBegin }: IntroductionScreenProps) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-8 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cinema-gold sm:tracking-[0.34em]">
        {ja.intro.eyebrow}
      </p>
      <div className="space-y-5">
        <h1 className="text-4xl font-black leading-tight sm:text-6xl">{ja.intro.title}</h1>
        <p className="max-w-2xl text-lg leading-8 text-cinema-silver">{ja.intro.lead}</p>
      </div>
      <StartButton onClick={onBegin}>{ja.intro.begin}</StartButton>
    </div>
  );
}
