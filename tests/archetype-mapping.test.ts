import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

import { archetypes } from "../src/data/archetypes.ts";
import { archetypeMapping } from "../src/data/mapping.ts";
import { questions } from "../src/data/questions.ts";
import { diagnose } from "../src/lib/scoring/index.ts";
import type { AnswerMap, ArchetypeName, CorePole } from "../src/types/diagnosis.ts";

type MappingRow = {
  poles: [CorePole, CorePole, CorePole, CorePole];
  archetype: ArchetypeName;
};

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

describe("16 archetype mapping", () => {
  const mappingRows = parseMappingDoc();

  it("defines exactly 16 unique archetype rows in mapping.md", () => {
    const rowKeys = mappingRows.map((row) => row.poles.join("|"));
    const archetypeNames = mappingRows.map((row) => row.archetype);

    assert.equal(mappingRows.length, 16);
    assert.equal(new Set(rowKeys).size, 16);
    assert.equal(new Set(archetypeNames).size, 16);
  });

  it("matches mapping.ts with mapping.md", () => {
    for (const row of mappingRows) {
      const key = row.poles.join("|");

      assert.equal(archetypeMapping[key], row.archetype);
    }

    assert.equal(Object.keys(archetypeMapping).length, 16);
  });

  it("has archetype data for every mapped archetype", () => {
    for (const row of mappingRows) {
      assert.ok(archetypes[row.archetype], `${row.archetype} is missing from archetypes.ts`);
    }

    assert.equal(Object.keys(archetypes).length, 16);
  });

  it("can reach all 16 archetypes through the scoring engine", () => {
    const reached = new Set<ArchetypeName>();

    for (const row of mappingRows) {
      const result = diagnose(questions, answersForPoles(row.poles));

      assert.equal(result.archetype, row.archetype);
      reached.add(result.archetype);
    }

    assert.equal(reached.size, 16);
  });

  it("does not produce duplicate archetype results for unique mapping rows", () => {
    const results = mappingRows.map((row) => diagnose(questions, answersForPoles(row.poles)).archetype);

    assert.equal(results.length, 16);
    assert.equal(new Set(results).size, 16);
  });

  it("returns deterministic results for identical inputs", () => {
    for (const row of mappingRows) {
      const answers = answersForPoles(row.poles);
      const firstResult = diagnose(questions, answers);
      const secondResult = diagnose(questions, answers);

      assert.deepEqual(secondResult, firstResult);
    }
  });
});
