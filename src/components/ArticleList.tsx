"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Article, CATEGORIES, CategoryType } from "@/data/mockArticles";
import { SearchIcon, XIcon } from "./Icons";

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
  const [searchQuery, setSearchQuery] = useState("");
  const currentCategoryInfo = CATEGORIES.find((c) => c.id === activeCategory);

  // Filter articles by search query
  const displayedArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const q = searchQuery.toLowerCase().trim();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q) ||
        (a.number && a.number.toLowerCase().includes(q))
    );
  }, [articles, searchQuery]);

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      {/* 1. Header, Search Bar, and Category Filter Tabs */}
      <div className="space-y-4 border-b border-[#eae5d9] pb-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Catatan & Esai Terkini
          </h3>
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#78716c]">
            {displayedArticles.length} ENTRI DITEMUKAN
          </span>
        </div>

        {/* Minimal Editorial Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik atau kata kunci catatan..."
            className="w-full bg-[#fdfcf9] border border-[#e5dfd3] focus:border-[#1c1917] rounded-xl pl-10 pr-10 py-2.5 text-base sm:text-sm font-sans placeholder-[#a8a29e] text-[#1c1917] outline-none transition-all shadow-sm"
          />
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a8a29e] pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-[#a8a29e] hover:text-[#1c1917] hover:bg-[#eae5d9] transition-colors"
              aria-label="Hapus pencarian"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
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

        {/* Category Description Banner or Search Active Indicator */}
        {searchQuery ? (
          <div className="flex items-center justify-between text-xs font-sans text-[#78716c] pt-1">
            <span>
              Menampilkan hasil untuk: &ldquo;<strong className="text-[#1c1917]">{searchQuery}</strong>&rdquo;
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="underline hover:text-[#1c1917] transition-colors"
            >
              Reset pencarian
            </button>
          </div>
        ) : (
          <p className="text-xs font-sans text-[#78716c] pt-1">
            {currentCategoryInfo?.description}
          </p>
        )}
      </div>

      {/* 2. List of articles */}
      {displayedArticles.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <p className="text-base font-serif text-[#1c1917]">
            {searchQuery
              ? `Tidak ada catatan yang cocok dengan "${searchQuery}".`
              : "Belum ada catatan pada kategori ini."}
          </p>
          <p className="text-xs font-sans text-[#78716c]">
            {searchQuery
              ? "Coba gunakan kata kunci lain atau cari di kategori Semua Catatan."
              : "Silakan pilih kategori lainnya."}
          </p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                onSelectCategory("ALL");
              }}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-sans font-semibold bg-[#1c1917] text-[#faf9f5] hover:bg-[#44403c] transition-colors min-h-[44px]"
            >
              Lihat Semua Catatan
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-[#eae5d9]">
          {displayedArticles.map((item) => (
            <article key={item.id} className="py-6 sm:py-8 group">
              <Link
                href={`/article/${item.slug}`}
                prefetch={true}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem("chronicle_scroll_pos", window.scrollY.toString());
                  }
                }}
                className="block"
              >
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
