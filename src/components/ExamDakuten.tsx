"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { DakutenQuestion } from "@/types/exam";

interface ExamDakutenProps {
  questions: DakutenQuestion[];
  onPass: () => void;
}

export default function ExamDakuten({ questions, onPass }: ExamDakutenProps) {
  const router = useRouter();
  const [qIdx, setQIdx] = useState(0);
  const [input, setInput] = useState("");
  const [wrong, setWrong] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = questions[qIdx];
  const total = questions.length;

  useEffect(() => {
    inputRef.current?.focus();
  }, [qIdx]);

  // Prevent leaving during exam
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const correct = input.trim().toLowerCase() === q.romaji.toLowerCase();
    if (!correct) {
      setWrong(true);
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 50);
      return;
    }
    setWrong(false);
    setInput("");
    if (qIdx + 1 >= total) {
      onPass();
    } else {
      setQIdx(qIdx + 1);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header — back button disabled */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="text-zinc-600 text-sm">Ujian Dakuten</span>
        <span className="text-zinc-400 text-sm font-medium">
          {qIdx + 1} / {total}
        </span>
        <div className="w-10" />
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 px-4 py-2 border-b border-zinc-800">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              i < qIdx
                ? "bg-green-500"
                : i === qIdx
                ? "bg-red-500"
                : "bg-zinc-800"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">
          Baca huruf ini:
        </p>

        {/* Giant dakuten char */}
        <div
          className="text-zinc-100 font-bold mb-8 leading-none"
          style={{
            fontSize: "clamp(5rem, 35vw, 12rem)",
            fontFamily: "'Noto Sans JP', serif",
          }}
        >
          {q.daku}
        </div>

        {/* Input */}
        <div className="w-full max-w-xs">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setWrong(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Ketik romaji..."
            autoCapitalize="none"
            autoCorrect="off"
            className={`w-full px-5 py-4 rounded-2xl text-lg font-bold border-2 
                        bg-zinc-900 text-zinc-100 outline-none transition-all
                        placeholder:text-zinc-700 caret-red-500
                        ${wrong ? "border-red-500" : "border-zinc-700 focus:border-zinc-500"}`}
          />
          {wrong && (
            <p className="text-red-500 text-sm font-bold mt-2 px-1">
              Jawaban salah. Coba lagi.
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full max-w-xs py-4 bg-red-600 hover:bg-red-700 active:scale-95 
                     text-white font-black text-base rounded-2xl transition-all"
        >
          Cek Jawaban
        </button>

        <p className="text-zinc-700 text-xs mt-4 text-center">
          Ujian tidak bisa dilewati · Tidak ada hint
        </p>
      </div>
    </div>
  );
}
