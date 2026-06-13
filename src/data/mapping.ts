import type { ArchetypeName, CorePole } from "../types/diagnosis.ts";

export type ArchetypeMappingKey = `${CorePole}|${CorePole}|${CorePole}|${CorePole}`;

export const createArchetypeMappingKey = (
  expPrag: CorePole,
  empStr: CorePole,
  rebGua: CorePole,
  ideRea: CorePole,
): ArchetypeMappingKey => `${expPrag}|${empStr}|${rebGua}|${ideRea}`;

export const archetypeMapping: Record<string, ArchetypeName> = {
  "Explorer|Empath|Rebel|Idealist": "Dream Explorer",
  "Explorer|Empath|Rebel|Realist": "Wanderer",
  "Explorer|Empath|Guardian|Idealist": "Visionary Hero",
  "Explorer|Empath|Guardian|Realist": "Seeker",
  "Explorer|Strategist|Rebel|Idealist": "Revolutionary",
  "Explorer|Strategist|Rebel|Realist": "Rogue",
  "Explorer|Strategist|Guardian|Idealist": "Commander",
  "Explorer|Strategist|Guardian|Realist": "Adventurer",
  "Pragmatist|Empath|Rebel|Idealist": "Advocate",
  "Pragmatist|Empath|Rebel|Realist": "Mediator",
  "Pragmatist|Empath|Guardian|Idealist": "Guardian",
  "Pragmatist|Empath|Guardian|Realist": "Caretaker",
  "Pragmatist|Strategist|Rebel|Idealist": "Judge",
  "Pragmatist|Strategist|Rebel|Realist": "Operator",
  "Pragmatist|Strategist|Guardian|Idealist": "Architect",
  "Pragmatist|Strategist|Guardian|Realist": "Strategist",
};
