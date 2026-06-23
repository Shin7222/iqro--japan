import type { Page, NewLetterPage, ReviewPage } from "@/types";

// ── Hiragana database ──────────────────────────────────────────────────────────
export const HIRAGANA_DB: Record<string, string> = {
  あ: "a", い: "i", う: "u", え: "e", お: "o",
  か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
  た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
  は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
  や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
  わ: "wa", を: "wo", ん: "n",
};

export const GROUPS: string[][] = [
  ["あ","い","う","え","お"],
  ["か","き","く","け","こ"],
  ["さ","し","す","せ","そ"],
  ["た","ち","つ","て","と"],
  ["な","に","ぬ","ね","の"],
  ["は","ひ","ふ","へ","ほ"],
  ["ま","み","む","め","も"],
  ["や","ゆ","よ"],
  ["ら","り","る","れ","ろ"],
  ["わ","を","ん"],
];

// Known Japanese words using only hiragana introduced so far
const WORD_HINTS: Record<string, string[]> = {
  "い": ["いえ", "いぬ"],
  "う": ["うえ", "うみ"],
  "え": ["えい"],
  "お": ["おい"],
  "く": [],
  "き": ["きく"],
  "け": ["いけ"],
  "こ": ["ここ", "こい"],
  "し": ["うし"],
  "す": ["すし"],
  "そ": [],
  "ち": ["ちかい"],
  "つ": ["つき", "いつ"],
  "て": ["てき"],
  "と": ["とき"],
  "に": ["にく"],
  "ぬ": ["いぬ"],
  "ね": ["ねこ"],
  "の": ["のき"],
  "は": ["はな"],
  "ひ": ["ひかり"],
  "ふ": ["ふね"],
  "へ": ["うへ"],
  "ほ": ["ほし"],
  "み": ["みち", "みず"],
  "む": ["むし"],
  "め": ["めだか"],
  "も": ["もも"],
  "ゆ": ["ゆき"],
  "よ": ["よる"],
  "り": ["とり"],
  "る": ["くるま"],
  "れ": ["おれ"],
  "ろ": ["いろ"],
  "わ": ["わに", "わた"],
  "を": [],
  "ん": ["みんな"],
};

// Shuffle array deterministically by seed
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeCombos(newLetter: string, prevLetters: string[], count: number): string[] {
  const combos: string[] = [];
  for (const p of prevLetters) {
    combos.push(newLetter + p, p + newLetter);
  }
  // Add doubles
  combos.push(newLetter + newLetter);
  const shuffled = seededShuffle(combos, newLetter.codePointAt(0) ?? 42);
  return shuffled.slice(0, count);
}

function makeGroups3(letters: string[], newLetter: string, seed: number): string[][] {
  const pool = seededShuffle([...letters], seed);
  const groups: string[][] = [];
  // Groups of 3-4 chars
  for (let i = 0; i < pool.length; i += 3) {
    const chunk = pool.slice(i, i + 3);
    if (chunk.length >= 2) {
      // Ensure new letter appears somewhere
      if (!chunk.includes(newLetter) && groups.length === 0) chunk[0] = newLetter;
      groups.push(chunk);
    }
  }
  return groups.slice(0, 4);
}

// Build all combos for a letter with letters introduced so far
function buildLetterPage(
  letter: string,
  allPrev: string[], // letters introduced BEFORE this one
  pageNumber: number
): NewLetterPage {
  const romaji = HIRAGANA_DB[letter];
  const prev = allPrev.length > 0 ? allPrev : [letter];
  const seed = letter.codePointAt(0) ?? 1;

  // Stage 2: pair with previous letters (same group + prev groups)
  const stage2 = allPrev.slice(-4).map((p) => p + letter).concat(
    allPrev.slice(-2).map((p) => letter + p)
  ).slice(0, 5);

  // Stage 3: mixed combos
  const stage3 = makeCombos(letter, allPrev.slice(-5), 6);

  // Stage 4: 3-char groups
  const allCurrent = [...allPrev, letter];
  const stage4Groups = makeGroups3(allCurrent, letter, seed);

  const drillGroups = [];

  if (stage2.length > 0) {
    drillGroups.push({ items: stage2, label: "" });
  }
  if (stage3.length > 0) {
    drillGroups.push({ items: stage3, label: "" });
  }
  if (stage4Groups.length > 0) {
    stage4Groups.forEach((g) => {
      if (g.length > 0) drillGroups.push({ items: [g.join("")], label: "" });
    });
  }

  const words = WORD_HINTS[letter] ?? [];

  return {
    type: "new-letter",
    pageNumber,
    letter,
    romaji,
    drillGroups,
    words,
  };
}

function buildReviewPage(letters: string[], title: string, pageNumber: number): ReviewPage {
  // Row 1: natural order
  // Row 2: reverse
  // Row 3: seeded shuffle
  // Row 4: another shuffle
  const r1 = [...letters];
  const r2 = [...letters].reverse();
  const r3 = seededShuffle([...letters], 7777);
  const r4 = seededShuffle([...letters], 3333);

  const rows = [r1, r2, r3, r4].filter((r) => r.length >= 2);

  // Pair combos
  const pairs: string[][] = [];
  for (let i = 0; i < letters.length - 1; i++) {
    pairs.push([letters[i] + letters[i + 1]]);
  }

  return {
    type: "review",
    pageNumber,
    title,
    rows,
    pairs: pairs.slice(0, 5),
  };
}

// ── Generate all pages ────────────────────────────────────────────────────────
export function generateVolume1Pages(): Page[] {
  const pages: Page[] = [];
  let pageNum = 1;
  const introduced: string[] = [];

  for (let gi = 0; gi < GROUPS.length; gi++) {
    const group = GROUPS[gi];

    for (let li = 0; li < group.length; li++) {
      const letter = group[li];
      const prevLetters = [...introduced];
      pages.push(buildLetterPage(letter, prevLetters, pageNum++));
      introduced.push(letter);
    }

    // Review page after each group
    const reviewLetters = introduced.slice();
    const isLargeReview = introduced.length >= 10;
    pages.push(
      buildReviewPage(
        isLargeReview ? introduced.slice(-10) : introduced,
        `Ulasan: ${group.map((l) => l).join(" ")}`,
        pageNum++
      )
    );
  }

  // Summary
  pages.push({ type: "summary", pageNumber: pageNum++ });

  // Dakuten
  pages.push({ type: "dakuten", pageNumber: pageNum++ });

  // Exam
  pages.push({ type: "exam", pageNumber: pageNum++ });

  return pages;
}

export const VOLUME1_PAGES = generateVolume1Pages();
export const TOTAL_PAGES = VOLUME1_PAGES.length;
