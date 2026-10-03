import { prisma } from "./prisma";
import { Article, MOCK_ARTICLES, CategoryType } from "@/data/mockArticles";

export async function getArticles(): Promise<Article[]> {
  try {
    const dbArticles = await prisma.article.findMany({
      orderBy: { publishedAt: "desc" },
    });

    if (dbArticles && dbArticles.length > 0) {
      return dbArticles.map((a) => ({
        id: a.id,
        slug: a.slug,
        number: a.number ?? undefined,
        title: a.title,
        category: a.category as CategoryType,
        categoryLabel: a.categoryLabel,
        date: a.date,
        publishedAt: a.publishedAt.toISOString(),
        readTime: a.readTime ?? undefined,
        author: a.author,
        excerpt: a.excerpt,
        content: a.content,
        isFeatured: a.isFeatured,
      }));
    }
  } catch (err) {
    console.error("Prisma getArticles failed, falling back to mock:", err);
  }

  return MOCK_ARTICLES;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const a = await prisma.article.findUnique({
      where: { slug },
    });

    if (a) {
      return {
        id: a.id,
        slug: a.slug,
        number: a.number ?? undefined,
        title: a.title,
        category: a.category as CategoryType,
        categoryLabel: a.categoryLabel,
        date: a.date,
        publishedAt: a.publishedAt.toISOString(),
        readTime: a.readTime ?? undefined,
        author: a.author,
        excerpt: a.excerpt,
        content: a.content,
        isFeatured: a.isFeatured,
      };
    }
  } catch (err) {
    console.error("Prisma getArticleBySlug failed, falling back to mock:", err);
  }

  const fallback = MOCK_ARTICLES.find((item) => item.slug === slug);
  return fallback ?? null;
}
