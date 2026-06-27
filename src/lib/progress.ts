// src/lib/progress.ts

import type { UserState } from "@/types/user";
import hiragana from "@/data/hiragana.json";

export const TOTAL_LESSONS = hiragana.length;

export function getLessonProgress(state: UserState): number {
  return Math.round((state.completedLessons.length / TOTAL_LESSONS) * 100);
}

export function isVolumeUnlocked(state: UserState, volumeId: number): boolean {
  return state.unlockedVolumes.includes(volumeId);
}

export function completeLesson(state: UserState, lessonId: number): UserState {
  const completedLessons = state.completedLessons.includes(lessonId)
    ? state.completedLessons
    : [...state.completedLessons, lessonId];

  const progress = Math.round((completedLessons.length / TOTAL_LESSONS) * 100);

  return {
    ...state,
    completedLessons,
    progress,
    currentLesson: state.currentLesson + 1,
  };
}
