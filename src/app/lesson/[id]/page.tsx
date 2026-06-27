"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { loadState, saveState } from "@/lib/storage";
import { generateLesson } from "@/lib/lessonGenerator";
import type { UserState } from "@/types/user";
import type { GeneratedLesson } from "@/types/lesson";
import LessonView from "@/components/LessonView";
import hiragana from "@/data/hiragana.json";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LessonPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const lessonId = parseInt(id);

  const [state, setState] = useState<UserState | null>(null);
  const [generated, setGenerated] = useState<GeneratedLesson | null>(null);

  useEffect(() => {
    const s = loadState();
    setState(s);

    const lesson = hiragana.find((h) => h.id === lessonId);
    if (!lesson) {
      router.push("/");
      return;
    }

    const known = hiragana.filter((h) => h.id < lessonId);
    const gen = generateLesson(lesson, known);
    setGenerated(gen);
  }, [lessonId, router]);

  const handleStateChange = (newState: UserState) => {
    setState(newState);
    saveState(newState);
  };

  if (!state || !generated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Memuat pelajaran...</div>
      </div>
    );
  }

  return (
    <LessonView
      generatedLesson={generated}
      state={state}
      onStateChange={handleStateChange}
    />
  );
}
