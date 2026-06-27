"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadState, saveState } from "@/lib/storage";
import { getReadingQuestions } from "@/lib/examEngine";
import { addXp } from "@/lib/xp";
import type { UserState } from "@/types/user";
import ExamReading from "@/components/ExamReading";

export default function ExamReadingPage() {
  const router = useRouter();
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  const handlePass = () => {
    if (!state) return;
    let next: UserState = {
      ...state,
      badges: [...new Set([...state.badges, "hiragana"])],
      unlockedVolumes: [...new Set([...state.unlockedVolumes, 2])],
      examStatus: { ...state.examStatus, reading: "passed", volume1: "passed" },
    };
    next = addXp(next, 100);
    saveState(next);
    setState(next);
    router.push("/certificate");
  };

  if (!state) return null;

  return (
    <ExamReading
      questions={getReadingQuestions()}
      onPass={handlePass}
    />
  );
}
