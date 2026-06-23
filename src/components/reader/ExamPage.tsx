"use client";
import { useState } from "react";
import { EXAM_QUESTIONS } from "@/data/exam";
import { getGrade } from "@/lib/progress";

interface Props {
  onComplete: (score: number) => void;
}

const PART_LABELS: Record<string, string> = {
  "recognize": "Bagian 1 – Mengenali Hiragana",
  "distinguish": "Bagian 2 – Membedakan Huruf",
  "read-word": "Bagian 3 – Membaca Kata",
  "read-sentence": "Bagian 4 – Membaca Kalimat",
};

export default function ExamPageView({ onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const q = EXAM_QUESTIONS[current];
  const totalQ = EXAM_QUESTIONS.length;
  const selected = answers[current];

  function choose(opt: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [current]: opt }));
  }

  function submit() {
    let correct = 0;
    EXAM_QUESTIONS.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    const s = Math.round((correct / totalQ) * 100);
    setScore(s);
    setSubmitted(true);
    onComplete(s);
  }

  function isAnsweredAll() {
    return EXAM_QUESTIONS.every((_, i) => answers[i] !== undefined);
  }

  const grade = getGrade(score);

  // Result screen
  if (submitted) {
    return (
      <div className="px-4 pb-12 pt-6 max-w-sm mx-auto text-center">
        <div className="text-7xl mb-4">
          {grade === "lulus" ? "🎉" : grade === "latihan" ? "📖" : "🔄"}
        </div>
        <div className={`text-3xl font-bold mb-2 ${
          grade === "lulus" ? "text-green-500" :
          grade === "latihan" ? "text-yellow-500" : "text-red-500"
        }`}>
          {score}点
        </div>
        <div className="text-lg font-medium text-primary mb-1">
          {grade === "lulus" ? "Lulus! おめでとう！" :
           grade === "latihan" ? "Perlu Latihan Lagi" : "Ulangi Jilid 1"}
        </div>
        <p className="text-sm text-muted-text mb-8">
          {grade === "lulus"
            ? "Kamu berhasil menguasai Hiragana dasar!"
            : grade === "latihan"
            ? "Nilai 60–79. Latihan lebih banyak kemudian coba lagi."
            : "Nilai di bawah 60. Ulangi pelajaran dari awal."}
        </p>

        {/* Per-question review */}
        <div className="text-left space-y-3">
          {EXAM_QUESTIONS.map((q, i) => {
            const correct = answers[i] === q.answer;
            return (
              <div key={i} className={`p-3 rounded-lg text-sm ${correct ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
                <div className="flex items-start gap-2">
                  <span>{correct ? "✓" : "✗"}</span>
                  <div>
                    <span className="font-jp text-xl">{q.question}</span>
                    {!correct && (
                      <p className="text-xs mt-1 text-muted-text">
                        Jawaban: <span className="text-green-600 dark:text-green-400">{q.answer}</span>
                        {" · "}Kamu: <span className="text-red-500">{answers[i] ?? "-"}</span>
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

  // Show part header if type changes
  const prevType = current > 0 ? EXAM_QUESTIONS[current - 1].type : null;
  const showPartHeader = prevType !== q.type;

  return (
    <div className="px-4 pb-12 pt-4 max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted-text font-mono">Soal {current + 1}/{totalQ}</span>
        <div className="flex gap-1">
          {EXAM_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-4 rounded-full transition-colors ${
                answers[i] !== undefined ? "bg-accent" : "bg-muted"
              } ${i === current ? "ring-1 ring-accent" : ""}`}
            />
          ))}
        </div>
      </div>

      {showPartHeader && (
        <div className="mb-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono">
            {PART_LABELS[q.type]}
          </span>
        </div>
      )}

      {/* Question */}
      <div className="flex justify-center items-center py-8">
        <span className={`font-jp text-primary ${
          q.type === "read-sentence" ? "text-3xl" :
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
            className={`py-4 px-3 rounded-xl border-2 text-center transition-all active:scale-95
              ${q.type === "distinguish" ? "text-4xl font-jp" : "text-base font-mono"}
              ${selected === opt
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-page hover:border-accent/50 text-primary"
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
            className="flex-1 py-3 rounded-xl border border-border text-sm text-muted-text hover:border-accent/50 transition-colors"
          >
            ← Kembali
          </button>
        )}
        {current < totalQ - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            disabled={selected === undefined}
            className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-medium
                       disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            Lanjut →
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!isAnsweredAll()}
            className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-medium
                       disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            Selesai ✓
          </button>
        )}
      </div>

      {!isAnsweredAll() && current === totalQ - 1 && (
        <p className="text-xs text-muted-text text-center mt-3">
          Jawab semua soal sebelum mengirim.
        </p>
      )}
    </div>
  );
}
