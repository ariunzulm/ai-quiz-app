import { QuizGenerator } from "@/components/QuizGenerator";
import { SummarizeContent } from "@/components/SummarizeContent";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-end gap-40 p-4  bg-zinc-50 font-mono dark:bg-black">
      <QuizGenerator />
      <SummarizeContent />
    </div>
  );
}
