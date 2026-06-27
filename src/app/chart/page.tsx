"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState } from "@/lib/storage";
import type { UserState } from "@/types/user";
import hiragana from "@/data/hiragana.json";

export default function ChartPage() {
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-lg mx-auto px-4 pt-6 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/">
            <button className="text-zinc-500 hover:text-zinc-300 transition-colors">←</button>
          </Link>
          <h1 className="font-black text-lg">Tabel Hiragana</h1>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {hiragana.map((ch) => {
            const done = state?.completedLessons.includes(ch.id);
            return (
              <Link key={ch.id} href={`/lesson/${ch.id}`}>
                <div
                  className={`flex flex-col items-center justify-center p-2 rounded-xl 
                              transition-all active:scale-95 cursor-pointer ${
                    done
                      ? "bg-red-950/60 border border-red-800"
                      : "bg-zinc-900 border border-zinc-800"
                  }`}
                >
                  <span
                    className="text-2xl font-bold leading-none"
                    style={{ fontFamily: "'Noto Sans JP', serif" }}
                  >
                    {ch.newChar}
                  </span>
                  <span className="text-xs text-zinc-500 mt-0.5">{ch.romaji}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-xs text-zinc-700 mt-6">
          Ketuk huruf untuk mengulang pelajaran
        </p>
      </div>
    </div>
  );
}
