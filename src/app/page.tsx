"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState } from "@/lib/storage";
import { xpForLevel, calcProgress } from "@/lib/xp";
import { TOTAL_LESSONS } from "@/lib/progress";
import type { UserState } from "@/types/user";
import ProgressBar from "@/components/ProgressBar";
import BadgeCard from "@/components/BadgeCard";
import volumes from "@/data/volumes.json";

const BADGES = [
  { id: "hiragana",  icon: "🏅", name: "Master Hiragana" },
  { id: "dakuten",   icon: "🏆", name: "Master Dakuten" },
  { id: "katakana",  icon: "⭐", name: "Master Katakana" },
  { id: "n5",        icon: "🎓", name: "Master N5" },
];

export default function HomePage() {
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Memuat...</div>
      </div>
    );
  }

  const completedCount = state.completedLessons.length;
  const progress = calcProgress(completedCount, TOTAL_LESSONS);
  const nextLessonId = state.currentLesson + 1;
  const canGoToExam = completedCount >= TOTAL_LESSONS;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-lg mx-auto px-4 pt-6 pb-24">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              <span className="text-red-500">IQRO</span>{" "}
              <span className="text-zinc-400">JEPANG</span>
            </h1>
            <p className="text-xs text-zinc-600 mt-0.5">
              Belajar Hiragana dengan Metode Iqro&apos;
            </p>
          </div>
          <button
            onClick={() => {
              const next = { ...state, darkMode: !state.darkMode };
              setState(next);
              saveState(next);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full 
                       hover:bg-zinc-800 transition-colors text-xl"
          >
            {state.darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* XP / LEVEL CARD */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-5 mb-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">Level</p>
              <p className="text-5xl font-black text-red-500 leading-none">{state.level}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">XP</p>
              <p className="text-5xl font-black text-zinc-100 leading-none">{state.xp}</p>
            </div>
          </div>
          <ProgressBar value={state.xp} max={xpForLevel(state.level)} />
          <p className="text-xs text-zinc-600 mt-1.5 text-right">
            {state.xp} / {xpForLevel(state.level)} XP ke Level {state.level + 1}
          </p>
        </div>

        {/* PROGRESS JILID 1 */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-5 mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-sm">Progress Jilid 1</p>
            <p className="text-red-500 font-black text-lg">{progress}%</p>
          </div>
          <ProgressBar value={completedCount} max={TOTAL_LESSONS} />
          <p className="text-xs text-zinc-600 mt-1.5">
            {completedCount} / {TOTAL_LESSONS} huruf dipelajari
          </p>
        </div>

        {/* CTA BUTTON */}
        {canGoToExam ? (
          <Link href="/exam/dakuten">
            <button className="w-full py-4 bg-red-600 hover:bg-red-700 active:scale-95 
                               text-white font-black text-lg rounded-2xl transition-all 
                               shadow-lg shadow-red-950 mb-6">
              Mulai Ujian →
            </button>
          </Link>
        ) : (
          <Link href={`/lesson/${nextLessonId}`}>
            <button className="w-full py-4 bg-red-600 hover:bg-red-700 active:scale-95 
                               text-white font-black text-lg rounded-2xl transition-all 
                               shadow-lg shadow-red-950 mb-6">
              {completedCount === 0 ? "Mulai Belajar →" : "Lanjut Belajar →"}
            </button>
          </Link>
        )}

        {/* BADGES */}
        <div className="mb-6">
          <h2 className="text-xs text-zinc-600 uppercase tracking-widest font-bold mb-3">
            Badge
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {BADGES.map((b) => (
              <BadgeCard key={b.id} badge={b} earned={state.badges.includes(b.id)} />
            ))}
          </div>
        </div>

        {/* VOLUME LIST */}
        <div>
          <h2 className="text-xs text-zinc-600 uppercase tracking-widest font-bold mb-3">
            Daftar Jilid
          </h2>
          <div className="flex flex-col gap-2">
            {volumes.map((vol) => {
              const unlocked = state.unlockedVolumes.includes(vol.id);
              return (
                <div
                  key={vol.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    unlocked
                      ? "border-zinc-700 bg-zinc-900 hover:border-zinc-500 cursor-pointer"
                      : "border-zinc-800 bg-zinc-900 opacity-40 cursor-default"
                  }`}
                  onClick={() => unlocked && vol.id === 1 && (window.location.href = `/lesson/${nextLessonId}`)}
                >
                  <div
                    className="text-3xl w-12 text-center font-bold"
                    style={{ fontFamily: "'Noto Sans JP', serif" }}
                  >
                    {vol.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-zinc-100">
                      Jilid {vol.id}: {vol.title}
                    </p>
                    <p className="text-xs text-zinc-600 truncate">{vol.description}</p>
                  </div>
                  <div className="text-zinc-600 text-sm flex-shrink-0">
                    {unlocked ? "▶" : "🔒"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HIRAGANA CHART LINK */}
        <div className="mt-6 text-center">
          <Link href="/chart">
            <button className="text-zinc-600 text-sm hover:text-zinc-400 transition-colors">
              Lihat Tabel Hiragana →
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
