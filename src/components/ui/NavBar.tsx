"use client";
import { useTheme } from "@/lib/ThemeContext";

interface NavBarProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onHome: () => void;
}

export default function NavBar({ currentPage, totalPages, onPrev, onNext, onHome }: NavBarProps) {
  const { theme, toggle } = useTheme();
  const progress = Math.round(((currentPage + 1) / totalPages) * 100);

  return (
    <div className="sticky top-0 z-10 bg-page border-b border-border">
      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        {/* Home */}
        <button
          onClick={onHome}
          className="text-muted-text text-sm font-medium hover:text-accent transition-colors"
          aria-label="Beranda"
        >
          ホーム
        </button>

        {/* Page counter */}
        <span className="text-xs text-muted-text tabular-nums">
          {currentPage + 1} / {totalPages}
        </span>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="text-muted-text hover:text-accent transition-colors text-lg"
          aria-label="Ganti tema"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Prev / Next */}
      <div className="flex border-t border-border">
        <button
          onClick={onPrev}
          disabled={currentPage === 0}
          className="flex-1 py-2 text-sm font-medium text-center border-r border-border
                     disabled:opacity-30 hover:bg-muted transition-colors active:scale-95"
        >
          ← Sebelumnya
        </button>
        <button
          onClick={onNext}
          disabled={currentPage >= totalPages - 1}
          className="flex-1 py-2 text-sm font-medium text-center
                     disabled:opacity-30 hover:bg-muted transition-colors active:scale-95 text-accent"
        >
          Berikutnya →
        </button>
      </div>
    </div>
  );
}
