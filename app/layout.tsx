import type { Metadata } from "next";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Quiz Gen",
  description: "Generate quizzes from articles using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col flex-1 min-h-screen">
              <header className="flex justify-between items-center px-6 h-14 border-b border-zinc-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-zinc-900">
                      <Sparkles size={13} className="text-white" />
                    </div>
                    AI Quiz Gen
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <Show when="signed-out">
                    <SignInButton />
                    <SignUpButton>
                      <button className="bg-zinc-900 text-white rounded-full font-medium text-sm h-8 px-4 cursor-pointer hover:bg-zinc-700 transition-colors">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                </div>
              </header>
              <main className="flex-1 px-20 py-10">{children}</main>
            </div>
          </SidebarProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
