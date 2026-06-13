import { archetypeReports } from "../../data/archetypeReports.ts";
import { archetypeMovieProfiles } from "../../data/archetypeMovieProfiles.ts";
import { archetypes } from "../../data/archetypes.ts";
import { archetypeMapping } from "../../data/mapping.ts";
import { shareExperienceReports } from "../../data/trailerReports.ts";
import { ja } from "../../i18n/ja.ts";
import type {
  Archetype,
  ArchetypeName,
  ArchetypeReport,
  CinematicScore,
  CompatibilityMatch,
  CorePole,
  DiagnosisResult,
  DimensionResults,
  HeroComparison,
  MovieResultProfile,
  ResultViewModel,
  SecondaryTraitCode,
  SecondaryTraitScores,
} from "../../types/diagnosis.ts";

const round = (value: number): number => Math.round(value);

const assertCompleteArchetype = (archetype: Archetype, result: DiagnosisResult): void => {
  if (archetype.strengths.length !== 5) {
    throw new Error(`${result.archetype} must define exactly 5 strengths.`);
  }

  if (archetype.weaknesses.length !== 5) {
    throw new Error(`${result.archetype} must define exactly 5 weaknesses.`);
  }
};

const clampScore = (value: number): number => Math.max(0, Math.min(100, round(value)));

const dimensionCodeOrder = ["EXP_PRAG", "EMP_STR", "REB_GUA", "IDE_REA"] as const;

type CanonicalPoles = [CorePole, CorePole, CorePole, CorePole];

const dimensionPolePairs = {
  EXP_PRAG: ["Explorer", "Pragmatist"],
  EMP_STR: ["Empath", "Strategist"],
  REB_GUA: ["Rebel", "Guardian"],
  IDE_REA: ["Idealist", "Realist"],
} as const;

type ComparisonMetric = {
  label: string;
  typeLabel: string;
  calculate: (dimensions: DimensionResults, traits: SecondaryTraitScores) => number;
};

const sideScore = (dimensions: DimensionResults, pole: string): number => {
  const dimension = Object.values(dimensions).find(
    (candidate) => candidate.positivePole === pole || candidate.negativePole === pole,
  );

  if (!dimension) {
    return 50;
  }

  return dimension.positivePole === pole ? dimension.positivePercentage : dimension.negativePercentage;
};

const average = (values: number[]): number =>
  values.reduce((total, value) => total + value, 0) / values.length;

