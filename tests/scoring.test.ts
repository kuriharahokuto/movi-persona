import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { questions } from "../src/data/questions.ts";
import {
  calculateMaxScores,
  diagnose,
  validateQuestionConfiguration,
} from "../src/lib/scoring/index.ts";
import type { AnswerMap } from "../src/types/diagnosis.ts";

const answerAll = (choice: "A" | "B" | "C"): AnswerMap =>
  Object.fromEntries(questions.map((question) => [question.id, choice])) as AnswerMap;

describe("scoring engine", () => {
  it("validates the bundled question configuration", () => {
    const validation = validateQuestionConfiguration(questions);

    assert.equal(validation.valid, true);
    assert.deepEqual(validation.errors, []);
  });

  it("keeps the cinematic question format consistent", () => {
    assert.equal(questions.length, 16);
    assert.equal(new Set(questions.map((question) => question.genre)).size, 16);

    for (const question of questions) {
      assert.ok(question.title.length > 0, `${question.id} must have a scene title`);

      const sceneLines = question.scene
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      assert.ok(
        sceneLines.length >= 3 && sceneLines.length <= 6,
        `${question.id} scene must be 3 to 6 lines`,
      );
    }
  });

  it("keeps core pole max scores balanced", () => {
    const maxScores = calculateMaxScores(questions);

    assert.equal(maxScores.Explorer, maxScores.Pragmatist);
    assert.equal(maxScores.Empath, maxScores.Strategist);
    assert.equal(maxScores.Rebel, maxScores.Guardian);
    assert.equal(maxScores.Idealist, maxScores.Realist);
  });

  it("selects Dream Explorer for all positive-pole answers", () => {
    const result = diagnose(questions, answerAll("A"));

    assert.equal(result.archetype, "Dream Explorer");
    assert.equal(result.dimensions.EXP_PRAG.dominant, "Explorer");
    assert.equal(result.dimensions.EMP_STR.dominant, "Empath");
    assert.equal(result.dimensions.REB_GUA.dominant, "Rebel");
    assert.equal(result.dimensions.IDE_REA.dominant, "Idealist");
  });

  it("selects Strategist for all negative-pole answers", () => {
    const result = diagnose(questions, answerAll("C"));

    assert.equal(result.archetype, "Strategist");
    assert.equal(result.dimensions.EXP_PRAG.dominant, "Pragmatist");
    assert.equal(result.dimensions.EMP_STR.dominant, "Strategist");
    assert.equal(result.dimensions.REB_GUA.dominant, "Guardian");
    assert.equal(result.dimensions.IDE_REA.dominant, "Realist");
  });

  it("normalizes secondary traits without using them for archetype selection", () => {
    const result = diagnose(questions, answerAll("A"));

    assert.equal(result.archetype, "Dream Explorer");
    assert.equal(result.secondaryTraits.RISK, 100);
    assert.equal(result.secondaryTraits.SACRIFICE, 100);
    assert.equal(result.secondaryTraits.JUSTICE, 100);
  });

  it("rejects invalid core pole balance", () => {
    const invalidQuestions = questions.map((question) =>
      question.id === "Q01"
        ? {
            ...question,
            choices: question.choices.map((choice) =>
              choice.id === "C"
                ? { ...choice, scores: { ...choice.scores, Pragmatist: 1 } }
                : choice,
            ),
          }
        : question,
    );

    const validation = validateQuestionConfiguration(invalidQuestions);

    assert.equal(validation.valid, false);
    assert.match(validation.errors.join(" "), /EXP_PRAG/);
    assert.throws(() => diagnose(invalidQuestions, answerAll("A")), /Invalid question configuration/);
  });
});
