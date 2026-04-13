import { NextRequest, NextResponse } from "next/server";
import { articleGenerate } from "../lib/article";

export async function POST(req: NextRequest) {
  const { title } = await req.json();

  const text = await articleGenerate(title);
  const response = await fetch("http://localhost:3000/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(title),
  });
  const data = await response.json();
  return NextResponse.json({ success: true }, data);
}







export async function GET(req: NextRequest) {
  const body = await req.json();
  const { name } = body;

  const newUser = { id: Date.now(), name };

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
