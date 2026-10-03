import { cache } from "react";
import { prisma } from "./prisma";
import { Article, MOCK_ARTICLES, CategoryType } from "@/data/mockArticles";

export type ArticleSummary = Omit<Article, "content">;

// Deduplicate request queries across Server Components and metadata generators
export const getArticles = cache(async (): Promise<Article[]> => {
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
        likes: a.likes,
      }));
    }
  } catch (err) {
    console.error("Prisma getArticles failed, falling back to mock:", err);
  }

  return MOCK_ARTICLES;
});

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
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
        likes: a.likes,
      };
    }
  } catch (err) {
    console.error("Prisma getArticleBySlug failed, falling back to mock:", err);
  }

  const fallback = MOCK_ARTICLES.find((item) => item.slug === slug);
  return fallback ?? null;
});

export const getRelatedArticles = cache(
  async (currentId: string, category: string): Promise<ArticleSummary[]> => {
    try {
      const items = await prisma.article.findMany({
        where: {
          id: { not: currentId },
          category: category,
        },
        take: 2,
        orderBy: { publishedAt: "desc" },
        select: {
          id: true,
          slug: true,
          number: true,
          title: true,
          category: true,
          categoryLabel: true,
          date: true,
          publishedAt: true,
          author: true,
          excerpt: true,
          isFeatured: true,
        },
      });

      if (items && items.length > 0) {
        return items.map((a) => ({
          id: a.id,
          slug: a.slug,
          number: a.number ?? undefined,
          title: a.title,
          category: a.category as CategoryType,
          categoryLabel: a.categoryLabel,
          date: a.date,
          publishedAt: a.publishedAt.toISOString(),
          author: a.author,
          excerpt: a.excerpt,
          isFeatured: a.isFeatured,
        }));
      }
    } catch (err) {
      console.error("Prisma getRelatedArticles failed:", err);
    }

    return MOCK_ARTICLES.filter(
      (a) => a.id !== currentId && a.category === category
    ).slice(0, 2);
  }
);
