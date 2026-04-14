"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpenCheck, Loader2, RotateCw, Sparkles } from "lucide-react";

export const SummarizeContent = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const onGenerateContent = async () => {
    if (!content) return;
    setLoading(true);
    await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    setLoading(false);
  };

  const onReset = () => {
    setContent("");

    setLoading(false);
  };

  return (
    <Card className="p-8 w-full max-w-2xl flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-medium">
          <Sparkles size={20} className="text-muted-foreground" />
          Article Quiz Generator
        </div>
        <button
          onClick={onReset}
          className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
          title="Reset"
        >
          <RotateCw size={16} />
        </button>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        Summarized content
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <BookOpenCheck size={16} className="text-muted-foreground" />
          Article Content
        </div>
        <textarea
          id="content"
          rows={7}
          className="w-full text-sm border border-zinc-200 rounded-md px-3 py-2 bg-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors resize-y"
          placeholder="Paste your article content here..."
          value={content}
          disabled={loading}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <Button
        onClick={onGenerateContent}
        disabled={loading || !content}
        className="w-full cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles size={16} className="cursor-pointer" />
            Take a quiz
          </>
        )}
      </Button>
    </Card>
  );
};
