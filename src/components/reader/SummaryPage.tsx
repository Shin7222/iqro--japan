"use client";
import { HIRAGANA_GROUPS, KATAKANA_GROUPS } from "@/data/curriculum";

interface Props { volume: number; }

export default function SummaryPageView({ volume }: Props) {
  const groups = volume === 2 ? KATAKANA_GROUPS : HIRAGANA_GROUPS;
  const label = volume === 2 ? "Ringkasan Katakana" : "Ringkasan Hiragana";

  return (
    <div className="px-4 pb-12 pt-4 max-w-sm mx-auto">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1 rounded-full bg-muted text-muted-text text-xs font-mono tracking-widest uppercase">
          {label}
        </span>
        <p className="mt-3 text-sm text-muted-text">Seluruh huruf {volume === 2 ? "Katakana" : "Hiragana"} dasar</p>
      </div>
      <div className="space-y-5">
        {groups.map((group, gi) => (
          <div key={gi}>
            <div className="flex flex-wrap gap-x-5 gap-y-3 justify-center">
              {group.map((letter, li) => (
                <span key={li} className="text-5xl font-jp text-primary">{letter}</span>
              ))}
            </div>
            {gi < groups.length - 1 && <div className="mt-5 border-b border-border" />}
          </div>
        ))}
      </div>
      <div className="mt-10 p-4 rounded-xl bg-muted text-center">
        <p className="text-sm text-muted-text">Hafalkan semua huruf di atas sebelum lanjut ke ujian akhir.</p>
      </div>
    </div>
  );
}
