import { ArticleGenerator } from "@/components/ArticleGenerator";
import { SummarizeContent } from "@/components/SummarizeContent";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-end gap-40 p-4  bg-zinc-50 font-mono dark:bg-black">
      <ArticleGenerator />
      <SummarizeContent />
    </div>
  );
}
