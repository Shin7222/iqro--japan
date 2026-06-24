import type { Progress } from "@/types";

const KEY = "iqro_jepang_progress";

export const defaultProgress: Progress = {
  currentVolume: 1,
  currentPage: 0,
  pageByVolume: { 1: 0, 2: 0 },
  completedVolumes: [],
  examScores: {},
  lastUpdated: new Date().toISOString(),
};

export function loadProgress(): Progress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress;
    const p = JSON.parse(raw) as Progress;
    // Migrate older saves that lack pageByVolume
    if (!p.pageByVolume) p.pageByVolume = { 1: p.currentPage ?? 0, 2: 0 };
    return p;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(p: Progress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify({ ...p, lastUpdated: new Date().toISOString() }));
}

export function switchVolume(p: Progress, volume: number): Progress {
  // Save current page into pageByVolume before switching
  const next: Progress = {
    ...p,
    pageByVolume: { ...p.pageByVolume, [p.currentVolume]: p.currentPage },
    currentVolume: volume,
    currentPage: p.pageByVolume?.[volume] ?? 0,
  };
  saveProgress(next);
  return next;
}

export function resetAllProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function getGrade(score: number): "lulus" | "latihan" | "ulangi" {
  if (score >= 80) return "lulus";
  if (score >= 60) return "latihan";
  return "ulangi";
}
