import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getArticles, getRelatedArticles } from "@/lib/articles";
import { UserIcon } from "@/components/Icons";
import { ShareButton } from "@/components/ShareButton";
import { BackButton } from "@/components/BackButton";

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Catatan Tidak Ditemukan — Nara Chronicle" };

  return {
    title: `${article.title} — Nara Chronicle`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Related articles (fast targeted query, no heavy content payload)
  const relatedArticles = await getRelatedArticles(article.id, article.category);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-[#1c1917] selection:bg-[#eae5d9]">
      {/* 1. Detail Page Minimal Sticky Header */}
      <header className="w-full border-b border-[#eae5d9] bg-[#faf9f5]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6 py-4">
          <BackButton />

          <Link href="/" prefetch={true} className="font-serif text-lg font-bold tracking-tight text-[#1c1917]">
            Nara Chronicle
          </Link>
        </div>
      </header>

      {/* 2. Main Article Content Container */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <article className="space-y-6 sm:space-y-8">
          {/* Category & Date Masthead */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-sans text-[#78716c] border-b border-[#eae5d9] pb-4">
            <span className="font-bold text-[#1c1917] tracking-wider text-[11px] uppercase bg-[#f0ece1] px-2.5 py-1 rounded">
              {article.categoryLabel}
            </span>
            <span>·</span>
            <time dateTime={article.date}>{article.date}</time>
            <span>·</span>
            <span className="flex items-center gap-1">
              <UserIcon className="h-3.5 w-3.5" />
              Oleh {article.author}
            </span>
          </div>

          {/* Headline Title */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight text-[#1c1917]">
            {article.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="font-serif text-lg sm:text-xl leading-relaxed text-[#57534e] italic border-l-2 border-[#1c1917] pl-4 sm:pl-6 my-6">
            {article.excerpt}
          </p>

          <div className="border-t border-[#eae5d9]" />

          {/* Full Article Body */}
          <div className="font-serif text-base sm:text-lg leading-relaxed text-[#292524] space-y-5 pt-2">
            {article.content.split("\n\n").map((para, idx) => {
              if (para.startsWith("### ")) {
                return (
                  <h2
                    key={idx}
                    className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] pt-6 pb-1"
                  >
                    {para.replace("### ", "")}
                  </h2>
                );
              }
              if (para.startsWith("1. ") || para.startsWith("- ")) {
                return (
                  <div key={idx} className="pl-4 border-l border-[#d6d3d1] space-y-1 text-base text-[#44403c]">
                    {para.split("\n").map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                );
              }
              return (
                <p key={idx} className="text-justify sm:text-left">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Actions & Colophon */}
          <div className="mt-12 pt-8 border-t border-[#eae5d9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-sans text-[#78716c] text-center sm:text-left">
              Ditulis langsung oleh Fern.
            </p>
            <ShareButton />
          </div>
        </article>

        {/* 3. Related / Next Reading Section */}
        <section className="mt-16 pt-10 border-t border-[#eae5d9]">
          <h3 className="font-serif text-xl font-bold text-[#1c1917] mb-6">
            Catatan Lainnya
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.slug}`}
                prefetch={true}
                className="group p-5 rounded-xl border border-[#eae5d9] bg-[#fdfcf9] hover:border-[#1c1917] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-sans text-[#78716c] mb-2 uppercase tracking-wider">
                    <span>{item.categoryLabel}</span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#1c1917] group-hover:text-[#44403c] transition-colors leading-snug">
                    {item.title}
                  </h4>
                </div>
                <span className="text-xs font-sans font-semibold text-[#1c1917] mt-4 inline-flex items-center gap-1 group-hover:underline">
                  Baca catatan →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="w-full border-t border-[#eae5d9] bg-[#faf9f5] py-8 text-[#78716c]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#1c1917]">Nara Chronicle</span>
            <span>·</span>
            <span>Jurnal Terbuka 2026</span>
          </div>
          <Link href="/" prefetch={true} className="hover:text-[#1c1917] transition-colors">
            Kembali ke Beranda
          </Link>
        </div>
      </footer>
    </div>
  );
}