const comparisonMetrics: Record<ArchetypeName, ComparisonMetric> = {
  "Dream Explorer": {
    label: "冒険性",
    typeLabel: "冒険者",
    calculate: (dimensions, traits) =>
      average([sideScore(dimensions, "Explorer"), sideScore(dimensions, "Rebel"), traits.RISK]),
  },
  Wanderer: {
    label: "自由度",
    typeLabel: "自由人",
    calculate: (dimensions) =>
      average([sideScore(dimensions, "Explorer"), sideScore(dimensions, "Rebel"), sideScore(dimensions, "Realist")]),
  },
  "Visionary Hero": {
    label: "希望力",
    typeLabel: "希望を導く主人公",
    calculate: (dimensions, traits) =>
      average([
        sideScore(dimensions, "Explorer"),
        sideScore(dimensions, "Empath"),
        sideScore(dimensions, "Idealist"),
        traits.SACRIFICE,
      ]),
  },
  Seeker: {
    label: "探究心",
    typeLabel: "探究者",
    calculate: (dimensions) =>
      average([sideScore(dimensions, "Explorer"), sideScore(dimensions, "Guardian"), sideScore(dimensions, "Realist")]),
  },
  Revolutionary: {
    label: "変革力",
    typeLabel: "変革者",
    calculate: (dimensions, traits) =>
      average([sideScore(dimensions, "Explorer"), sideScore(dimensions, "Rebel"), sideScore(dimensions, "Idealist"), traits.JUSTICE]),
  },
  Rogue: {
    label: "独立心",
    typeLabel: "アウトロー",
    calculate: (dimensions) =>
      average([sideScore(dimensions, "Explorer"), sideScore(dimensions, "Strategist"), sideScore(dimensions, "Rebel")]),
  },
  Commander: {
    label: "指揮力",
    typeLabel: "統率者",
    calculate: (dimensions, traits) =>
      average([sideScore(dimensions, "Strategist"), sideScore(dimensions, "Guardian"), sideScore(dimensions, "Idealist"), traits.COLLECTIVISM]),
  },
  Adventurer: {
    label: "行動力",
    typeLabel: "行動派",
    calculate: (dimensions, traits) =>
      average([sideScore(dimensions, "Explorer"), sideScore(dimensions, "Strategist"), sideScore(dimensions, "Realist"), traits.RISK]),
  },
  Advocate: {
    label: "信念発信",
    typeLabel: "代弁者",
    calculate: (dimensions, traits) =>
      average([sideScore(dimensions, "Empath"), sideScore(dimensions, "Rebel"), sideScore(dimensions, "Idealist"), traits.JUSTICE]),
  },
  Mediator: {
    label: "調停力",
    typeLabel: "調停者",
    calculate: (dimensions, traits) =>
      average([sideScore(dimensions, "Pragmatist"), sideScore(dimensions, "Empath"), sideScore(dimensions, "Realist"), traits.COLLECTIVISM]),
  },
  Guardian: {
    label: "責任感",
    typeLabel: "守護者",
    calculate: (dimensions, traits) =>
      average([sideScore(dimensions, "Pragmatist"), sideScore(dimensions, "Guardian"), sideScore(dimensions, "Idealist"), traits.COLLECTIVISM]),
  },
  Caretaker: {
    label: "支援力",
    typeLabel: "支援者",
    calculate: (dimensions, traits) =>
      average([sideScore(dimensions, "Empath"), sideScore(dimensions, "Guardian"), sideScore(dimensions, "Realist"), traits.SACRIFICE]),
  },
  Judge: {
    label: "正義感",
    typeLabel: "裁定者",
    calculate: (dimensions, traits) =>
      average([sideScore(dimensions, "Pragmatist"), sideScore(dimensions, "Strategist"), sideScore(dimensions, "Idealist"), traits.JUSTICE]),
  },
  Operator: {
    label: "実行力",
    typeLabel: "実務家",
    calculate: (dimensions) =>
      average([
        sideScore(dimensions, "Pragmatist"),
        sideScore(dimensions, "Strategist"),
        sideScore(dimensions, "Rebel"),
        sideScore(dimensions, "Realist"),
      ]),
  },
  Architect: {
    label: "構想力",
    typeLabel: "設計者",
    calculate: (dimensions) =>
      average([
        sideScore(dimensions, "Pragmatist"),
        sideScore(dimensions, "Strategist"),
        sideScore(dimensions, "Guardian"),
        sideScore(dimensions, "Idealist"),
      ]),
  },
  Strategist: {
    label: "計画性",
    typeLabel: "戦略家",
    calculate: (dimensions) =>
      average([sideScore(dimensions, "Pragmatist"), sideScore(dimensions, "Strategist"), sideScore(dimensions, "Guardian"), sideScore(dimensions, "Realist")]),
  },
};

const theoryTerms = [
  "Explorer",
  "Pragmatist",
  "Empath",
  "Strategist",
  "Rebel",
  "Guardian",
  "Idealist",
  "Realist",
  "Big Five",
  "Narrative Identity",
  "Moral Psychology",
  "Behavioral Analysis",
];

