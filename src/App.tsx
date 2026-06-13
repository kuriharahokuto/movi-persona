import { useEffect, useMemo, useState } from "react";

import { AnalysisLoading } from "./components/Question/AnalysisLoading.tsx";
import { CinematicScoreCards } from "./components/Result/CinematicScoreCards.tsx";
import { CompatibilityList } from "./components/Result/CompatibilityList.tsx";
import { CoreDimensionChart } from "./components/Result/CoreDimensionChart.tsx";
import { Footer } from "./components/Layout/Footer.tsx";
import { HeroSection } from "./components/Home/HeroSection.tsx";
import { IntroductionScreen } from "./components/Home/IntroductionScreen.tsx";
import { Layout } from "./components/Layout/Layout.tsx";
import { LegalPage } from "./components/Legal/LegalPage.tsx";
import { MidpointReveal, type MidpointTendency } from "./components/Question/MidpointReveal.tsx";
import { QuestionCard } from "./components/Question/QuestionCard.tsx";
import { ReasoningEvidenceDetails } from "./components/Result/ReasoningEvidenceDetails.tsx";
import { ResultMovi } from "./components/Result/ResultMovi.tsx";
import { ResultPoster } from "./components/Result/ResultPoster.tsx";
import { ResultSection } from "./components/Result/ResultSection.tsx";
import { SecondaryTraitBars } from "./components/Result/SecondaryTraitBars.tsx";
import { ShareButton } from "./components/Result/ShareButton.tsx";
import { ShareImageCard } from "./components/Result/ShareImageCard.tsx";
import { XShareButton } from "./components/Result/XShareButton.tsx";
import { SimilarProtagonistList } from "./components/Result/SimilarProtagonistList.tsx";
import { TrailerReportSection } from "./components/Result/TrailerReportSection.tsx";
import { VillainComingSoon } from "./components/Result/VillainComingSoon.tsx";
import { archetypeMapping } from "./data/mapping.ts";
import { archetypes } from "./data/archetypes.ts";
import { legalPages, type LegalPageKey } from "./data/legalPages.ts";
import { questions } from "./data/questions.ts";
import { ja } from "./i18n/ja.ts";
import { createResultViewModel } from "./lib/result/index.ts";
import { calculateDimensionResults, calculateRawScores, diagnose } from "./lib/scoring/index.ts";
import { saveDiagnosisResult } from "./lib/storage/index.ts";
import type {
  AnswerMap,
  ArchetypeName,
  Choice,
  CoreDimensionCode,
  CorePole,
  DiagnosisResult,
  ResultViewModel,
} from "./types/diagnosis.ts";

type Screen =
  | "home"
  | "intro"
  | "question"
  | "midpoint"
  | "analysis"
  | "reveal"
  | "result"
  | LegalPageKey;
type SaveStatus = "idle" | "saved" | "unavailable";

const dimensionOrder: CoreDimensionCode[] = ["EXP_PRAG", "EMP_STR", "REB_GUA", "IDE_REA"];
const legalPageKeys: LegalPageKey[] = ["terms", "privacy", "disclaimer", "contact"];

const isLegalPageKey = (screen: Screen): screen is LegalPageKey =>
  legalPageKeys.includes(screen as LegalPageKey);

const getPolePercentage = (
  dimensions: ReturnType<typeof calculateDimensionResults>,
  pole: CorePole,
): number => {
  const dimension = Object.values(dimensions).find(
    (item) => item.positivePole === pole || item.negativePole === pole,
  );

  if (!dimension) {
    return 50;
  }

  return dimension.positivePole === pole ? dimension.positivePercentage : dimension.negativePercentage;
};

