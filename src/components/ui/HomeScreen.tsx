"use client";
import { useTheme } from "@/lib/ThemeContext";
import type { Progress } from "@/types";
import { getVolumePages } from "@/data/curriculum";
import { getGrade } from "@/lib/progress";

interface Props {
  progress: Progress;
  onSelectVolume: (vol: number) => void;
  onReset: () => void;
}

const VOLUMES = [
  { id: 1, title: "Jilid 1", subtitle: "Hiragana", icon: "あ", desc: "46 huruf Hiragana dasar" },
  { id: 2, title: "Jilid 2", subtitle: "Katakana", icon: "ア", desc: "46 huruf Katakana dasar" },
];

export default function HomeScreen({ progress, onSelectVolume, onReset }: Props) {
  const { theme, toggle } = useTheme();
  const hasAnyProgress = progress.currentPage > 0 || Object.keys(progress.examScores).length > 0;

  return (
    <div className="min-h-screen bg-page flex flex-col items-center px-5 py-12">
      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="fixed top-5 right-5 text-muted-text hover:text-accent text-xl z-10"
        aria-label="Ganti tema"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      {/* Header */}
      <div className="text-center mb-10 mt-4">
        <div className="text-7xl font-jp text-accent mb-2">あ ア</div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">Iqro' Jepang</h1>
        <p className="text-sm text-muted-text mt-1">Pilih jilid untuk mulai belajar</p>
      </div>

      {/* Volume cards */}
      <div className="w-full max-w-xs space-y-4 mb-8">
        {VOLUMES.map((vol) => {
          const pages = getVolumePages(vol.id);
          const savedPage = progress.pageByVolume?.[vol.id] ?? (progress.currentVolume === vol.id ? progress.currentPage : 0);
          const pct = Math.round(((savedPage + 1) / pages.length) * 100);
          const score = progress.examScores[vol.id];
          const isActive = progress.currentVolume === vol.id;
          const isDone = progress.completedVolumes.includes(vol.id);
          const grade = score !== undefined ? getGrade(score) : null;

          // Jilid 2 requires Jilid 1 completed
          const locked = vol.id === 2 && !progress.completedVolumes.includes(1);

          return (
            <button
              key={vol.id}
              onClick={() => !locked && onSelectVolume(vol.id)}
              disabled={locked}
              className={`w-full rounded-2xl p-5 text-left transition-all active:scale-[0.98]
                border-2 ${isActive
                  ? "border-accent bg-accent-soft"
                  : "border-border bg-muted hover:border-accent/50"
                } ${locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-jp leading-none text-accent">{vol.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary text-base">{vol.title}</span>
                      <span className="text-xs text-muted-text">·</span>
                      <span className="text-sm text-muted-text">{vol.subtitle}</span>
                    </div>
                    <p className="text-xs text-muted-text mt-0.5">{vol.desc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {locked && <span className="text-lg">🔒</span>}
                  {isDone && <span className="text-lg">✅</span>}
                  {!locked && !isDone && isActive && <span className="text-xs text-accent font-mono">{pct}%</span>}
                </div>
              </div>

              {/* Progress bar */}
              {!locked && (
                <div className="mt-3">
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-xs text-muted-text">Hal. {savedPage + 1} / {pages.length}</span>
                    {score !== undefined && (
                      <span className={`text-xs font-medium ${
                        grade === "lulus" ? "text-green-500" :
                        grade === "latihan" ? "text-yellow-500" : "text-red-400"
                      }`}>
                        Ujian: {score}点
                      </span>
                    )}
                  </div>
                </div>
              )}

              {locked && (
                <p className="mt-2 text-xs text-muted-text">Selesaikan Jilid 1 dahulu</p>
              )}
            </button>
          );
        })}
      </div>

      {/* Reset */}
      {hasAnyProgress && (
        <button
          onClick={onReset}
          className="text-xs text-muted-text hover:text-red-400 transition-colors underline underline-offset-2"
        >
          Reset semua progress
        </button>
      )}

      <p className="mt-8 text-xs text-muted-text text-center max-w-xs leading-relaxed">
        Tidak perlu menghafal romaji. Fokus membaca huruf Jepang langsung — seperti metode Iqro'.
      </p>
    </div>
  );
}
