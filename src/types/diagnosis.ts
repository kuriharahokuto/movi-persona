export type CoreDimensionCode = "EXP_PRAG" | "EMP_STR" | "REB_GUA" | "IDE_REA";

export type PositivePole = "Explorer" | "Empath" | "Rebel" | "Idealist";
export type NegativePole = "Pragmatist" | "Strategist" | "Guardian" | "Realist";
export type CorePole = PositivePole | NegativePole;

export type SecondaryTraitCode = "RISK" | "SACRIFICE" | "COLLECTIVISM" | "JUSTICE";

export type ScoreKey = CorePole | SecondaryTraitCode;

export type ScoreMap = Partial<Record<ScoreKey, number>>;

export type ChoiceId = "A" | "B" | "C";

export interface Choice {
  id: ChoiceId;
  label: string;
  scores: ScoreMap;
}

export interface Question {
  id: string;
  dimension: CoreDimensionCode;
  title: string;
  genre: string;
  scene: string;
  choices: Choice[];
}

export interface DimensionDefinition {
  code: CoreDimensionCode;
  positivePole: PositivePole;
  negativePole: NegativePole;
}

export interface DimensionResult {
  dominant: CorePole;
  positivePole: PositivePole;
  negativePole: NegativePole;
  positivePercentage: number;
  negativePercentage: number;
  difference: number;
  balanced: boolean;
}

export type DimensionResults = Record<CoreDimensionCode, DimensionResult>;

export type RawScores = Record<ScoreKey, number>;

export type SecondaryTraitScores = Record<SecondaryTraitCode, number>;

export type AnswerMap = Record<string, ChoiceId>;

export type ArchetypeName =
  | "Dream Explorer"
  | "Wanderer"
  | "Visionary Hero"
  | "Seeker"
  | "Revolutionary"
  | "Rogue"
  | "Commander"
  | "Adventurer"
  | "Advocate"
  | "Mediator"
  | "Guardian"
  | "Caretaker"
  | "Judge"
  | "Operator"
  | "Architect"
  | "Strategist";

export interface Archetype {
  name: ArchetypeName;
  japaneseName: string;
  tagline: string;
  coreMotivation: string;
  coreFear: string;
  narrativeRole: string;
  strengths: string[];
  weaknesses: string[];
  workStyle?: string;
  relationshipStyle?: string;
  behaviorPattern?: string;
  movieExamples: string[];
  imagePath: string;
}

export interface DiagnosisResult {
  archetype: ArchetypeName;
  confidence: number;
  dimensions: DimensionResults;
  secondaryTraits: SecondaryTraitScores;
  rawScores: RawScores;
}

export interface ResultViewModel {
  archetype: Archetype;
  confidence: number;
  confidenceSummary: ConfidenceSummary;
  heroComparison: HeroComparison;
  movieProfile: MovieResultProfile;
  compatibleArchetypes: CompatibilityMatch[];
  dimensions: DimensionResults;
  secondaryTraits: SecondaryTraitScores;
  cinematicScores: CinematicScore[];
  reasoningEvidence: ReasoningEvidence;
  trailerReport: TrailerReport;
  similarProtagonistTendencies: string[];
  imagePath: string;
  characterOverview: string;
  strengths: string[];
  weaknesses: string[];
  behavioralAnalysis: string;
  screenwriterReport: string;
  behavioralIntelligenceReport: string;
  shareText: string;
  xShareText: string;
}

export interface ReasoningEvidence {
  coreDimensions: [CorePole, CorePole, CorePole, CorePole];
  bigFive: string[];
  narrativeIdentity: string;
  moralPsychology: string[];
  behavioralAnalysis: string;
}

export interface ArchetypeReport {
  reasoningEvidence: ReasoningEvidence;
  characterOverview: string;
  screenwriterReport: string;
  behavioralIntelligenceReport: string;
  shareText: string;
}

export interface CinematicScore {
  label: string;
  value: number;
  level: string;
  description: string;
}

export interface ConfidenceSummary {
  label: string;
  description: string;
  nearestArchetype: ArchetypeName;
  secondArchetype: ArchetypeName;
  difference: number;
}

export interface HeroComparison {
  title: string;
  primaryAxis: string;
  rankSummary: string;
  percentileSummary: string;
}

export interface ArchetypeMovieProfile {
  archetypeId: ArchetypeName;
  movieTitle: string;
  movieCatchCopy: string;
  baseTrailerLine: string;
  variantBySecondaryTrait: Record<SecondaryTraitCode, string>;
  endingThemeBySecondaryTrait: Record<SecondaryTraitCode, string>;
}

export interface MovieResultProfile {
  movieTitle: string;
  movieSubtitle: string;
  movieCatchCopy: string;
  baseTrailerLine: string;
  personalTrailerLine: string;
  endingTheme: string;
  dominantSecondaryTrait: SecondaryTraitCode;
}

export type CompatibilityType = "似た価値観型" | "補完型" | "対照型";

export interface CompatibilityMatch {
  archetype: Archetype;
  matchType: CompatibilityType;
  affinity: number;
  reason: string;
  role: string;
}

export interface TrailerReport {
  openingNarration: string;
  middleConflict: string;
  finalChoice: string;
  trailerTagline: string;
  trailerCopy: string;
}

export interface StoredDiagnosis {
  id: string;
  savedAt: string;
  result: DiagnosisResult;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
