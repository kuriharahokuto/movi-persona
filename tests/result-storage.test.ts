import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { questions } from "../src/data/questions.ts";
import { createResultViewModel } from "../src/lib/result/index.ts";
import { diagnose } from "../src/lib/scoring/index.ts";
import {
  clearCompletedDiagnoses,
  loadCompletedDiagnoses,
  saveDiagnosisResult,
  type StorageLike,
} from "../src/lib/storage/index.ts";
import type { AnswerMap } from "../src/types/diagnosis.ts";

class MemoryStorage implements StorageLike {
  private values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }
}

const answerAll = (choice: "A" | "B" | "C"): AnswerMap =>
  Object.fromEntries(questions.map((question) => [question.id, choice])) as AnswerMap;

describe("result and storage logic", () => {
  it("creates a result view model with archetype data and share text", () => {
    const result = diagnose(questions, answerAll("A"));
    const viewModel = createResultViewModel(result);

    assert.equal(viewModel.archetype.name, "Dream Explorer");
    assert.equal(viewModel.imagePath, viewModel.archetype.imagePath);
    assert.match(viewModel.imagePath, /DREAM_EXPLORER\.png$/);
    assert.match(viewModel.shareText, /Dream Explorer/);
  });

  it("saves only the latest completed diagnosis, then loads and clears local storage shape", () => {
    const storage = new MemoryStorage();
    const firstResult = diagnose(questions, answerAll("A"));
    const latestResult = diagnose(questions, answerAll("C"));

    const firstSaved = saveDiagnosisResult(firstResult, storage);
    const latestSaved = saveDiagnosisResult(latestResult, storage);
    const loaded = loadCompletedDiagnoses(storage);

    assert.ok(firstSaved);
    assert.ok(latestSaved);
    assert.equal(loaded.length, 1);
    assert.equal(loaded[0].result.archetype, "Strategist");

    clearCompletedDiagnoses(storage);

    assert.deepEqual(loadCompletedDiagnoses(storage), []);
  });
});
