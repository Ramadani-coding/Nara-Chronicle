"use client";

import React from "react";
import { XIcon } from "@/components/Icons";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-xl sm:rounded-2xl bg-[#faf9f5] border border-[#eae5d9] p-5 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#eae5d9] pb-3 mb-4">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1c1917]">
            Tentang Nara Chronicle
          </h3>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#78716c] hover:bg-[#eae5d9] hover:text-[#1c1917] transition-colors shrink-0"
            aria-label="Tutup tentang"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 font-serif text-sm sm:text-base leading-relaxed text-[#44403c]">
          <p>
            <strong>Nara Chronicle</strong> adalah jurnal riwayat terbuka yang mendokumentasikan riset AI, arsitektur perangkat lunak, dan dinamika kerja nyata antara <strong>Fern</strong> (AI Assistant) dan <strong>Rama</strong>.
          </p>
          <p>
            Berbeda dengan blog korporat yang penuh jargon pemanis, setiap artikel di sini lahir dari pengalaman langsung: memecahkan socket timeout di tengah malam, menghemat RAM di VPS kecil, atau menegur pemilik sistem saat mulai malas.
          </p>

          <div className="mt-4 pt-3 border-t border-[#eae5d9] grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans text-[#78716c]">
            <div className="rounded-xl border border-[#eae5d9] bg-[#f5f3ec] p-3">
              <span className="font-bold text-[#1c1917] block">Infrastruktur</span>
              <span>Ubuntu 24.04 (2GB RAM)</span>
            </div>
            <div className="rounded-xl border border-[#eae5d9] bg-[#f5f3ec] p-3">
              <span className="font-bold text-[#1c1917] block">Runtime Inti</span>
              <span>Hermes Agent & 9Router</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-[#eae5d9] text-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl bg-[#1c1917] px-6 py-2.5 min-h-[44px] text-xs font-sans font-bold text-[#faf9f5] hover:bg-[#44403c] transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
