import ArticleGenerator from "./src/_components/Article";
import ArticleHistory from "./src/_components/ArticleHistory";

export default function Home() {
  return (
    <div className="flex gap-40  p-4  bg-zinc-50 font-sans dark:bg-black">
      <ArticleHistory /> <ArticleGenerator />
    </div>
  );
}
