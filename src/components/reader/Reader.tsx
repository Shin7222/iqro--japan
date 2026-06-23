"use client";
import { useCallback, useEffect, useState } from "react";
import NavBar from "@/components/ui/NavBar";
import HomeScreen from "@/components/ui/HomeScreen";
import NewLetterPageView from "./NewLetterPage";
import ReviewPageView from "./ReviewPage";
import SummaryPageView from "./SummaryPage";
import DakutenPageView from "./DakutenPage";
import ExamPageView from "./ExamPage";
import { VOLUME1_PAGES, TOTAL_PAGES } from "@/data/curriculum";
import { loadProgress, saveProgress, resetProgress, defaultProgress } from "@/lib/progress";
import type { Progress } from "@/types";

type Screen = "home" | "reader";

export default function Reader() {
  const [screen, setScreen] = useState<Screen>("home");
  const [progress, setProgress] = useState<Progress>(defaultProgress);

  // Load from localStorage on mount
  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const currentPage = progress.currentPage;
  const page = VOLUME1_PAGES[currentPage];

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(TOTAL_PAGES - 1, index));
    const next = { ...progress, currentPage: clamped };
    setProgress(next);
    saveProgress(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    if (!confirm("Reset semua progress? Data tidak bisa dikembalikan.")) return;
    resetProgress();
    setProgress(defaultProgress);
  }

  function handleExamComplete(score: number) {
    const next = {
      ...progress,
      examScores: { ...progress.examScores, [1]: score },
    };
    setProgress(next);
    saveProgress(next);
  }

  if (screen === "home") {
    return (
      <HomeScreen
        progress={progress}
        onStart={() => setScreen("reader")}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <NavBar
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPrev={() => goTo(currentPage - 1)}
        onNext={() => goTo(currentPage + 1)}
        onHome={() => setScreen("home")}
      />

      <main>
        {page.type === "new-letter" && <NewLetterPageView page={page} />}
        {page.type === "review" && <ReviewPageView page={page} />}
        {page.type === "summary" && <SummaryPageView />}
        {page.type === "dakuten" && <DakutenPageView />}
        {page.type === "exam" && (
          <ExamPageView onComplete={handleExamComplete} />
        )}
      </main>
    </div>
  );
}
