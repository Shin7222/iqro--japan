"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/ui/NavBar";
import HomeScreen from "@/components/ui/HomeScreen";
import NewLetterPageView from "./NewLetterPage";
import ReviewPageView from "./ReviewPage";
import SummaryPageView from "./SummaryPage";
import DakutenPageView from "./DakutenPage";
import ExamPageView from "./ExamPage";
import { getVolumePages } from "@/data/curriculum";
import { loadProgress, saveProgress, resetAllProgress, defaultProgress, switchVolume } from "@/lib/progress";
import type { Progress } from "@/types";

type Screen = "home" | "reader";

export default function Reader() {
  const [screen, setScreen] = useState<Screen>("home");
  const [progress, setProgress] = useState<Progress>(defaultProgress);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const vol = progress.currentVolume;
  const pages = getVolumePages(vol);
  const totalPages = pages.length;
  const currentPage = Math.min(progress.currentPage, totalPages - 1);
  const page = pages[currentPage];

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(totalPages - 1, index));
    const next: Progress = {
      ...progress,
      currentPage: clamped,
      pageByVolume: { ...progress.pageByVolume, [vol]: clamped },
    };
    setProgress(next);
    saveProgress(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelectVolume(volume: number) {
    const next = switchVolume(progress, volume);
    setProgress(next);
    setScreen("reader");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    if (!confirm("Reset semua progress? Data tidak bisa dikembalikan.")) return;
    resetAllProgress();
    setProgress(defaultProgress);
  }

  function handleExamComplete(score: number) {
    const completed = score >= 80 && !progress.completedVolumes.includes(vol)
      ? [...progress.completedVolumes, vol]
      : progress.completedVolumes;
    const next: Progress = {
      ...progress,
      examScores: { ...progress.examScores, [vol]: score },
      completedVolumes: completed,
    };
    setProgress(next);
    saveProgress(next);
  }

  if (screen === "home") {
    return (
      <HomeScreen
        progress={progress}
        onSelectVolume={handleSelectVolume}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <NavBar
        currentPage={currentPage}
        totalPages={totalPages}
        volume={vol}
        onPrev={() => goTo(currentPage - 1)}
        onNext={() => goTo(currentPage + 1)}
        onHome={() => setScreen("home")}
      />
      <main>
        {page.type === "new-letter" && <NewLetterPageView page={page} />}
        {page.type === "review"     && <ReviewPageView page={page} />}
        {page.type === "summary"    && <SummaryPageView volume={vol} />}
        {page.type === "dakuten"    && <DakutenPageView volume={vol} />}
        {page.type === "exam"       && <ExamPageView volume={vol} onComplete={handleExamComplete} />}
      </main>
    </div>
  );
}
