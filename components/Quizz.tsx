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

type Quiz = {
  question: string;
  options: string[];
  answer: string;
};

export const ArticleGenerator = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selected, setSelected] = useState<Record<number, number>>({});

  const onGenerateQuiz = async () => {
    if (!title && !content) return;
    setLoading(true);
    setQuizzes([]);
    setSelected({});
    try {
      const res = await fetch("/api/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      setQuizzes(data.message ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setTitle("");
    setContent("");
    setLoading(false);
    setQuizzes([]);
    setSelected({});
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
        <input
          id="title"
          type="text"
          className="w-full text-sm border border-zinc-200 rounded-md px-3 py-2 bg-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
          placeholder="Enter a title for your article..."
          value={title}
          disabled={loading}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileText size={16} className="text-muted-foreground" />
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
        onClick={onGenerateQuiz}
        disabled={loading || (!title && !content)}
        className="w-full cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Generate Summary
          </>
        )}
      </Button>

      {quizzes.length > 0 && (
        <div className="flex flex-col gap-4 mt-2">
          <h2 className="text-sm font-medium">Quiz Questions</h2>
          {quizzes.map((quiz, qi) => (
            <div
              key={qi}
              className="flex flex-col gap-2 border border-zinc-100 rounded-lg p-4 bg-zinc-50"
            >
              <p className="text-sm font-medium">{qi + 1}. {quiz.question}</p>
              <div className="flex flex-col gap-1.5">
                {quiz.options.map((option, oi) => {
                  const isSelected = selected[qi] === oi;
                  const isCorrect = oi === parseInt(quiz.answer);
                  const hasAnswered = selected[qi] !== undefined;
                  let optionStyle =
                    "text-xs px-3 py-2 rounded-md border cursor-pointer transition-colors text-left ";
                  if (!hasAnswered) {
                    optionStyle += "border-zinc-200 hover:bg-zinc-100 bg-white";
                  } else if (isCorrect) {
                    optionStyle += "border-green-300 bg-green-50 text-green-800";
                  } else if (isSelected) {
                    optionStyle += "border-red-300 bg-red-50 text-red-800";
                  } else {
                    optionStyle += "border-zinc-200 bg-white text-zinc-400";
                  }
                  return (
                    <button
                      key={oi}
                      className={optionStyle}
                      disabled={hasAnswered}
                      onClick={() =>
                        setSelected((prev) => ({ ...prev, [qi]: oi }))
                      }
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};