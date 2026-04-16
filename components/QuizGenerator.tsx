"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  FileTextIcon,
  Loader2,
  RotateCw,
  Sparkles,
} from "lucide-react";
import { useSummaryArticle } from "@/hooks/useSummaryArticle";
import { useQuizGenerator } from "@/hooks/useQuizGenerator";

export const QuizGenerator = () => {
  const { summary, title } = useSummaryArticle();
  const { quizzes, loading, onGenerateQuiz, onReset } = useQuizGenerator();

  const generateQuiz = () => {
    if (!summary) return;
    onGenerateQuiz(summary, title);
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
        Paste your article content below to generate a summary and quiz
        questions. Your articles will be saved in the sidebar for future
        reference.
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileTextIcon size={16} className="text-muted-foreground" />
          Article Title
        </div>
        {/* <input
          id="title"
          type="text"
          className="w-full text-sm border border-zinc-200 rounded-md px-3 py-2 bg-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
          placeholder="Enter a title for your article..."
          value={title}
          disabled={loading}
          onChange={(e) => setTitle(e.target.value)}
        /> */}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileText size={16} className="text-muted-foreground" />
          Article Content
        </div>
        <textarea
          id="summary"
          rows={7}
          className="w-full text-sm border border-zinc-200 rounded-md px-3 py-2 bg-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors resize-y"
          placeholder="Paste your article content here..."
          value={summary?.summary}
          disabled={loading}
        />
      </div>

      <Button
        onClick={generateQuiz}
        disabled={loading || (!title && !summary)}
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
            Generate Summary
          </>
        )}
      </Button>
      {quizzes.length > 0 && (
        <div>
          <div className="flex flex-col gap-4 mt-2">
            <h2 className="text-sm font-medium">Quiz Questions</h2>
          </div>
          {quizzes.map((quiz, i) => (
            <div key={i}>
              <div>{quiz.question}</div>
              {quiz.options.map((op, index) => {
                return (
                  <div className="flex items-center gap-2">
                    <label htmlFor={`option${index}`}>{op}</label>
                    <input
                      type="radio"
                      id={`option${index}`}
                      name="choice"
                      value={index}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
