"use client";
import type { NewLetterPage as NLP } from "@/types";

interface Props {
  page: NLP;
}

export default function NewLetterPageView({ page }: Props) {
  return (
    <div className="px-4 pb-12 pt-2 max-w-sm mx-auto">
      {/* Letter introduction */}
      <div className="flex flex-col items-center py-8 border-b-2 border-dashed border-border mb-6">
        <span className="text-[96px] leading-none font-jp text-accent select-none">{page.letter}</span>
        <span className="mt-3 text-base text-muted-text tracking-widest uppercase font-mono">
          {page.romaji}
        </span>
      </div>

      {/* Drill groups */}
      {page.drillGroups.map((group, gi) => (
        <div key={gi} className="mb-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {group.items.map((item, ii) => (
              <DrillItem key={ii} text={item} />
            ))}
          </div>
          {gi < page.drillGroups.length - 1 && (
            <div className="mt-6 border-b border-dashed border-border" />
          )}
        </div>
      ))}

      {/* Words (stage 5) */}
      {page.words && page.words.length > 0 && (
        <>
          <div className="mt-4 mb-4 border-b-2 border-dashed border-border" />
          <div className="grid grid-cols-2 gap-4">
            {page.words.map((w, i) => (
              <div key={i} className="text-center">
                <span className="text-4xl font-jp text-primary">{w}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DrillItem({ text }: { text: string }) {
  // Determine size based on length
  const sizeClass =
    text.length === 1
      ? "text-6xl"
      : text.length === 2
      ? "text-5xl"
      : text.length === 3
      ? "text-4xl"
      : "text-3xl";

  return (
    <div className="flex justify-center items-center py-2">
      <span className={`${sizeClass} font-jp text-primary tracking-wide`}>{text}</span>
    </div>
  );
}
