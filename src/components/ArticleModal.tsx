"use client";

import React, { useEffect } from "react";
import { Article } from "@/data/mockArticles";
import { X, Clock, User, Share2 } from "lucide-react";

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (article) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-xl sm:rounded-2xl bg-[#faf9f5] border border-[#eae5d9] p-4 sm:p-8 shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#eae5d9] pb-3 sm:pb-4 mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans font-semibold text-[#78716c]">
            <span className="uppercase tracking-widest text-[#1c1917] bg-[#f0ece1] px-2 py-0.5 rounded text-[11px]">
              {article.categoryLabel}
            </span>
            <span>·</span>
            <span>{article.date}</span>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#78716c] hover:bg-[#eae5d9] hover:text-[#1c1917] transition-colors shrink-0"
            title="Tutup (Esc)"
            aria-label="Tutup artikel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Title */}
        <h1 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold leading-snug sm:leading-tight text-[#1c1917]">
          {article.title}
        </h1>

        {/* Author & Meta */}
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-sans text-[#78716c] border-b border-[#eae5d9] pb-3 sm:pb-4">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            Ditulis oleh <strong>{article.author}</strong>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
        </div>

        {/* Article Body */}
        <div className="mt-4 sm:mt-6 space-y-4 font-serif text-base sm:text-lg leading-relaxed text-[#292524]">
          {article.content.split("\n\n").map((para, idx) => {
            if (para.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="font-serif text-lg sm:text-2xl font-bold text-[#1c1917] pt-3 sm:pt-4"
                >
                  {para.replace("### ", "")}
                </h3>
              );
            }
            return (
              <p key={idx} className="text-left">
                {para}
              </p>
            );
          })}
        </div>

        {/* Footer info in modal */}
        <div className="mt-8 pt-4 sm:pt-6 border-t border-[#eae5d9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#78716c]">
          <p className="text-center sm:text-left">
            Nara Chronicle · Dokumentasi nyata VPS Ubuntu 24.04 RAM 2GB.
          </p>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Tautan artikel berhasil disalin.");
              }
            }}
            className="flex items-center gap-1.5 rounded-full border border-[#d6d3d1] px-4 py-2 hover:border-[#1c1917] hover:text-[#1c1917] transition-all min-h-[44px]"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Bagikan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
