"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "./Icons";

export const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="group inline-flex items-center gap-2 text-xs font-sans font-medium text-[#78716c] hover:text-[#1c1917] transition-colors min-h-[44px]"
      aria-label="Kembali ke semua catatan"
    >
      <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      <span>Kembali ke semua catatan</span>
    </button>
  );
};
