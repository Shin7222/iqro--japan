// src/types/exam.ts

export interface DakutenQuestion {
  base: string;
  daku: string;
  romaji: string;
}

export interface ReadingQuestion {
  text: string;
  answer: string;
}

export type ExamStatus = "idle" | "in-progress" | "passed" | "failed";
