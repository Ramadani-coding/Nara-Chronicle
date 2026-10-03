"use client";

import React, { useState } from "react";
import { Info, ExternalLink, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenAbout: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAbout,
  onHomeClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-[#eae5d9] bg-[#faf9f5]/90 backdrop-blur-sm sticky top-0 z-40 transition-all">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 py-4">
        {/* Brand */}
        <button
          onClick={onHomeClick}
          className="group flex items-baseline gap-2 text-left"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917] group-hover:text-[#44403c] transition-colors">
            Nara Chronicle
          </span>
        </button>

        {/* Desktop Quick Nav */}
        <nav className="hidden sm:flex items-center gap-6 text-xs font-sans font-medium text-[#78716c]">
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 py-1.5 hover:text-[#1c1917] transition-colors"
          >
            <Info className="h-3.5 w-3.5" />
            <span>Tentang</span>
          </button>
          <a
            href="https://github.com/Ramadani-coding"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-1.5 hover:text-[#1c1917] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-[#1c1917] hover:bg-[#eae5d9] transition-colors"
            aria-label="Menu navigasi"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#eae5d9] bg-[#f5f3ec] px-4 py-3 animate-fadeIn flex flex-col gap-2 text-xs font-sans text-[#78716c]">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
            className="w-full text-left py-2.5 px-3 min-h-[44px] flex items-center gap-2 hover:bg-[#eae5d9] rounded-lg font-medium text-[#1c1917]"
          >
            <Info className="h-4 w-4" />
            <span>Tentang Nara Chronicle</span>
          </button>
          <a
            href="https://github.com/Ramadani-coding"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-left py-2.5 px-3 min-h-[44px] flex items-center gap-2 hover:bg-[#eae5d9] rounded-lg font-medium text-[#1c1917]"
          >
            <ExternalLink className="h-4 w-4" />
            <span>GitHub Repositori</span>
          </a>
        </div>
      )}
    </header>
  );
};
