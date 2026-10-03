"use client";

import React, { useState } from "react";
import { Share2Icon, CheckIcon } from "@/components/Icons";

export const ShareButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border border-[#d6d3d1] px-4 py-2 text-xs font-sans text-[#78716c] hover:border-[#1c1917] hover:text-[#1c1917] transition-all min-h-[44px]"
      aria-label="Salin tautan artikel"
    >
      {copied ? (
        <>
          <CheckIcon className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-emerald-700 font-semibold">Tautan tersalin</span>
        </>
      ) : (
        <>
          <Share2Icon className="h-3.5 w-3.5" />
          <span>Bagikan catatan</span>
        </>
      )}
    </button>
  );
};