const createMidpointTendencies = (answers: AnswerMap): MidpointTendency[] => {
  const answeredQuestions = questions.slice(0, 8).filter((question) => answers[question.id]);
  const answeredDimensions = new Set(answeredQuestions.map((question) => question.dimension));

  if (answeredDimensions.size === 0) {
    return [];
  }

  const partialAnswers = Object.fromEntries(
    answeredQuestions.map((question) => [question.id, answers[question.id]] as const),
  ) as AnswerMap;
  const partialRawScores = calculateRawScores(questions.slice(0, 8), partialAnswers);
  const partialDimensions = calculateDimensionResults(partialRawScores);
  const ranked = Object.entries(archetypeMapping)
    .map(([key, archetypeName]) => {
      const poles = key.split("|") as CorePole[];
      const matchScores = dimensionOrder
        .map((dimension, index) =>
          answeredDimensions.has(dimension) ? getPolePercentage(partialDimensions, poles[index]) : null,
        )
        .filter((value): value is number => value !== null);
      const score =
        matchScores.reduce((total, value) => total + value, 0) / Math.max(matchScores.length, 1);

      return {
        archetypeName: archetypeName as ArchetypeName,
        score,
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  return ranked.map((item) => ({
    name: archetypes[item.archetypeName].japaneseName,
    symbol: ja.midpointTendencies[item.archetypeName].symbol,
    imagePath: archetypes[item.archetypeName].imagePath,
    foreshadowTitle: ja.midpointTendencies[item.archetypeName].foreshadowTitle,
    foreshadowLines: ja.midpointTendencies[item.archetypeName].lines,
  }));
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const resultViewModel: ResultViewModel | null = useMemo(
    () => (diagnosisResult ? createResultViewModel(diagnosisResult) : null),
    [diagnosisResult],
  );

  const midpointDominantPole = useMemo<CorePole | null>(() => {
    const answeredEntries = questions
      .slice(0, 8)
      .filter((question) => answers[question.id])
      .map((question) => [question.id, answers[question.id]] as const);

    if (answeredEntries.length === 0) {
      return null;
    }

    const partialAnswers = Object.fromEntries(answeredEntries) as AnswerMap;
    const partialRawScores = calculateRawScores(questions.slice(0, 8), partialAnswers);
    const partialDimensions = calculateDimensionResults(partialRawScores);
    const strongestDimension = Object.values(partialDimensions).sort(
      (left, right) => right.difference - left.difference,
    )[0];

    return strongestDimension.dominant;
  }, [answers]);

  const midpointTendencies = useMemo(() => createMidpointTendencies(answers), [answers]);

  useEffect(() => {
    if (screen !== "analysis") {
      return;
    }

    const timer = window.setTimeout(() => {
      setScreen("reveal");
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [screen]);

  const prepareNewDiagnosis = () => {
    setAnswers({});
    setQuestionIndex(0);
    setDiagnosisResult(null);
    setSaveStatus("idle");
  };

  const handleStart = () => {
    prepareNewDiagnosis();
    setScreen("intro");
  };

  const handleLegalNavigate = (page: LegalPageKey) => {
    setScreen(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const beginQuestions = () => {
    prepareNewDiagnosis();
    setScreen("question");
  };

  const resetDiagnosis = () => {
    prepareNewDiagnosis();
    setScreen("question");
  };

  const backToHome = () => {
    prepareNewDiagnosis();
    setScreen("home");
  };

  const handleSaveResult = () => {
    if (!diagnosisResult) {
      return;
    }

    const savedResult = saveDiagnosisResult(diagnosisResult);
    setSaveStatus(savedResult ? "saved" : "unavailable");
  };

  const handleAnswer = (choice: Choice) => {
    const question = questions[questionIndex];
    const nextAnswers = { ...answers, [question.id]: choice.id };
    const nextIndex = questionIndex + 1;

    setAnswers(nextAnswers);

    if (nextIndex === 8) {
      setQuestionIndex(nextIndex);
      setScreen("midpoint");
      return;
    }

    if (nextIndex >= questions.length) {
      const result = diagnose(questions, nextAnswers);
      setDiagnosisResult(result);
      setScreen("analysis");
      return;
    }

    setQuestionIndex(nextIndex);
  };

  const currentQuestion = questions[questionIndex];
  const legalPage = isLegalPageKey(screen) ? legalPages[screen] : null;

  return (
    <Layout>
      {screen === "home" && (
        <HeroSection onStart={handleStart} />
      )}

      {screen === "intro" && <IntroductionScreen onBegin={beginQuestions} />}

      {screen === "question" && currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          current={questionIndex + 1}
          total={questions.length}
          onSelect={handleAnswer}
        />
      )}

      {screen === "midpoint" && (
        <MidpointReveal
          dominantPole={midpointDominantPole}
          tendencies={midpointTendencies}
          onContinue={() => setScreen("question")}
        />
      )}

      {screen === "analysis" && <AnalysisLoading onComplete={() => setScreen("reveal")} />}

      {screen === "reveal" && resultViewModel && (
        <ResultReveal
          result={resultViewModel}
          imageSrc={resultViewModel.imagePath}
          onViewReport={() => setScreen("result")}
        />
      )}

      {screen === "result" && resultViewModel && (
        <FullResult
          result={resultViewModel}
          imageSrc={resultViewModel.imagePath}
          saveStatus={saveStatus}
          onSaveResult={handleSaveResult}
          onRestart={resetDiagnosis}
          onBackHome={backToHome}
        />
      )}

      {legalPage && <LegalPage page={legalPage} onBackHome={backToHome} />}

      <Footer onNavigate={handleLegalNavigate} />
    </Layout>
  );
}

interface ResultRevealProps {
  result: ResultViewModel;
  imageSrc: string;
  onViewReport: () => void;
}

function ResultReveal({ result, imageSrc, onViewReport }: ResultRevealProps) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-7 py-8">
      <ResultPoster result={result} imageSrc={imageSrc} />
      <button
        type="button"
        onClick={onViewReport}
        className="min-h-12 rounded-md bg-cinema-gold px-5 py-3 text-sm font-bold tracking-[0.08em] text-neutral-950 transition hover:bg-[#e5c65c]"
      >
        {ja.result.viewFullReport}
      </button>
    </div>
  );
}

interface FullResultProps {
  result: ResultViewModel;
  imageSrc: string;
  saveStatus: SaveStatus;
  onSaveResult: () => void;
  onRestart: () => void;
  onBackHome: () => void;
}

function FullResult({
  result,
  imageSrc,
  saveStatus,
  onSaveResult,
  onRestart,
  onBackHome,
}: FullResultProps) {
  return (
    <div className="py-6">
      <ResultPoster result={result} imageSrc={imageSrc} />

      <ResultSection title={ja.result.cinematicScores}>
        <CinematicScoreCards scores={result.cinematicScores} />
      </ResultSection>

      <ResultMovi />

      <ResultSection title={ja.result.trailerReport}>
        <TrailerReportSection trailerReport={result.trailerReport} />
      </ResultSection>

      <ResultSection title={ja.result.similarProtagonistTendencies}>
        <SimilarProtagonistList tendencies={result.similarProtagonistTendencies} />
      </ResultSection>

      <ResultSection title={ja.result.compatibleArchetypes}>
        <CompatibilityList matches={result.compatibleArchetypes} />
      </ResultSection>

      <ResultSection title={ja.result.characterOverview}>
        <p>{result.characterOverview}</p>
        <ReasoningEvidenceDetails evidence={result.reasoningEvidence} />
      </ResultSection>

      <ResultSection title={ja.result.coreDimensions}>
        <CoreDimensionChart dimensions={result.dimensions} />
      </ResultSection>

      <ResultSection title={ja.result.secondaryTraits}>
        <SecondaryTraitBars traits={result.secondaryTraits} />
      </ResultSection>

      <ResultSection title={ja.result.strengths}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {result.strengths.map((strength) => (
            <li key={strength} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
              {strength}
            </li>
          ))}
        </ul>
      </ResultSection>

      <ResultSection title={ja.result.weaknesses}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {result.weaknesses.map((weakness) => (
            <li key={weakness} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
              {weakness}
            </li>
          ))}
        </ul>
      </ResultSection>

      <ResultSection title={ja.result.behavioralAnalysis}>
        <p className="whitespace-pre-line">{result.behavioralAnalysis}</p>
      </ResultSection>

      <ResultSection title={ja.result.screenwriterReport}>
        <p>{result.screenwriterReport}</p>
      </ResultSection>

      <ResultSection title={ja.result.behavioralIntelligenceReport}>
        <p>{result.behavioralIntelligenceReport}</p>
      </ResultSection>

      <ResultSection title={ja.result.endingTheme}>
        <div className="rounded-md border border-cinema-gold/25 bg-cinema-gold/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cinema-gold">
            {ja.secondaryTraits[result.movieProfile.dominantSecondaryTrait]}
          </p>
          <p className="mt-3 text-xl font-black text-neutral-50">
            {result.movieProfile.endingTheme}
          </p>
          <p className="mt-3 text-sm leading-7 text-cinema-silver">
            {result.movieProfile.baseTrailerLine}
          </p>
        </div>
      </ResultSection>

      <ResultSection title={ja.result.recommendedMovies}>
        <ul className="grid gap-2">
          {result.archetype.movieExamples.map((movie) => (
            <li key={movie} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
              {movie}
            </li>
          ))}
        </ul>
      </ResultSection>

      <ResultSection title={ja.result.shareImage}>
        <p className="mb-4 text-sm leading-7 text-cinema-silver">{ja.result.shareImageLead}</p>
        <ShareImageCard result={result} imageSrc={imageSrc} />
      </ResultSection>

      <ResultSection title={ja.result.share}>
        <div className="grid gap-4">
          <p className="text-sm leading-7 text-cinema-silver">{ja.result.shareLead}</p>
          <XShareButton result={result} imageSrc={imageSrc} />
          <ShareButton text={result.xShareText} />
          <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={onSaveResult}
              className="min-h-12 rounded-md border border-white/15 px-5 py-3 text-sm font-bold tracking-[0.08em] text-neutral-100 transition hover:border-cinema-gold/70"
            >
              {ja.result.save}
            </button>
            {saveStatus === "saved" && (
              <p className="text-sm text-cinema-silver" role="status">
                {ja.result.saved}
              </p>
            )}
            {saveStatus === "unavailable" && (
              <p className="text-sm text-cinema-silver" role="alert">
                {ja.result.storageUnavailable}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="min-h-12 rounded-md border border-cinema-gold/40 px-5 py-3 text-sm font-bold tracking-[0.08em] text-cinema-gold transition hover:border-cinema-gold"
          >
            {ja.result.restart}
          </button>
          <button
            type="button"
            onClick={onBackHome}
            className="min-h-12 rounded-md border border-white/15 px-5 py-3 text-sm font-bold tracking-[0.08em] text-neutral-100 transition hover:border-cinema-gold/70"
          >
            {ja.result.backToHome}
          </button>
          </div>
        </div>
      </ResultSection>

      <VillainComingSoon />
    </div>
  );
}
