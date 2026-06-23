"use client";
import type { ReviewPage as RP } from "@/types";

interface Props {
  page: RP;
}

export default function ReviewPageView({ page }: Props) {
  return (
    <div className="px-4 pb-12 pt-4 max-w-sm mx-auto">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1 rounded-full bg-muted text-muted-text text-xs font-mono tracking-widest uppercase">
          Ulasan
        </span>
      </div>

      {/* Row grids */}
      {page.rows.map((row, ri) => (
        <div key={ri} className="mb-6">
          <div
            className="flex flex-wrap justify-center gap-x-6 gap-y-3"
          >
            {row.map((letter, li) => (
              <span key={li} className="text-5xl font-jp text-primary">
                {letter}
              </span>
            ))}
          </div>
          {ri < page.rows.length - 1 && (
            <div className="mt-5 border-b border-dashed border-border" />
          )}
        </div>
      ))}

      {/* Pair combinations */}
      {page.pairs && page.pairs.length > 0 && (
        <>
          <div className="my-5 border-b-2 border-dashed border-border" />
          <div className="grid grid-cols-2 gap-4">
            {page.pairs.map((pair, pi) => (
              <div key={pi} className="text-center">
                <span className="text-4xl font-jp text-primary">{pair[0]}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
