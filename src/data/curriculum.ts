import type { Page, NewLetterPage, ReviewPage } from "@/types";

// ── Shared types ──────────────────────────────────────────────────────────────
export type ScriptType = "hiragana" | "katakana";

// ── Hiragana ──────────────────────────────────────────────────────────────────
export const HIRAGANA_DB: Record<string, string> = {
  あ:"a", い:"i", う:"u", え:"e", お:"o",
  か:"ka", き:"ki", く:"ku", け:"ke", こ:"ko",
  さ:"sa", し:"shi", す:"su", せ:"se", そ:"so",
  た:"ta", ち:"chi", つ:"tsu", て:"te", と:"to",
  な:"na", に:"ni", ぬ:"nu", ね:"ne", の:"no",
  は:"ha", ひ:"hi", ふ:"fu", へ:"he", ほ:"ho",
  ま:"ma", み:"mi", む:"mu", め:"me", も:"mo",
  や:"ya", ゆ:"yu", よ:"yo",
  ら:"ra", り:"ri", る:"ru", れ:"re", ろ:"ro",
  わ:"wa", を:"wo", ん:"n",
};

export const HIRAGANA_GROUPS: string[][] = [
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

const HIRAGANA_WORDS: Record<string, string[]> = {
  "い":["いえ","いぬ"], "う":["うえ","うみ"], "え":["えい"], "お":["おい"],
  "き":["きく"], "け":["いけ"], "こ":["ここ","こい"],
  "し":["うし"], "す":["すし"],
  "ち":["ちかい"], "つ":["つき","いつ"], "て":["てき"], "と":["とき"],
  "に":["にく"], "ぬ":["いぬ"], "ね":["ねこ"], "の":["のき"],
  "は":["はな"], "ひ":["ひかり"], "ふ":["ふね"], "ほ":["ほし"],
  "み":["みち","みず"], "む":["むし"], "め":["めだか"], "も":["もも"],
  "ゆ":["ゆき"], "よ":["よる"],
  "り":["とり"], "る":["くるま"], "れ":["おれ"], "ろ":["いろ"],
  "わ":["わに","わた"], "ん":["みんな"],
};

// ── Katakana ──────────────────────────────────────────────────────────────────
export const KATAKANA_DB: Record<string, string> = {
  ア:"a", イ:"i", ウ:"u", エ:"e", オ:"o",
  カ:"ka", キ:"ki", ク:"ku", ケ:"ke", コ:"ko",
  サ:"sa", シ:"shi", ス:"su", セ:"se", ソ:"so",
  タ:"ta", チ:"chi", ツ:"tsu", テ:"te", ト:"to",
  ナ:"na", ニ:"ni", ヌ:"nu", ネ:"ne", ノ:"no",
  ハ:"ha", ヒ:"hi", フ:"fu", ヘ:"he", ホ:"ho",
  マ:"ma", ミ:"mi", ム:"mu", メ:"me", モ:"mo",
  ヤ:"ya", ユ:"yu", ヨ:"yo",
  ラ:"ra", リ:"ri", ル:"ru", レ:"re", ロ:"ro",
  ワ:"wa", ヲ:"wo", ン:"n",
};

export const KATAKANA_GROUPS: string[][] = [
  ["ア","イ","ウ","エ","オ"],
  ["カ","キ","ク","ケ","コ"],
  ["サ","シ","ス","セ","ソ"],
  ["タ","チ","ツ","テ","ト"],
  ["ナ","ニ","ヌ","ネ","ノ"],
  ["ハ","ヒ","フ","ヘ","ホ"],
  ["マ","ミ","ム","メ","モ"],
  ["ヤ","ユ","ヨ"],
  ["ラ","リ","ル","レ","ロ"],
  ["ワ","ヲ","ン"],
];

// Katakana words (loanwords commonly written in katakana)
const KATAKANA_WORDS: Record<string, string[]> = {
  "ア":[], "イ":[], "ウ":[], "エ":[], "オ":["オレ"],
  "カ":["カメラ"], "キ":["キウイ"], "ク":["クレア"], "ケ":["ケーキ"], "コ":["コーラ"],
  "サ":["サカナ"], "シ":["シロ"], "ス":["スキ"], "セ":["セーラー"], "ソ":["ソファ"],
  "チ":["チーム"], "ツ":["ツアー"], "テ":["テスト"], "ト":["トマト"],
  "ナ":[], "ニ":[], "ヌ":[], "ネ":["ネコ"], "ノ":["ノート"],
  "ハ":["ハム"], "ヒ":["ヒーロー"], "フ":["フルーツ"], "ホ":["ホテル"],
  "マ":["マンガ"], "ミ":["ミルク"], "ム":[], "メ":["メモ"], "モ":["モデル"],
  "ヤ":["ヤシ"], "ユ":["ユニコーン"], "ヨ":["ヨガ"],
  "ラ":["ライス"], "リ":["リスト"], "ル":["ルール"], "レ":["レモン"], "ロ":["ロボット"],
  "ワ":["ワイン"], "ヲ":[], "ン":["ランチ"],
};

// Dakuten groups for each script
export const HIRAGANA_DAKUTEN = [
  { base:["か","き","く","け","こ"], voiced:["が","ぎ","ぐ","げ","ご"] },
  { base:["さ","し","す","せ","そ"], voiced:["ざ","じ","ず","ぜ","ぞ"] },
  { base:["た","ち","つ","て","と"], voiced:["だ","ぢ","づ","で","ど"] },
  { base:["は","ひ","ふ","へ","ほ"], voiced:["ば","び","ぶ","べ","ぼ"] },
];

export const KATAKANA_DAKUTEN = [
  { base:["カ","キ","ク","ケ","コ"], voiced:["ガ","ギ","グ","ゲ","ゴ"] },
  { base:["サ","シ","ス","セ","ソ"], voiced:["ザ","ジ","ズ","ゼ","ゾ"] },
  { base:["タ","チ","ツ","テ","ト"], voiced:["ダ","ヂ","ヅ","デ","ド"] },
  { base:["ハ","ヒ","フ","ヘ","ホ"], voiced:["バ","ビ","ブ","ベ","ボ"] },
];

// ── Shared generator ─────────────────────────────────────────────────────────
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
  for (const p of prevLetters) combos.push(newLetter + p, p + newLetter);
  combos.push(newLetter + newLetter);
  return seededShuffle(combos, newLetter.codePointAt(0) ?? 42).slice(0, count);
}

