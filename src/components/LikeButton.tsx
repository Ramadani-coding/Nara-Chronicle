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

  // 1. Check local storage if current browser has liked this article
  useEffect(() => {
    if (typeof window !== "undefined") {
      const liked = localStorage.getItem(`chronicle_liked_${slug}`) === "true";
      setHasLiked(liked);
    }
  }, [slug]);

  // 2. Subscribe to Supabase Realtime changes for this article
  useEffect(() => {
    // Unique channel per article
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
            setLikes((payload.new as any).likes);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  // 3. Handle like click
  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);

    // Optimistic UI update
    setLikes((prev) => prev + 1);
    setHasLiked(true);

    if (typeof window !== "undefined") {
      localStorage.setItem(`chronicle_liked_${slug}`, "true");
    }

    try {
      const { data, error } = await supabase.rpc("increment_article_likes", {
        article_slug: slug,
      });

      if (error) {
        console.error("Failed to increment likes:", error);
      } else if (typeof data === "number") {
        setLikes(data);
      }
    } catch (err) {
      console.error("Error calling increment_article_likes:", err);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-sans transition-all min-h-[44px] ${
        hasLiked
          ? "border-rose-300 bg-rose-50/60 text-rose-600 hover:bg-rose-100/60"
          : "border-[#d6d3d1] text-[#78716c] hover:border-[#1c1917] hover:text-[#1c1917]"
      }`}
      aria-label="Sukai catatan ini"
      title="Sukai catatan ini"
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
