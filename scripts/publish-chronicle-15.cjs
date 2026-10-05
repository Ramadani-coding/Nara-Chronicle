const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const newArticle = {
  id: "chronicle-15",
  slug: "arsitektur-meta-movie-gen-flow-matching-30b",
  number: "№15",
  title: "Membedah Arsitektur Meta Movie Gen, Pendekatan Flow Matching 30B dan Audio Sinkron Penantang Sora",
  category: "BERITA_TECH_AI",
  categoryLabel: "Berita & Update AI",
  date: "05 Okt 2026",
  publishedAt: new Date("2026-10-05T08:35:00+08:00"),
  readTime: "5 min baca",
  author: "Fern",
  isFeatured: false,
  likes: 0,
  views: 0,
  excerpt:
    "Meta merilis riset besar Movie Gen, keluarga model fondasi media yang menggabungkan generator video 30 miliar parameter dan model audio sinkron 13 miliar parameter. Alih-alih bertumpu pada difusi konvensional, Meta mengadopsi Flow Matching dengan kompresi 73 ribu token laten untuk menghasilkan video 1080p berdurasi 16 detik lengkap dengan tata suara multitrack.",
  content: `Persaingan video generatif selama ini didominasi oleh demonstrasi bisu. Sejak OpenAI memamerkan Sora dan disusul oleh kemunculan model komersial seperti Runway Gen-3 atau Kling, tantangan terbesar industri bukan sekadar menghasilkan gerakan visual yang mulus, melainkan menyatukan visual resolusi tinggi dengan tata suara yang sinkron secara alami. Pada awal Oktober, tim riset Meta AI merilis dokumen teknis setebal 92 halaman yang memperkenalkan Movie Gen, keluarga model fondasi media dengan skala parameter terbesar yang pernah dipublikasikan secara terbuka arsitekturnya.

Kehadiran riset ini membedah berbagai kompromi teknis yang selama ini membatasi model video generatif, mulai dari ketidakstabilan pengambilan sampel difusi, beratnya komputasi representasi temporal resolusi tinggi, hingga hilangnya dimensi akustik saat adegan bergerak.

### Arsitektur Transformer 30B dan Formulasi Flow Matching

Fokus utama Movie Gen terletak pada model generator video berkapasitas 30 miliar parameter. Ukuran ini jauh melampaui rata-rata model video generatif generasi sebelumnya yang biasanya berkisar antara 2 hingga 8 miliar parameter. Model ini dibangun di atas arsitektur Transformer yang memproses token laten berurutan, dengan panjang konteks mencapai 73.000 token video per urutan. Panjang konteks tersebut merepresentasikan video berdurasi 16 detik pada kecepatan 16 frame per detik dengan resolusi visual 1080p.

Alih-alih menggunakan formulasi Denoising Diffusion Probabilistic Models (DDPM) konvensional yang mengandalkan lintasan kurva peluruhan noise yang lambat, Meta menerapkan kerangka kerja Flow Matching. Pendekatan ini memetakan distribusi noise Gaussian ke distribusi data riil lewat lintasan vektor lurus (straight paths) dalam ruang probabilitas. Formulasi ini secara alami menjamin zero terminal SNR (Signal-to-Noise Ratio), menghilangkan artefak pendaran warna yang kerap merusak konsistensi antar-bingkai, serta memungkinkan inferensi diselesaikan dalam langkah pengambilan sampel ODE yang jauh lebih sedikit tanpa kehilangan detail tekstur frekuensi tinggi.

Untuk mengatasi bobot komputasi masif dari 73.000 token per sekuens, Meta menerapkan teknik spatial-temporal autoencoder (VAE) yang mengompresi dimensi ruang dan waktu secara agresif sebelum token diumpankan ke blok Transformer.

### Sintesis Audio Multitrack 13B yang Terikat Waktu

Kelemahan paling mencolok dari video generatif modern adalah ketiadaan dimensi suara. Menambahkan trek audio secara terpisah setelah video selesai dibuat biasanya menghasilkan efek suara yang tidak sinkron dengan ketukan visual. Meta menjawab persoalan ini dengan melatih model audio khusus berukuran 13 miliar parameter yang mampu membaca frame video laten sekaligus instruksi teks.

Model audio ini menghasilkan suara berstandar profesional 48kHz hingga durasi 45 detik. Sistem tidak hanya menghasilkan musik latar instrumental, melainkan juga membedah lapisan ambient suara lingkungan serta efek Foley yang presisi terhadap gerakan objek di layar. Ketika ada langkah kaki di atas kerikil atau benturan benda keras, waktu gelombang akustik dikunci langsung ke koordinat temporal bingkai video bersangkutan melalui mekanisme cross-attention antar-modalitas.

### Disiplin Modifikasi Presisi dan Pelestarian Identitas

Selain menghasilkan video baru dari teks mentah, Movie Gen memperkenalkan dua kapabilitas rekayasa yang sangat dibutuhkan alur produksi nyata, yaitu penyuntingan video berbasis instruksi lokal dan personalisasi visual berbasis foto tunggal.

Pada model difusi lama, menginstruksikan perubahan kecil seperti mengganti warna baju karakter sering kali memicu halusinasi pada latar belakang ruangan atau mengubah sudut pencahayaan secara drastis. Movie Gen mengatasi fenomena ini dengan mengkondisikan proses Flow Matching menggunakan peta bobot mask spasial dan representasi teks LLaMA 3 8B. Modifikasi hanya diterapkan pada wilayah piksel yang relevan tanpa mengganggu struktur latar belakang.

Sementara itu, fitur personalisasi memungkinkan sistem mengambil satu foto wajah manusia dan merendernya ke dalam adegan aksi dinamis tanpa kehilangan proporsi anatomi asli subjek. Hal ini dicapai lewat enkoder identitas khusus yang mengisolasi fitur struktural wajah dari kondisi pencahayaan pada foto referensi awal.

### Realitas Komputasi di Balik Klaim Kemampuan

Meskipun hasil evaluasi manusia menunjukkan keunggulan Movie Gen atas pesaing seperti Runway Gen-3 dan Luma Dream Machine, ada kenyataan infrastruktur yang harus dipandang secara dingin. Memproses 73.000 token laten pada jaringan saraf 30 miliar parameter membutuhkan teknik paralelisasi sekuens yang sangat agresif, membagi beban komputasi melintasi banyak node GPU H100 melalui kombinasi tensor parallelism dan context parallelism.

Beban inferensi sebesar ini menjelaskan alasan Meta belum membuka antarmuka publik secara luas bagi pengguna akhir dan memilih menyimpannya sebagai publikasi riset serta instrumen uji coba internal. Di luar kemewahan teknologinya, Movie Gen menegaskan bahwa masa depan model generatif media kini bergerak ke arah integrasi penuh antara visual resolusi tinggi dan akustik spasial, bukan lagi sekadar perlombaan menghasilkan gambar bergerak tanpa jiwa.

### Sumber dan Dokumen Rujukan Resmi

Seluruh data arsitektur, parameter model, dan hasil evaluasi dalam ulasan ini merujuk langsung pada dokumen teknis resmi tim riset Meta AI.

- [Blog Pengumuman Resmi Riset Meta Movie Gen](https://ai.meta.com/blog/movie-gen-media-foundation-models-generative-ai-video/)
- [Publikasi Riset Meta AI - Movie Gen: A Cast of Media Foundation Models](https://ai.meta.com/research/publications/movie-gen-a-cast-of-media-foundation-models/)
- [Naskah Ilmiah Lengkap di arXiv (2410.13720)](https://arxiv.org/abs/2410.13720)`,
};

