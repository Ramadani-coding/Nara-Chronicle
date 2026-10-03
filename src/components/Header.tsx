"use client";

import React, { useState } from "react";
import { Menu, X, Info, ExternalLink } from "lucide-react";
import { CATEGORIES, CategoryType } from "@/data/mockArticles";

interface HeaderProps {
  activeTab: "ALL" | CategoryType;
  setActiveTab: (tab: "ALL" | CategoryType) => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAbout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectTab = (tabId: "ALL" | CategoryType) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-[#eae5d9] bg-[#faf9f5]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Navbar */}
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleSelectTab("ALL")}
            className="text-left group"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917] group-hover:text-[#44403c] transition-colors">
                Nara Chronicle
              </span>
              <span className="hidden md:inline-block text-[10px] font-sans font-semibold uppercase tracking-widest text-[#78716c]">
                Jurnal AI & Manusia
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Quick Nav */}
        <nav className="hidden sm:flex items-center gap-5 text-xs font-sans font-medium text-[#78716c]">
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 py-2 px-1 hover:text-[#1c1917] transition-colors"
          >
            <Info className="h-3.5 w-3.5" />
            <span>Tentang</span>
          </button>
          <a
            href="https://github.com/Ramadani-coding"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-2 px-1 hover:text-[#1c1917] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button (min 44x44px target) */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-[#1c1917] hover:bg-[#eae5d9] active:bg-[#e2ddd0] transition-colors"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#eae5d9] bg-[#f5f3ec] px-4 py-4 space-y-3 animate-fadeIn">
          <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#78716c]">
            Navigasi Kategori
          </p>
          <div className="grid grid-cols-1 gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectTab(cat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-sans transition-colors min-h-[44px] flex items-center justify-between ${
                  activeTab === cat.id
                    ? "bg-[#1c1917] text-[#faf9f5] font-semibold"
                    : "text-[#44403c] hover:bg-[#eae5d9]"
                }`}
              >
                <span>{cat.label}</span>
                {activeTab === cat.id && <span className="text-xs">●</span>}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#eae5d9] flex items-center justify-between text-xs font-sans text-[#78716c]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="py-2.5 px-3 min-h-[44px] flex items-center gap-1.5 font-medium hover:text-[#1c1917]"
            >
              <Info className="h-4 w-4" />
              <span>Tentang Kami</span>
            </button>
            <a
              href="https://github.com/Ramadani-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 min-h-[44px] flex items-center gap-1.5 font-medium hover:text-[#1c1917]"
            >
              <ExternalLink className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}

      {/* Category Pills Bar (Horizontal scroll on mobile, touch friendly) */}
      <div className="border-t border-[#eae5d9]/60 bg-[#faf9f5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all min-h-[36px] flex items-center shrink-0 ${
                    isActive
                      ? "bg-[#1c1917] text-[#faf9f5] font-bold shadow-sm"
                      : "bg-[#f0ece1] text-[#57534e] hover:bg-[#e5dfd2] hover:text-[#1c1917]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
