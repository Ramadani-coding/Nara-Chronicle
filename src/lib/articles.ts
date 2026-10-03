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

export interface CommentItem {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
}

export const getCommentsByArticleSlug = cache(
  async (slug: string): Promise<CommentItem[]> => {
    try {
      // Check if prisma.comment delegate is present on client instance
      const commentDelegate = (prisma as any).comment;
      if (commentDelegate && typeof commentDelegate.findMany === "function") {
        const article = await prisma.article.findUnique({
          where: { slug },
          select: { id: true },
        });
        if (!article) return [];

        const comments = await commentDelegate.findMany({
          where: { articleId: article.id },
          orderBy: { createdAt: "desc" },
          take: 50,
        });

        return comments.map((c: any) => ({
          id: c.id,
          articleId: c.articleId,
          author: c.author,
          content: c.content,
          createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : String(c.createdAt),
        }));
      }

      // Fallback for stale dev server singleton before server restart
      const rows = await prisma.$queryRawUnsafe<any[]>(
        `
        SELECT c.id, c."articleId", c.author, c.content, c."createdAt"
        FROM "Comment" c
        JOIN "Article" a ON a.id = c."articleId"
        WHERE a.slug = $1
        ORDER BY c."createdAt" DESC
        LIMIT 50
        `,
        slug
      );

      return rows.map((c) => ({
        id: c.id,
        articleId: c.articleId,
        author: c.author,
        content: c.content,
        createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : String(c.createdAt),
      }));
    } catch (err) {
      console.error("Prisma getCommentsByArticleSlug failed:", err);
      return [];
    }
  }
);