const createPlainCharacterOverview = (archetype: Archetype, report: ArchetypeReport): string => {
  const plainSentences = report.characterOverview
    .split("。")
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .filter((sentence) => !theoryTerms.some((term) => sentence.includes(term)));

  const plainText = `${plainSentences.join("。")}。`;

  if (plainText.length >= 400) {
    return plainText;
  }

  return `${plainText}あなたは、${archetype.coreMotivation}という思いが強くなるほど本来の力を発揮しやすいタイプです。周囲からは頼もしく見られる一方で、本人の中では迷いや緊張を抱えていることもあります。一方で、${archetype.coreFear}を避けようとする時には、同じ強みが焦りや頑なさとして表れやすくなります。大切なのは、強みを消すことではなく、その力をどんな場面で使うかを自分で選べるようになることです。自分の反応の癖を知るほど、あなたの物語は偶然ではなく選択として進み始めます。だからこそ、この結果はあなたを決めつけるものではなく、次の選択を少し見えやすくする地図です。`;
};

const createScreenwriterReport = (archetype: Archetype, report: ArchetypeReport): string =>
  `${report.screenwriterReport} 物語として重要なのは、あなたが最初から完璧な主人公ではないことです。序盤の強みは中盤で試され、弱点としても表れます。終盤で問われるのは、${archetype.coreMotivation}を追いながら、${archetype.coreFear}に飲み込まれず、自分の選択をどう成熟させるかです。その変化が、観客にあなたの物語を信じさせます。`;

const createBehavioralIntelligenceReport = (
  archetype: Archetype,
  report: ArchetypeReport,
): string =>
  `${report.behavioralIntelligenceReport} 日常では、強みが出ている時ほど判断は速くなりますが、余裕がない時ほど説明不足や抱え込みにつながりやすいでしょう。${archetype.coreMotivation}を大切にしながらも、周囲に意図を共有することが、誤解を減らし、あなたらしい力を長く使うための鍵になります。反応を自覚できるほど、同じ場面でも選べる行動は増えていきます。`;

const createScoreInsight = (
  score: Pick<CinematicScore, "label" | "value">,
): Omit<CinematicScore, "label" | "value"> => {
  const level =
    score.value >= 80
      ? "最上位クラス"
      : score.value >= 65
        ? "上位クラス"
        : score.value >= 45
          ? "標準クラス"
          : "控えめ";

  const descriptions: Record<string, string> = {
    [ja.cinematicScores.protagonist]:
      score.value >= 65
        ? "主人公としての輪郭がはっきり出ています。"
        : "主人公像は穏やかで、状況によって役割が変わりやすい傾向です。",
    [ja.cinematicScores.adventure]:
      score.value >= 65
        ? "未知へ踏み出す力が強く、Explorer寄りです。"
        : "冒険よりも、状況を見てから動く傾向です。",
    [ja.cinematicScores.justice]:
      score.value >= 65
        ? "不公平や理不尽に反応しやすく、正義感が強めです。"
        : "正しさだけでなく、状況や関係性も見て判断しやすい傾向です。",
    [ja.cinematicScores.strategy]:
      score.value >= 65
        ? "計画と勝ち筋を重視する、Strategist寄りの傾向です。"
        : "計画だけでなく、その場の感覚や人の気持ちも判断に入りやすい傾向です。",
    [ja.cinematicScores.guardian]:
      score.value >= 65
        ? "大切な人や基盤を守る、Guardian寄りの傾向です。"
        : "守ることよりも、変化や自由を優先しやすい場面があります。",
  };

  return {
    level,
    description: descriptions[score.label] ?? "この主人公らしさを表す補助スコアです。",
  };
};

const getCanonicalPoles = (archetypeName: ArchetypeName): CanonicalPoles => {
  const mappingKey = Object.entries(archetypeMapping).find(
    ([, mappedArchetype]) => mappedArchetype === archetypeName,
  )?.[0];

  if (!mappingKey) {
    throw new Error(`No mapping key found for ${archetypeName}.`);
  }

  return mappingKey.split("|") as CanonicalPoles;
};

const createCanonicalDimensions = (archetypeName: ArchetypeName): DimensionResults => {
  const poles = getCanonicalPoles(archetypeName);

  return dimensionCodeOrder.reduce((dimensions, code, index) => {
    const [positivePole, negativePole] = dimensionPolePairs[code];
    const dominant = poles[index];

    dimensions[code] = {
      dominant: dominant === positivePole ? positivePole : negativePole,
      positivePole,
      negativePole,
      positivePercentage: dominant === positivePole ? 100 : 0,
      negativePercentage: dominant === negativePole ? 100 : 0,
      difference: 100,
      balanced: false,
    };

    return dimensions;
  }, {} as DimensionResults);
};

