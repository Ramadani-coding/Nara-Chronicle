"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleList } from "@/components/ArticleList";
import { Footer } from "@/components/Footer";
import { AboutModal } from "@/components/AboutModal";
import { Article, CategoryType } from "@/data/mockArticles";

interface ChronicleHomeProps {
  initialArticles: Article[];
}

export const ChronicleHome: React.FC<ChronicleHomeProps> = ({
  initialArticles,
}) => {
  const [activeTab, setActiveTab] = useState<"ALL" | CategoryType>("ALL");
  const [aboutOpen, setAboutOpen] = useState(false);

  // Filter articles by category and sort newest first
  const filteredArticles = useMemo(() => {
    const list =
      activeTab === "ALL"
        ? initialArticles
        : initialArticles.filter((a) => a.category === activeTab);

    return [...list].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [activeTab, initialArticles]);

  // Featured article is the newest one or explicitly marked
  const featured = useMemo(() => {
    return filteredArticles.find((a) => a.isFeatured) || filteredArticles[0] || initialArticles[0];
  }, [filteredArticles, initialArticles]);

  // For the list, if tab is ALL, exclude featured from list to prevent duplicate display
  const listArticles = useMemo(() => {
    if (activeTab === "ALL" && featured) {
      return filteredArticles.filter((a) => a.id !== featured.id);
    }
    return filteredArticles;
  }, [filteredArticles, activeTab, featured]);

  const scrollToArticles = () => {
    const el = document.getElementById("articles-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-[#1c1917] selection:bg-[#eae5d9]">
      {/* 1. Clean Minimal Header */}
      <Header
        onOpenAbout={() => setAboutOpen(true)}
        onHomeClick={() => setActiveTab("ALL")}
      />

      <main className="flex-1 w-full overflow-hidden">
        {/* 2. Hero Section with Curiosity Hook */}
        <HeroSection onExplore={scrollToArticles} />

        {/* 3. Featured Article (shown on ALL or when active category matches) */}
        {featured && (activeTab === "ALL" || activeTab === featured.category) && (
          <FeaturedArticle article={featured} />
        )}

        {/* 4. Article List with In-Page Category Filter Tabs & Direct Detail Links */}
        <div id="articles-section">
          <ArticleList
            articles={listArticles}
            activeCategory={activeTab}
            onSelectCategory={(cat) => setActiveTab(cat)}
          />
        </div>
      </main>

      {/* 5. Footer */}
      <Footer onOpenAbout={() => setAboutOpen(true)} />

      {/* 6. About Modal */}
      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />
    </div>
  );
};
