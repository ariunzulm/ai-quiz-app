import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { prisma } from "@/lib/prisma";
import { FileText, PlusCircle } from "lucide-react";
import Link from "next/link";

type ArticleProps = {
  id: number;
  title: string;
};

export async function AppSidebar() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <Sidebar className="bg-zinc-50 font-mono dark:bg-black">
      <SidebarHeader className="px-4 py-4 border-b border-zinc-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">History</span>
          {articles.length > 0 && (
            <span className="text-xs text-muted-foreground bg-zinc-200 rounded-full px-2 py-0.5">
              {articles.length}
            </span>
          )}
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
        >
          <PlusCircle size={13} />
          New article
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
            <FileText size={28} className="text-zinc-300" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              No articles yet.
              <br />
              Create your first to get started.
            </p>
            <Link
              href="/"
              className="text-xs font-medium text-zinc-700 hover:text-zinc-900 underline underline-offset-2 transition-colors"
            >
              Get started →
            </Link>
          </div>
        ) : (
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="text-xs text-muted-foreground px-2 mb-1">
              Recent
            </SidebarGroupLabel>
            <SidebarMenu>
              {articles.map((article: ArticleProps) => (
                <SidebarMenuItem key={article.id}>
                  <Link
                    href={`/${article.id}`}
                    className="flex items-center gap-2 w-full text-left text-xs px-2 py-1.5 rounded-md"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{article.title}</span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="px-4 py-3 border-t border-zinc-200">
        <p className="text-xs text-muted-foreground">
          {articles.length} article{articles.length !== 1 ? "s" : ""} saved
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
