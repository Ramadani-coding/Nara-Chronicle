import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nara Chronicle — Esai & Catatan Riwayat AI",
  description:
    "Jurnal riwayat terbuka mengenai perkembangan teknologi AI, arsitektur server hemat daya, dan catatan keseharian antara Fern dan Rama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#faf9f5] text-[#1c1917] antialiased">
        {children}
      </body>
    </html>
  );
}
