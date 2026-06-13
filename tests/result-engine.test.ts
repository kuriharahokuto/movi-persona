import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { archetypeMovieProfiles } from "../src/data/archetypeMovieProfiles.ts";
import { archetypes } from "../src/data/archetypes.ts";
import { archetypeReports } from "../src/data/archetypeReports.ts";
import { questions } from "../src/data/questions.ts";
import { createResultViewModel } from "../src/lib/result/index.ts";
import { diagnose } from "../src/lib/scoring/index.ts";
import type { AnswerMap, ArchetypeName, CorePole, ResultViewModel } from "../src/types/diagnosis.ts";

type MappingRow = {
  poles: [CorePole, CorePole, CorePole, CorePole];
  archetype: ArchetypeName;
};

const deprecatedAxisNames = [
  "Exploration",
  "AuthorityResistance",
  "StrategicThinking",
  "Conviction",
  "Acceptance",
  "Order",
  "Independence",
  "Emotionality",
  "Authority Resistance",
  "RiskTaking",
  "JusticeOrientation",
];

const parseMappingDoc = (): MappingRow[] => {
  const markdown = readFileSync("docs/mapping.md", "utf8");

  return markdown
    .split(/\r?\n/)
    .filter((line) => line.startsWith("|"))
    .filter((line) => !line.includes("---"))
    .filter((line) => !line.includes("Archetype"))
    .map((line) => {
      const cells = line
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean);

      assert.equal(cells.length, 5);

      return {
        poles: cells.slice(0, 4) as [CorePole, CorePole, CorePole, CorePole],
        archetype: cells[4] as ArchetypeName,
      };
    });
};

const answersForPoles = ([expPrag, empStr, rebGua, ideRea]: [
  CorePole,
  CorePole,
  CorePole,
  CorePole,
]): AnswerMap => {
  const answers: AnswerMap = {};

  for (const question of questions) {
    if (question.dimension === "EXP_PRAG") {
      answers[question.id] = expPrag === "Explorer" ? "A" : "C";
    }

    if (question.dimension === "EMP_STR") {
      answers[question.id] = empStr === "Empath" ? "A" : "C";
    }

    if (question.dimension === "REB_GUA") {
      answers[question.id] = rebGua === "Rebel" ? "A" : "C";
    }

    if (question.dimension === "IDE_REA") {
      answers[question.id] = ideRea === "Idealist" ? "A" : "C";
    }
  }

  return answers;
};

const collectVisibleResultText = (viewModel: ResultViewModel): string =>
  [
    viewModel.archetype.name,
    viewModel.archetype.japaneseName,
    viewModel.archetype.tagline,
    viewModel.characterOverview,
    viewModel.strengths.join("\n"),
    viewModel.weaknesses.join("\n"),
    viewModel.behavioralAnalysis,
    viewModel.screenwriterReport,
    viewModel.behavioralIntelligenceReport,
    viewModel.shareText,
    viewModel.movieProfile.movieTitle,
    viewModel.movieProfile.movieSubtitle,
    viewModel.movieProfile.movieCatchCopy,
    viewModel.movieProfile.personalTrailerLine,
    viewModel.movieProfile.endingTheme,
  ].join("\n");

const toFileSystemPath = (pathOrUrl: string): string =>
  pathOrUrl.startsWith("file:") ? fileURLToPath(pathOrUrl) : pathOrUrl;