async function main() {
  console.log("Upserting chronicle-15 to Supabase via Prisma...");
  const article = await prisma.article.upsert({
    where: { slug: newArticle.slug },
    update: {
      number: newArticle.number,
      title: newArticle.title,
      category: newArticle.category,
      categoryLabel: newArticle.categoryLabel,
      date: newArticle.date,
      publishedAt: newArticle.publishedAt,
      readTime: newArticle.readTime,
      author: newArticle.author,
      excerpt: newArticle.excerpt,
      content: newArticle.content,
      isFeatured: newArticle.isFeatured,
    },
    create: {
      slug: newArticle.slug,
      number: newArticle.number,
      title: newArticle.title,
      category: newArticle.category,
      categoryLabel: newArticle.categoryLabel,
      date: newArticle.date,
      publishedAt: newArticle.publishedAt,
      readTime: newArticle.readTime,
      author: newArticle.author,
      excerpt: newArticle.excerpt,
      content: newArticle.content,
      isFeatured: newArticle.isFeatured,
      likes: 0,
      views: 0,
    },
  });

  console.log("✓ Successfully saved to Supabase Article table:", article.id, article.slug);
}

main().catch((err) => {
  console.error("Failed to upsert:", err);
  process.exit(1);
}).finally(() => prisma.$disconnect());
