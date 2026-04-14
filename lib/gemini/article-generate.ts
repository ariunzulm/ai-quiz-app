import { Article } from "@/app/api/article/route";
import { GoogleGenAI } from "@google/genai";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDE9cUHzuoV4DBp8o_-ahQYbCKZIW2yUvA",
});

export const articleGenerate = async (article: Article) => {
  const propmt = `Generate 5 multiple choice questions based on this article: ${article.content}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: propmt,
  });
  return response.text;
};
