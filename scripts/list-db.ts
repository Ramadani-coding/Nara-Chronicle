import { prisma } from "../src/lib/prisma";

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, number: true, slug: true, title: true, category: true, publishedAt: true },
    orderBy: { publishedAt: "desc" }
  });
  console.log("TOTAL_ARTICLES:", articles.length);
  for (const a of articles) {
    console.log(`- [${a.number || "no-num"}] ${a.slug} (${a.category}) - ${a.publishedAt.toISOString()}`);
  }
}

main().finally(() => prisma.$disconnect());