const neutralSecondaryTraits: SecondaryTraitScores = {
  RISK: 50,
  SACRIFICE: 50,
  COLLECTIVISM: 50,
  JUSTICE: 50,
};

const calculateArchetypeMatchScore = (result: DiagnosisResult, archetypeName: ArchetypeName): number => {
  const poles = getCanonicalPoles(archetypeName);

  return average(
    dimensionCodeOrder.map((code, index) => sideScore(result.dimensions, poles[index])),
  );
};

const rankArchetypeMatches = (result: DiagnosisResult) =>
  (Object.values(archetypeMapping) as ArchetypeName[])
    .map((archetypeName) => ({
      archetypeName,
      score: calculateArchetypeMatchScore(result, archetypeName),
    }))
    .sort((left, right) => right.score - left.score);

const createConfidenceSummary = (result: DiagnosisResult) => {
  const rankedMatches = rankArchetypeMatches(result);
  const [topMatch, secondMatch] = rankedMatches;
  const difference = clampScore(topMatch.score - secondMatch.score);
  const label =
    result.confidence >= 80
      ? "非常に明確"
      : result.confidence >= 60
        ? "比較的明確"
        : result.confidence >= 40
          ? "複数タイプの特徴あり"
          : "バランス型";

  const description =
    result.confidence < 40
      ? `複数タイプの特徴を持つ柔軟な主人公です。今回は ${topMatch.archetypeName} がもっとも近い結果でした。`
      : difference < 8 || result.confidence < 60
        ? `あなたは ${topMatch.archetypeName} 傾向が強いですが、${secondMatch.archetypeName} の特徴も持っています。`
        : `あなたは ${topMatch.archetypeName} 傾向が強く、他の主人公タイプとの重なりは少なめです。`;

  return {
    label,
    description,
    nearestArchetype: topMatch.archetypeName,
    secondArchetype: secondMatch.archetypeName,
    difference,
  };
};

const getDominantPoles = (result: DiagnosisResult): CanonicalPoles =>
  dimensionCodeOrder.map((code) => result.dimensions[code].dominant) as CanonicalPoles;

const secondaryTraitAffinity = (
  candidatePoles: CanonicalPoles,
  traits: SecondaryTraitScores,
): number =>
  average([
    candidatePoles.some((pole) => pole === "Explorer" || pole === "Rebel") ? traits.RISK : 50,
    candidatePoles.some((pole) => pole === "Empath" || pole === "Idealist") ? traits.SACRIFICE : 50,
    candidatePoles.some((pole) => pole === "Empath" || pole === "Guardian") ? traits.COLLECTIVISM : 50,
    candidatePoles.some((pole) => pole === "Rebel" || pole === "Idealist") ? traits.JUSTICE : 50,
  ]);

const poleStoryActions: Record<CorePole, string> = {
  Explorer: "未知へ踏み出す",
  Pragmatist: "現実的な道を見つける",
  Empath: "人の心を置き去りにしない",
  Strategist: "勝ち筋を組み立てる",
  Rebel: "古いルールに問いを投げる",
  Guardian: "大切なものを守る",
  Idealist: "譲れない理想を掲げる",
  Realist: "失わないための選択をする",
};

const castRoleLabels: Record<ArchetypeName, string> = {
  "Dream Explorer": "未知の扉を開く相棒",
  Wanderer: "自由な道へ誘う旅の相棒",
  "Visionary Hero": "未来を共に描く同志",
  Seeker: "真実を照らす案内人",
  Revolutionary: "世界を変える共犯者",
  Rogue: "常識を壊す相棒",
  Commander: "背中を預けられる戦友",
  Adventurer: "突破口を作る右腕",
  Advocate: "信念を支える理解者",
  Mediator: "分断をつなぐ仲間",
  Guardian: "最後まで支える守護者",
  Caretaker: "傷ついた場面を支える仲間",
  Judge: "正しさを見失わない導き手",
  Operator: "計画を実行する右腕",
  Architect: "未来を設計する参謀",
  Strategist: "混乱を整理する軍師",
};

