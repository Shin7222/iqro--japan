"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadState, saveState } from "@/lib/storage";
import { getDakutenQuestions } from "@/lib/examEngine";
import { addXp } from "@/lib/xp";
import type { UserState } from "@/types/user";
import ExamDakuten from "@/components/ExamDakuten";

export default function ExamDakutenPage() {
  const router = useRouter();
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  const handlePass = () => {
    if (!state) return;
    let next: UserState = {
      ...state,
      examStatus: { ...state.examStatus, dakuten: "passed" },
    };
    next = addXp(next, 50);
    saveState(next);
    setState(next);
    router.push("/exam/reading");
  };

  if (!state) return null;

  return (
    <ExamDakuten
      questions={getDakutenQuestions()}
      onPass={handlePass}
    />
  );
}
