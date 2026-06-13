import { archetypeMapping, createArchetypeMappingKey } from "../../data/mapping.ts";
import type {
  AnswerMap,
  CoreDimensionCode,
  CorePole,
  DiagnosisResult,
  DimensionDefinition,
  DimensionResult,
  DimensionResults,
  NegativePole,
  PositivePole,
  Question,
  RawScores,
  ScoreKey,
  SecondaryTraitCode,
  SecondaryTraitScores,
  ValidationResult,
} from "../../types/diagnosis.ts";

export const coreDimensions: readonly DimensionDefinition[] = [
  { code: "EXP_PRAG", positivePole: "Explorer", negativePole: "Pragmatist" },
  { code: "EMP_STR", positivePole: "Empath", negativePole: "Strategist" },
  { code: "REB_GUA", positivePole: "Rebel", negativePole: "Guardian" },
  { code: "IDE_REA", positivePole: "Idealist", negativePole: "Realist" },
] as const;

export const secondaryTraits: readonly SecondaryTraitCode[] = [
  "RISK",
  "SACRIFICE",
  "COLLECTIVISM",
  "JUSTICE",
] as const;

export const scoreKeys: readonly ScoreKey[] = [
  "Explorer",
  "Pragmatist",
  "Empath",
  "Strategist",
  "Rebel",
  "Guardian",
  "Idealist",
  "Realist",
  "RISK",
  "SACRIFICE",
  "COLLECTIVISM",
  "JUSTICE",
] as const;

const createEmptyScores = (): RawScores =>
  scoreKeys.reduce((scores, key) => {
    scores[key] = 0;
    return scores;
  }, {} as RawScores);

const round = (value: number): number => Math.round(value);

export const calculateRawScores = (questions: Question[], answers: AnswerMap): RawScores => {
  const scores = createEmptyScores();

  for (const question of questions) {
    const answer = answers[question.id];
    if (!answer) {
      continue;
    }

    const choice = question.choices.find((item) => item.id === answer);
    if (!choice) {
      continue;
    }

    for (const [key, value] of Object.entries(choice.scores) as [ScoreKey, number][]) {
      scores[key] += value;
    }
  }

  return scores;
};

export const calculateMaxScores = (questions: Question[]): RawScores => {
  const maxScores = createEmptyScores();

  for (const question of questions) {
    for (const key of scoreKeys) {
      const highestContribution = Math.max(
        0,
        ...question.choices.map((choice) => choice.scores[key] ?? 0),
      );
      maxScores[key] += highestContribution;
    }
  }

  return maxScores;
};

export const validateQuestionConfiguration = (questions: Question[]): ValidationResult => {
  const errors: string[] = [];
  const maxScores = calculateMaxScores(questions);

  for (const dimension of coreDimensions) {
    const positiveMax = maxScores[dimension.positivePole];
    const negativeMax = maxScores[dimension.negativePole];

    if (positiveMax <= 0) {
      errors.push(`${dimension.positivePole} max score must be greater than 0.`);
    }

    if (negativeMax <= 0) {
      errors.push(`${dimension.negativePole} max score must be greater than 0.`);
    }

    if (positiveMax !== negativeMax) {
      errors.push(
        `${dimension.code} pole max scores must match: ${dimension.positivePole}=${positiveMax}, ${dimension.negativePole}=${negativeMax}.`,
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

const calculateDimensionResult = (
  positivePole: PositivePole,
  negativePole: NegativePole,
  rawScores: RawScores,
): DimensionResult => {
  const positiveScore = rawScores[positivePole];
  const negativeScore = rawScores[negativePole];
  const total = positiveScore + negativeScore;
  const positivePercentage = total === 0 ? 50 : (positiveScore / total) * 100;
  const negativePercentage = total === 0 ? 50 : (negativeScore / total) * 100;
  const difference = Math.abs(positivePercentage - negativePercentage);
  const dominant: CorePole =
    positivePercentage >= negativePercentage ? positivePole : negativePole;

  return {
    dominant,
    positivePole,
    negativePole,
    positivePercentage: round(positivePercentage),
    negativePercentage: round(negativePercentage),
    difference: round(difference),
    balanced: difference <= 5,
  };
};

export const calculateDimensionResults = (rawScores: RawScores): DimensionResults =>
  coreDimensions.reduce((results, dimension) => {
    results[dimension.code] = calculateDimensionResult(
      dimension.positivePole,
      dimension.negativePole,
      rawScores,
    );
    return results;
  }, {} as DimensionResults);

export const calculateSecondaryTraits = (
  rawScores: RawScores,
  maxScores: RawScores,
): SecondaryTraitScores =>
  secondaryTraits.reduce((traits, trait) => {
    const maxScore = maxScores[trait];
    traits[trait] = maxScore === 0 ? 0 : round((rawScores[trait] / maxScore) * 100);
    return traits;
  }, {} as SecondaryTraitScores);

export const calculateConfidence = (
  dimensions: DimensionResults,
  questionCount: number,
): number => {
  const averageDifference =
    Object.values(dimensions).reduce((total, dimension) => total + dimension.difference, 0) /
    coreDimensions.length;

  let cap = 100;
  if (questionCount < 16) {
    cap = 80;
  }
  if (questionCount < 12) {
    cap = 70;
  }
  if (questionCount < 8) {
    cap = 60;
  }

  return Math.min(round(averageDifference), cap);
};

export const selectArchetype = (dimensions: DimensionResults) => {
  const key = createArchetypeMappingKey(
    dimensions.EXP_PRAG.dominant,
    dimensions.EMP_STR.dominant,
    dimensions.REB_GUA.dominant,
    dimensions.IDE_REA.dominant,
  );

  const archetype = archetypeMapping[key];
  if (!archetype) {
    throw new Error(`No archetype mapping found for ${key}.`);
  }

  return archetype;
};

export const diagnose = (questions: Question[], answers: AnswerMap): DiagnosisResult => {
  const validation = validateQuestionConfiguration(questions);
  if (!validation.valid) {
    throw new Error(`Invalid question configuration: ${validation.errors.join(" ")}`);
  }

  const rawScores = calculateRawScores(questions, answers);
  const maxScores = calculateMaxScores(questions);
  const dimensions = calculateDimensionResults(rawScores);
  const secondaryTraits = calculateSecondaryTraits(rawScores, maxScores);
  const archetype = selectArchetype(dimensions);
  const confidence = calculateConfidence(dimensions, questions.length);

  return {
    archetype,
    confidence,
    dimensions,
    secondaryTraits,
    rawScores,
  };
};

export const getDimensionCodeForPole = (pole: CorePole): CoreDimensionCode | undefined =>
  coreDimensions.find(
    (dimension) => dimension.positivePole === pole || dimension.negativePole === pole,
  )?.code;