const createCompatibilityRole = (
  archetypeName: ArchetypeName,
  sourcePoles: CanonicalPoles,
  candidatePoles: CanonicalPoles,
  matchType: CompatibilityMatch["matchType"],
): string => {
  const sameCount = candidatePoles.filter((pole, index) => pole === sourcePoles[index]).length;

  if (matchType === "補完型" && sameCount === 2 && candidatePoles.includes("Strategist")) {
    return "混乱の中で冷静さを保つ参謀";
  }

  return castRoleLabels[archetypeName];
};

type CastStoryContext = {
  sourceName: string;
  sourceAction: string;
};

const createCastStoryContext = (result: DiagnosisResult): CastStoryContext => {
  const sourcePoles = getDominantPoles(result);
  const strongestDimension = dimensionCodeOrder
    .map((code, index) => ({
      difference: result.dimensions[code].difference,
      pole: sourcePoles[index],
    }))
    .sort((left, right) => right.difference - left.difference)[0];

  return {
    sourceName: archetypes[result.archetype].japaneseName,
    sourceAction: poleStoryActions[strongestDimension.pole],
  };
};

const castStorylines: Record<ArchetypeName, (context: CastStoryContext) => string> = {
  "Dream Explorer": ({ sourceName }) =>
    `${sourceName}が見ている景色に、夢追い人はまだ名前のない可能性を加えます。常識では閉じた扉でも、この相手は「その先」を信じて最初の一歩を差し出す。二人が組むと、計画は冒険になり、迷いは新しい世界へ向かう予告編に変わります。`,
  Wanderer: ({ sourceAction }) =>
    `あなたが${sourceAction}時、放浪者は別の道があることを思い出させます。正面突破だけが物語ではないと示し、重くなった空気に自由な余白を作る相手です。二人なら、逃げ道ではなく、自分たちで選んだ旅路として前へ進めます。`,
  "Visionary Hero": ({ sourceName }) =>
    `${sourceName}の選択に、理想の英雄は希望の光を重ねます。あなたが現実の壁を見ている時でも、この相手は「まだ終わっていない」と人々に伝える。二人が並ぶと、個人の決断は仲間を巻き込む未来図になり、物語全体を明るい方へ押し出します。`,
  Seeker: ({ sourceName }) =>
    `${sourceName}が進もうとする道に、探究者は隠れた手がかりを見つけます。勢いや信念だけでは見落とす違和感を拾い、選択肢を一つ増やしてくれる存在です。二人が組めば、ただ進む物語ではなく、真実へ近づく旅になります。`,
  Revolutionary: ({ sourceAction }) =>
    `あなたが${sourceAction}なら、革命家はその選択を社会へ響かせる旗に変えます。一人の違和感を群衆の声へ変え、閉じた扉の前で立ち止まらない。二人が組むと、個人的な決断は世界を揺らす運動になり、物語の規模が一段大きくなります。`,
  Rogue: ({ sourceName }) =>
    `${sourceName}が迷っている時、アウトローは抜け道を見つけます。正規ルートにこだわらず、使えるものを使い、誰も予想しない角度から局面を動かす相手です。二人なら、窮屈なルールに閉じ込められた物語を、自分たちの手で書き換えられます。`,
  Commander: ({ sourceName }) =>
    `${sourceName}が方向を決めた瞬間、指揮官は人を動かします。散らばった意志を束ね、恐れで止まった仲間を前線へ連れ戻す相手です。二人が組めば、頭の中の作戦は部隊の行動になり、孤独な決断は背中を預けられる戦いへ変わります。`,
  Adventurer: ({ sourceAction }) =>
    `あなたが${sourceAction}時、冒険家は最初に現場へ飛び込みます。議論が長引く場面でも、動きながら突破口を探し、物語を停滞させません。二人なら、考えた計画を机上に置いたままにせず、危険な橋を実際に渡り始められます。`,
  Advocate: ({ sourceName }) =>
    `${sourceName}の中にある譲れない思いを、代弁者は言葉にします。あなたが黙って抱えていた違和感を、人に届く信念へ変えてくれる相手です。二人が組むと、内側の確信は孤独な正しさで終わらず、誰かを守るための声になります。`,
  Mediator: ({ sourceName }) =>
    `${sourceName}が前へ進もうとするほど、周囲には衝突が生まれることがあります。調停者はその間に入り、敵と味方に分かれた人々の本音を拾い上げる相手です。二人なら、勝利だけでなく、終わった後にも関係が残る物語を選べます。`,
  Guardian: ({ sourceName }) =>
    `${sourceName}が未来を見ている時、守護者は足元を支えます。理想に集中できるのは、帰る場所や守るべき人を見失わない相手がいるからです。困難な旅路でこの主人公が隣にいれば、あなたは前を向いたまま、大切なものを失わずに進めます。`,
  Caretaker: ({ sourceAction }) =>
    `あなたが${sourceAction}ほど、誰かが置き去りになる場面も出てきます。支援者はそこで立ち止まり、傷ついた仲間をもう一度物語へ戻す相手です。二人が組むと、速さだけでは届かない結末に、温度と救いが生まれます。`,
  Judge: ({ sourceName }) =>
    `${sourceName}の選択が熱を帯びる時、裁定者は一本の線を引きます。何を守り、何を許さないのかを曖昧にしない相手です。二人なら、勢いや情だけで進むのではなく、後から振り返っても胸を張れる決断へ物語を導けます。`,
  Operator: ({ sourceName }) =>
    `${sourceName}が決めた方向を、工作員は迷わず形にします。感情が混乱する場面でも現場を止めず、必要な手順を淡々と積み上げる相手です。あなたが戦略や意志を描き、工作員が実行する。最も成果を出しやすい組み合わせです。`,
  Architect: ({ sourceAction }) =>
    `あなたが${sourceAction}時、設計者はその先に続く仕組みを考えます。目の前の勝利で終わらせず、次の混乱を防ぐ構造まで組み立てる相手です。二人が組むと、一度きりの成功は持続する未来へ変わり、物語に長い射程が生まれます。`,
  Strategist: ({ sourceName }) =>
    `${sourceName}が感情や勢いで動きそうな場面で、戦略家は盤面を静かに読み直します。敵の狙い、仲間の疲労、次に残す一手を見落とさない相手です。二人なら、勇気だけでは越えられない局面でも、勝ち筋を持って終盤へ進めます。`,
};

