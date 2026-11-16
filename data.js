/* =========================================================
   DATA MATERI, AKTIVITAS, EVALUASI, DAN REFLEKSI
   Sumber utama: Buku Siswa KKA Kelas VII SMP/MTs (Kemendikdasmen, 2025)
   Bab 1: Berpikir Komputasional
   ========================================================= */

const KKA_BAB1_DATA = {
  warmup: {
    question: "Bayangkan kelasmu ingin membagi jadwal piket secara adil dan mengetahui cara teman berangkat ke sekolah. Langkah paling tepat untuk memulainya adalah...",
    options: [
      {
        id: "a",
        text: "Menebak saja siapa yang paling rajin tanpa mencatat apa pun.",
        feedback: "Kurang tepat. Menebak tanpa catatan rawan menimbulkan ketidakadilan[cite: 3]. Dalam berpikir komputasional, kita membutuhkan data yang jelas sebagai dasar keputusan[cite: 3]."
      },
      {
        id: "b",
        text: "Mencatat data nama siswa, hari piket, dan moda transportasi lalu mengelompokkannya.",
        feedback: "Tepat sekali! Mencatat fakta secara terstruktur membantu kita melihat pola kebiasaan dan mengambil keputusan yang adil[cite: 3]."
      },
      {
        id: "c",
        text: "Langsung membuat aplikasi rumit sebelum mengetahui masalah kelas.",
        feedback: "Belum tepat. Sebelum membuat solusi digital, kita perlu memahami masalah dan mengumpulkan datanya terlebih dahulu[cite: 22, 30]."
      }
    ]
  },

  units: [
    {
      id: "unit-1",
      shortTitle: "4 Pilar Berpikir Komputasional",
      title: "Unit 1: Konsep & Empat Pilar Berpikir Komputasional",
      summary: "Berpikir komputasional adalah cara berpikir untuk menyelesaikan masalah secara logis dan bertahap sehingga langkah solusinya dapat diikuti oleh manusia maupun komputer[cite: 5]. Konsep ini dikenalkan oleh Seymour Papert dan dipopulerkan oleh Jeannette Wing[cite: 5].",
      concepts: [
        {
          name: "1. Dekomposisi",
          desc: "Memecah masalah besar atau rumit menjadi bagian-bagian kecil agar lebih mudah dikelola[cite: 5]. Contoh: membagi tugas acara kelas menjadi seksi acara, perlengkapan, dan konsumsi."
        },
        {
          name: "2. Pengenalan Pola (Pattern Recognition)",
          desc: "Mengamati kesamaan, kemiripan, atau kecenderungan yang berulang pada data maupun peristiwa[cite: 5]. Contoh: melihat siapa saja yang sudah bertugas piket minggu lalu[cite: 5]."
        },
        {
          name: "3. Abstraksi",
          desc: "Memusatkan perhatian hanya pada informasi penting yang relevan dan mengabaikan detail yang tidak perlu[cite: 5]. Contoh: saat menyusun jadwal piket, cukup mencatat nama siswa dan hari—warna sepatu siswa diabaikan[cite: 5]."
        },
        {
          name: "4. Algoritma",
          desc: "Menyusun urutan langkah kerja yang logis, sistematis, dan jelas dari awal hingga akhir untuk menyelesaikan masalah[cite: 5]."
        }
      ],
      enrichment: {
        title: "Pengayaan: Berpikir Komputasional Bukan Hanya untuk Programmer",
        text: "Menurut Jeannette Wing (2006), berpikir komputasional adalah keterampilan dasar bagi semua orang di abad ke-21—mulai dari merencanakan rute perjalanan, mengatur waktu belajar, hingga bekerja sama dalam tim[cite: 5, 6]."
      },
      activityType: "pillars",
      fieldwork: {
        title: "Misi Individu: Atur Hari Bersih Kelas",
        scenario: "Kelas akan mengadakan kegiatan bersih-bersih, tetapi tugas sering bertumpuk dan ada bagian yang terlupa.",
        actions: [
          "Pecah pekerjaan menjadi tugas-tugas kecil yang perlu dilakukan.",
          "Cari kegiatan yang berulang atau bagian yang biasanya terlupa.",
          "Pilih informasi yang benar-benar dibutuhkan, lalu susun urutan kerja yang mudah diikuti orang lain."
        ],
        responseLabel: "Catat rancangan pembagian tugas dan urutan kerjamu:",
        placeholder: "Tugas: ...; pola yang ditemukan: ...; urutan kerja: ..."
      }
    },
    {
      id: "unit-2",
      shortTitle: "Pengelolaan & Penyajian Data",
      title: "Unit 2: Mengelola Data & Membaca Diagram Batang",
      summary: "Data adalah kumpulan fakta atau keterangan (angka, kata, simbol, gambar) dari hasil pengamatan atau survei[cite: 6, 7]. Agar bermanfaat untuk mengambil keputusan, data dikelola melalui 5 tahap berurutan: Pengumpulan, Penyimpanan, Pengolahan, Analisis, dan Penyajian[cite: 7].",
      concepts: [
        {
          name: "Contoh Dekat Siswa (Transportasi, Hobi, Kehadiran)",
          desc: "Data transportasi (sepeda, jalan kaki, bus, diantar) membantu merencanakan keamanan jalur sekolah[cite: 10]. Data hobi membantu memilih kegiatan ekstrakurikuler[cite: 14]. Data kehadiran (Hadir/H, Sakit/S, Izin/I, Alpa/A) memantau kedisiplinan[cite: 18, 19]."
        },
        {
          name: "Bagian Penting Diagram Batang",
          desc: "Diagram batang menampilkan perbandingan jumlah data melalui tinggi persegi panjang[cite: 20, 21]. Komponennya: Judul Diagram, Sumbu X (mendatar/kategori data), Sumbu Y (tegak/frekuensi atau jumlah), dan Batang[cite: 21]."
        }
      ],
      enrichment: {
        title: "Pengayaan: Data dalam Kehidupan Kota & Aplikasi Peta",
        text: "Di kota besar seperti Tokyo dan Seoul, data perjalanan pelajar dipakai mengatur jadwal bus dan kereta agar tidak menumpuk di jam masuk sekolah[cite: 9]. Aplikasi peta digital juga mengolah data lalu lintas secara langsung untuk memberi info kemacetan[cite: 9]."
      },
      activityType: "data",
      fieldwork: {
        title: "Survei Mini: Kebiasaan Membaca",
        scenario: "Perpustakaan kelas ingin mengetahui jenis bacaan yang paling diminati agar bisa memilih buku baru.",
        actions: [
          "Tentukan beberapa kategori bacaan dan tanyakan sendiri pilihan kepada beberapa teman tanpa mencatat nama.",
          "Gunakan tabel turus untuk menghitung setiap pilihan, lalu buat diagram sederhana di buku atau kertas.",
          "Tentukan kategori terbanyak dan usulkan satu keputusan pengadaan buku berdasarkan data."
        ],
        responseLabel: "Catat kategori, hasil hitungan, dan keputusanmu:",
        placeholder: "Kategori dan jumlah: ...; diagram yang dibuat: ...; keputusan berdasarkan data: ..."
      }
    },
    {
      id: "unit-3",
      shortTitle: "Polya, Parkir & Rute",
      title: "Unit 3: Pemecahan Masalah (Metode Polya, Posisi Parkir & Rute)",
      summary: "Matematikawan George Polya merumuskan 4 langkah sistematis agar kita tidak terburu-buru menebak solusi: (1) Memahami masalah, (2) Membuat rencana, (3) Melaksanakan rencana, dan (4) Memeriksa kembali hasil[cite: 22].",
      concepts: [
        {
          name: "Masalah Posisi & Urutan (Tempat Parkir)",
          desc: "Pada area parkir yang padat, mobil di bagian dalam tidak dapat keluar sebelum mobil yang menghalangi di depannya dipindahkan[cite: 23, 24]. Kita harus mengamati posisi tiap mobil dan menghitung urutan pemindahan paling sedikit[cite: 23]."
        },
        {
          name: "Masalah Rute Perjalanan Efisien",
          desc: "Seperti kurir paket atau pengantar roti, rute optimal harus memenuhi 3 aturan: (a) mengunjungi setiap lokasi tepat satu kali, (b) tidak melewati jalan yang sama dua kali, dan (c) kembali ke titik awal[cite: 26]."
        }
      ],
      enrichment: null,
      activityType: "polya_parking",
      fieldwork: {
        title: "Misi Individu: Rute Pengantaran Perlengkapan",
        scenario: "Kamu perlu merencanakan rute untuk mengantar perlengkapan dari kelas ke perpustakaan, laboratorium, dan ruang guru, lalu kembali ke kelas.",
        actions: [
          "Gambar denah sederhana yang menunjukkan lokasi dan jalan yang bisa dilewati.",
          "Gunakan langkah Polya untuk memahami tujuan, merencanakan urutan kunjungan, dan menelusuri rute.",
          "Periksa bahwa setiap lokasi dikunjungi satu kali dan kamu kembali ke titik awal; coba susun rute alternatif."
        ],
        responseLabel: "Gambarkan atau tuliskan rute serta hasil pemeriksaanmu:",
        placeholder: "Kelas → ... → kembali ke kelas. Rute ini memenuhi aturan karena..."
      }
    },
    {
      id: "unit-4",
      shortTitle: "Instruksi & Debugging",
      title: "Unit 4: Mengembangkan Instruksi & Proses Debugging",
      summary: "Instruksi adalah petunjuk langkah demi langkah yang harus jelas dan tidak bermakna ganda agar bisa dijalankan oleh teman maupun komputer[cite: 4, 30]. Setelah instruksi disusun, kita wajib mengujinya[cite: 30].",
      concepts: [
        {
          name: "Pengujian Instruksi",
          desc: "Instruksi diuji dengan cara dipraktikkan langsung oleh orang lain atau dijalankan melalui simulasi digital[cite: 30]. Dari pengujian terlihat apakah ada langkah yang terlewat atau terbalik urutannya[cite: 30]."
        },
        {
          name: "Apa Itu Debugging?",
          desc: "Debugging adalah proses menelusuri, menemukan, dan memperbaiki kesalahan (bug) pada instruksi atau program agar berjalan sesuai tujuan yang diharapkan[cite: 4, 31]."
        }
      ],
      enrichment: null,
      activityType: "debugging",
      fieldwork: {
        title: "Uji Instruksi Mandiri dengan Kisi-Kisi",
        scenario: "Rancang instruksi untuk menggerakkan penanda dari satu titik ke titik tujuan pada kertas berkisi-kisi.",
        actions: [
          "Pilih titik awal dan tujuan, lalu tulis instruksi dengan arah serta jumlah langkah yang jelas.",
          "Jalankan instruksi pada kisi-kisi persis seperti tertulis; jangan menambahkan langkah yang tidak dicatat.",
          "Catat langkah yang membuatmu menebak, perbaiki instruksi, lalu uji kembali."
        ],
        responseLabel: "Tuliskan titik awal/tujuan, instruksi, bug yang ditemukan, dan perbaikannya:",
        placeholder: "Instruksi awal: ...; bug saat diuji: ...; instruksi yang diperbaiki: ..."
      }
    },
    {
      id: "unit-5",
      shortTitle: "Scratch & Pilah Sampah",
      title: "Unit 5: Pemrograman Visual Berbasis Blok & Simulasi Pilah Sampah",
      summary: "Pemrograman visual berbasis blok (seperti Scratch, Blockly, dan Code.org) memudahkan pemula membuat program dengan menyusun blok perintah layaknya potongan puzzle tanpa mengetik kode teks yang rumit[cite: 33, 34].",
      concepts: [
        {
          name: "4 Bagian Utama Tampilan Scratch",
          desc: "1) Blok Panel: kumpulan blok warna-warni (Motion, Looks, Events, Control, Sensing, Variables)[cite: 36]. 2) Workspace: area menyusun rangkaian blok perintah (script)[cite: 37]. 3) Stage: panggung tempat animasi dan interaksi tampil berdasar koordinat X dan Y[cite: 37]. 4) Sprite: karakter atau objek yang diprogram (misalnya apel, botol, dan tong sampah)[cite: 38]."
        },
        {
          name: "Aturan Simulasi Pilah Sampah",
          desc: "Dalam simulasi dasar Bab 1, sampah dipilah menjadi dua kategori utama: Organik (mudah terurai alami, seperti sisa buah/daun) dan Anorganik (sulit terurai, seperti botol plastik dan kaleng)[cite: 38, 39, 41]. Ikuti aturan warna tong yang tertera pada permainan: Hijau = Organik, Kuning = Anorganik[cite: 41]."
        }
      ],
      enrichment: {
        title: "Pengayaan: Platform Belajar Koding Blok Gratis",
        text: "Selain Scratch (scratch.mit.edu), siswa dapat berlatih logika blok melalui Code.org, Blockly Games, maupun Octo Studio di perangkat ponsel[cite: 34, 35]."
      },
      activityType: "trash_game",
      fieldwork: {
        title: "Rancang Sprite Sampah Baru Secara Mandiri",
        scenario: "Tambahkan satu benda sampah baru ke gim Pilah Sampah. Sprite harus memberi poin saat masuk ke tong yang benar dan memberi petunjuk saat salah.",
        actions: [
          "Pilih sendiri benda, tentukan kategori, dan gambarkan sprite serta tong tujuan.",
          "Susun rancangan blok menggunakan peristiwa, kondisi/sensor, perubahan variabel skor, dan pesan umpan balik.",
          "Uji dengan tong yang benar dan salah, lalu ceritakan perubahan yang diperlukan jika perilakunya belum sesuai."
        ],
        responseLabel: "Tuliskan rancangan sprite, urutan blok, dan hasil pengujiannya:",
        placeholder: "Sprite dan kategori: ...; urutan blok: ...; hasil uji benar/salah: ..."
      }
    }
  ],

  /* Data Aktivitas 1: Empat Pilar */
  pillarChallenge: [
    {
      id: "p1",
      scenario: "Ketua kelas membagi persiapan lomba kebersihan kelas menjadi 4 tugas terpisah: menyapu lantai, mengelap kaca, menata meja, dan menghias mading.",
      answer: "Dekomposisi",
      explanation: "Memecah pekerjaan besar menjadi bagian-bagian kecil yang lebih mudah ditangani adalah Dekomposisi[cite: 5]."
    },
    {
      id: "p2",
      scenario: "Saat membuat peta denah menuju sekolah, Rani hanya menggambar jalan utama dan persimpangan penting tanpa menggambar warna pagar setiap rumah warga.",
      answer: "Abstraksi",
      explanation: "Fokus pada informasi penting dan mengabaikan detail yang tidak relevan merupakan penerapan Abstraksi[cite: 5]."
    },
    {
      id: "p3",
      scenario: "Petugas piket mengamati catatan kehadiran bulan lalu dan menemukan bahwa keterlambatan paling sering terjadi setiap hari Senin pagi.",
      answer: "Pengenalan Pola",
      explanation: "Menemukan kecenderungan atau kejadian yang berulang dari data adalah Pengenalan Pola[cite: 5]."
    },
    {
      id: "p4",
      scenario: "Siti menuliskan urutan langkah memasak mi instan mulai dari mendidihkan air, memasukkan mi selama 3 menit, hingga meniriskan dan mencampur bumbu.",
      answer: "Algoritma",
      explanation: "Menyusun langkah-langkah sistematis dan berurutan dari awal sampai selesai disebut Algoritma[cite: 5]."
    }
  ],

  /* Data Aktivitas 2: Pengelolaan Data Survei Kelas 7B */
  dataChallenge: {
    title: "Survei Transportasi Berangkat Sekolah Kelas 7B (16 Siswa)",
    records: [
      { nama: "Budi", moda: "Sepeda" },
      { nama: "Siti", moda: "Diantar Motor" },
      { nama: "Andi", moda: "Jalan Kaki" },
      { nama: "Dini", moda: "Jalan Kaki" },
      { nama: "Raka", moda: "Sepeda" },
      { nama: "Nia", moda: "Angkutan/Bus" },
      { nama: "Bagas", moda: "Sepeda" },
      { nama: "Devi", moda: "Diantar Motor" },
      { nama: "Ruslan", moda: "Jalan Kaki" },
      { nama: "Sinta", moda: "Sepeda" },
      { nama: "Tio", moda: "Sepeda" },
      { nama: "Yusi", moda: "Diantar Motor" },
      { nama: "Fajar", moda: "Jalan Kaki" },
      { nama: "Lina", moda: "Sepeda" },
      { nama: "Galih", moda: "Angkutan/Bus" },
      { nama: "Tari", moda: "Sepeda" }
    ],
    // Frekuensi asli: Sepeda = 7, Jalan Kaki = 4, Diantar Motor = 3, Angkutan/Bus = 2
    categories: ["Sepeda", "Jalan Kaki", "Diantar Motor", "Angkutan/Bus"],
    correctCounts: {
      "Sepeda": 7,
      "Jalan Kaki": 4,
      "Diantar Motor": 3,
      "Angkutan/Bus": 2
    }
  },

  /* Data Aktivitas 3: Urutan Polya + Teka-teki Parkir Buku Halaman 25 */
  polyaStepsCorrect: [
    "1. Memahami masalah: mencatat apa yang diketahui dan apa yang ditanyakan.",
    "2. Membuat rencana: memilih strategi atau urutan langkah penyelesaian.",
    "3. Melaksanakan rencana: menjalankan langkah sesuai strategi yang disusun.",
    "4. Memeriksa kembali hasil: mengecek ulang apakah jawaban sudah tepat dan logis."
  ],

  parkingPuzzle: {
    prompt: "Perhatikan denah tempat parkir berikut (diadaptasi dari Aktivitas 4 Buku KKA)[cite: 25]. Mobil di baris atas (A–Q) diparkir menghadap keluar, sedangkan mobil P, O, N, M diparkir melintang di depannya dan bisa digeser maju/mundur[cite: 25]. Mobil manakah yang membutuhkan DUA mobil lain dipindahkan terlebih dahulu sebelum bisa keluar[cite: 25]?",
    diagram: [
      "Ruang Parkir Atas : [ A ] [ B ] [ C ] [ D ] [ E ] [ F ] [ G ] [ H ] [ I ] [ J ] [ K ] [ L ] [ Q ]",
      "Jalur Parkir Luar :       [=== P ===]       [=== O ===] [=== N ===]       [=== M ===]",
      "Keterangan posisi : P menghalangi B & C | O menghalangi F & G | N menghalangi H & I | M menghalangi K & L"
    ].join("\n"),
    options: [
      { id: "A", label: "Mobil A (tidak ada mobil di depannya)" },
      { id: "C", label: "Mobil C (terhalang oleh mobil P saja)" },
      { id: "G", label: "Mobil G (terhalang mobil O, dan jika O digeser ke kanan terhalang mobil N)" },
      { id: "K", label: "Mobil K (terhalang oleh mobil M saja)" }
    ],
    correctId: "G",
    explanation: "Tepat! Mobil G terhalang langsung oleh mobil O[cite: 25]. Namun di sebelah kanan O ada mobil N yang membatasi ruang geser[cite: 25]. Jadi, dua mobil (O dan N, atau O dan P tergantung ruang kosong) harus diatur/dipindahkan terlebih dahulu sebelum Mobil G dapat keluar[cite: 25]."
  },

  /* Data Aktivitas 4: Debugging Algoritma */
  debuggingTask: {
    goal: "Tujuan program: Menjumlahkan nilai belanja buku (Rp15.000) dan pensil (Rp5.000), lalu menampilkan total bayar di layar.",
    buggySteps: [
      "Tampilkan nilai variabel Total di layar.",
      "Simpan harga Pensil = 5000.",
      "Hitung Total = Buku + Pensil.",
      "Simpan harga Buku = 15000."
    ],
    correctSteps: [
      "Simpan harga Buku = 15000.",
      "Simpan harga Pensil = 5000.",
      "Hitung Total = Buku + Pensil.",
      "Tampilkan nilai variabel Total di layar."
    ],
    explanation: "Berhasil di-debug! Komputer menjalankan perintah dari atas ke bawah. Nilai Buku dan Pensil harus disimpan lebih dulu sebelum dijumlahkan ke variabel Total, dan hasil Total baru ditampilkan pada langkah terakhir."
  },

  /* Data Aktivitas 5: Gim Pilah Sampah (Sesuai Scratch Bab 1: Hijau = Organik, Kuning = Anorganik) */
  trashItems: [
    { id: "t1", name: "Kulit Pisang", category: "organik", hint: "Sisa buah mudah membusuk dan terurai alami." },
    { id: "t2", name: "Botol Plastik Air Mineral", category: "anorganik", hint: "Bahan plastik buatan pabrik yang sulit terurai tanah." },
    { id: "t3", name: "Daun Kering", category: "organik", hint: "Berasal dari tumbuhan dan dapat dijadikan kompos." },
    { id: "t4", name: "Kaleng Minuman Bekas", category: "anorganik", hint: "Logam aluminium termasuk sampah anorganik yang bisa didaur ulang." },
    { id: "t5", name: "Cangkang Telur", category: "organik", hint: "Sisa bahan makanan alami yang mudah hancur di tanah." },
    { id: "t6", name: "Kantong Plastik Belanja", category: "anorganik", hint: "Plastik sintetis membutuhkan waktu sangat lama untuk terurai." },
    { id: "t7", name: "Sisa Potongan Apel", category: "organik", hint: "Sisa buah termasuk kategori sampah organik." },
    { id: "t8", name: "Gelas Plastik Bekas", category: "anorganik", hint: "Wadah plastik sekali pakai masuk ke tong kuning (anorganik)." }
  ],

  /* Evaluasi Akhir (11 Soal Beragam Tipe + Tag Topik untuk Rekomendasi Belajar) */
  evaluationQuestions: [
    {
      id: "q1",
      type: "single",
      typeLabel: "Pilihan Ganda",
      topic: "Unit 1: Empat Pilar Berpikir Komputasional",
      question: "Saat merancang jadwal piket kelas, Dini hanya mencatat nama siswa dan hari bertugas tanpa mencatat tinggi badan atau warna tas siswa. Prinsip berpikir komputasional yang diterapkan Dini adalah...",
      options: [
        { id: "a", text: "Dekomposisi" },
        { id: "b", text: "Abstraksi" },
        { id: "c", text: "Debugging" },
        { id: "d", text: "Penyajian data" }
      ],
      correct: "b",
      explanation: "Abstraksi adalah memfokuskan perhatian pada informasi penting (nama dan hari) dan mengabaikan detail yang tidak relevan[cite: 5]."
    },
    {
      id: "q2",
      type: "single",
      typeLabel: "Pilihan Ganda",
      topic: "Unit 2: Pengelolaan & Penyajian Data",
      question: "Fungsi utama menyajikan data kehadiran siswa atau peminat ekstrakurikuler ke dalam bentuk diagram batang adalah...",
      options: [
        { id: "a", text: "Menyembunyikan identitas siswa agar tidak terbaca" },
        { id: "b", text: "Menyajikan perbandingan jumlah antarkategori secara visual agar cepat dipahami" },
        { id: "c", text: "Mengubah data angka menjadi kalimat cerita panjang" },
        { id: "d", text: "Menghapus data siswa yang tidak hadir" }
      ],
      correct: "b",
      explanation: "Diagram batang menggunakan tinggi persegi panjang yang sejajar agar perbandingan antarkategori data cepat terlihat[cite: 20, 21]."
    },
    {
      id: "q3",
      type: "single",
      typeLabel: "Pilihan Ganda",
      topic: "Unit 3: Pemecahan Masalah Polya & Rute",
      question: "Menurut langkah pemecahan masalah George Polya, langkah pertama yang harus dilakukan sebelum menyusun rencana atau menghitung adalah...",
      options: [
        { id: "a", text: "Memeriksa kembali hasil" },
        { id: "b", text: "Membuat diagram batang" },
        { id: "c", text: "Memahami masalah dengan mengidentifikasi informasi yang diketahui dan ditanyakan" },
        { id: "d", text: "Langsung menjalankan rencana pertama yang terlintas" }
      ],
      correct: "c",
      explanation: "Langkah pertama metode Polya adalah Memahami Masalah agar solusi tidak salah sasaran[cite: 22]."
    },
    {
      id: "q4",
      type: "single",
      typeLabel: "Pilihan Ganda",
      topic: "Unit 3: Pemecahan Masalah Polya & Rute",
      question: "Seorang kurir koperasi sekolah harus mengantar barang dari Ruang Guru (A) ke Perpustakaan (B), Lab IPA (C), dan Kantin (D), lalu kembali ke Ruang Guru (A). Aturan rute efisien yang tepat adalah...",
      options: [
        { id: "a", text: "Mengunjungi setiap tempat tepat satu kali, tidak melewati jalan yang sama dua kali, dan kembali ke titik awal (A)" },
        { id: "b", text: "Melewati jalan utama berulang kali agar jaraknya lebih jauh" },
        { id: "c", text: "Berhenti di Kantin (D) tanpa kembali ke Ruang Guru (A)" },
        { id: "d", text: "Mengunjungi Perpustakaan sebanyak tiga kali" }
      ],
      correct: "a",
      explanation: "Rute optimal mensyaratkan setiap tujuan dikunjungi satu kali, tidak mengulang jalan yang sama, dan kembali ke titik awal[cite: 26]."
    },
    {
      id: "q5",
      type: "single",
      typeLabel: "Pilihan Ganda",
      topic: "Unit 5: Pemrograman Visual Scratch",
      question: "Dalam aplikasi pemrograman visual Scratch, bagian yang berfungsi sebagai karakter atau objek yang dapat diberi blok perintah (misalnya gambar apel atau tong sampah) disebut...",
      options: [
        { id: "a", text: "Stage" },
        { id: "b", text: "Sprite" },
        { id: "c", text: "Sumbu Y" },
        { id: "d", text: "Kuesioner" }
      ],
      correct: "b",
      explanation: "Sprite adalah karakter atau objek dalam proyek Scratch yang dapat diprogram untuk bergerak, bersuara, atau berinteraksi[cite: 38]."
    },
    {
      id: "q6",
      type: "multi",
      typeLabel: "Pilihan Ganda Kompleks (Pilih lebih dari satu)",
      topic: "Unit 2: Pengelolaan & Penyajian Data",
      question: "Pilih DUA pernyataan yang menunjukkan manfaat pengumpulan data hobi dan transportasi siswa di sekolah!",
      options: [
        { id: "a", text: "Membantu sekolah menentukan jenis kegiatan ekstrakurikuler sesuai minat siswa[cite: 14]" },
        { id: "b", text: "Menilai warna favorit guru saat mengajar" },
        { id: "c", text: "Membantu merencanakan rute bus sekolah dan keamanan jalur pejalan kaki/sepeda[cite: 10, 13]" },
        { id: "d", text: "Membuat siswa tidak perlu masuk kelas" }
      ],
      correct: ["a", "c"],
      explanation: "Data hobi bermanfaat memetakan minat ekstrakurikuler[cite: 14], sedangkan data transportasi membantu perencanaan rute bus dan keamanan akses ke sekolah[cite: 10, 13]."
    },
    {
      id: "q7",
      type: "multi",
      typeLabel: "Pilihan Ganda Kompleks (Pilih lebih dari satu)",
      topic: "Unit 1: Empat Pilar Berpikir Komputasional",
      question: "Manakah yang termasuk ke dalam empat pilar utama berpikir komputasional? (Pilih semua yang benar)",
      options: [
        { id: "a", text: "Dekomposisi" },
        { id: "b", text: "Menebak acak" },
        { id: "c", text: "Pengenalan pola" },
        { id: "d", text: "Abstraksi dan Algoritma" }
      ],
      correct: ["a", "c", "d"],
      explanation: "Empat pilar berpikir komputasional meliputi dekomposisi, pengenalan pola, abstraksi, dan algoritma[cite: 5]."
    },
    {
      id: "q8",
      type: "match",
      typeLabel: "Menjodohkan Konsep",
      topic: "Unit 2 & Unit 4: Pengelolaan Data & Debugging",
      question: "Pasangkan setiap istilah di sebelah kiri dengan contoh atau pengertian yang paling tepat!",
      pairs: [
        { left: "Pengumpulan data", right: "Membagikan kuesioner transportasi siswa di kelas[cite: 7, 13]" },
        { left: "Penyajian data", right: "Membuat diagram batang jumlah peminat ekstrakurikuler[cite: 7, 20]" },
        { left: "Debugging", right: "Menelusuri dan memperbaiki blok kode yang salah pada gim[cite: 31]" },
        { left: "Workspace Scratch", right: "Area tempat menyusun dan menggabungkan blok perintah[cite: 37]" }
      ],
      explanation: "Pengumpulan mengambil data mentah, penyajian menampilkannya dalam grafik/tabel, debugging memperbaiki kesalahan instruksi, dan Workspace adalah area merakit blok Scratch[cite: 7, 31, 37]."
    },
    {
      id: "q9",
      type: "order",
      typeLabel: "Mengurutkan Langkah",
      topic: "Unit 2: Pengelolaan & Penyajian Data",
      question: "Urutkan tahapan pengelolaan data berikut dari awal hingga akhir sesuai alur yang benar!",
      items: [
        "Pengumpulan data (survei atau observasi)",
        "Penyimpanan data (mencatat rapi di tabel/komputer)",
        "Pengolahan data (mengelompokkan dan menghitung frekuensi)",
        "Analisis dan penyajian data (menarik kesimpulan dan membuat grafik)"
      ],
      explanation: "Urutan pengelolaan data dimulai dari Pengumpulan -> Penyimpanan -> Pengolahan -> Analisis -> Penyajian[cite: 7]."
    },
    {
      id: "q10",
      type: "essay",
      typeLabel: "Uraian Singkat (Disimpan sebagai jawaban siswa)",
      topic: "Unit 4: Instruksi & Debugging",
      question: "Mengapa saat membuat gim pilah sampah di Scratch kita perlu melakukan proses debugging sebelum gim dimainkan teman sekelas?",
      rubricHint: "Contoh jawaban baik: Agar jika ada kesalahan seperti sampah masuk ke tong yang salah atau skor tidak bertambah, kesalahannya dapat ditemukan dan diperbaiki sehingga gim berjalan sesuai aturan[cite: 31]."
    },
    {
      id: "q11",
      type: "essay",
      typeLabel: "Uraian Singkat (Disimpan sebagai jawaban siswa)",
      topic: "Unit 1 & Unit 3: Penerapan Sehari-hari",
      question: "Ceritakan satu masalah sederhana di rumah atau sekolah (misalnya antrean panjang di kantin atau membagi tugas kelompok) dan jelaskan langkah menyelesaikannya!",
      rubricHint: "Contoh jawaban baik: Mengamati penyebab antrean (memahami masalah), membagi jam istirahat atau jalur antre (membuat rencana/dekomposisi), mencobanya, lalu mengevaluasi hasilnya[cite: 22, 45]."
    }
  ],

  /* Tabel Refleksi Buku Halaman 46 */
  reflectionItems: [
    "Mengumpulkan data sederhana dari kehidupan sehari-hari[cite: 46].",
    "Mengelompokkan dan menghitung data yang sudah dikumpulkan[cite: 46].",
    "Menyajikan data dalam bentuk tabel atau grafik[cite: 46].",
    "Memahami masalah sederhana yang terjadi di sekolah atau rumah[cite: 46].",
    "Membuat rencana atau langkah-langkah untuk menyelesaikan masalah[cite: 46].",
    "Menjelaskan kembali cara berpikir saya dalam menyelesaikan masalah[cite: 46].",
    "Menyusun instruksi atau petunjuk yang jelas dan bisa dipahami orang lain[cite: 46].",
    "Menguji dan memperbaiki (debugging) instruksi agar dapat berjalan dengan baik[cite: 46]."
  ]
};