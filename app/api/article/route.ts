import { articleGenerate } from "@/lib/gemini/article-generate";
import { NextRequest, NextResponse } from "next/server";

export type Article = {
  title: string;
  content: string;
};

export async function POST(request: NextRequest) {
  const article: Article = await request.json();

  const quizzes = await articleGenerate(article);

  if (!quizzes)
    return NextResponse.json(
      {
        message: "Quiz is not able to be created!",
      },
      { status: 500 },
    );

  const cleaned = quizzes
    .replace(/```json\n?/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  return NextResponse.json({ message: parsed });
}

export async function GET(request:NextRequest){
    const article:Article=await request.json()
   return NextResponse.json({message:""})
}
//ehleed content, title avna - summarize hiigeed, summarized contentiig quiz bolgono 