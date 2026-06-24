"use client";
import { useState } from "react";
import { getExamQuestions } from "@/data/exam";
import { getGrade } from "@/lib/progress";

interface Props {
  volume: number;
  onComplete: (score: number) => void;
}

const PART_LABELS: Record<string, string> = {
  "recognize":     "Bagian 1 – Mengenali Huruf",
  "distinguish":   "Bagian 2 – Membedakan Huruf Mirip",
  "read-word":     "Bagian 3 – Membaca Kata",
  "read-sentence": "Bagian 4 – Membaca Kalimat",
};

export default function ExamPageView({ volume, onComplete }: Props) {
  const questions = getExamQuestions(volume);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[current];
  const totalQ = questions.length;
  const selected = answers[current];
  const grade = getGrade(score);

  function choose(opt: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [current]: opt }));
  }

  function submit() {
    let correct = 0;
    questions.forEach((q, i) => { if (answers[i] === q.answer) correct++; });
    const s = Math.round((correct / totalQ) * 100);
    setScore(s);
    setSubmitted(true);
    onComplete(s);
  }

  const isAnsweredAll = questions.every((_, i) => answers[i] !== undefined);
  const prevType = current > 0 ? questions[current - 1].type : null;
  const showPartHeader = prevType !== q.type;

  // ── Result screen ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="px-4 pb-12 pt-6 max-w-sm mx-auto text-center">
        <div className="text-7xl mb-4">
          {grade === "lulus" ? "🎉" : grade === "latihan" ? "📖" : "🔄"}
        </div>
        <div className={`text-5xl font-bold mb-2 font-jp ${
          grade === "lulus" ? "text-green-500" :
          grade === "latihan" ? "text-yellow-500" : "text-red-500"
        }`}>{score}点</div>
        <div className="text-lg font-semibold text-primary mb-1">
          {grade === "lulus" ? "Lulus! おめでとう！" :
           grade === "latihan" ? "Perlu Latihan Lagi" : "Ulangi Jilid"}
        </div>
        <p className="text-sm text-muted-text mb-8">
          {grade === "lulus"
            ? `Kamu berhasil menguasai ${volume === 2 ? "Katakana" : "Hiragana"} dasar!`
            : grade === "latihan"
            ? "Nilai 60–79. Latihan lebih banyak, lalu coba lagi."
            : "Nilai di bawah 60. Ulangi pelajaran dari awal."}
        </p>

        {grade === "lulus" && volume === 1 && (
          <div className="mb-6 p-4 rounded-xl border-2 border-accent bg-accent-soft">
            <p className="text-sm font-medium text-accent">🔓 Jilid 2 Katakana terbuka!</p>
            <p className="text-xs text-muted-text mt-1">Kembali ke beranda untuk melanjutkan.</p>
          </div>
        )}

        {/* Per-question review */}
        <div className="text-left space-y-2.5">
          {questions.map((q, i) => {
            const correct = answers[i] === q.answer;
            return (
              <div key={i} className={`p-3 rounded-xl text-sm border ${
                correct
                  ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20"
                  : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20"
              }`}>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">{correct ? "✓" : "✗"}</span>
                  <div className="min-w-0">
                    <span className="font-jp text-2xl leading-tight">{q.question}</span>
                    {!correct && (
                      <p className="text-xs mt-1 text-muted-text">
                        Benar: <span className="text-green-600 dark:text-green-400 font-medium">{q.answer}</span>
                        {" · "}Kamu: <span className="text-red-500">{answers[i] ?? "–"}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Quiz screen ────────────────────────────────────────────────
  return (
    <div className="px-4 pb-12 pt-4 max-w-sm mx-auto">
      {/* Progress dots */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs text-muted-text font-mono">Soal {current + 1}/{totalQ}</span>
        <div className="flex gap-1 flex-wrap justify-end max-w-[180px]">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-3.5 rounded-full transition-colors ${
                answers[i] !== undefined ? "bg-accent" : "bg-muted"
              }`}
              style={i === current ? { outline: "2px solid var(--color-accent)", outlineOffset: "1px" } : {}}
            />
          ))}
        </div>
      </div>

      {showPartHeader && (
        <div className="mb-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-mono">
            {PART_LABELS[q.type]}
          </span>
        </div>
      )}

      {/* Question */}
      <div className="flex justify-center items-center py-8 min-h-[120px]">
        <span className={`font-jp text-primary text-center leading-snug ${
          q.type === "read-sentence" ? "text-2xl" :
          q.type === "read-word" ? "text-5xl" : "text-8xl"
        }`}>
          {q.question}
        </span>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => choose(opt)}
            className={`py-4 px-2 rounded-xl border-2 text-center transition-all active:scale-95
              ${q.type === "distinguish" ? "text-3xl font-jp" : "text-sm font-mono leading-snug"}
              ${selected === opt
                ? "border-accent bg-accent-soft text-accent"
                : "border-border bg-page hover:border-accent text-primary"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {current > 0 && (
          <button
            onClick={() => setCurrent((c) => c - 1)}
            className="flex-1 py-3 rounded-xl border border-border text-sm text-muted-text hover:border-accent transition-colors"
          >
            ← Kembali
          </button>
        )}
        {current < totalQ - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            disabled={selected === undefined}
            className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-semibold
                       disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            Lanjut →
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!isAnsweredAll}
            className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-semibold
                       disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            Kumpulkan ✓
          </button>
        )}
      </div>

      {!isAnsweredAll && current === totalQ - 1 && (
        <p className="text-xs text-muted-text text-center mt-3">Jawab semua soal sebelum mengumpulkan.</p>
      )}
    </div>
  );
}
