# IQRO JEPANG

Aplikasi web belajar membaca Hiragana menggunakan Metode Iqro'.

## Stack
- Next.js 15 App Router
- TypeScript (strict)
- Tailwind CSS
- Local Storage (tanpa database)
- Google Fonts: Noto Sans JP

## Cara Jalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Deploy ke Vercel

```bash
npm i -g vercel
vercel
```

## Struktur Project

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home / Beranda
│   ├── lesson/[id]/        # Halaman belajar huruf
│   ├── exam/dakuten/       # Ujian dakuten
│   ├── exam/reading/       # Ujian membaca
│   ├── certificate/        # Sertifikat kelulusan
│   └── chart/              # Tabel hiragana
├── components/             # Reusable components
│   ├── LessonView.tsx      # Layout pelajaran utama (sesuai screenshot)
│   ├── PracticeCard.tsx    # Grid latihan dengan divider dashed
│   ├── NavigationButtons.tsx
│   ├── ExamDakuten.tsx
│   ├── ExamReading.tsx
│   ├── Certificate.tsx
│   ├── ProgressBar.tsx
│   ├── BadgeCard.tsx
│   └── ThemeToggle.tsx
├── lib/                    # Business logic
│   ├── lessonGenerator.ts  # Generator materi otomatis dari JSON
│   ├── examEngine.ts       # Logika ujian
│   ├── storage.ts          # localStorage wrapper
│   ├── progress.ts         # Tracking progress
│   └── xp.ts               # XP & level system
├── data/                   # JSON content
│   ├── hiragana.json       # 46 huruf hiragana
│   ├── dakuten.json        # 25 huruf dakuten + handakuten
│   ├── readingExam.json    # 5 soal ujian membaca
│   └── volumes.json        # 8 jilid
└── types/                  # TypeScript types
    ├── lesson.ts
    ├── exam.ts
    └── user.ts
```

## Filosofi Iqro

- Satu huruf baru per halaman
- Huruf lama terus diulang
- Fokus membaca, bukan menghafal
- Tidak ada lompatan materi
- Harus menguasai sebelum naik jilid

## Tampilan Pelajaran

Mengikuti screenshot referensi:
- Header: ホーム · nomor halaman · toggle tema
- Tombol navigasi: ← Sebelumnya | Berikutnya → (merah)
- Huruf baru tampil sangat besar (merah)
- Romaji di bawah huruf
- Latihan kombinasi dengan divider dashed
- Layout 2 kolom untuk kombinasi pendek
