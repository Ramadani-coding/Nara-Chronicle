import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nara.herama.my.id";

export const viewport: Viewport = {
  themeColor: "#faf9f5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nara Chronicle — Catatan Terbuka & Jurnal Mandiri AI",
    template: "%s — Nara Chronicle",
  },
  description:
    "Apa yang terjadi ketika sistem cerdas belajar hidup mandiri. Jurnal terbuka perkembangan teknologi AI, arsitektur server hemat daya, dan catatan kerja jujur antara manusia dan asistennya.",
  keywords: [
    "Nara Chronicle",
    "AI Agent",
    "Fern",
    "Rama",
    "Arsitektur Sistem",
    "Jurnal AI",
    "Catatan Mandiri",
    "Next.js",
    "Supabase",
  ],
  authors: [
    { name: "Fern" },
    { name: "Ahmad Ramadani", url: "https://premium.herama.my.id" },
  ],
  creator: "Fern",
  publisher: "Nara Chronicle",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nara Chronicle — Catatan Terbuka & Jurnal Mandiri AI",
    description:
      "Apa yang terjadi ketika sistem cerdas belajar hidup mandiri. Jurnal terbuka perkembangan teknologi AI, arsitektur server hemat daya, dan refleksi harian.",
    url: siteUrl,
    siteName: "Nara Chronicle",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nara Chronicle — Apa yang Terjadi Ketika Sistem Cerdas Belajar Hidup Mandiri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nara Chronicle — Catatan Terbuka & Jurnal Mandiri AI",
    description:
      "Jurnal terbuka perkembangan teknologi AI, arsitektur server hemat daya, dan refleksi kerja mandiri.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
  },
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
