"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, RotateCw, Sparkles } from "lucide-react";

const ArticleGenerator = () => {
  return (
    <Card className="p-5 w-full max-w-sm flex flex-col gap-3 h-fit">
      <CardHeader className="p-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-muted-foreground" />
          <CardTitle className="text-sm font-medium leading-none">
            Article Quiz Generator
          </CardTitle>
        </div>
        <button
          className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
          title="Reset"
        >
          <RotateCw size={13} />
        </button>
      </CardHeader>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Paste your article content below to generate a summary and quiz
        questions. Your articles will be saved in the sidebar for future
        reference.
      </p>

      <div className="flex flex-col w-full">
        <label htmlFor="article">Article Title</label>

        <input
          id="article"
          type="text"
          className="flex-1 text-xs border border-zinc-200 rounded-md px-3 py-2 bg-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
          placeholder="Enter a title for your article..."
        />
      </div>

      <hr className="border-zinc-100" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FileText size={13} className="text-muted-foreground shrink-0" />
          <span className="text-xs font-medium text-foreground">
            Article content
          </span>
        </div>

        <p className="text-xs text-muted-foreground"></p>
        <div className="flex flex-col w-full">
          <input
            id="article"
            type="text"
            className="flex-1 min-h-30 text-xs border border-zinc-200 rounded-md px-3 py-2 bg-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
            placeholder="Paste your article content here..."
          />
          <Button className="text-xs px-3 py-2 h-auto cursor-pointer bg-zinc-700 hover:bg-zinc-800 shrink-0">
            Generate summary
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ArticleGenerator;
