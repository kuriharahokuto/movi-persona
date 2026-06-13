import type { DiagnosisResult, StoredDiagnosis } from "../../types/diagnosis.ts";

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const STORAGE_KEY = "moviPersona.completedDiagnoses";

const getBrowserStorage = (): StorageLike | undefined => {
  if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
    return undefined;
  }

  return globalThis.localStorage as StorageLike;
};

const createStoredDiagnosis = (result: DiagnosisResult): StoredDiagnosis => ({
  id: `${Date.now()}-${result.archetype.replaceAll(" ", "_").toUpperCase()}`,
  savedAt: new Date().toISOString(),
  result,
});

export const loadCompletedDiagnoses = (
  storage: StorageLike | undefined = getBrowserStorage(),
): StoredDiagnosis[] => {
  if (!storage) {
    return [];
  }

  const rawValue = storage.getItem(STORAGE_KEY);
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? (parsed as StoredDiagnosis[]) : [];
  } catch {
    return [];
  }
};

export const saveDiagnosisResult = (
  result: DiagnosisResult,
  storage: StorageLike | undefined = getBrowserStorage(),
): StoredDiagnosis | undefined => {
  if (!storage) {
    return undefined;
  }

  const storedDiagnosis = createStoredDiagnosis(result);
  storage.setItem(STORAGE_KEY, JSON.stringify([storedDiagnosis]));

  return storedDiagnosis;
};

export const clearCompletedDiagnoses = (
  storage: StorageLike | undefined = getBrowserStorage(),
): void => {
  storage?.removeItem(STORAGE_KEY);
};