function makeGroups3(letters: string[], newLetter: string, seed: number): string[][] {
  const pool = seededShuffle([...letters], seed);
  const groups: string[][] = [];
  for (let i = 0; i < pool.length; i += 3) {
    const chunk = pool.slice(i, i + 3);
    if (chunk.length >= 2) {
      if (!chunk.includes(newLetter) && groups.length === 0) chunk[0] = newLetter;
      groups.push(chunk);
    }
  }
  return groups.slice(0, 4);
}

function buildLetterPage(
  letter: string,
  db: Record<string, string>,
  wordHints: Record<string, string[]>,
  allPrev: string[],
  pageNumber: number
): NewLetterPage {
  const romaji = db[letter];
  const seed = letter.codePointAt(0) ?? 1;

  const stage2 = allPrev.slice(-4).map((p) => p + letter)
    .concat(allPrev.slice(-2).map((p) => letter + p)).slice(0, 5);
  const stage3 = makeCombos(letter, allPrev.slice(-5), 6);
  const stage4Groups = makeGroups3([...allPrev, letter], letter, seed);

  const drillGroups = [];
  if (stage2.length > 0) drillGroups.push({ items: stage2, label: "" });
  if (stage3.length > 0) drillGroups.push({ items: stage3, label: "" });
  stage4Groups.forEach((g) => {
    if (g.length > 0) drillGroups.push({ items: [g.join("")], label: "" });
  });

  return {
    type: "new-letter",
    pageNumber,
    letter,
    romaji,
    drillGroups,
    words: wordHints[letter] ?? [],
  };
}

function buildReviewPage(letters: string[], title: string, pageNumber: number): ReviewPage {
  const rows = [
    [...letters],
    [...letters].reverse(),
    seededShuffle([...letters], 7777),
    seededShuffle([...letters], 3333),
  ].filter((r) => r.length >= 2);

  const pairs: string[][] = [];
  for (let i = 0; i < letters.length - 1; i++) pairs.push([letters[i] + letters[i + 1]]);

  return { type: "review", pageNumber, title, rows, pairs: pairs.slice(0, 5) };
}

export function generatePages(
  groups: string[][],
  db: Record<string, string>,
  wordHints: Record<string, string[]>
): Page[] {
  const pages: Page[] = [];
  let pageNum = 1;
  const introduced: string[] = [];

  for (const group of groups) {
    for (const letter of group) {
      pages.push(buildLetterPage(letter, db, wordHints, [...introduced], pageNum++));
      introduced.push(letter);
    }
    const recent = introduced.length >= 10 ? introduced.slice(-10) : introduced;
    pages.push(buildReviewPage(recent, `Ulasan: ${group.join(" ")}`, pageNum++));
  }

  pages.push({ type: "summary", pageNumber: pageNum++ });
  pages.push({ type: "dakuten", pageNumber: pageNum++ });
  pages.push({ type: "exam", pageNumber: pageNum++ });

  return pages;
}

// ── Pre-generated volumes ─────────────────────────────────────────────────────
export const VOLUME_PAGES: Record<number, Page[]> = {
  1: generatePages(HIRAGANA_GROUPS, HIRAGANA_DB, HIRAGANA_WORDS),
  2: generatePages(KATAKANA_GROUPS, KATAKANA_DB, KATAKANA_WORDS),
};

export function getVolumePages(vol: number): Page[] {
  return VOLUME_PAGES[vol] ?? VOLUME_PAGES[1];
}
