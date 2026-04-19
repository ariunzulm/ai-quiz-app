"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RotateCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from "lucide-react";
import { useState } from "react";

type Quiz = {
  options: string[];
  id: number;
  question: string;
  answer: string;
  articleId: string;
};

type ArticleProps = {
  pageQuizzes: Quiz[];
  pageSummary: string;
  pageTitle: string;
};

const QuizGenerator = ({
  pageQuizzes,

  pageTitle,
}: ArticleProps) => {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const onReset = () => {
    setSelected({});
    setCurrentIndex(0);
    setShowResults(false);
  };

  const currentQuiz = pageQuizzes[currentIndex];
  const hasAnswered = selected[currentIndex] !== undefined;
  const isLast = currentIndex === pageQuizzes.length - 1;
  const answeredCount = Object.keys(selected).length;
  const score = pageQuizzes.filter(
    (quiz, i) => selected[i] === parseInt(quiz.answer),
  ).length;
  if (!pageQuizzes || pageQuizzes.length === 0) {
    return (
      <Card className="p-8 w-full max-w-2xl flex flex-col gap-5">
        <div className="flex items-center gap-2 text-2xl font-medium">
          <Sparkles size={20} className="text-muted-foreground" />
          {pageTitle}
        </div>
        <p className="text-sm text-muted-foreground">
          No quizzes available for this article yet.
        </p>
      </Card>
    );
  }
  if (showResults) {
    return (
      <Card className="p-8 w-full max-w-2xl flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-medium">
            <Trophy size={20} className="text-muted-foreground" />
            Results
          </div>
          <button
            onClick={onReset}
            className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
          >
            <RotateCw size={16} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 py-6 border border-zinc-100 rounded-lg bg-zinc-50">
          <span className="text-5xl font-bold">
            {score}/{pageQuizzes.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {score === pageQuizzes.length
              ? "Perfect score! 🎉"
              : score >= pageQuizzes.length / 2
                ? "Good job! Keep it up."
                : "Keep practicing!"}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {pageQuizzes.map((quiz, qi) => {
            const userAnswer = selected[qi];
            const correct = parseInt(quiz.answer);
            const isCorrect = userAnswer === correct;
            return (
              <div
                key={quiz.id}
                className={`flex flex-col gap-2 rounded-lg p-4 border ${
                  isCorrect
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <p className="text-sm font-medium">
                  {qi + 1}. {quiz.question}
                </p>
                <p className="text-xs text-muted-foreground">
                  Your answer:{" "}
                  <span
                    className={
                      isCorrect
                        ? "text-green-700 font-medium"
                        : "text-red-700 font-medium"
                    }
                  >
                    {userAnswer !== undefined
                      ? quiz.options[userAnswer]
                      : "Not answered"}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-xs text-muted-foreground">
                    Correct answer:{" "}
                    <span className="text-green-700 font-medium">
                      {quiz.options[correct]}
                    </span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <Button onClick={onReset} className="w-full">
          <RotateCw size={16} />
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 w-full max-w-2xl flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-medium">
          <Sparkles size={20} className="text-muted-foreground" />
          {pageTitle}
        </div>
        <button
          onClick={onReset}
          className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
        >
          <RotateCw size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Question {currentIndex + 1} of {pageQuizzes.length}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-800 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / pageQuizzes.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 border border-zinc-100 rounded-lg p-5 bg-zinc-50 min-h-48">
        <p className="text-sm font-medium leading-relaxed">
          {currentQuiz.question}
        </p>
        <div className="flex flex-col gap-2 mt-1">
          {currentQuiz.options.map((option, oi) => {
            const isSelected = selected[currentIndex] === oi;
            const isCorrect = oi === parseInt(currentQuiz.answer);
            let optionStyle =
              "text-xs px-3 py-2.5 rounded-md border transition-colors text-left ";
            if (!hasAnswered) {
              optionStyle +=
                "border-zinc-200 hover:bg-zinc-100 bg-white cursor-pointer";
            } else if (isCorrect && isSelected) {
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
                  setSelected((prev) => ({ ...prev, [currentIndex]: oi }))
                }
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex((i) => i - 1)}
          disabled={currentIndex === 0}
          className="w-fit"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        {isLast ? (
          <Button
            onClick={() => setShowResults(true)}
            disabled={answeredCount < pageQuizzes.length}
            className="w-full"
          >
            <Trophy size={16} />
            Show Results
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentIndex((i) => i + 1)}
            disabled={!hasAnswered}
            className="w-fit"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        )}
      </div>

      {isLast && answeredCount < pageQuizzes.length && (
        <p className="text-xs text-center text-muted-foreground">
          Answer all questions to see your results
        </p>
      )}
    </Card>
  );
};

export default QuizGenerator;
