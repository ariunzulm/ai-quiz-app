import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("GEMINI API KEY is not set");
}

const ai = new GoogleGenAI({ apiKey });

export type SummaryProps = {
  title: string;
  content: string;
};

export const summaryGenerate = async ({ title, content }: SummaryProps) => {
  const prompt = `Please provide a concise summary of the following article: ${content}, title:${title}`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    return response.text ?? null;
  } catch (error) {
    console.log("Gemini api generation failed: ", error);
    return null;
  }
};
