import { summaryGenerate } from "@/lib/gemini/summary-generate";
import { NextRequest, NextResponse } from "next/server";

export type Content = {
  content: string;
};

export async function POST(request: NextRequest) {
  const content: Content = await request.json();

  const result = await summaryGenerate(content);

  if (!result)
    return NextResponse.json(
      {
        message: "Content is not able to be created!",
      },
      { status: 500 },
    );
  const cleaned = result
    .replace(/```json\n?/g, "")
    .replace(/```/g, "")
    .trim();
  const parsed = JSON.parse(cleaned);

  return NextResponse.json({ message: cleaned });
}

// export async function GET(request: NextRequest) {
//   const content: Content = await request.json();
//   return NextResponse.json({ message: "" });
// }
