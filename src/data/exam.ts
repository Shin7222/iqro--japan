import type { ExamQuestion } from "@/types";

export const EXAM_HIRAGANA: ExamQuestion[] = [
  // Part 1 – Recognize
  { type:"recognize", question:"ね", options:["ne","na","ni","nu"], answer:"ne" },
  { type:"recognize", question:"み", options:["mi","mu","me","ma"], answer:"mi" },
  { type:"recognize", question:"つ", options:["chi","tsu","ta","te"], answer:"tsu" },
  { type:"recognize", question:"ふ", options:["ho","he","fu","hi"], answer:"fu" },
  { type:"recognize", question:"わ", options:["wa","wo","ra","ya"], answer:"wa" },
  { type:"recognize", question:"ゆ", options:["ya","yo","yu","wi"], answer:"yu" },
  { type:"recognize", question:"ん", options:["n","wa","wo","mo"], answer:"n" },
  { type:"recognize", question:"し", options:["si","chi","shi","su"], answer:"shi" },
  // Part 2 – Distinguish
  { type:"distinguish", question:"れ", options:["わ","れ","ろ","ね"], answer:"れ" },
  { type:"distinguish", question:"ぬ", options:["ぬ","め","ね","の"], answer:"ぬ" },
  { type:"distinguish", question:"は", options:["ほ","ひ","は","へ"], answer:"は" },
  { type:"distinguish", question:"き", options:["さ","き","け","こ"], answer:"き" },
  { type:"distinguish", question:"る", options:["ろ","れ","る","ら"], answer:"る" },
  { type:"distinguish", question:"ふ", options:["ふ","ぬ","め","む"], answer:"ふ" },
  // Part 3 – Read words
  { type:"read-word", question:"さかな", options:["sakana","sakona","takana","sakuna"], answer:"sakana" },
  { type:"read-word", question:"ねこ", options:["neko","niku","neno","nake"], answer:"neko" },
  { type:"read-word", question:"いぬ", options:["inu","ina","eni","uni"], answer:"inu" },
  { type:"read-word", question:"やま", options:["yama","yume","yomi","yame"], answer:"yama" },
  { type:"read-word", question:"くるま", options:["kuruma","koruma","kiruma","kurema"], answer:"kuruma" },
  { type:"read-word", question:"はな", options:["hana","kana","mana","nana"], answer:"hana" },
  { type:"read-word", question:"みず", options:["mizu","miso","mise","mire"], answer:"mizu" },
  // Part 4 – Read sentences
  { type:"read-sentence", question:"おはようございます", options:["ohayou gozaimasu","konnichiwa","sayounara","arigatou"], answer:"ohayou gozaimasu" },
  { type:"read-sentence", question:"ありがとうございます", options:["arigatou gozaimasu","sumimasen","ohayou","konbanwa"], answer:"arigatou gozaimasu" },
  { type:"read-sentence", question:"わたしはがくせいです", options:["watashi wa gakusei desu","anata wa sensei desu","kore wa nan desu","watashi wa kyoushi desu"], answer:"watashi wa gakusei desu" },
];

export const EXAM_KATAKANA: ExamQuestion[] = [
  // Part 1 – Recognize
  { type:"recognize", question:"ネ", options:["ne","na","ni","nu"], answer:"ne" },
  { type:"recognize", question:"ミ", options:["mi","mu","me","ma"], answer:"mi" },
  { type:"recognize", question:"ツ", options:["chi","tsu","ta","te"], answer:"tsu" },
  { type:"recognize", question:"フ", options:["ho","he","fu","hi"], answer:"fu" },
  { type:"recognize", question:"ワ", options:["wa","wo","ra","ya"], answer:"wa" },
  { type:"recognize", question:"ユ", options:["ya","yo","yu","wi"], answer:"yu" },
  { type:"recognize", question:"ン", options:["n","wa","wo","mo"], answer:"n" },
  { type:"recognize", question:"シ", options:["si","chi","shi","su"], answer:"shi" },
  // Part 2 – Distinguish
  { type:"distinguish", question:"レ", options:["ワ","レ","ロ","ネ"], answer:"レ" },
  { type:"distinguish", question:"ヌ", options:["ヌ","メ","ネ","ノ"], answer:"ヌ" },
  { type:"distinguish", question:"ハ", options:["ホ","ヒ","ハ","ヘ"], answer:"ハ" },
  { type:"distinguish", question:"キ", options:["サ","キ","ケ","コ"], answer:"キ" },
  { type:"distinguish", question:"ル", options:["ロ","レ","ル","ラ"], answer:"ル" },
  { type:"distinguish", question:"フ", options:["フ","ヌ","メ","ム"], answer:"フ" },
  // Part 3 – Read words (katakana loanwords)
  { type:"read-word", question:"コーラ", options:["koora","kaara","kuura","keera"], answer:"koora" },
  { type:"read-word", question:"テスト", options:["tesuto","tasuto","tosuto","tuseto"], answer:"tesuto" },
  { type:"read-word", question:"ノート", options:["nooto","naato","nuuto","neeto"], answer:"nooto" },
  { type:"read-word", question:"トマト", options:["tomato","tamato","timato","tumato"], answer:"tomato" },
  { type:"read-word", question:"レモン", options:["remon","lemon","rimon","rumon"], answer:"remon" },
  { type:"read-word", question:"ミルク", options:["miruku","maruku","moruku","muruku"], answer:"miruku" },
  { type:"read-word", question:"ロボット", options:["robotto","ribotto","rubotto","rebotto"], answer:"robotto" },
  // Part 4 – Read sentences (katakana)
  { type:"read-sentence", question:"コーヒーをください", options:["koohii wo kudasai","ocha wo kudasai","mizu wo kudasai","juusu wo kudasai"], answer:"koohii wo kudasai" },
  { type:"read-sentence", question:"アイスクリームがすきです", options:["aisukuriimu ga suki desu","keeki ga suki desu","chokoreetoが suki desu","koohi ga suki desu"], answer:"aisukuriimu ga suki desu" },
  { type:"read-sentence", question:"スーパーでかいものします", options:["suupaa de kaimono shimasu","depato de kaimono shimasu","mise de kaimono shimasu","kouen de asobimasu"], answer:"suupaa de kaimono shimasu" },
];

export function getExamQuestions(volume: number): ExamQuestion[] {
  return volume === 2 ? EXAM_KATAKANA : EXAM_HIRAGANA;
}
