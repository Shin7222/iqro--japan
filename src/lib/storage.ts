// src/lib/storage.ts

import type { UserState } from "@/types/user";

const STORAGE_KEY = "iqro_jepang_v1";

export const DEFAULT_STATE: UserState = {
  currentVolume: 1,
  currentLesson: 0,
  xp: 0,
  level: 1,
  badges: [],
  unlockedVolumes: [1],
  completedLessons: [],
  examStatus: {},
  progress: 0,
  darkMode: false,
};

export function loadState(): UserState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: UserState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
}

export function resetState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
