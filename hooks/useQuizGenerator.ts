"use client";

import { Quiz, SummarizeContentType } from "@/lib/types";
import { useState } from "react";

export const useQuizGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selected, setSelected] = useState<Record<number, number>>({});

  const onGenerateQuiz = async (
    summary: SummarizeContentType,
    title: string,
  ) => {
    if (!summary) return;
    setLoading(true);
    setSelected({});
    const res = await fetch("/api/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary,
        title,
      }),
    });
    const data = await res.json();
    setQuizzes(data.quizzes ?? []);

    setLoading(false);
  };

  const onReset = () => {
    setQuizzes([]);
    setSelected({});
    setLoading(false);
  };

  return { quizzes, loading, onGenerateQuiz, onReset, selected, setSelected };
};
