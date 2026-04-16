"use client";

import { SummarizeContentType } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

export const useSummaryArticle = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SummarizeContentType | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userId } = useAuth();

  const isDisabled = loading || !title || !content;

  const onGenerateSummary = async () => {
    if (!title || !content) return;
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          userId,
        }),
      });
      if (!response) throw new Error("Failed to generate summary");
      console.log(response, "response");
      const data = await response.json();
      setSummary(data);

      setLoading(false);
    } catch (error) {
      console.log("Something went wrong during summary generation.", error);
    }
  };
  const onReset = () => {
    setContent("");
    setTitle("");
    setSummary(null);
    setLoading(false);
  };

  return {
    isDisabled,
    loading,
    title,
    content,
    summary,
    onGenerateSummary,
    onReset,
    setTitle,
    setContent,
  };
};
