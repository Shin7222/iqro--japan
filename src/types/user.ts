// src/types/user.ts

export interface UserState {
  currentVolume: number;
  currentLesson: number;
  xp: number;
  level: number;
  badges: string[];
  unlockedVolumes: number[];
  completedLessons: number[];
  examStatus: Record<string, string>;
  progress: number;
  darkMode: boolean;
}
