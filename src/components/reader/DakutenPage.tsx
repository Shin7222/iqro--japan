"use client";

const DAKUTEN_GROUPS = [
  { base: ["か","き","く","け","こ"], voiced: ["が","ぎ","ぐ","げ","ご"] },
  { base: ["さ","し","す","せ","そ"], voiced: ["ざ","じ","ず","ぜ","ぞ"] },
  { base: ["た","ち","つ","て","と"], voiced: ["だ","ぢ","づ","で","ど"] },
  { base: ["は","ひ","ふ","へ","ほ"], voiced: ["ば","び","ぶ","べ","ぼ"] },
];

export default function DakutenPageView() {
  return (
    <div className="px-4 pb-12 pt-4 max-w-sm mx-auto">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1 rounded-full bg-muted text-muted-text text-xs font-mono tracking-widest uppercase">
          Dakuten ゛
        </span>
        <p className="mt-3 text-sm text-muted-text">
          Tanda ゛mengubah bunyi menjadi bersuara.
        </p>
      </div>

      <div className="space-y-6">
        {DAKUTEN_GROUPS.map((group, gi) => (
          <div key={gi}>
            <div className="grid grid-cols-5 gap-2">
              {group.base.map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-jp text-muted-text">{b}</span>
                  <span className="text-xl text-muted-text">↓</span>
                  <span className="text-3xl font-jp text-accent">{group.voiced[i]}</span>
                </div>
              ))}
            </div>
            {gi < DAKUTEN_GROUPS.length - 1 && (
              <div className="mt-5 border-b border-border" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-muted">
        <p className="text-xs text-muted-text text-center">
          Halaman ini hanya untuk pengenalan. Dakuten akan dipelajari lebih mendalam di Jilid 2.
        </p>
      </div>
    </div>
  );
}
