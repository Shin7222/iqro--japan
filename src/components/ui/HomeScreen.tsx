"use client";
import { useTheme } from "@/lib/ThemeContext";
import type { Progress } from "@/types";
import { TOTAL_PAGES } from "@/data/curriculum";
import { resetProgress } from "@/lib/progress";

interface Props {
  progress: Progress;
  onStart: () => void;
  onReset: () => void;
}

export default function HomeScreen({ progress, onStart, onReset }: Props) {
  const { theme, toggle } = useTheme();
  const pct = Math.round(((progress.currentPage + 1) / TOTAL_PAGES) * 100);
  const hasStarted = progress.currentPage > 0;

  return (
    <div className="min-h-screen bg-page flex flex-col items-center justify-center px-6 py-12">
      {/* Theme toggle top right */}
      <button
        onClick={toggle}
        className="absolute top-5 right-5 text-muted-text hover:text-accent text-xl"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      {/* Logo/Title */}
      <div className="text-center mb-10">
        <div className="text-8xl font-jp text-accent mb-1">あ</div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">Iqro' Jepang</h1>
        <p className="text-sm text-muted-text mt-1">Belajar Hiragana dengan metode Iqro'</p>
      </div>

      {/* Volume card */}
      <div className="w-full max-w-xs bg-muted rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-primary">Jilid 1 · Hiragana Dasar</span>
          <span className="text-xs text-muted-text">{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {hasStarted && (
          <p className="text-xs text-muted-text mt-2">
            Halaman {progress.currentPage + 1} dari {TOTAL_PAGES}
          </p>
        )}
        {progress.examScores[1] !== undefined && (
          <p className="text-xs mt-1 text-accent font-medium">
            Nilai ujian: {progress.examScores[1]}
          </p>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="w-full max-w-xs py-4 bg-accent text-white rounded-2xl text-base font-semibold
                   hover:opacity-90 transition-opacity active:scale-95 shadow-md shadow-accent/20 mb-3"
      >
        {hasStarted ? "Lanjutkan Belajar" : "Mulai Belajar"}
      </button>

      {hasStarted && (
        <button
          onClick={onReset}
          className="w-full max-w-xs py-3 border border-border rounded-2xl text-sm text-muted-text
                     hover:border-red-400 hover:text-red-400 transition-colors"
        >
          Mulai dari Awal
        </button>
      )}

      <p className="mt-8 text-xs text-muted-text text-center max-w-xs">
        Tidak perlu menghafal romaji. Fokus membaca huruf Jepang langsung seperti belajar membaca Al-Qur'an dengan Iqro'.
      </p>
    </div>
  );
}
