"use client";

import { useRouter } from "next/navigation";

interface CertificateProps {
  volume: number;
  title: string;
}

export default function Certificate({ volume, title }: CertificateProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-6xl mb-4 animate-bounce">🎉</div>
      <h1 className="text-3xl font-black text-zinc-100 text-center mb-2">Selamat!</h1>
      <p className="text-zinc-500 text-center mb-8">
        Anda telah menyelesaikan Jilid {volume} {title}
      </p>

      {/* Certificate card */}
      <div className="w-full max-w-sm rounded-3xl border-2 border-yellow-400 bg-yellow-950/30 p-8 text-center mb-8">
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Status</p>
        <p className="text-2xl font-black text-green-400 mb-5">✅ LULUS</p>

        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Nilai</p>
        <p className="text-5xl font-black text-zinc-100 mb-5">100%</p>

        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Badge</p>
        <p className="text-5xl mb-1">🏅</p>
        <p className="text-zinc-100 font-bold">Master Hiragana</p>
      </div>

      <button
        onClick={() => router.push("/")}
        className="w-full max-w-sm py-4 bg-red-600 hover:bg-red-700 active:scale-95 
                   text-white font-black text-lg rounded-2xl transition-all"
      >
        Lanjut ke Jilid 2 →
      </button>
    </div>
  );
}
