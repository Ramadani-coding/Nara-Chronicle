"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleList } from "@/components/ArticleList";
import { Footer } from "@/components/Footer";
import { ArticleModal } from "@/components/ArticleModal";
import { AboutModal } from "@/components/AboutModal";
import { MOCK_ARTICLES, Article, CategoryType } from "@/data/mockArticles";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"ALL" | CategoryType>("ALL");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
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

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-[#1c1917] selection:bg-[#eae5d9]">
      {/* 1. Responsive Header Navigation with Category Tabs */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAbout={() => setAboutOpen(true)}
      />

      <main className="flex-1 w-full overflow-hidden">
        {/* 2. Featured Article (shown on ALL or when active category is ARSITEKTUR_SISTEM) */}
        {(activeTab === "ALL" || activeTab === featured.category) && (
          <FeaturedArticle
            article={featured}
            onRead={(art) => setSelectedArticle(art)}
          />
        )}

        {/* 3. Category Article List */}
        <ArticleList
          articles={listArticles}
          activeCategory={activeTab}
          onRead={(art) => setSelectedArticle(art)}
        />
      </main>

      {/* 4. Footer */}
      <Footer onOpenAbout={() => setAboutOpen(true)} />

      {/* 5. Fullscreen / Pop-up Reading Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* 6. About Modal */}
      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />
    </div>
  );
}
