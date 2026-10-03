"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CommentItem } from "@/lib/articles";
import { MessageSquareIcon, SendIcon, UserIcon } from "./Icons";

interface CommentSectionProps {
  articleSlug: string;
  articleId: string;
  initialComments: CommentItem[];
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  articleSlug,
  articleId,
  initialComments,
}) => {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load saved author name from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuthor = localStorage.getItem("chronicle_comment_author");
      if (savedAuthor) setAuthor(savedAuthor);
    }
  }, []);

  // Subscribe to Supabase Realtime INSERT on Comment table for this article
  useEffect(() => {
    const channel = supabase
      .channel(`article-${articleId}-realtime-comments`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Comment",
          filter: `articleId=eq.${articleId}`,
        },
        (payload) => {
          if (payload.new) {
            const incoming = payload.new as any;
            setComments((prev) => {
              if (prev.some((c) => c.id === incoming.id)) return prev;
              return [
                {
                  id: incoming.id,
                  articleId: incoming.articleId,
                  author: incoming.author,
                  content: incoming.content,
                  createdAt: incoming.createdAt,
                },
                ...prev,
              ];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setErrorMsg("Pesan tidak boleh kosong.");
      return;
    }
    if (trimmedContent.length < 2) {
      setErrorMsg("Pesan minimal 2 karakter.");
      return;
    }
    if (trimmedContent.length > 1000) {
      setErrorMsg("Pesan maksimal 1000 karakter.");
      return;
    }

    setIsSubmitting(true);

    const trimmedAuthor = author.trim() || "Anonim";
    if (typeof window !== "undefined" && author.trim()) {
      localStorage.setItem("chronicle_comment_author", author.trim());
    }

    try {
      const { data, error } = await supabase.rpc("add_article_comment", {
        p_article_slug: articleSlug,
        p_author: trimmedAuthor,
        p_content: trimmedContent,
      });

      if (error) {
        console.error("Failed to add comment:", error);
        setErrorMsg(error.message || "Gagal mengirim respon. Silakan coba lagi.");
      } else if (data) {
        setContent("");
        setSuccessMsg("Catatanmu berhasil terkirim.");
        setTimeout(() => setSuccessMsg(""), 3500);

        // Optimistically prepend if not already delivered by Realtime
        setComments((prev) => {
          if (prev.some((c) => c.id === data.id)) return prev;
          return [data, ...prev];
        });
      }
    } catch (err: any) {
      console.error("Error submitting comment:", err);
      setErrorMsg("Terjadi kendala teknis saat mengirim.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      // Normalize timestamp: if lacking timezone suffix (no 'Z' and no offset), treat as UTC
      let normalized = dateString;
      if (normalized && !normalized.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(normalized)) {
        normalized += "Z";
      }
      const d = new Date(normalized);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    } catch {
      return dateString;
    }
  };

  return (
    <section className="mt-16 pt-10 border-t border-[#eae5d9]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-serif text-2xl font-bold text-[#1c1917] flex items-center gap-2">
          <MessageSquareIcon className="h-5 w-5 text-[#78716c]" />
          <span>Respon & Catatan</span>
        </h3>
        <span className="text-xs font-sans text-[#78716c]">
          {comments.length} pesan
        </span>
      </div>
      <p className="text-xs font-sans text-[#78716c] mb-6">
        Tinggalkan jejak, sanggahan, atau tanggapan santai tanpa perlu login akun.
      </p>

      {/* Guestbook Form */}
      <form onSubmit={handleSubmit} className="mb-10 space-y-3 bg-[#f7f5ed]/60 p-4 sm:p-5 rounded-2xl border border-[#eae5d9]">
        <div>
          <label htmlFor="author-input" className="block text-xs font-sans font-medium text-[#57534e] mb-1">
            Nama atau Panggilan (opsional)
          </label>
          <input
            id="author-input"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Anonim"
            maxLength={50}
            className="w-full bg-[#fdfcf9] border border-[#e5dfd3] focus:border-[#1c1917] rounded-xl px-3.5 py-2 text-base sm:text-sm font-sans placeholder-[#a8a29e] text-[#1c1917] outline-none transition-colors min-h-[44px]"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="content-input" className="block text-xs font-sans font-medium text-[#57534e]">
              Tanggapanmu
            </label>
            <span className="text-[11px] font-sans text-[#a8a29e]">
              {content.length}/1000
            </span>
          </div>
          <textarea
            id="content-input"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis pendapat atau pertanyaanmu secara santai di sini..."
            maxLength={1000}
            className="w-full bg-[#fdfcf9] border border-[#e5dfd3] focus:border-[#1c1917] rounded-xl p-3 text-base sm:text-sm font-sans placeholder-[#a8a29e] text-[#1c1917] outline-none transition-colors resize-y min-h-[90px]"
          />
        </div>

        {errorMsg && (
          <p className="text-xs font-sans text-rose-600 font-medium">
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="text-xs font-sans text-emerald-700 font-medium">
            {successMsg}
          </p>
        )}

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1c1917] text-[#faf9f5] px-5 py-2.5 text-xs font-sans font-semibold transition-all hover:bg-[#44403c] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          >
            <SendIcon className="h-3.5 w-3.5" />
            <span>{isSubmitting ? "Mengirim..." : "Kirim Catatan"}</span>
          </button>
        </div>
      </form>

      {/* List of Comments */}
      {comments.length === 0 ? (
        <div className="py-10 text-center rounded-2xl border border-dashed border-[#e5dfd3] bg-[#faf9f5]">
          <p className="text-sm font-serif text-[#78716c]">
            Belum ada catatan pembaca di sini.
          </p>
          <p className="text-xs font-sans text-[#a8a29e] mt-1">
            Jadilah yang pertama meninggalkan respon untuk esai ini.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl border border-[#eae5d9] bg-[#fdfcf9] shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-sans text-[#78716c]">
                <div className="flex items-center gap-1.5 font-bold text-[#1c1917]">
                  <UserIcon className="h-3.5 w-3.5 text-[#a8a29e]" />
                  <span>{item.author}</span>
                </div>
                <time className="text-[11px] text-[#a8a29e]">
                  {formatDate(item.createdAt)}
                </time>
              </div>
              <p className="text-sm sm:text-base font-serif text-[#44403c] leading-relaxed whitespace-pre-wrap break-words">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