const describeCompatibility = (result: DiagnosisResult, archetypeName: ArchetypeName): string =>
  castStorylines[archetypeName](createCastStoryContext(result));

const createCompatibleArchetypes = (result: DiagnosisResult): CompatibilityMatch[] => {
  const sourcePoles = getDominantPoles(result);

  // Display-only compatibility: combine similar values, complementary decision styles,
  // controlled contrast, and secondary trait affinity. This never feeds archetype diagnosis.
  return (Object.values(archetypeMapping) as ArchetypeName[])
    .filter((archetypeName) => archetypeName !== result.archetype)
    .map((archetypeName) => {
      const candidatePoles = getCanonicalPoles(archetypeName);
      const sameCount = candidatePoles.filter((pole, index) => pole === sourcePoles[index]).length;
      const similarValueScore = average(
        dimensionCodeOrder.map((code, index) => sideScore(result.dimensions, candidatePoles[index])),
      );
      const contrastScore = average(
        dimensionCodeOrder.map((code, index) =>
          candidatePoles[index] === sourcePoles[index] ? 50 : result.dimensions[code].difference,
        ),
      );
      const traitScore = secondaryTraitAffinity(candidatePoles, result.secondaryTraits);
      const matchType: CompatibilityMatch["matchType"] =
        sameCount >= 3 ? "似た価値観型" : sameCount >= 1 ? "補完型" : "対照型";
      const score =
        matchType === "似た価値観型"
          ? similarValueScore * 0.75 + traitScore * 0.25 + sameCount * 5
          : matchType === "補完型"
            ? similarValueScore * 0.35 + contrastScore * 0.45 + traitScore * 0.2 + 8
            : contrastScore * 0.7 + traitScore * 0.2 + 5;

      return {
        archetypeName,
        score,
        matchType,
        reason: describeCompatibility(result, archetypeName),
        role: createCompatibilityRole(archetypeName, sourcePoles, candidatePoles, matchType),
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((match) => ({
      archetype: archetypes[match.archetypeName],
      matchType: match.matchType,
      affinity: Math.max(72, Math.min(96, clampScore(match.score))),
      reason: match.reason,
      role: match.role,
    }));
};

const createHeroComparison = (result: DiagnosisResult): HeroComparison => {
  const metric = comparisonMetrics[result.archetype];
  const currentScore = metric.calculate(result.dimensions, result.secondaryTraits);
  const rankedCanonicalScores = (Object.values(archetypeMapping) as ArchetypeName[])
    .map((archetypeName) => ({
      archetypeName,
      score: metric.calculate(createCanonicalDimensions(archetypeName), neutralSecondaryTraits),
    }))
    .sort((left, right) => right.score - left.score);
  const rank = rankedCanonicalScores.findIndex((entry) => entry.archetypeName === result.archetype) + 1;
  const intensity =
    currentScore >= 80
      ? `${metric.typeLabel}らしさが濃く表れています`
      : currentScore >= 70
        ? `${metric.typeLabel}らしさがはっきり表れています`
        : currentScore >= 60
          ? `${metric.typeLabel}傾向が強め`
          : `複数の強みを持つ${metric.typeLabel}タイプ`;

  return {
    title: `🏆 ${ja.archetypeTitles[result.archetype]}`,
    primaryAxis: ja.archetypeComparisonAxes[result.archetype],
    rankSummary: `📊 全16主人公中 ${rank}位の${metric.label}`,
    percentileSummary: `🔥 ${intensity}`,
  };
};

const secondaryTraitOrder: SecondaryTraitCode[] = ["RISK", "JUSTICE", "COLLECTIVISM", "SACRIFICE"];

const personalTrailerLines: Record<SecondaryTraitCode, string> = {
  RISK: "あなたの物語では、危険は避けるものではなく突破口になる。",
  JUSTICE: "あなたの物語では、結果だけでなく「何のために戦うか」が問われる。",
  COLLECTIVISM: "あなたの物語では、勝利よりも仲間を置き去りにしないことが重要になる。",
  SACRIFICE: "あなたの物語では、自分より誰かを優先する選択が運命を変える。",
};

const getDominantSecondaryTrait = (traits: SecondaryTraitScores): SecondaryTraitCode =>
  secondaryTraitOrder
    .map((trait) => ({ trait, score: traits[trait] }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return secondaryTraitOrder.indexOf(left.trait) - secondaryTraitOrder.indexOf(right.trait);
    })[0].trait;

const createMovieResultProfile = (result: DiagnosisResult): MovieResultProfile => {
  const profile = archetypeMovieProfiles[result.archetype];

  if (!profile) {
    throw new Error(`No movie profile found for ${result.archetype}.`);
  }

  const dominantSecondaryTrait = getDominantSecondaryTrait(result.secondaryTraits);
  const subtitleSuffix = profile.variantBySecondaryTrait[dominantSecondaryTrait];

  return {
    movieTitle: profile.movieTitle,
    movieSubtitle: `${profile.movieTitle}: ${subtitleSuffix}`,
    movieCatchCopy: profile.movieCatchCopy,
    baseTrailerLine: profile.baseTrailerLine,
    personalTrailerLine: personalTrailerLines[dominantSecondaryTrait],
    endingTheme: profile.endingThemeBySecondaryTrait[dominantSecondaryTrait],
    dominantSecondaryTrait,
  };
};

export const createCinematicScores = (result: DiagnosisResult): CinematicScore[] => {
  const { dimensions, secondaryTraits } = result;
  const strongestAverage =
    Object.values(dimensions).reduce(
      (total, dimension) =>
        total + Math.max(dimension.positivePercentage, dimension.negativePercentage),
      0,
    ) / 4;

  const scores = [
    {
      label: ja.cinematicScores.protagonist,
      value: clampScore((strongestAverage + result.confidence) / 2),
    },
    {
      label: ja.cinematicScores.adventure,
      value: clampScore(dimensions.EXP_PRAG.positivePercentage * 0.7 + secondaryTraits.RISK * 0.3),
    },
    {
      label: ja.cinematicScores.justice,
      value: clampScore(secondaryTraits.JUSTICE),
    },
    {
      label: ja.cinematicScores.strategy,
      value: clampScore(
        dimensions.EMP_STR.negativePercentage * 0.65 + dimensions.IDE_REA.negativePercentage * 0.35,
      ),
    },
    {
      label: ja.cinematicScores.guardian,
      value: clampScore(
        dimensions.REB_GUA.negativePercentage * 0.75 + secondaryTraits.COLLECTIVISM * 0.25,
      ),
    },
  ];

  return scores.map((score) => ({
    ...score,
    ...createScoreInsight(score),
  }));
};

const createXShareText = (
  result: DiagnosisResult,
  archetype: Archetype,
  heroComparison: HeroComparison,
  movieProfile: MovieResultProfile,
): string => {
  return [
    "私が主演の映画は",
    "",
    `🎬 ${movieProfile.movieTitle}`,
    "",
    "でした。",
    "",
    movieProfile.movieCatchCopy,
    "",
    "主人公タイプ：",
    `${archetype.japaneseName}（${result.archetype}）`,
    "",
    heroComparison.title,
    heroComparison.primaryAxis,
    "",
    "みんなはどんな映画の主人公だった？",
    "MOVI Persona",
    "Your Life, Your Movie",
    "#MOVIPersona",
  ].join("\n");
};

export const createResultViewModel = (result: DiagnosisResult): ResultViewModel => {
  const archetype = archetypes[result.archetype];
  const report = archetypeReports[result.archetype];
  const shareExperience = shareExperienceReports[result.archetype];

  if (!archetype) {
    throw new Error(`No archetype data found for ${result.archetype}.`);
  }

  if (!report) {
    throw new Error(`No archetype report found for ${result.archetype}.`);
  }

  if (!shareExperience) {
    throw new Error(`No trailer report found for ${result.archetype}.`);
  }

  assertCompleteArchetype(archetype, result);
  const cinematicScores = createCinematicScores(result);
  const heroComparison = createHeroComparison(result);
  const movieProfile = createMovieResultProfile(result);

  return {
    archetype,
    confidence: result.confidence,
    confidenceSummary: createConfidenceSummary(result),
    heroComparison,
    movieProfile,
    compatibleArchetypes: createCompatibleArchetypes(result),
    dimensions: result.dimensions,
    secondaryTraits: result.secondaryTraits,
    cinematicScores,
    reasoningEvidence: report.reasoningEvidence,
    trailerReport: shareExperience.trailerReport,
    similarProtagonistTendencies: shareExperience.similarProtagonistTendencies,
    imagePath: archetype.imagePath,
    characterOverview: createPlainCharacterOverview(archetype, report),
    strengths: archetype.strengths,
    weaknesses: archetype.weaknesses,
    behavioralAnalysis: report.reasoningEvidence.behavioralAnalysis,
    screenwriterReport: createScreenwriterReport(archetype, report),
    behavioralIntelligenceReport: createBehavioralIntelligenceReport(archetype, report),
    shareText: report.shareText,
    xShareText: createXShareText(result, archetype, heroComparison, movieProfile),
  };
};
