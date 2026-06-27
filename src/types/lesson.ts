// src/types/lesson.ts

export interface HiraganaChar {
  id: number;
  newChar: string;
  romaji: string;
  group: string;
}

export interface Exercise {
  type: "intro" | "combine" | "mix" | "words";
  items: string[];
}

export interface GeneratedLesson {
  lesson: HiraganaChar;
  known: HiraganaChar[];
  exercises: Exercise[];
}
