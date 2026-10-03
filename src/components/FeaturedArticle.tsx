import React from "react";
import Link from "next/link";
import { Article } from "@/data/mockArticles";
import { isRecentArticle } from "@/lib/articles";
import { ArrowRightIcon, EyeIcon } from "@/components/Icons";

interface FeaturedArticleProps {
  article: Article;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-12 border-b border-[#eae5d9]">
      <div className="space-y-3 sm:space-y-4">
        {/* Label Overline */}
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-widest text-[#78716c]">
          <span>FEATURED</span>
          <span>·</span>
          <span>CHRONICLE {article.number || "№01"}</span>
          {isRecentArticle(article.publishedAt) && (
            <>
              <span>·</span>
              <span className="bg-[#1c1917] text-[#faf9f5] px-2 py-0.5 rounded text-[10px] tracking-wider font-semibold">
                Baru
              </span>
            </>
          )}
        </div>

        {/* Headline */}
        <Link
          href={`/article/${article.slug}`}
          prefetch={true}
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.setItem("chronicle_scroll_pos", window.scrollY.toString());
            }
          }}
          className="block group"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold leading-snug sm:leading-tight text-[#1c1917] group-hover:text-[#44403c] transition-colors">
            {article.title}
          </h2>
        </Link>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-sans text-[#78716c] pt-1">
          <time dateTime={article.date}>{article.date}</time>
          <span>·</span>
          <span className="font-semibold text-[#1c1917] bg-[#f0ece1] px-2 py-0.5 rounded text-[11px]">
            {article.categoryLabel}
          </span>
          <span>·</span>
          <span>Oleh {article.author}</span>
          {typeof article.views === "number" && article.views > 0 && (
            <>
              <span>·</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#78716c]">
                <EyeIcon className="h-3 w-3 text-[#a8a29e]" />
                <span>{article.views} dibaca</span>
              </span>
            </>
          )}
        </div>

        {/* Excerpt Body */}
        <p className="font-serif text-base sm:text-lg leading-relaxed text-[#44403c] pt-1 sm:pt-2 max-w-3xl">
          {article.excerpt}
        </p>

        {/* Read Link */}
        <div className="pt-3 sm:pt-4">
          <Link
            href={`/article/${article.slug}`}
            prefetch={true}
            onClick={() => {
              if (typeof window !== "undefined") {
                sessionStorage.setItem("chronicle_scroll_pos", window.scrollY.toString());
              }
            }}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold text-[#1c1917] hover:gap-3 min-h-[44px] py-2 transition-all"
          >
            <span>Baca catatan selengkapnya</span>
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
