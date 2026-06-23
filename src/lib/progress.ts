import type { Progress } from "@/types";

const KEY = "iqro_jepang_progress";

export const defaultProgress: Progress = {
  currentVolume: 1,
  currentPage: 0,
  completedVolumes: [],
  examScores: {},
  lastUpdated: new Date().toISOString(),
};

export function loadProgress(): Progress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress;
    return JSON.parse(raw) as Progress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(p: Progress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify({ ...p, lastUpdated: new Date().toISOString() }));
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function getGrade(score: number): "lulus" | "latihan" | "ulangi" {
  if (score >= 80) return "lulus";
  if (score >= 60) return "latihan";
  return "ulangi";
}
