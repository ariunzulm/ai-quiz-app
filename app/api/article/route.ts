import { articleGenerate } from "@/lib/gemini/article-generate";
import { prisma } from "@/lib/prisma";
import { SummarizeContentType } from "@/lib/types";
import { create } from "domain";
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
  console.log(article);

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

  const parsedQuizzes = JSON.parse(cleaned);
  console.log(parsedQuizzes);
  return NextResponse.json({ quizzes: quizzes }, { status: 200 });
  const { question, answer, options }: QuizProps = parsedQuizzes;
  try {
    const quizzes = await prisma.quiz.create({
      data: {
        question,
        answer,
        options,
        articleId: article.summary.articleId,
      },
    });

    return NextResponse.json({ quizzes: quizzes }, { status: 200 });
  } catch (error) {
    console.log("Internal POST error:", error);
  }
}

export async function GET(request: NextRequest) {
  const article: Article = await request.json();
  return NextResponse.json({ message: "" });
}
//ehleed content, title avna - summarize hiigeed, summarized contentiig quiz bolgono
