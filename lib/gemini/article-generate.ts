import { Article } from "@/app/api/article/route";
import { GoogleGenAI } from "@google/genai";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("GEMINI API KEY is not set");
}
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY!,
});

export const articleGenerate = async (article: Article) => {
  const {
    title,
    summary: { summary, articleId },
  } = article;
  const prompt = `Generate 5 multiple choice questions based on this article: ${title} and content: ${summary}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.log("Gemini api quiz generation failed: ", error);
  }
};
