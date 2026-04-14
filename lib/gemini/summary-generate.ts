import { Article } from "@/app/api/article/route";
import { Content } from "@/app/api/generate/route";
import { GoogleGenAI } from "@google/genai";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDE9cUHzuoV4DBp8o_-ahQYbCKZIW2yUvA",
});

export const summaryGenerate = async (content: Content) => {
  const propmt = `Please provide a concise summary of the following article: ${content}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: propmt,
  });
  return response.text;
};
