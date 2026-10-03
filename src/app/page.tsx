"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleList } from "@/components/ArticleList";
import { Footer } from "@/components/Footer";
import { AboutModal } from "@/components/AboutModal";
import { MOCK_ARTICLES, CategoryType } from "@/data/mockArticles";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"ALL" | CategoryType>("ALL");
  const [aboutOpen, setAboutOpen] = useState(false);

  // Filter articles by category
  const filteredArticles = useMemo(() => {
    if (activeTab === "ALL") return MOCK_ARTICLES;
    return MOCK_ARTICLES.filter((a) => a.category === activeTab);
  }, [activeTab]);

  const featured = useMemo(() => {
    return MOCK_ARTICLES.find((a) => a.isFeatured) || MOCK_ARTICLES[0];
  }, []);

  // For the list, if tab is ALL, exclude featured from list to prevent duplicate display
  const listArticles = useMemo(() => {
    if (activeTab === "ALL") {
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

        {/* 3. Featured Article (shown on ALL or when active category is ARSITEKTUR_SISTEM) */}
        {(activeTab === "ALL" || activeTab === featured.category) && (
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
}
