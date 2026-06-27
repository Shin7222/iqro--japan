// src/lib/lessonGenerator.ts

import type { HiraganaChar, Exercise, GeneratedLesson } from "@/types/lesson";

// Real Japanese words using only hiragana
const WORD_BANK: Record<string, string[]> = {
  // using あいう group
  "vowels-2": ["あい", "いえ"],
  "vowels-5": ["うえ", "おい", "あお", "いぬ", "いえ", "うお"],
  "k-10": ["かお", "いか", "きく", "こい", "あき", "うき", "かき"],
  "s-15": ["さけ", "しお", "すき", "かさ", "きし", "うさぎ", "いす"],
  "t-20": ["たこ", "とけい", "ちかてつ", "そと", "てき", "おと"],
  "n-25": ["ねこ", "いぬ", "なに", "のき", "にく", "にし"],
  "h-30": ["はな", "ひと", "ふね", "へや", "ほし", "はし", "ふく"],
  "m-35": ["まち", "みず", "むし", "めし", "もの", "やま", "うみ"],
  "y-38": ["やま", "ゆき", "よる"],
  "r-43": ["さくら", "しろ", "みどり", "きいろ"],
  "w-45": ["わに", "かわ"],
  "n2-46": ["みんな", "あんな", "そんな"],
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getWordBank(lessonId: number): string[] {
  // Find the closest word bank for current lesson range
  const keys = Object.keys(WORD_BANK);
  let best: string[] = [];
  for (const key of keys) {
    const maxId = parseInt(key.split("-")[1]);
    if (lessonId >= maxId) best = WORD_BANK[key];
  }
  return best;
}

export function generateLesson(
  lesson: HiraganaChar,
  known: HiraganaChar[]
): GeneratedLesson {
  const { newChar } = lesson;
  const knownChars = known.map((k) => k.newChar);
  const allChars = [newChar, ...knownChars];

  const exercises: Exercise[] = [];

  // 1. INTRO — new char repeated
  exercises.push({
    type: "intro",
    items: [newChar, newChar, newChar, newChar],
  });

  // 2. COMBINE — new char with recent known chars (like screenshot: あい, いあ pairs)
  if (knownChars.length >= 1) {
    const recent = knownChars.slice(-5);
    const pairs: string[] = [];
    for (const k of recent) {
      pairs.push(k + newChar);
      pairs.push(newChar + k);
    }
    // Also add doubles like いい
    pairs.push(newChar + newChar);
    exercises.push({ type: "combine", items: shuffle(pairs).slice(0, 8) });
  }

  // 3. MIX — random combos of all known chars (3-char strings)
  if (allChars.length >= 3) {
    const mix: string[] = [];
    for (let i = 0; i < 9; i++) {
      const len = Math.floor(Math.random() * 2) + 2; // 2 or 3 chars
      mix.push(
        shuffle(allChars)
          .slice(0, len)
          .join("")
      );
    }
    exercises.push({ type: "mix", items: mix });
  }

  // 4. WORDS — real Japanese words
  const words = getWordBank(lesson.id);
  if (words.length > 0) {
    exercises.push({
      type: "words",
      items: shuffle(words).slice(0, 6),
    });
  }

  return { lesson, known, exercises };
}
