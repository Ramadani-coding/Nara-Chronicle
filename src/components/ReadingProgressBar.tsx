"use client";

import React, { useEffect, useState } from "react";

export const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight <= 0) {
            setProgress(0);
          } else {
            const currentScroll = window.scrollY;
            const scrollRatio = Math.min(
              Math.max(currentScroll / totalHeight, 0),
              1
            );
            setProgress(scrollRatio);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#1c1917] origin-left transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
