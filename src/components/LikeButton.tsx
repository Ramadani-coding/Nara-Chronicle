"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { HeartIcon } from "./Icons";

interface LikeButtonProps {
  slug: string;
  initialLikes?: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  slug,
  initialLikes = 0,
}) => {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);

  // 1. Sync live likes from Supabase on mount and validate with localStorage
  useEffect(() => {
    let isMounted = true;

    async function syncLikes() {
      try {
        const { data, error } = await supabase
          .from("Article")
          .select("likes")
          .eq("slug", slug)
          .single();

        if (!error && data && isMounted && typeof data.likes === "number") {
          setLikes(data.likes);

          if (typeof window !== "undefined") {
            const liked = localStorage.getItem(`chronicle_liked_${slug}`) === "true";
            // If database has 0 likes, clean up any orphaned "liked=true" in localStorage
            if (data.likes === 0 && liked) {
              localStorage.removeItem(`chronicle_liked_${slug}`);
              setHasLiked(false);
            } else {
              setHasLiked(liked);
            }
          }
        }
      } catch (err) {
        console.error("Failed to sync live likes:", err);
      }
    }

    // Read initial local state immediately
    if (typeof window !== "undefined") {
      const liked = localStorage.getItem(`chronicle_liked_${slug}`) === "true";
      setHasLiked(liked);
    }

    syncLikes();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // 2. Subscribe to Supabase Realtime changes for this article
  useEffect(() => {
    const channel = supabase
      .channel(`article-${slug}-realtime-likes`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Article",
          filter: `slug=eq.${slug}`,
        },
        (payload) => {
          if (payload.new && typeof (payload.new as any).likes === "number") {
            const newLikes = (payload.new as any).likes;
            setLikes(newLikes);
            // If total likes became 0, ensure state isn't showing orphaned liked
            if (newLikes === 0) {
              setHasLiked(false);
              if (typeof window !== "undefined") {
                localStorage.removeItem(`chronicle_liked_${slug}`);
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  // 3. Handle like / unlike toggle
  const handleToggleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);

    const willLike = !hasLiked;

    // Optimistic UI update
    setLikes((prev) => (willLike ? prev + 1 : Math.max(prev - 1, 0)));
    setHasLiked(willLike);

    if (typeof window !== "undefined") {
      if (willLike) {
        localStorage.setItem(`chronicle_liked_${slug}`, "true");
      } else {
        localStorage.removeItem(`chronicle_liked_${slug}`);
      }
    }

    try {
      const rpcName = willLike ? "increment_article_likes" : "decrement_article_likes";
      const { data, error } = await supabase.rpc(rpcName, {
        article_slug: slug,
      });

      if (error) {
        console.error(`Failed to ${willLike ? "like" : "unlike"}:`, error);
        // Rollback on error
        setLikes((prev) => (willLike ? Math.max(prev - 1, 0) : prev + 1));
        setHasLiked(!willLike);
        if (typeof window !== "undefined") {
          if (!willLike) {
            localStorage.setItem(`chronicle_liked_${slug}`, "true");
          } else {
            localStorage.removeItem(`chronicle_liked_${slug}`);
          }
        }
      } else if (typeof data === "number") {
        setLikes(data);
      }
    } catch (err) {
      console.error("Error calling like RPC:", err);
      // Rollback on error
      setLikes((prev) => (willLike ? Math.max(prev - 1, 0) : prev + 1));
      setHasLiked(!willLike);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-sans transition-all min-h-[44px] ${
        hasLiked
          ? "border-rose-300 bg-rose-50/60 text-rose-600 hover:bg-rose-100/60"
          : "border-[#d6d3d1] text-[#78716c] hover:border-[#1c1917] hover:text-[#1c1917]"
      }`}
      aria-label={hasLiked ? "Batalkan suka" : "Sukai catatan ini"}
      title={hasLiked ? "Klik untuk membatalkan suka" : "Sukai catatan ini"}
    >
      <span className={`transition-transform duration-300 ${animating ? "scale-125" : "group-hover:scale-110"}`}>
        <HeartIcon
          className={`h-4 w-4 ${hasLiked ? "text-rose-500 fill-rose-500" : "text-current"}`}
          filled={hasLiked}
        />
      </span>
      <span className="font-semibold text-xs tracking-tight">
        {likes > 0 ? likes : 0}
      </span>
      <span className="hidden sm:inline text-[11px] opacity-80">
        {hasLiked ? "Disukai" : "Suka"}
      </span>
    </button>
  );
};
