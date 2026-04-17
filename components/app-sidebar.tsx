import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { prisma } from "@/lib/prisma";
import { FileText } from "lucide-react";
import Link from "next/link";

export async function AppSidebar() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <Sidebar className="px-4 py-10 bg-zinc-50 font-mono dark:bg-black min-w-90">
      <SidebarHeader className="text-lg font-bold">History</SidebarHeader>
      <SidebarContent>
        {articles.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center mt-4">
            No articles yet. Create your first article to get started.
          </p>
        ) : (
          <SidebarGroup>
            <SidebarMenu>
              {articles.map((article) => (
                <SidebarMenuItem key={article.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/${article.id}`}
                      className="flex items-center gap-2 w-full text-left text-sm"
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="truncate">{article.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
