import { summaryGenerate } from "@/lib/gemini/summary-generate";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

type Content = {
  userId: string;
  content: string;
  title: string;
};

export async function POST(request: NextRequest) {
  const { title, content, userId } = (await request.json()) as Content;

  const summary = await summaryGenerate({ title, content });
  console.log(summary, "summary");
  return NextResponse.json({ message: summary });
  if (!summary)
    return NextResponse.json(
      {
        message: "Summary generation failed",
      },
      { status: 500 },
    );
  try {
    const article = await prisma.article.create({
      data: {
        content,
        title,
        summary,
        userId,
      },
    });

    return NextResponse.json(
      { summary: article.summary, articleId: article.id },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal POST error:${error}` },
      { status: 500 },
    );
  }
}
