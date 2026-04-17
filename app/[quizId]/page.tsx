"use client";
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

const QuizGenerator = () => {
  const { summary, title } = useSummaryArticle();
  const { quizzes, loading, onGenerateQuiz, onReset, setSelected, selected } =
    useQuizGenerator();

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
        Start your quiz
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileTextIcon size={16} className="text-muted-foreground" />
          Article Title
        </div>
        <input
          id="content"
          className="w-full text-sm border border-zinc-200 rounded-md px-3 py-2 bg-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors resize-y"
          placeholder="Paste your article content here..."
          value={title}
          disabled={loading}
        />
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
      {!quizzes && (
        <div className="flex flex-col gap-4 mt-2">
          <h2 className="text-sm font-medium">Quiz is not available</h2>
        </div>
      )}
      {quizzes.length > 0 && (
        <div className="flex flex-col gap-4 mt-2">
          <h2 className="text-sm font-medium">Quiz Questions</h2>
          {quizzes.map((quiz, qi) => (
            <div
              key={qi}
              className="flex flex-col gap-2 border border-zinc-100 rounded-lg p-4 bg-zinc-50"
            >
              <p className="text-sm font-medium">
                {qi + 1}. {quiz.question}
              </p>
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
                    optionStyle +=
                      "border-green-300 bg-green-50 text-green-800";
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
export default QuizGenerator;
