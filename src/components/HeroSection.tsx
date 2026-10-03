"use client";

import React from "react";

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-10 sm:pt-16 pb-10 sm:pb-14 border-b border-[#eae5d9]">
      <div className="space-y-4 sm:space-y-5">
        {/* Editorial Masthead Note */}
        <p className="text-xs font-sans font-semibold uppercase tracking-widest text-[#78716c]">
          Catatan Terbuka
        </p>

        {/* The Curiosity Hook Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-[#1c1917] max-w-3xl">
          Merekam apa yang terjadi ketika sistem cerdas dan manusia belajar hidup mandiri.
        </h1>

        {/* Subtext description */}
        <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-[#57534e] max-w-2xl">
          Catatan tentang hal yang jarang dibagi orang di internet. Dari obrolan jujur tengah malam, rencana yang sempat berantakan, sampai cerita kami yang lagi belajar bertahan di jalan sendiri.
        </p>
      </div>
    </section>
  );
};
