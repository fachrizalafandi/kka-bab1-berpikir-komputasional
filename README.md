# Modul Pembelajaran Web Interaktif: KKA Kelas VII — Bab 1 (Berpikir Komputasional)

Modul pembelajaran web statis berbahasa Indonesia untuk mata pelajaran **Koding dan Kecerdasan Artifisial (KKA) Kelas VII SMP/MTs**, Bab 1 **Berpikir Komputasional** (merujuk Buku Siswa Kemendikdasmen RI, 2025)[cite: 1].

## Fitur Utama
- **100% Statis & Offline-Ready:** Dibangun dengan HTML5, CSS3, dan Vanilla JavaScript murni tanpa framework, bundler, database, atau aset eksternal.
- **Alur Belajar Terstruktur:** Beranda & formatif awal, 5 unit materi yang terbuka berurutan setelah semua jawaban aktivitas benar (progres dan jawaban tersimpan di `localStorage`), dengan 5 aktivitas/permainan interaktif (empat pilar, pengolahan tabel frekuensi & diagram batang, urutan langkah Polya + teka-teki parkir, *debugging* instruksi, serta simulasi *Pilah Sampah* gaya Scratch dengan dukungan *tap* untuk ponsel maupun *drag-and-drop*). Setiap hasil aktivitas menampilkan jumlah jawaban benar dan salah; jawaban yang keliru dapat diperbaiki tanpa kehilangan jawaban lain. Modul juga menyediakan Evaluasi Akhir 11 soal beragam tipe, Refleksi Diri, dan Area Guru.
- **Mobile-First & Aksesibel:** Tata letak responsif nyaman untuk layar ponsel/webview, tombol sentuh minimal `44x44px`, navigasi keyboard jelas, dan alternatif non-drag untuk semua interaksi.

## Cara Menjalankan Secara Lokal
1. Unduh atau kloning seluruh berkas (`index.html`, `styles.css`, `data.js`, `app.js`, `README.md`) ke dalam satu folder.
2. Buka `index.html` langsung di browser modern (Chrome, Edge, Firefox, Safari), atau jalankan server statis lokal seperti:
   ```bash
   python3 -m http.server 8080