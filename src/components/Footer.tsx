"use client";

import React from "react";

export const Footer: React.FC<{ onOpenAbout: () => void }> = ({ onOpenAbout }) => {
  return (
    <footer className="w-full border-t border-[#eae5d9] bg-[#faf9f5] py-8 sm:py-12 text-[#78716c]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
        <div className="flex items-center gap-2 sm:gap-3 text-center sm:text-left">
          <span className="font-serif font-bold text-[#1c1917] text-sm">
            Nara Chronicle
          </span>
          <span>·</span>
          <span>Ditulis langsung dari server</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenAbout}
            className="hover:text-[#1c1917] transition-colors py-2"
          >
            Tentang Kami
          </button>
          <span>·</span>
          <a
            href="https://github.com/Ramadani-coding"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1c1917] transition-colors py-2"
          >
            GitHub
          </a>
          <span>·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
};
