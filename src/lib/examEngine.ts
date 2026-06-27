// src/lib/examEngine.ts

import type { DakutenQuestion, ReadingQuestion } from "@/types/exam";
import dakutenData from "@/data/dakuten.json";
import readingData from "@/data/readingExam.json";

export function getDakutenQuestions(): DakutenQuestion[] {
  return dakutenData as DakutenQuestion[];
}

export function getReadingQuestions(): ReadingQuestion[] {
  return readingData as ReadingQuestion[];
}

export function checkDakutenAnswer(question: DakutenQuestion, input: string): boolean {
  return input.trim().toLowerCase() === question.romaji.toLowerCase();
}

export function checkReadingAnswer(question: ReadingQuestion, input: string): boolean {
  return input.trim().toLowerCase() === question.answer.toLowerCase();
}
