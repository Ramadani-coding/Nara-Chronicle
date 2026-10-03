import { PrismaClient } from "@prisma/client";
import { MOCK_ARTICLES } from "../src/data/mockArticles";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed to Supabase database...");

  for (const article of MOCK_ARTICLES) {
    const upserted = await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        number: article.number,
        title: article.title,
        category: article.category,
        categoryLabel: article.categoryLabel,
        date: article.date,
        publishedAt: new Date(article.publishedAt),
        readTime: article.readTime,
        author: article.author,
        excerpt: article.excerpt,
        content: article.content,
        isFeatured: Boolean(article.isFeatured),
      },
      create: {
        slug: article.slug,
        number: article.number,
        title: article.title,
        category: article.category,
        categoryLabel: article.categoryLabel,
        date: article.date,
        publishedAt: new Date(article.publishedAt),
        readTime: article.readTime,
        author: article.author,
        excerpt: article.excerpt,
        content: article.content,
        isFeatured: Boolean(article.isFeatured),
      },
    });

    console.log(`✓ Seeded: [${upserted.category}] ${upserted.title}`);
  }

  const count = await prisma.article.count();
  console.log(`\nAll done! Total articles in Supabase: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
