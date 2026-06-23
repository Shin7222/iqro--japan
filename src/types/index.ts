export type PageType =
  | "intro"
  | "new-letter"
  | "drill"
  | "review"
  | "summary"
  | "dakuten"
  | "exam";

export interface DrillGroup {
  items: string[];
  label?: string;
}

export interface NewLetterPage {
  type: "new-letter";
  pageNumber: number;
  letter: string;
  romaji: string;
  drillGroups: DrillGroup[];
  words?: string[];
}

export interface ReviewPage {
  type: "review";
  pageNumber: number;
  title: string;
  rows: string[][];
  pairs?: string[][];
}

export interface SummaryPage {
  type: "summary";
  pageNumber: number;
}

export interface DakutenPage {
  type: "dakuten";
  pageNumber: number;
}

export interface ExamPage {
  type: "exam";
  pageNumber: number;
}

export type Page = NewLetterPage | ReviewPage | SummaryPage | DakutenPage | ExamPage;

export interface Volume {
  id: number;
  title: string;
  pages: Page[];
}

export interface ExamQuestion {
  type: "recognize" | "distinguish" | "read-word" | "read-sentence";
  question: string;
  options: string[];
  answer: string;
}

export interface Progress {
  currentVolume: number;
  currentPage: number;
  completedVolumes: number[];
  examScores: Record<number, number>;
  lastUpdated: string;
}
