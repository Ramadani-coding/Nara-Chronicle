"use client";

import React from "react";
import Link from "next/link";
import { Article, CATEGORIES, CategoryType } from "@/data/mockArticles";

interface ArticleListProps {
  articles: Article[];
  activeCategory: "ALL" | CategoryType;
  onSelectCategory: (cat: "ALL" | CategoryType) => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  activeCategory,
  onSelectCategory,
}) => {
  const currentCategoryInfo = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      {/* 1. Header and Category Filter Tabs */}
      <div className="space-y-4 border-b border-[#eae5d9] pb-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Catatan & Esai Terkini
          </h3>
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#78716c]">
            {articles.length} ENTRI DITEMUKAN
          </span>
        </div>

        {/* In-page Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-sans transition-all min-h-[40px] flex items-center shrink-0 ${
                  isActive
                    ? "bg-[#1c1917] text-[#faf9f5] font-bold shadow-sm"
                    : "bg-[#f5f3ec] text-[#57534e] hover:bg-[#eae5d9] hover:text-[#1c1917] font-medium"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <p className="text-xs font-sans text-[#78716c] pt-1">
          {currentCategoryInfo?.description}
        </p>
      </div>

      {/* 2. List of articles */}
      {articles.length === 0 ? (
        <div className="py-16 text-center text-sm font-sans text-[#78716c]">
          Belum ada catatan pada kategori ini.
        </div>
      ) : (
        <div className="divide-y divide-[#eae5d9]">
          {articles.map((item) => (
            <article key={item.id} className="py-6 sm:py-8 group">
              <Link href={`/article/${item.slug}`} prefetch={true} className="block">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-[#78716c]">
                    <time dateTime={item.date}>{item.date}</time>
                    <span>·</span>
                    <span className="font-bold text-[#1c1917] tracking-wider text-[10px] uppercase bg-[#f0ece1] px-2 py-0.5 rounded">
                      {item.categoryLabel}
                    </span>
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
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
