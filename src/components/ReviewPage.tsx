"use client";

import { useRouter } from "next/navigation";
import NavigationButtons from "./NavigationButtons";
import PracticeCard from "./PracticeCard";

interface ReviewPageProps {
  chars: Array<{ newChar: string; romaji: string }>;
  nextPath: string;
}

export default function ReviewPage({ chars, nextPath }: ReviewPageProps) {
  const router = useRouter();
  const items = chars.map((c) => c.newChar);

  // All permutations for review
  const shuffled = [...items].sort(() => Math.random() - 0.5);

  // Pairs
  const pairs: string[] = [];
  for (let i = 0; i < items.length - 1; i++) {
    pairs.push(items[i] + items[i + 1]);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <button onClick={() => router.push("/")} className="text-zinc-400 text-sm">
          ホーム
        </button>
        <span className="text-zinc-400 text-sm font-bold">ULASAN</span>
        <div />
      </div>

      <NavigationButtons
        onPrev={() => router.push("/")}
        onNext={() => router.push(nextPath)}
      />

      <div className="flex-1 overflow-y-auto">
        {/* All chars in order */}
        <div className="px-6 py-5 border-b border-dashed border-zinc-700">
          <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3">Semua Huruf</p>
          <div className="flex flex-wrap gap-3">
            {items.map((c, i) => (
              <span
                key={i}
                className="text-3xl text-zinc-100 font-bold"
                style={{ fontFamily: "'Noto Sans JP', serif" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Shuffled */}
        <div className="border-b border-dashed border-zinc-700">
          <PracticeCard items={shuffled} columns={2} />
        </div>

        {/* Pairs */}
        <div className="border-b border-dashed border-zinc-700">
          <PracticeCard items={pairs.slice(0, 6)} columns={2} />
        </div>
      </div>
    </div>
  );
}
