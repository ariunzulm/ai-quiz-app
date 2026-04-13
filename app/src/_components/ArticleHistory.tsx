"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, RotateCw, Sparkles } from "lucide-react";

const ArticleHistory = () => {
  return (
    <Card>
      <div className="flex flex-col  p-4 min-h-screen items-center gap-2">
        <h1>Article history</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          No articles yet. Create your first article to get started.
        </p>
      </div>
    </Card>
  );
};

export default ArticleHistory;
