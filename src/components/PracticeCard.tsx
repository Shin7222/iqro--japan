"use client";

interface PracticeCardProps {
  items: string[];
  columns?: 2 | 1;
}

/**
 * Renders a block of practice items.
 * 2-col for short combos (≤3 chars), 1-col for longer words.
 * Separated by dashed dividers like in the screenshot.
 */
export default function PracticeCard({ items, columns = 2 }: PracticeCardProps) {
  const useGrid = columns === 2 && items.every((i) => i.length <= 3);

  if (useGrid) {
    // Pair items into rows of 2
    const rows: string[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push(items.slice(i, i + 2));
    }

    return (
      <div className="divide-y divide-dashed divide-zinc-300 dark:divide-zinc-700">
        {rows.map((row, ri) => (
          <div key={ri} className="flex py-5 px-6">
            {row.map((item, ci) => (
              <span
                key={ci}
                className="flex-1 text-4xl font-bold text-zinc-100 dark:text-zinc-100 leading-none"
                style={{ fontFamily: "'Noto Sans JP', serif" }}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Single column for longer words
  return (
    <div className="divide-y divide-dashed divide-zinc-300 dark:divide-zinc-700">
      {items.map((item, i) => (
        <div key={i} className="py-5 px-6">
          <span
            className="text-4xl font-bold text-zinc-100 dark:text-zinc-100 leading-none"
            style={{ fontFamily: "'Noto Sans JP', serif" }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}
