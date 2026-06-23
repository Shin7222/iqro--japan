"use client";
import { GROUPS } from "@/data/curriculum";

export default function SummaryPageView() {
  return (
    <div className="px-4 pb-12 pt-4 max-w-sm mx-auto">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1 rounded-full bg-muted text-muted-text text-xs font-mono tracking-widest uppercase">
          Ringkasan Hiragana
        </span>
        <p className="mt-3 text-sm text-muted-text">Seluruh huruf Hiragana dasar</p>
      </div>

      <div className="space-y-5">
        {GROUPS.map((group, gi) => (
          <div key={gi}>
            <div className="flex flex-wrap gap-x-5 gap-y-3 justify-center">
              {group.map((letter, li) => (
                <span key={li} className="text-5xl font-jp text-primary">
                  {letter}
                </span>
              ))}
            </div>
            {gi < GROUPS.length - 1 && (
              <div className="mt-5 border-b border-border" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 p-4 rounded-xl bg-muted text-center">
        <p className="text-sm text-muted-text">
          Hafalkan semua huruf di atas sebelum melanjutkan ke ujian akhir.
        </p>
      </div>
    </div>
  );
}
