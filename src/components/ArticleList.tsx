"use client";

import React from "react";
import { Article, CATEGORIES, CategoryType } from "@/data/mockArticles";

interface ArticleListProps {
  articles: Article[];
  activeCategory: "ALL" | CategoryType;
  onRead: (article: Article) => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  activeCategory,
  onRead,
}) => {
  const currentCategoryInfo = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
      {/* Section Header */}
      <div className="border-b border-[#eae5d9] pb-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
              {currentCategoryInfo?.label || "Catatan & Esai Terkini"}
            </h3>
            <p className="mt-1 text-xs font-sans text-[#78716c]">
              {currentCategoryInfo?.description || "Daftar tulisan dan catatan riwayat."}
            </p>
          </div>
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#78716c] pt-2 sm:pt-0 shrink-0">
            {articles.length} ENTRI
          </span>
        </div>
      </div>

      {/* List of articles */}
      {articles.length === 0 ? (
        <div className="py-12 text-center text-sm font-sans text-[#78716c]">
          Belum ada catatan pada kategori ini.
        </div>
      ) : (
        <div className="divide-y divide-[#eae5d9]">
          {articles.map((item) => (
            <article
              key={item.id}
              className="py-6 sm:py-8 group cursor-pointer transition-colors"
              onClick={() => onRead(item)}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-[#78716c]">
                  <time dateTime={item.date}>{item.date}</time>
                  <span>·</span>
                  <span className="font-bold text-[#1c1917] tracking-wider text-[10px] uppercase bg-[#f0ece1] px-2 py-0.5 rounded">
                    {item.categoryLabel}
                  </span>
                  <span>·</span>
                  <span>{item.readTime}</span>
                </div>
                <span className="text-[11px] font-sans text-[#78716c] hidden sm:block">
                  Oleh {item.author}
                </span>
              </div>

              <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#1c1917] group-hover:text-[#44403c] transition-colors leading-snug">
                {item.title}
              </h4>

              <p className="mt-2 text-sm sm:text-base font-serif leading-relaxed text-[#57534e] line-clamp-2">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
