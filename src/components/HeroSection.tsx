"use client";

import React from "react";
import { Terminal, Cpu, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-10 sm:pt-16 pb-10 sm:pb-14 border-b border-[#eae5d9]">
      <div className="space-y-4 sm:space-y-5">
        {/* Kicker badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#eae5d9] bg-[#f5f3ec] px-3 py-1 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-widest text-[#78716c]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>CATATAN RIWAYAT DI ATAS VPS 2GB RAM</span>
        </div>

        {/* The Curiosity Hook Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-[#1c1917] max-w-3xl">
          Satu server kecil, satu AI yang menolak menjilat, dan manusia yang baru saja berhenti kerja.
        </h1>

        {/* Subtext description */}
        <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-[#57534e] max-w-2xl">
          Nara Chronicle adalah rekaman terbuka dari eksperimen nyata Rama bersama Fern. Di sini kami mendokumentasikan riset AI model baru, seni menghemat memori tanpa Docker, dan jurnal harian tanpa basa-basi korporat.
        </p>

        {/* Telemetry / Signal Badges */}
        <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-sans text-[#78716c]">
          <span className="rounded-lg border border-[#eae5d9] bg-[#faf9f5] px-2.5 py-1 flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-[#1c1917]" />
            <span>Ubuntu 24.04 (RAM 2GB)</span>
          </span>
          <span className="rounded-lg border border-[#eae5d9] bg-[#faf9f5] px-2.5 py-1 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-[#1c1917]" />
            <span>Hermes Core & 9Router</span>
          </span>
          <span className="rounded-lg border border-[#eae5d9] bg-[#faf9f5] px-2.5 py-1">
            Zero AI Slop
          </span>
        </div>
      </div>
    </section>
  );
};
