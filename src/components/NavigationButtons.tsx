"use client";

interface NavigationButtonsProps {
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

export default function NavigationButtons({
  onPrev,
  onNext,
  prevLabel = "← Sebelumnya",
  nextLabel = "Berikutnya →",
  prevDisabled = false,
  nextDisabled = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800">
      <button
        onClick={onPrev}
        disabled={prevDisabled || !onPrev}
        className="flex-1 py-3 text-sm font-bold text-zinc-500 dark:text-zinc-400 
                   border-r border-zinc-200 dark:border-zinc-800
                   disabled:opacity-30 disabled:cursor-not-allowed
                   hover:bg-zinc-50 dark:hover:bg-zinc-900 
                   active:bg-zinc-100 dark:active:bg-zinc-800
                   transition-colors"
      >
        {prevLabel}
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled || !onNext}
        className="flex-1 py-3 text-sm font-bold text-red-500
                   disabled:opacity-30 disabled:cursor-not-allowed
                   hover:bg-zinc-50 dark:hover:bg-zinc-900
                   active:bg-zinc-100 dark:active:bg-zinc-800
                   transition-colors"
      >
        {nextLabel}
      </button>
    </div>
  );
}
