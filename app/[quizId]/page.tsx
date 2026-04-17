import { prisma } from "@/lib/prisma";
import QuizGenerator from "./_components/QuizGenerator";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const article = await prisma.article.findUnique({
    where: { id: quizId },
    include: { quizzes: true },
  });

  if (!article) return <div>Article not found</div>;

  return (
    <div className="w-full">
      <QuizGenerator
        pageQuizzes={article.quizzes}
        pageSummary={article.summary}
        pageTitle={article.title}
      />
    </div>
  );
}
