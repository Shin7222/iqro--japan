# Iqro' Jepang

Aplikasi belajar membaca Hiragana dengan metode Iqro'.

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`

## Fitur

- **46 huruf Hiragana** diperkenalkan satu per satu
- **Tanpa romaji** pada latihan — hanya pada pengenalan huruf baru
- **Review otomatis** setelah setiap kelompok huruf
- **Halaman Ringkasan** seluruh Hiragana
- **Halaman Dakuten** perbandingan か→が, dll.
- **Ujian Akhir** 4 bagian (24 soal)
- **Sistem nilai**: Lulus (≥80), Latihan (60–79), Ulangi (<60)
- **Progress tersimpan** di LocalStorage
- **Dark Mode & Light Mode**
- **Mobile First** responsive

## Struktur

```
src/
├── data/
│   ├── curriculum.ts   # Generator otomatis semua halaman dari DB hiragana
│   └── exam.ts         # Soal ujian akhir
├── types/index.ts       # TypeScript types
├── lib/
│   ├── progress.ts     # LocalStorage progress
│   └── ThemeContext.tsx
└── components/
    ├── reader/
    │   ├── Reader.tsx        # Orchestrator utama
    │   ├── NewLetterPage.tsx
    │   ├── ReviewPage.tsx
    │   ├── SummaryPage.tsx
    │   ├── DakutenPage.tsx
    │   └── ExamPage.tsx
    └── ui/
        ├── NavBar.tsx
        └── HomeScreen.tsx
```
