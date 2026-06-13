import { ja } from "../../i18n/ja.ts";
import type { CorePole, ReasoningEvidence } from "../../types/diagnosis.ts";

interface ReasoningEvidenceDetailsProps {
  evidence: ReasoningEvidence;
}

const translateBigFive = (value: string): string => {
  const [trait = "", level = ""] = value.split(":").map((part) => part.trim());

  if (trait === "Openness") {
    if (level.includes("High")) {
      return "新しい考えや未知の可能性に強く反応しやすい";
    }

    if (level.includes("Low")) {
      return "新しさよりも、慣れた方法や現実性を重視しやすい";
    }

    return "新しい考え方を受け入れるが、現実性も重視する";
  }

  if (trait === "Conscientiousness") {
    if (level.includes("Very High") || level.includes("High")) {
      return "計画性と責任感が強い";
    }

    if (level.includes("Low")) {
      return "計画よりも柔軟さや勢いを優先しやすい";
    }

    return "必要な場面では計画性と責任感を発揮しやすい";
  }

  if (trait === "Agreeableness") {
    if (level.includes("High")) {
      return "人の気持ちを汲み取り、協力を大切にしやすい";
    }

    if (level.includes("Low")) {
      return "周囲に流されるより、自分の判断を優先しやすい";
    }

    return "協調しながらも、自分の判断も保ちやすい";
  }

  if (trait === "Compliance") {
    return "決められたやり方に従うより、自分の裁量を重視しやすい";
  }

  return value;
};

const translateMoralPsychology = (value: string): string => {
  const [trait = "", level = ""] = value.split(":").map((part) => part.trim());

  const descriptions: Record<string, string> = {
    Liberty: "自由や自分で選ぶことを大切にしやすい",
    Care: "人を傷つけないことや支えることを大切にしやすい",
    Fairness: "公平さや筋の通った判断を大切にしやすい",
    Loyalty: "信頼、仲間、継続した関係を大切にしやすい",
    Authority: "秩序や責任ある判断を重視しやすい",
    Realist: "理想だけでなく、現実的に成り立つかも見やすい",
  };

  const translated = descriptions[trait];

  if (!translated) {
    return value;
  }

  if (level.includes("Very High")) {
    return `${translated}。特に強く出ています。`;
  }

  if (level.includes("High")) {
    return `${translated}。強めに出ています。`;
  }

  if (level.includes("Low")) {
    return `${translated}。ただし優先度は控えめです。`;
  }

  return translated;
};

export function ReasoningEvidenceDetails({ evidence }: ReasoningEvidenceDetailsProps) {
  return (
    <details className="mt-5 rounded-md border border-cinema-gold/25 bg-black/30 p-4">
      <summary className="cursor-pointer text-sm font-bold text-cinema-gold">
        {ja.result.reasoningDetails}
      </summary>
      <div className="mt-4 grid gap-4 text-sm leading-7 text-cinema-silver">
        <div>
          <h3 className="font-bold text-neutral-100">{ja.result.coreEvidence}</h3>
          <ul className="mt-2 grid gap-2">
            {evidence.coreDimensions.map((pole: CorePole) => (
              <li key={pole} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="font-bold text-cinema-gold">{pole}</span>
                <span className="text-neutral-100"> / {ja.poles[pole]}: </span>
                {ja.poleDescriptions[pole]}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-neutral-100">{ja.result.bigFiveEvidence}</h3>
          <ul className="mt-2 grid gap-2">
            {evidence.bigFive.map((value) => (
              <li key={value} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="font-bold text-cinema-gold">{value}</span>
                <span className="text-neutral-100">: </span>
                {translateBigFive(value)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-neutral-100">{ja.result.narrativeEvidence}</h3>
          <p className="mt-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
            {evidence.narrativeIdentity}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-neutral-100">{ja.result.moralEvidence}</h3>
          <ul className="mt-2 grid gap-2">
            {evidence.moralPsychology.map((value) => (
              <li key={value} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="font-bold text-cinema-gold">{value}</span>
                <span className="text-neutral-100">: </span>
                {translateMoralPsychology(value)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}
