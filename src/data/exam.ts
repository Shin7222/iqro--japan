import type { ExamQuestion } from "@/types";

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // Part 1 – Recognize hiragana → romaji
  { type: "recognize", question: "ね", options: ["ne", "na", "ni", "nu"], answer: "ne" },
  { type: "recognize", question: "み", options: ["mi", "mu", "me", "ma"], answer: "mi" },
  { type: "recognize", question: "つ", options: ["chi", "tsu", "ta", "te"], answer: "tsu" },
  { type: "recognize", question: "ふ", options: ["ho", "he", "fu", "hi"], answer: "fu" },
  { type: "recognize", question: "わ", options: ["wa", "wo", "ra", "ya"], answer: "wa" },
  { type: "recognize", question: "ゆ", options: ["ya", "yo", "yu", "yi"], answer: "yu" },
  { type: "recognize", question: "ん", options: ["n", "wa", "wo", "mo"], answer: "n" },
  { type: "recognize", question: "し", options: ["si", "chi", "shi", "su"], answer: "shi" },

  // Part 2 – Distinguish similar characters
  { type: "distinguish", question: "れ", options: ["わ", "れ", "ろ", "ね"], answer: "れ" },
  { type: "distinguish", question: "ぬ", options: ["ぬ", "め", "ね", "の"], answer: "ぬ" },
  { type: "distinguish", question: "は", options: ["ほ", "ひ", "は", "へ"], answer: "は" },
  { type: "distinguish", question: "き", options: ["さ", "き", "け", "こ"], answer: "き" },
  { type: "distinguish", question: "る", options: ["ろ", "れ", "る", "ら"], answer: "る" },
  { type: "distinguish", question: "ふ", options: ["ふ", "ぬ", "め", "む"], answer: "ふ" },

  // Part 3 – Read words
  { type: "read-word", question: "さかな", options: ["sakana", "sakona", "takana", "sakuna"], answer: "sakana" },
  { type: "read-word", question: "ねこ", options: ["neko", "niku", "neko", "neno"], answer: "neko" },
  { type: "read-word", question: "いぬ", options: ["inu", "ina", "eni", "uni"], answer: "inu" },
  { type: "read-word", question: "やま", options: ["yama", "yume", "yomi", "yame"], answer: "yama" },
  { type: "read-word", question: "くるま", options: ["kuruma", "koruma", "kiruma", "kurema"], answer: "kuruma" },
  { type: "read-word", question: "はな", options: ["hana", "kana", "mana", "nana"], answer: "hana" },
  { type: "read-word", question: "みず", options: ["mizu", "miso", "mise", "mire"], answer: "mizu" },

  // Part 4 – Read sentences (romaji options)
  {
    type: "read-sentence",
    question: "おはようございます",
    options: ["ohayou gozaimasu", "konnichiwa", "sayounara", "arigatou"],
    answer: "ohayou gozaimasu",
  },
  {
    type: "read-sentence",
    question: "ありがとうございます",
    options: ["arigatou gozaimasu", "sumimasen", "ohayou", "konbanwa"],
    answer: "arigatou gozaimasu",
  },
  {
    type: "read-sentence",
    question: "わたしはがくせいです",
    options: ["watashi wa gakusei desu", "anata wa sensei desu", "kore wa nan desu", "watashi wa kyoushi desu"],
    answer: "watashi wa gakusei desu",
  },
];
