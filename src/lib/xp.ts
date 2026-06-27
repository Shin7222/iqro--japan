// src/lib/xp.ts

import type { UserState } from "@/types/user";

export const XP_PER_LESSON = 10;
export const XP_PER_EXAM = 100;

export function xpForLevel(level: number): number {
  return level * 100;
}

export function addXp(state: UserState, amount: number): UserState {
  let xp = state.xp + amount;
  let level = state.level;
  while (xp >= xpForLevel(level)) {
    xp -= xpForLevel(level);
    level++;
  }
  return { ...state, xp, level };
}

export function calcProgress(completedCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((completedCount / totalCount) * 100);
}
