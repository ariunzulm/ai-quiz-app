import { articleGenerate } from "@/lib/gemini/article-generate";
import { prisma } from "@/lib/prisma";
import { SummarizeContentType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export type Article = {
  title: string;
  summary: SummarizeContentType;
};

type QuizProps = {
  question: string;
  answer: string;
  options: string[];
};

export async function POST(request: NextRequest) {
  const article: Article = await request.json();

  const quizzes = await articleGenerate(article);
  if (!quizzes)
    return NextResponse.json(
      {
        message: "Quiz creation failed",
      },
      { status: 500 },
    );

  const cleaned = quizzes
    .replace(/```json\n?/g, "")
    .replace(/```/g, "")
    .trim();

  const parsedQuizzes: QuizProps[] = JSON.parse(cleaned);

  try {
    await prisma.quiz.createMany({
      data: parsedQuizzes.map((quiz) => ({
        question: quiz.question,
        answer: quiz.answer,
        options: quiz.options,
        articleId: article.summary.articleId,
      })),
    });
    console.log(quizzes, "quizzes");
    return NextResponse.json({ quizzes: parsedQuizzes }, { status: 200 });
  } catch (error) {
    console.log("Internal POST error:", error);
  }
}

// export async function GET(request: NextRequest) {
//   const article: Article = await request.json();
//   return NextResponse.json({ message: "" });
// }{
//   question,
//   answer,
//   options,
//   articleId: article.summary.articleId,
// },
//ehleed content, title avna - summarize hiigeed, summarized contentiig quiz bolgono
