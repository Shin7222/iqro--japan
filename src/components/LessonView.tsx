"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import NavigationButtons from "./NavigationButtons";
import PracticeCard from "./PracticeCard";
import type { GeneratedLesson, Exercise } from "@/types/lesson";
import type { UserState } from "@/types/user";
import { addXp } from "@/lib/xp";
import { completeLesson } from "@/lib/progress";
import { saveState } from "@/lib/storage";
import hiragana from "@/data/hiragana.json";

interface LessonViewProps {
  generatedLesson: GeneratedLesson;
  state: UserState;
  onStateChange: (s: UserState) => void;
}

type Phase = "new-char" | Exercise["type"];

export default function LessonView({ generatedLesson, state, onStateChange }: LessonViewProps) {
  const router = useRouter();
  const { lesson, exercises } = generatedLesson;
  const totalLessons = hiragana.length;
  const lessonNumber = lesson.id;

  // phases: new-char → intro → combine → mix → words
  const phases: Phase[] = ["new-char", ...exercises.map((e) => e.type)];
  const [phaseIdx, setPhaseIdx] = useState(0);
  const currentPhase = phases[phaseIdx];

  // Header label
  const phaseLabels: Record<Phase, string> = {
    "new-char": "Huruf Baru",
    intro: "Pengenalan",
    combine: "Kombinasi",
    mix: "Campuran",
    words: "Kata",
  };

  const handleNext = useCallback(() => {
    if (phaseIdx < phases.length - 1) {
      setPhaseIdx(phaseIdx + 1);
    } else {
      // Lesson complete — update state
      let newState = completeLesson(state, lesson.id);
      newState = addXp(newState, 10);
      saveState(newState);
      onStateChange(newState);
      // Navigate to next lesson or exam
      if (lesson.id >= totalLessons) {
        router.push("/exam/dakuten");
      } else {
        router.push(`/lesson/${lesson.id + 1}`);
      }
    }
  }, [phaseIdx, phases.length, state, lesson.id, totalLessons, onStateChange, router]);

  const handlePrev = useCallback(() => {
    if (phaseIdx > 0) {
      setPhaseIdx(phaseIdx - 1);
    } else {
      router.push("/");
    }
  }, [phaseIdx, router]);

  const currentExercise = exercises[phaseIdx - 1] ?? null;

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <button
          onClick={() => router.push("/")}
          className="text-zinc-400 text-sm font-medium hover:text-zinc-200 transition-colors"
        >
          ホーム
        </button>
        <span className="text-zinc-400 text-sm font-medium">
          {lessonNumber} / {totalLessons}
        </span>
        <button
          onClick={() => router.push("/")}
          className="text-xl"
          aria-label="Toggle tema"
        >
          ☀️
        </button>
      </div>

      {/* NAV BUTTONS */}
      <NavigationButtons
        onPrev={handlePrev}
        onNext={handleNext}
        prevDisabled={false}
        nextDisabled={false}
      />

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto">
        {currentPhase === "new-char" ? (
          /* ── NEW CHARACTER DISPLAY ── */
          <NewCharDisplay lesson={lesson} />
        ) : (
          /* ── PRACTICE EXERCISES ── */
          currentExercise && (
            <div className="border-b border-dashed border-zinc-700">
              <PracticeCard
                items={currentExercise.items}
                columns={currentExercise.items.every((i) => i.length <= 3) ? 2 : 1}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* ── Sub-component: new char display ── */
function NewCharDisplay({
  lesson,
}: {
  lesson: GeneratedLesson["lesson"];
}) {
  return (
    <div className="flex flex-col items-center pt-8 pb-4">
      {/* Giant character */}
      <div
        className="text-red-500 font-bold leading-none mb-4"
        style={{
          fontSize: "clamp(6rem, 40vw, 14rem)",
          fontFamily: "'Noto Sans JP', serif",
          lineHeight: 1,
        }}
      >
        {lesson.newChar}
      </div>
      {/* Romaji */}
      <p className="text-zinc-500 text-2xl font-medium tracking-widest">
        {lesson.romaji}
      </p>
    </div>
  );
}
