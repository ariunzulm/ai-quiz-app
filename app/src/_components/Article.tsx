"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, RotateCw, Sparkles } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { textGenerator } from "../lib/textGenerator";
import ReactMarkdown from "react-markdown";

const TextGenerator = () => {
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onClick = async () => {
    if (!text.trim()) return;
    setLoading(true);

    const response = await textGenerator(text);
    setValue(response ?? "");
    setLoading(false);
  };

  const onReset = () => {
    setText("");
    setValue("");
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClick();
  };

  return (
    <Card className="p-5 w-full max-w-sm flex flex-col gap-3">
      <CardHeader className="p-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-muted-foreground" />
          <CardTitle className="text-sm font-medium leading-none">
            Ingredient recognition
          </CardTitle>
        </div>
        <button
          onClick={onReset}
          className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
          title="Reset"
        >
          <RotateCw size={13} />
        </button>
      </CardHeader>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Describe the food, and AI will detect the ingredients.
      </p>

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 text-xs border border-zinc-200 rounded-md px-3 py-2 bg-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
          placeholder="e.g. Beef mongolian noodle soup"
          value={text}
          onChange={onHandleChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <Button
          className="text-xs px-3 py-2 h-auto cursor-pointer bg-zinc-700 hover:bg-zinc-800 shrink-0"
          onClick={onClick}
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      <hr className="border-zinc-100" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FileText size={13} className="text-muted-foreground shrink-0" />
          <span className="text-xs font-medium text-foreground">
            Identified ingredients
          </span>
        </div>

        {!value && !loading && (
          <p className="text-xs text-muted-foreground">
            Enter a food description above to get started.
          </p>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 py-8 text-muted-foreground">
            <Loader2 size={18} className="animate-spin" />
            <p className="text-xs">Analyzing ingredients...</p>
          </div>
        )}

        {value && !loading && (
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2.5 text-xs text-foreground leading-relaxed prose prose-xs max-w-none overflow-auto max-h-52">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TextGenerator;
