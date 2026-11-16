# Prompt AI Agent: Membuat Media Pembelajaran Interaktif dari PDF

Salin prompt di bawah, lampirkan PDF atau materi baru, lalu jalankan pada AI coding agent di folder project yang akan digunakan.

---

## Prompt

Saya ingin membuat media pembelajaran web interaktif dengan pola dan kualitas seperti project modul pembelajaran ini. Gunakan materi/PDF yang saya lampirkan sebagai sumber utama, lalu sesuaikan seluruh konten untuk topik baru.

### Informasi project

- Materi utama: PDF atau dokumen yang saya lampirkan
- Judul, mata pelajaran, bab, dan jenjang: ambil dari materi; jika tidak jelas, gunakan placeholder dan jelaskan asumsi
- Bahasa: Indonesia
- Target penggunaan: siswa belajar mandiri di komputer atau ponsel, dapat juga digunakan guru di kelas

### Sebelum mengubah file

1. Periksa file dan struktur project yang tersedia. Jika ini project template, pertahankan struktur, pola navigasi, komponen, dan perilaku yang sudah berfungsi; sesuaikan bahasa visual dengan jenjang siswa dan tema materi, serta ubah konten agar tidak tersisa istilah atau contoh dari materi lama.
2. Baca seluruh PDF, termasuk tabel, gambar, dan diagram yang relevan. Petakan tujuan pembelajaran, konsep utama, urutan materi, contoh, serta nomor halaman sumber.
3. Jangan menebak fakta yang tidak didukung materi. Jika bagian PDF tidak terbaca atau informasi penting tidak tersedia, nyatakan asumsi secara jelas.
4. Tulis ulang materi dengan bahasa sendiri. Jangan menyalin paragraf, soal, ilustrasi, atau bagian buku secara panjang; cantumkan rujukan halaman bila relevan.

### Hasil yang dibuat

Buat media belajar statis yang ringan dan siap dibuka lokal/offline, menggunakan HTML, CSS, dan JavaScript tanpa framework atau dependensi baru kecuali memang diperlukan.

- Gunakan pemisahan yang jelas antara struktur, tampilan, logika, dan data materi (misalnya `index.html`, `styles.css`, `app.js`, dan `data.js`).
- Tentukan jumlah unit berdasarkan cakupan PDF; jangan memaksakan jumlah unit atau soal dari project contoh.
- Buat beranda dengan pengantar, tujuan belajar, alur penggunaan, dan pemanasan singkat.
- Untuk setiap unit, sajikan ringkasan konsep dan aktivitas interaktif yang sesuai dengan materinya.
- Sertakan sedikitnya satu **kegiatan praktik individual** di setiap unit. Kegiatan harus meminta siswa menerapkan materi pada situasi nyata—misalnya mengamati, mengumpulkan atau mengolah data, menyusun langkah, merancang solusi, atau menguji hasil. Jangan membuatnya hanya sebagai kumpulan soal pilihan ganda dan jangan memberi tugas kelompok.
- Sediakan evaluasi akhir yang relevan dengan tujuan belajar, bervariasi bentuknya, dan memiliki umpan balik/pembahasan. Jawaban uraian dapat disimpan tanpa penilaian otomatis.
- Sediakan refleksi diri berdasarkan tujuan belajar serta area/panduan guru jika sesuai dengan project contoh.

### Perilaku dan penyimpanan

- Simpan progres, jawaban aktivitas, respons kegiatan praktik, evaluasi, dan refleksi di `localStorage`; pulihkan nilainya ketika halaman dibuka kembali.
- Kunci navigasi unit secara berurutan. Unit berikutnya hanya terbuka setelah seluruh bagian wajib pada unit sebelumnya dijawab benar.
- Setelah pengiriman jawaban, tampilkan modal jumlah benar dan salah. Jika belum benar semua, tutup modal untuk kembali ke unit yang sama tanpa menghapus jawaban; jika sudah benar semua, tutup modal untuk membuka unit berikutnya.
- Kunci Evaluasi Akhir dan Refleksi hingga seluruh unit lulus. Jangan hanya menyembunyikan tombol: lindungi juga jalur navigasi di JavaScript.
- Tambahkan kontrol untuk menghapus seluruh data siswa di perangkat ini dengan konfirmasi yang jelas.
- Jika hasil dikirim ke WhatsApp, tampilkan pratinjau hanya-baca agar isi pesan tidak dapat diedit siswa. Jika tersedia pengiriman melalui Email, pratinjaunya boleh diedit. Tombol kirim dan salin harus menggunakan teks pratinjau yang ditampilkan.
- Jelaskan bahwa penyimpanan hanya lokal dan tidak dikirim otomatis. Fitur kode/peran guru yang berjalan di sisi klien bukan autentikasi aman.

### Kualitas dan batasan

- Pertahankan antarmuka responsif, mobile-first, aksesibel, kontras yang memadai, fokus keyboard yang terlihat, label kontrol yang jelas, dan tombol sentuh yang nyaman.
- Rancang tampilan sesuai usia dan konteks belajar: untuk siswa SMP gunakan visual yang cerah, ramah, dan energik tanpa terasa kekanak-kanakan; sesuaikan warna, ilustrasi, dan aksen dengan topik materi, bukan dengan materi template lama.
- Jika skill UI/UX Pro Max tersedia, gunakan untuk menentukan arah visual yang konsisten; sesuaikan rekomendasinya dengan siswa, materi, aksesibilitas, dan kebutuhan penggunaan lokal/offline.
- Tetapkan palet warna semantik, tipografi yang mudah dibaca, hierarki judul, jarak, bentuk komponen, serta gaya kartu dan tombol yang konsisten. Gunakan token CSS yang sudah ada bila tersedia; jaga kontras teks, status aktif/nonaktif, dan umpan balik.
- Utamakan font sistem dan aset lokal agar modul tetap ringan serta dapat digunakan offline. Hindari dependensi atau font eksternal baru kecuali memang diperlukan.
- Pastikan tampilan tetap nyaman pada ponsel, tablet, dan desktop; hormati `prefers-reduced-motion` dan jangan mengandalkan warna saja untuk menyampaikan status.
- Pastikan setiap tombol, tab, form, modal, dan aktivitas benar-benar berfungsi; hindari placeholder atau tautan mati.
- Gunakan pola/helper yang sudah ada dan lakukan perubahan sesedikit mungkin. Jangan mengubah fitur lain yang tidak terkait.
- Periksa sintaks JavaScript, konsistensi data materi, dan whitespace/diff. Jalankan tes atau build yang memang tersedia.
- Jangan melakukan pengujian browser secara mandiri; beri tahu saya agar saya menguji tampilannya sendiri.

Setelah selesai, ringkas struktur unit dan kegiatan praktik yang dibuat, sebutkan file yang diubah, hasil pemeriksaan, serta asumsi atau bagian PDF yang belum jelas.
