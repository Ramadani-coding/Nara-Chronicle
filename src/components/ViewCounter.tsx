"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { EyeIcon } from "./Icons";

interface ViewCounterProps {
  slug: string;
  initialViews?: number;
  trackView?: boolean;
  className?: string;
}

export const ViewCounter: React.FC<ViewCounterProps> = ({
  slug,
  initialViews = 0,
  trackView = true,
  className = "inline-flex items-center gap-1.5 text-xs font-sans text-[#78716c]",
}) => {
  const [views, setViews] = useState<number>(initialViews);

  useEffect(() => {
    let isMounted = true;

    async function handleViewTracking() {
      if (typeof window === "undefined") return;

      const sessionKey = `chronicle_view_${slug}`;
      const hasViewed = sessionStorage.getItem(sessionKey) === "true";

      if (trackView && !hasViewed) {
        // Mark session first to prevent rapid duplicate calls
        sessionStorage.setItem(sessionKey, "true");

        try {
          const { data, error } = await supabase.rpc("increment_article_views", {
            article_slug: slug,
          });

          if (!error && typeof data === "number" && isMounted) {
            setViews(data);
          }
        } catch (err) {
          console.error("Failed to increment views:", err);
        }
      } else {
        // Fetch fresh view count without incrementing
        try {
          const { data, error } = await supabase
            .from("Article")
            .select("views")
            .eq("slug", slug)
            .single();

          if (!error && data && typeof data.views === "number" && isMounted) {
            setViews(data.views);
          }
        } catch (err) {
          console.error("Failed to fetch views:", err);
        }
      }
    }

    handleViewTracking();

    return () => {
      isMounted = false;
    };
  }, [slug, trackView]);

  return (
    <span className={className} title={`Dibaca sebanyak ${views} kali`}>
      <EyeIcon className="h-3.5 w-3.5 text-[#a8a29e]" />
      <span>{views} dibaca</span>
    </span>
  );
};