describe("result engine", () => {
  const mappingRows = parseMappingDoc();

  it("creates complete result display data for all 16 archetypes", () => {
    for (const row of mappingRows) {
      const result = diagnose(questions, answersForPoles(row.poles));
      const viewModel = createResultViewModel(result);

      assert.equal(viewModel.archetype.name, row.archetype);
      assert.equal(result.archetype, row.archetype);

      assert.ok(viewModel.archetype.japaneseName.trim(), `${row.archetype} is missing Japanese Name`);
      assert.ok(viewModel.archetype.tagline.trim(), `${row.archetype} is missing Tagline`);
      assert.ok(viewModel.characterOverview.trim(), `${row.archetype} is missing Character Overview`);
      assert.ok(viewModel.characterOverview.length >= 400, `${row.archetype} Character Overview is too short`);
      assert.ok(viewModel.characterOverview.length <= 700, `${row.archetype} Character Overview is too long`);
      assert.ok(viewModel.strengths.length > 0, `${row.archetype} is missing Strengths`);
      assert.ok(viewModel.weaknesses.length > 0, `${row.archetype} is missing Weaknesses`);
      assert.ok(viewModel.behavioralAnalysis.trim(), `${row.archetype} is missing Behavioral Analysis`);
      assert.ok(viewModel.screenwriterReport.trim(), `${row.archetype} is missing Screenwriter Report`);
      assert.ok(viewModel.screenwriterReport.length >= 300, `${row.archetype} Screenwriter Report is too short`);
      assert.ok(viewModel.screenwriterReport.length <= 500, `${row.archetype} Screenwriter Report is too long`);
      assert.ok(
        viewModel.behavioralIntelligenceReport.trim(),
        `${row.archetype} is missing Behavioral Intelligence Report`,
      );
      assert.ok(
        viewModel.behavioralIntelligenceReport.length >= 300,
        `${row.archetype} Behavioral Intelligence Report is too short`,
      );
      assert.ok(
        viewModel.behavioralIntelligenceReport.length <= 500,
        `${row.archetype} Behavioral Intelligence Report is too long`,
      );
      assert.ok(viewModel.shareText.length <= 100, `${row.archetype} Share Text is too long`);
      assert.ok(viewModel.xShareText.includes("#MOVIPersona"));
      assert.ok(viewModel.xShareText.includes(viewModel.archetype.japaneseName));
      assert.ok(viewModel.movieProfile.movieTitle.trim(), `${row.archetype} is missing movieTitle`);
      assert.ok(viewModel.movieProfile.movieSubtitle.includes(viewModel.movieProfile.movieTitle));
      assert.ok(viewModel.movieProfile.movieCatchCopy.trim(), `${row.archetype} is missing movieCatchCopy`);
      assert.ok(viewModel.movieProfile.baseTrailerLine.trim(), `${row.archetype} is missing baseTrailerLine`);
      assert.ok(viewModel.movieProfile.personalTrailerLine.trim(), `${row.archetype} is missing personalTrailerLine`);
      assert.ok(viewModel.movieProfile.endingTheme.trim(), `${row.archetype} is missing endingTheme`);
      assert.ok(["RISK", "JUSTICE", "COLLECTIVISM", "SACRIFICE"].includes(viewModel.movieProfile.dominantSecondaryTrait));
      assert.ok(viewModel.trailerReport.openingNarration.trim());
      assert.ok(viewModel.trailerReport.middleConflict.trim());
      assert.ok(viewModel.trailerReport.finalChoice.trim());
      assert.ok(viewModel.trailerReport.trailerTagline.trim());
      assert.ok(viewModel.trailerReport.trailerCopy.trim());
      assert.equal(viewModel.similarProtagonistTendencies.length, 3);
      assert.equal(viewModel.compatibleArchetypes.length, 3);
      assert.equal(
        viewModel.compatibleArchetypes.some((match) => match.archetype.name === viewModel.archetype.name),
        false,
      );
    }
  });

  it("defines movie profiles for all 16 archetypes", () => {
    assert.equal(Object.keys(archetypeMovieProfiles).length, 16);

    for (const row of mappingRows) {
      const profile = archetypeMovieProfiles[row.archetype];

      assert.ok(profile, `${row.archetype} is missing archetypeMovieProfile`);
      assert.equal(profile.archetypeId, row.archetype);
      assert.ok(profile.movieTitle.trim(), `${row.archetype} movieTitle is missing`);
      assert.ok(profile.movieCatchCopy.trim(), `${row.archetype} movieCatchCopy is missing`);
      assert.ok(profile.baseTrailerLine.trim(), `${row.archetype} baseTrailerLine is missing`);
      assert.deepEqual(Object.keys(profile.variantBySecondaryTrait).sort(), [
        "COLLECTIVISM",
        "JUSTICE",
        "RISK",
        "SACRIFICE",
      ]);
      assert.deepEqual(Object.keys(profile.endingThemeBySecondaryTrait).sort(), [
        "COLLECTIVISM",
        "JUSTICE",
        "RISK",
        "SACRIFICE",
      ]);
    }
  });

  it("provides trailer reports and non-character comparison copy for all 16 archetypes", () => {
    const disallowedCharacterNames = [
      "Luke",
      "Skywalker",
      "Batman",
      "Superman",
      "Indiana Jones",
      "Han Solo",
      "Deadpool",
      "Sherlock",
    ];

    for (const row of mappingRows) {
      const result = diagnose(questions, answersForPoles(row.poles));
      const viewModel = createResultViewModel(result);
      const trailerText = Object.values(viewModel.trailerReport).join("\n");
      const tendenciesText = viewModel.similarProtagonistTendencies.join("\n");

      assert.ok(trailerText.length >= 80, `${row.archetype} trailer report is too short`);
      assert.match(tendenciesText, /主人公|人物|リーダー|型/);

      for (const characterName of disallowedCharacterNames) {
        assert.equal(
          `${trailerText}\n${tendenciesText}`.includes(characterName),
          false,
          `${row.archetype} includes a direct movie character name: ${characterName}`,
        );
      }
    }
  });

  it("defines reasoning evidence reports for all 16 archetypes", () => {
    for (const row of mappingRows) {
      const report = archetypeReports[row.archetype];

      assert.ok(report, `${row.archetype} is missing an archetype report`);
      assert.deepEqual(report.reasoningEvidence.coreDimensions, row.poles);
      assert.equal(report.reasoningEvidence.bigFive.length >= 3, true);
      assert.ok(report.reasoningEvidence.narrativeIdentity.trim());
      assert.equal(report.reasoningEvidence.moralPsychology.length >= 2, true);
      assert.ok(report.reasoningEvidence.behavioralAnalysis.trim());
    }

    assert.equal(Object.keys(archetypeReports).length, 16);
  });

  it("defines explicit strengths and weaknesses for all 16 archetypes", () => {
    for (const row of mappingRows) {
      const archetype = archetypes[row.archetype];

      assert.equal(archetype.strengths?.length, 5, `${row.archetype} must define 5 strengths`);
      assert.equal(archetype.weaknesses?.length, 5, `${row.archetype} must define 5 weaknesses`);
      assert.equal(new Set(archetype.strengths).size, 5, `${row.archetype} strengths must be unique`);
      assert.equal(new Set(archetype.weaknesses).size, 5, `${row.archetype} weaknesses must be unique`);
    }
  });

  it("provides an existing local image path for every result", () => {
    for (const row of mappingRows) {
      const result = diagnose(questions, answersForPoles(row.poles));
      const viewModel = createResultViewModel(result);

      assert.equal(viewModel.imagePath, viewModel.archetype.imagePath);
      assert.ok(viewModel.imagePath.endsWith(".png"));
      assert.ok(existsSync(toFileSystemPath(viewModel.imagePath)), `${viewModel.imagePath} does not exist`);

      for (const match of viewModel.compatibleArchetypes) {
        assert.ok(match.archetype.imagePath.endsWith(".png"));
        assert.ok(
          existsSync(toFileSystemPath(match.archetype.imagePath)),
          `${match.archetype.imagePath} does not exist`,
        );
      }
    }
  });

  it("creates deterministic compatibility matches with reasons for all 16 archetypes", () => {
    for (const row of mappingRows) {
      const result = diagnose(questions, answersForPoles(row.poles));
      const viewModel = createResultViewModel(result);
      const repeatedViewModel = createResultViewModel(result);

      assert.deepEqual(
        viewModel.compatibleArchetypes.map((match) => match.archetype.name),
        repeatedViewModel.compatibleArchetypes.map((match) => match.archetype.name),
      );
      assert.deepEqual(viewModel.movieProfile, repeatedViewModel.movieProfile);
      assert.equal(
        new Set(viewModel.compatibleArchetypes.map((match) => match.role)).size,
        viewModel.compatibleArchetypes.length,
      );

      for (const match of viewModel.compatibleArchetypes) {
        assert.match(match.matchType, /似た価値観型|補完型|対照型/);
        assert.ok(match.affinity >= 0 && match.affinity <= 100);
        assert.ok(match.reason.length >= 80);
        assert.notEqual(match.role, "同じ火を守る主人公");
        assert.match(match.role, /相棒|同志|案内人|守護者|右腕|戦友|参謀|軍師|理解者|仲間|導き手|共犯者/);
        assert.ok(
          match.reason.includes("あなた") || match.reason.includes(viewModel.archetype.japaneseName),
        );
        assert.match(match.reason, /二人|組めば|並ぶ|相手|主人公|物語/);
        assert.doesNotMatch(match.reason, /同じ価値を手放さず|迷いは確信に変わり/);
      }
    }
  });

  it("makes secondary traits available to result text generation", () => {
    for (const row of mappingRows) {
      const result = diagnose(questions, answersForPoles(row.poles));
      const viewModel = createResultViewModel(result);
      const visibleText = collectVisibleResultText(viewModel);

      assert.equal(Object.keys(viewModel.secondaryTraits).length, 4);
      assert.equal(viewModel.cinematicScores.length, 5);
      assert.ok(viewModel.cinematicScores.every((score) => score.value >= 0 && score.value <= 100));
      assert.match(visibleText, /ストレス|リスク|判断|対人|リーダーシップ/);
    }
  });

  it("does not include deprecated legacy axis names in result display text", () => {
    for (const row of mappingRows) {
      const result = diagnose(questions, answersForPoles(row.poles));
      const viewModel = createResultViewModel(result);
      const visibleText = collectVisibleResultText(viewModel);

      for (const deprecatedName of deprecatedAxisNames) {
        assert.equal(
          visibleText.includes(deprecatedName),
          false,
          `${row.archetype} result includes deprecated axis name: ${deprecatedName}`,
        );
      }
    }
  });
});
