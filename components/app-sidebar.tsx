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
import { FileText } from "lucide-react";

type Article = {
  id: string;
  title: string;
};

type AppSidebarProps = {
  articles?: Article[];
};

export function AppSidebar({}: AppSidebarProps) {
  return (
    <Sidebar className="px-4 py-10 bg-zinc-50 font-mono dark:bg-black min-w-90">
      <SidebarHeader className="text-lg font-bold">History</SidebarHeader>
      <SidebarContent>
        {/* {articles.length === 0 ? ( */}
        <p className="text-sm text-muted-foreground text-center mt-4">
          No articles yet. Create your first article to get started.
        </p>
        {/* ) : ( */}
        <SidebarGroup>
          <SidebarMenu>
            {/* {articles.map((article) => (
                <SidebarMenuItem key={article.id}>
                  <SidebarMenuButton asChild>
                    <button className="flex items-center gap-2 w-full text-left text-sm">
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="truncate">Article title</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
          </SidebarMenu>
        </SidebarGroup>
        {/* )} */}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
