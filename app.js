/* =========================================================
   LOGIKA INTERAKTIF MODUL KKA BAB 1 (BERPIKIR KOMPUTASIONAL)
   Vanilla JavaScript • Offline-first • Versioned localStorage
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     KONFIGURASI APLIKASI & KODE AKTIVASI GURU (DEMO)
     PENTING: Pengelola situs wajib mengganti DEMO_TEACHER_ACTIVATION_CODE
     sebelum dipublikasikan ke GitHub Pages.
     --------------------------------------------------------- */
  const APP_CONFIG = {
    STORAGE_KEY: "kka_kelas7_bab1_state",
    SCHEMA_VERSION: 1,
    DEMO_TEACHER_ACTIVATION_CODE: "GURU-KKA7",
    TEACHER_CODE_PREFIX: "KKA7-"
  };

  /* ---------------------------------------------------------
     STATE DEFAULT & MANAJEMEN LOCALSTORAGE BER-VERSI
     --------------------------------------------------------- */
  function createDefaultState() {
    return {
      version: APP_CONFIG.SCHEMA_VERSION,
      student: {
        nickname: "",
        warmupAnswer: null,
        completedUnits: {
          "unit-1": false,
          "unit-2": false,
          "unit-3": false,
          "unit-4": false,
          "unit-5": false
        },
        evaluation: {
          answers: {},
          submitted: false,
          scorePct: 0,
          autoCorrectCount: 0,
          autoTotalCount: 9,
          weakTopics: [],
          completedAt: null
        },
        reflection: {
          checks: {},
          note: ""
        },
        linkedTeacherCode: ""
      },
      teacher: {
        unlocked: false,
        name: "",
        contactType: "whatsapp",
        contactValue: ""
      }
    };
  }

  function loadState() {
    const fallback = createDefaultState();
    try {
      const raw = window.localStorage.getItem(APP_CONFIG.STORAGE_KEY);
      if (!raw) return fallback;

      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || parsed.version !== APP_CONFIG.SCHEMA_VERSION) {
        showBanner("Data penyimpanan lokal versi lama atau tidak sesuai format telah diatur ulang dengan aman.", "info");
        return fallback;
      }

      return {
        version: APP_CONFIG.SCHEMA_VERSION,
        student: {
          ...fallback.student,
          ...(parsed.student || {}),
          completedUnits: {
            ...fallback.student.completedUnits,
            ...((parsed.student && parsed.student.completedUnits) || {})
          },
          evaluation: {
            ...fallback.student.evaluation,
            ...((parsed.student && parsed.student.evaluation) || {})
          },
          reflection: {
            ...fallback.student.reflection,
            ...((parsed.student && parsed.student.reflection) || {})
          }
        },
        teacher: {
          ...fallback.teacher,
          ...(parsed.teacher || {})
        }
      };
    } catch (err) {
      console.error("Gagal membaca localStorage:", err);
      showBanner("Terjadi kendala saat membaca penyimpanan lokal browser. State default digunakan.", "info");
      return fallback;
    }
  }

  let appState = loadState();

  function saveState() {
    try {
      window.localStorage.setItem(APP_CONFIG.STORAGE_KEY, JSON.stringify(appState));
      updateGlobalProgress();
    } catch (err) {
      console.error("Gagal menyimpan ke localStorage:", err);
      showBanner("Penyimpanan browser penuh atau diblokir. Progres mungkin tidak tersimpan setelah halaman ditutup.", "info");
    }
  }

  /* ---------------------------------------------------------
     UTILITAS UMUM
     --------------------------------------------------------- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function showBanner(message) {
    const banner = document.getElementById("status-banner");
    if (!banner) return;
    banner.textContent = message;
    banner.classList.remove("hidden");
    window.clearTimeout(banner._timer);
    banner._timer = window.setTimeout(() => {
      banner.classList.add("hidden");
    }, 5000);
  }

  function encodeBase64Unicode(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return window.btoa(binary);
  }

  function decodeBase64Unicode(base64) {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  }

  function normalizeWhatsAppNumber(raw) {
    let digits = String(raw || "").replace(/\D/g, "");
    if (digits.startsWith("0")) {
      digits = "62" + digits.slice(1);
    }
    return digits;
  }

  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showBanner(successMsg || "Teks berhasil disalin ke papan klip."),
        () => fallbackCopy(text, successMsg)
      );
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
      showBanner(successMsg || "Teks berhasil disalin.");
    } catch (e) {
      showBanner("Gagal menyalin otomatis. Silakan salin teks secara manual dari kotak.");
    }
    document.body.removeChild(ta);
  }

  /* ---------------------------------------------------------
     PROGRES GLOBAL & NAVIGASI VIEW
     --------------------------------------------------------- */
  let currentView = "beranda";
  let activeUnitIndex = 0;
  let activeEvalIndex = 0;

  function updateGlobalProgress() {
    const unitsDone = Object.values(appState.student.completedUnits).filter(Boolean).length;
    const evalDone = appState.student.evaluation.submitted ? 1 : 0;
    const reflectionCount = Object.keys(appState.student.reflection.checks).length;
    const reflectionDone = reflectionCount >= KKA_BAB1_DATA.reflectionItems.length ? 1 : 0;

    // Total 7 milestone utama: 5 unit + 1 evaluasi + 1 refleksi lengkap
    const totalMilestones = 7;
    const completed = unitsDone + evalDone + reflectionDone;
    const pct = Math.round((completed / totalMilestones) * 100);

    const pctEl = document.getElementById("global-progress-pct");
    const fillEl = document.getElementById("global-progress-fill");
    const barEl = document.getElementById("global-progress-bar");

    if (pctEl) pctEl.textContent = pct + "%";
    if (fillEl) fillEl.style.width = pct + "%";
    if (barEl) barEl.setAttribute("aria-valuenow", String(pct));

    // Update badge unit di tab materi
    const unitBadge = document.getElementById("unit-completion-badge");
    if (unitBadge) {
      unitBadge.textContent = `${unitsDone} / 5 Unit Selesai`;
    }

    KKA_BAB1_DATA.units.forEach((u, idx) => {
      const statusSpan = document.getElementById(`status-unit-${idx}`);
      if (statusSpan) {
        const isDone = Boolean(appState.student.completedUnits[u.id]);
        statusSpan.textContent = isDone ? "✓" : "○";
        statusSpan.classList.toggle("done", isDone);
        statusSpan.setAttribute("aria-label", isDone ? "Selesai" : "Belum selesai");
      }
    });
  }

  function switchView(viewName) {
    currentView = viewName;
    document.querySelectorAll(".view-section").forEach((sec) => {
      sec.classList.add("hidden");
      sec.classList.remove("active");
    });

    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.remove("hidden");
      target.classList.add("active");
    }

    document.querySelectorAll(".nav-btn").forEach((btn) => {
      const isMatch = btn.getAttribute("data-view") === viewName;
      btn.classList.toggle("active", isMatch);
      if (isMatch) {
        btn.setAttribute("aria-current", "page");
      } else {
        btn.removeAttribute("aria-current");
      }
    });

    if (viewName === "materi") renderUnit(activeUnitIndex);
    if (viewName === "evaluasi") renderEvaluation();
    if (viewName === "refleksi") renderReflection();
    if (viewName === "guru") renderTeacherArea();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------------------------------------------------
     VIEW 1: BERANDA & FORMATIF AWAL
     --------------------------------------------------------- */
  function initBeranda() {
    const nicknameInput = document.getElementById("student-nickname");
    const saveNickBtn = document.getElementById("btn-save-nickname");

    if (nicknameInput) {
      nicknameInput.value = appState.student.nickname || "";
    }

    if (saveNickBtn) {
      saveNickBtn.addEventListener("click", () => {
        appState.student.nickname = nicknameInput.value.trim();
        saveState();
        showBanner(
          appState.student.nickname
            ? `Nama panggilan "${appState.student.nickname}" tersimpan di perangkat ini.`
            : "Nama panggilan dikosongkan."
        );
      });
    }

    renderWarmup();
  }

  function renderWarmup() {
    const container = document.getElementById("warmup-container");
    const feedbackEl = document.getElementById("warmup-feedback");
    if (!container || !feedbackEl) return;

    const w = KKA_BAB1_DATA.warmup;
    let html = `<p style="grid-column: 1 / -1; margin: 0 0 6px; font-weight: 600;">${escapeHtml(w.question)}</p>`;

    w.options.forEach((opt) => {
      const isSelected = appState.student.warmupAnswer === opt.id;
      html += `
        <button type="button" class="btn choice-btn ${isSelected ? "selected" : ""}" data-warmup-id="${opt.id}">
          ${escapeHtml(opt.text)}
        </button>
      `;
    });

    container.innerHTML = html;

    if (appState.student.warmupAnswer) {
      const chosen = w.options.find((o) => o.id === appState.student.warmupAnswer);
      if (chosen) {
        feedbackEl.textContent = chosen.feedback;
        feedbackEl.className = `feedback-box ${chosen.id === "b" ? "success" : "info"}`;
      }
    }

    container.querySelectorAll("[data-warmup-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        appState.student.warmupAnswer = btn.getAttribute("data-warmup-id");
        saveState();
        renderWarmup();
      });
    });
  }

  /* ---------------------------------------------------------
     VIEW 2: MATERI & 5 AKTIVITAS INTERAKTIF
     --------------------------------------------------------- */
  function markUnitCompleted(unitId) {
    if (!appState.student.completedUnits[unitId]) {
      appState.student.completedUnits[unitId] = true;
      saveState();
    }
  }

  function renderUnit(index) {
    activeUnitIndex = Math.max(0, Math.min(index, KKA_BAB1_DATA.units.length - 1));
    const unit = KKA_BAB1_DATA.units[activeUnitIndex];

    document.querySelectorAll(".unit-tab").forEach((tab, idx) => {
      const isSelected = idx === activeUnitIndex;
      tab.classList.toggle("active", isSelected);
      tab.setAttribute("aria-selected", String(isSelected));
    });

    const prevBtn = document.getElementById("btn-prev-unit");
    const nextBtn = document.getElementById("btn-next-unit");
    if (prevBtn) prevBtn.disabled = activeUnitIndex === 0;
    if (nextBtn) {
      nextBtn.textContent =
        activeUnitIndex === KKA_BAB1_DATA.units.length - 1
          ? "Lanjut ke Evaluasi Akhir →"
          : "Unit Berikutnya →";
    }

    const panel = document.getElementById("unit-content-area");
    if (!panel) return;

    const isDone = Boolean(appState.student.completedUnits[unit.id]);

    let html = `
      <div class="activity-header">
        <span class="pill pill-primary">Unit ${activeUnitIndex + 1} dari ${KKA_BAB1_DATA.units.length}</span>
        <span class="pill ${isDone ? "pill-success" : ""}">${isDone ? "✓ Unit Selesai" : "Selesaikan aktivitas untuk menandai selesai"}</span>
      </div>
      <h3>${escapeHtml(unit.title)}</h3>
      <p>${escapeHtml(unit.summary)}</p>

      <div class="concept-grid">
        ${unit.concepts
          .map(
            (c) => `
          <div class="concept-card">
            <h4>${escapeHtml(c.name)}</h4>
            <p>${escapeHtml(c.desc)}</p>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    if (unit.enrichment) {
      html += `
        <div class="enrichment-box">
          <span class="pill pill-enrichment">Pengayaan</span>
          <strong>${escapeHtml(unit.enrichment.title)}</strong>
          <p style="margin: 6px 0 0;">${escapeHtml(unit.enrichment.text)}</p>
        </div>
      `;
    }

    html += `<div id="unit-activity-mount" class="activity-box"></div>`;
    panel.innerHTML = html;

    const mount = document.getElementById("unit-activity-mount");
    if (unit.activityType === "pillars") renderActivityPillars(mount, unit.id);
    if (unit.activityType === "data") renderActivityData(mount, unit.id);
    if (unit.activityType === "polya_parking") renderActivityPolyaParking(mount, unit.id);
    if (unit.activityType === "debugging") renderActivityDebugging(mount, unit.id);
    if (unit.activityType === "trash_game") renderActivityTrashGame(mount, unit.id);
  }

  /* AKTIVITAS 1: Tantangan 4 Pilar Berpikir Komputasional */
  function renderActivityPillars(mount, unitId) {
    const items = KKA_BAB1_DATA.pillarChallenge;
    const pillarChoices = ["Dekomposisi", "Pengenalan Pola", "Abstraksi", "Algoritma"];
    const userSelections = {};

    function draw() {
      let html = `
        <div class="activity-header">
          <h3>Aktivitas 1: Tebak Pilar Berpikir Komputasional</h3>
          <button type="button" id="act1-reset" class="btn btn-secondary btn-sm">Ulangi</button>
        </div>
        <p class="muted">Pilih pilar berpikir komputasional yang paling sesuai untuk masing-masing situasi sehari-hari berikut:</p>
      `;

      items.forEach((item, idx) => {
        html += `
          <div class="card" style="padding: 12px; margin-bottom: 10px;">
            <p style="margin: 0 0 8px;"><strong>Situasi ${idx + 1}:</strong> ${escapeHtml(item.scenario)}</p>
            <label for="sel-${item.id}">Pilih Pilar:</label>
            <select id="sel-${item.id}" data-pillar-item="${item.id}">
              <option value="">-- Pilih salah satu pilar --</option>
              ${pillarChoices
                .map(
                  (p) =>
                    `<option value="${escapeHtml(p)}" ${userSelections[item.id] === p ? "selected" : ""}>${escapeHtml(p)}</option>`
                )
                .join("")}
            </select>
          </div>
        `;
      });

      html += `
        <button type="button" id="act1-check" class="btn btn-primary">Periksa Jawaban</button>
        <div id="act1-feedback" class="feedback-box hidden" role="status"></div>
      `;

      mount.innerHTML = html;

      mount.querySelectorAll("[data-pillar-item]").forEach((sel) => {
        sel.addEventListener("change", () => {
          userSelections[sel.getAttribute("data-pillar-item")] = sel.value;
        });
      });

      document.getElementById("act1-reset").addEventListener("click", () => {
        Object.keys(userSelections).forEach((k) => delete userSelections[k]);
        draw();
      });

      document.getElementById("act1-check").addEventListener("click", () => {
        const fb = document.getElementById("act1-feedback");
        let correctCount = 0;
        const notes = [];

        items.forEach((item, idx) => {
          const picked = userSelections[item.id];
          if (picked === item.answer) {
            correctCount++;
            notes.push(`<li><strong>Situasi ${idx + 1} (Benar):</strong> ${escapeHtml(item.explanation)}</li>`);
          } else {
            notes.push(
              `<li><strong>Situasi ${idx + 1} (Perlu diperbaiki):</strong> Jawabanmu "${escapeHtml(
                picked || "belum dipilih"
              )}". Seharusnya <strong>${escapeHtml(item.answer)}</strong>. ${escapeHtml(item.explanation)}</li>`
            );
          }
        });

        fb.classList.remove("hidden");
        if (correctCount === items.length) {
          fb.className = "feedback-box success";
          fb.innerHTML = `<strong>Luar biasa! Semua (${correctCount}/${items.length}) tepat. Unit 1 selesai!</strong><ul>${notes.join("")}</ul>`;
          markUnitCompleted(unitId);
          renderUnit(activeUnitIndex);
        } else {
          fb.className = "feedback-box error";
          fb.innerHTML = `<strong>Skor kamu: ${correctCount} dari ${items.length} benar.</strong> Coba perbaiki yang masih keliru:<ul>${notes.join("")}</ul>`;
        }
      });
    }

    draw();
  }

  /* AKTIVITAS 2: Pengelolaan Data & Diagram Batang */
  function renderActivityData(mount, unitId) {
    const dc = KKA_BAB1_DATA.dataChallenge;
    const counts = { "Sepeda": 0, "Jalan Kaki": 0, "Diantar Motor": 0, "Angkutan/Bus": 0 };
    let dominantGuess = "";

    function draw() {
      const maxVal = 8;
      let html = `
        <div class="activity-header">
          <h3>Aktivitas 2: Mengolah Data Transportasi Kelas 7B</h3>
          <button type="button" id="act2-reset" class="btn btn-secondary btn-sm">Ulangi</button>
        </div>
        <p class="muted">Perhatikan catatan survei 16 siswa di bawah ini. Hitung frekuensi tiap moda transportasi dengan tombol <strong>+</strong> atau <strong>-</strong>, perhatikan perubahan diagram batangnya, lalu pilih kesimpulan terbanyak.</p>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr><th>No</th><th>Nama</th><th>Moda</th><th>No</th><th>Nama</th><th>Moda</th></tr>
            </thead>
            <tbody>
              ${Array.from({ length: 8 })
                .map((_, r) => {
                  const left = dc.records[r];
                  const right = dc.records[r + 8];
                  return `<tr>
                    <td>${r + 1}</td><td>${escapeHtml(left.nama)}</td><td>${escapeHtml(left.moda)}</td>
                    <td>${r + 9}</td><td>${escapeHtml(right.nama)}</td><td>${escapeHtml(right.moda)}</td>
                  </tr>`;
                })
                .join("")}
            </tbody>
          </table>
        </div>

        <h4>1. Pengolahan Data (Tabel Frekuensi)</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr><th>Moda Transportasi</th><th>Atur Jumlah Siswa</th><th>Frekuensi</th></tr>
            </thead>
            <tbody>
              ${dc.categories
                .map(
                  (cat) => `
                <tr>
                  <td><strong>${escapeHtml(cat)}</strong></td>
                  <td>
                    <button type="button" class="icon-btn" data-dec="${escapeHtml(cat)}" aria-label="Kurangi jumlah ${escapeHtml(cat)}">-</button>
                    <button type="button" class="icon-btn" data-inc="${escapeHtml(cat)}" aria-label="Tambah jumlah ${escapeHtml(cat)}">+</button>
                  </td>
                  <td><strong>${counts[cat]}</strong> siswa</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <h4>2. Penyajian Data (Diagram Batang Otomatis)</h4>
        <div class="bar-chart" aria-label="Diagram batang transportasi kelas 7B">
          ${dc.categories
            .map((cat) => {
              const widthPct = Math.min(100, Math.round((counts[cat] / maxVal) * 100));
              return `
              <div class="bar-row">
                <span>${escapeHtml(cat)}</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${widthPct}%"></div>
                </div>
                <strong>${counts[cat]}</strong>
              </div>
            `;
            })
            .join("")}
        </div>

        <h4>3. Analisis Data</h4>
        <label for="act2-dominant">Moda transportasi manakah yang PALING BANYAK digunakan siswa Kelas 7B?</label>
        <select id="act2-dominant">
          <option value="">-- Pilih moda terbanyak --</option>
          ${dc.categories
            .map(
              (cat) =>
                `<option value="${escapeHtml(cat)}" ${dominantGuess === cat ? "selected" : ""}>${escapeHtml(cat)}</option>`
            )
            .join("")}
        </select>

        <div class="button-row">
          <button type="button" id="act2-check" class="btn btn-primary">Periksa Pengolahan &amp; Analisis</button>
        </div>
        <div id="act2-feedback" class="feedback-box hidden" role="status"></div>
      `;

      mount.innerHTML = html;

      mount.querySelectorAll("[data-inc]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const cat = btn.getAttribute("data-inc");
          if (counts[cat] < 16) counts[cat]++;
          draw();
        });
      });

      mount.querySelectorAll("[data-dec]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const cat = btn.getAttribute("data-dec");
          if (counts[cat] > 0) counts[cat]--;
          draw();
        });
      });

      document.getElementById("act2-dominant").addEventListener("change", (e) => {
        dominantGuess = e.target.value;
      });

      document.getElementById("act2-reset").addEventListener("click", () => {
        dc.categories.forEach((c) => (counts[c] = 0));
        dominantGuess = "";
        draw();
      });

      document.getElementById("act2-check").addEventListener("click", () => {
        const fb = document.getElementById("act2-feedback");
        const freqOk = dc.categories.every((c) => counts[c] === dc.correctCounts[c]);
        const analysisOk = dominantGuess === "Sepeda";

        fb.classList.remove("hidden");
        if (freqOk && analysisOk) {
          fb.className = "feedback-box success";
          fb.innerHTML =
            "<strong>Tepat sekali!</strong> Rincian frekuensi: Sepeda (7), Jalan Kaki (4), Diantar Motor (3), dan Angkutan/Bus (2). Moda terbanyak adalah <strong>Sepeda</strong>. Unit 2 selesai!";
          markUnitCompleted(unitId);
          renderUnit(activeUnitIndex);
        } else {
          fb.className = "feedback-box error";
          let msg = "<strong>Belum seluruhnya tepat:</strong><ul>";
          if (!freqOk) {
            msg += "<li>Periksa kembali hitungan tabel survei. Pastikan total semua kategori berjumlah 16 siswa.</li>";
          }
          if (!analysisOk) {
            msg += "<li>Pilih moda transportasi dengan batang tertinggi / frekuensi terbanyak pada pertanyaan analisis.</li>";
          }
          msg += "</ul>";
          fb.innerHTML = msg;
        }
      });
    }

    draw();
  }

  /* AKTIVITAS 3: Urutan Langkah Polya & Teka-Teki Parkir */
  function renderActivityPolyaParking(mount, unitId) {
    let polyaList = [
      KKA_BAB1_DATA.polyaStepsCorrect[2],
      KKA_BAB1_DATA.polyaStepsCorrect[0],
      KKA_BAB1_DATA.polyaStepsCorrect[3],
      KKA_BAB1_DATA.polyaStepsCorrect[1]
    ];
    let parkingChoice = "";

    function draw() {
      const pp = KKA_BAB1_DATA.parkingPuzzle;
      let html = `
        <div class="activity-header">
          <h3>Aktivitas 3: Urutkan Langkah Polya &amp; Tantangan Parkir</h3>
          <button type="button" id="act3-reset" class="btn btn-secondary btn-sm">Ulangi</button>
        </div>

        <h4>Bagian A: Urutkan Langkah Pemecahan Masalah George Polya</h4>
        <p class="muted">Gunakan tombol <strong>↑</strong> dan <strong>↓</strong> untuk menyusun langkah Polya dari urutan pertama hingga terakhir:</p>
        <ul class="order-list">
          ${polyaList
            .map(
              (step, idx) => `
            <li class="order-item">
              <span class="order-item-text">${escapeHtml(step)}</span>
              <div class="order-actions">
                <button type="button" class="icon-btn" data-up="${idx}" ${idx === 0 ? "disabled" : ""} aria-label="Geser ke atas">↑</button>
                <button type="button" class="icon-btn" data-down="${idx}" ${idx === polyaList.length - 1 ? "disabled" : ""} aria-label="Geser ke bawah">↓</button>
              </div>
            </li>
          `
            )
            .join("")}
        </ul>

        <h4>Bagian B: Teka-teki Posisi &amp; Urutan Parkir</h4>
        <p>${escapeHtml(pp.prompt)}</p>
        <pre class="parking-diagram" aria-label="Ilustrasi posisi parkir mobil">${escapeHtml(pp.diagram)}</pre>
        <div class="warmup-grid">
          ${pp.options
            .map(
              (opt) => `
            <button type="button" class="btn choice-btn ${parkingChoice === opt.id ? "selected" : ""}" data-park="${opt.id}">
              ${escapeHtml(opt.label)}
            </button>
          `
            )
            .join("")}
        </div>

        <div class="button-row">
          <button type="button" id="act3-check" class="btn btn-primary">Periksa Kedua Jawaban</button>
        </div>
        <div id="act3-feedback" class="feedback-box hidden" role="status"></div>
      `;

      mount.innerHTML = html;

      mount.querySelectorAll("[data-up]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = Number(btn.getAttribute("data-up"));
          if (i > 0) {
            [polyaList[i - 1], polyaList[i]] = [polyaList[i], polyaList[i - 1]];
            draw();
          }
        });
      });

      mount.querySelectorAll("[data-down]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = Number(btn.getAttribute("data-down"));
          if (i < polyaList.length - 1) {
            [polyaList[i], polyaList[i + 1]] = [polyaList[i + 1], polyaList[i]];
            draw();
          }
        });
      });

      mount.querySelectorAll("[data-park]").forEach((btn) => {
        btn.addEventListener("click", () => {
          parkingChoice = btn.getAttribute("data-park");
          draw();
        });
      });

      document.getElementById("act3-reset").addEventListener("click", () => {
        polyaList = [
          KKA_BAB1_DATA.polyaStepsCorrect[2],
          KKA_BAB1_DATA.polyaStepsCorrect[0],
          KKA_BAB1_DATA.polyaStepsCorrect[3],
          KKA_BAB1_DATA.polyaStepsCorrect[1]
        ];
        parkingChoice = "";
        draw();
      });

      document.getElementById("act3-check").addEventListener("click", () => {
        const fb = document.getElementById("act3-feedback");
        const polyaOk = polyaList.every((val, i) => val === KKA_BAB1_DATA.polyaStepsCorrect[i]);
        const parkOk = parkingChoice === pp.correctId;

        fb.classList.remove("hidden");
        if (polyaOk && parkOk) {
          fb.className = "feedback-box success";
          fb.innerHTML = `<strong>Sempurna!</strong> Urutan langkah Polya sudah tepat dan analisis parkirmu benar: ${escapeHtml(pp.explanation)} Unit 3 selesai!`;
          markUnitCompleted(unitId);
          renderUnit(activeUnitIndex);
        } else {
          fb.className = "feedback-box error";
          let msg = "<strong>Masih ada bagian yang perlu diperbaiki:</strong><ul>";
          if (!polyaOk) {
            msg += "<li>Urutan Polya harus dimulai dari: Memahami masalah → Membuat rencana → Melaksanakan rencana → Memeriksa kembali hasil[cite: 22].</li>";
          }
          if (!parkOk) {
            msg += "<li>Pada teka-teki parkir, amati mobil yang terhalang sekaligus jalur geser mobil di depannya yang juga tertahan mobil lain[cite: 25].</li>";
          }
          msg += "</ul>";
          fb.innerHTML = msg;
        }
      });
    }

    draw();
  }

  /* AKTIVITAS 4: Instruksi & Debugging */
  function renderActivityDebugging(mount, unitId) {
    const dt = KKA_BAB1_DATA.debuggingTask;
    let steps = [...dt.buggySteps];

    function draw() {
      let html = `
        <div class="activity-header">
          <h3>Aktivitas 4: Temukan &amp; Perbaiki Bug Instruksi (Debugging)</h3>
          <button type="button" id="act4-reset" class="btn btn-secondary btn-sm">Reset Urutan Awal</button>
        </div>
        <p><strong>${escapeHtml(dt.goal)}</strong></p>
        <p class="muted">Susunan instruksi di bawah ini masih keliru (<em>buggy</em>) sehingga hasilnya tidak tepat. Perbaiki urutannya menggunakan tombol <strong>↑</strong> dan <strong>↓</strong>:</p>

        <ul class="order-list">
          ${steps
            .map(
              (st, idx) => `
            <li class="order-item">
              <span class="order-item-text"><strong>Langkah ${idx + 1}:</strong> ${escapeHtml(st)}</span>
              <div class="order-actions">
                <button type="button" class="icon-btn" data-up="${idx}" ${idx === 0 ? "disabled" : ""} aria-label="Naikkan langkah">↑</button>
                <button type="button" class="icon-btn" data-down="${idx}" ${idx === steps.length - 1 ? "disabled" : ""} aria-label="Turunkan langkah">↓</button>
              </div>
            </li>
          `
            )
            .join("")}
        </ul>

        <button type="button" id="act4-run" class="btn btn-primary">Uji Jalankan Instruksi</button>
        <div id="act4-feedback" class="feedback-box hidden" role="status"></div>
      `;

      mount.innerHTML = html;

      mount.querySelectorAll("[data-up]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = Number(btn.getAttribute("data-up"));
          if (i > 0) {
            [steps[i - 1], steps[i]] = [steps[i], steps[i - 1]];
            draw();
          }
        });
      });

      mount.querySelectorAll("[data-down]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = Number(btn.getAttribute("data-down"));
          if (i < steps.length - 1) {
            [steps[i], steps[i + 1]] = [steps[i + 1], steps[i]];
            draw();
          }
        });
      });

      document.getElementById("act4-reset").addEventListener("click", () => {
        steps = [...dt.buggySteps];
        draw();
      });

      document.getElementById("act4-run").addEventListener("click", () => {
        const fb = document.getElementById("act4-feedback");
        const idxBuku = steps.indexOf("Simpan harga Buku = 15000.");
        const idxPensil = steps.indexOf("Simpan harga Pensil = 5000.");
        const idxHitung = steps.indexOf("Hitung Total = Buku + Pensil.");
        const idxTampil = steps.indexOf("Tampilkan nilai variabel Total di layar.");

        const valid = idxBuku < idxHitung && idxPensil < idxHitung && idxHitung < idxTampil;
        fb.classList.remove("hidden");

        if (valid) {
          fb.className = "feedback-box success";
          fb.innerHTML = `<strong>Program berjalan sukses! Output layar: Rp20.000.</strong><br>${escapeHtml(dt.explanation)} Unit 4 selesai!`;
          markUnitCompleted(unitId);
          renderUnit(activeUnitIndex);
        } else {
          fb.className = "feedback-box error";
          fb.innerHTML =
            "<strong>Masih terjadi Bug!</strong> Pastikan nilai Buku dan Pensil sudah disimpan sebelum dihitung ke dalam variabel Total, dan perintah menampilkan hasil berada di paling akhir.";
        }
      });
    }

    draw();
  }

  /* AKTIVITAS 5: Simulasi Gim Pilah Sampah (Tap & Drag-and-Drop) */
  function renderActivityTrashGame(mount, unitId) {
    let remaining = [...KKA_BAB1_DATA.trashItems];
    let selectedTrashId = null;
    let score = 0;
    let mistakes = 0;
    let lastFeedback = {
      type: "info",
      text: "Aturan permainan: Tong Hijau = Sampah Organik | Tong Kuning = Sampah Anorganik. Ketuk (tap) satu benda sampah lalu ketuk tong tujuan, atau seret (drag-and-drop) ke tong yang sesuai."
    };

    function handleDropToBin(trashId, targetCategory) {
      const idx = remaining.findIndex((t) => t.id === trashId);
      if (idx === -1) return;

      const item = remaining[idx];
      selectedTrashId = null;

      if (item.category === targetCategory) {
        score += 10;
        remaining.splice(idx, 1);
        lastFeedback = {
          type: "success",
          text: `Benar! "${item.name}" masuk ke kategori ${targetCategory.toUpperCase()} (+10 poin). ${item.hint}`
        };
        if (remaining.length === 0) {
          markUnitCompleted(unitId);
        }
      } else {
        mistakes += 1;
        lastFeedback = {
          type: "error",
          text: `Kurang tepat! "${item.name}" bukan sampah ${targetCategory.toUpperCase()}. Petunjuk: ${item.hint}`
        };
      }

      if (remaining.length === 0) {
        renderUnit(activeUnitIndex);
      } else {
        draw();
      }
    }

    function draw() {
      const isFinished = remaining.length === 0;
      let html = `
        <div class="activity-header">
          <h3>Aktivitas 5: Simulasi Gim Pilah Sampah (Logika Scratch)</h3>
          <button type="button" id="act5-reset" class="btn btn-secondary btn-sm">Main Ulang</button>
        </div>

        <div class="card" style="padding: 12px; margin-bottom: 12px; background: #fff;">
          <strong>Cuplikan Logika Blok Scratch:</strong><br>
          <span class="scratch-block blk-event">ketika bendera hijau diklik</span>
          <span class="scratch-block blk-sensing">jika menyentuh Tong Hijau (Organik)?</span>
          <span class="scratch-block blk-var">ubah Poin sebesar 10</span>
          <span class="scratch-block blk-looks">katakan "Berhasil!" selama 2 detik</span>
        </div>

        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-weight: 700;">
          <span>Skor Poin: ${score} / ${KKA_BAB1_DATA.trashItems.length * 10}</span>
          <span>Sisa Benda: ${remaining.length} | Kekeliruan: ${mistakes}</span>
        </div>
      `;

      if (!isFinished) {
        html += `
          <p class="small-text muted" style="margin-bottom: 4px;">1) Pilih benda sampah di bawah ini (ketuk atau seret):</p>
          <div class="trash-pool" role="group" aria-label="Daftar benda sampah yang belum dipilah">
            ${remaining
              .map(
                (item) => `
              <button type="button"
                class="trash-item-btn ${selectedTrashId === item.id ? "active-selected" : ""}"
                draggable="true"
                data-trash-id="${item.id}"
                aria-pressed="${selectedTrashId === item.id}">
                ${escapeHtml(item.name)}
              </button>
            `
              )
              .join("")}
          </div>

          <p class="small-text muted" style="margin-bottom: 4px;">2) Masukkan ke tong sampah yang tepat:</p>
          <div class="bins-grid">
            <button type="button" class="bin-target bin-organik" data-bin="organik">
              <strong>TONG HIJAU: ORGANIK</strong>
              <span class="small-text">Sisa makanan, daun, mudah terurai alami</span>
            </button>
            <button type="button" class="bin-target bin-anorganik" data-bin="anorganik">
              <strong>TONG KUNING: ANORGANIK</strong>
              <span class="small-text">Plastik, kaleng, sulit terurai tanah</span>
            </button>
          </div>
        `;
      } else {
        html += `
          <div class="feedback-box success">
            <strong>Selamat! Semua sampah berhasil dipilah dengan benar!</strong>
            <p style="margin: 6px 0 0;">Skor akhir: <strong>${score}</strong> poin dengan <strong>${mistakes}</strong> kali percobaan keliru. Seluruh 5 unit materi Bab 1 telah selesai!</p>
          </div>
        `;
      }

      html += `<div class="feedback-box ${lastFeedback.type}" role="status">${escapeHtml(lastFeedback.text)}</div>`;
      mount.innerHTML = html;

      // Event Tap untuk ponsel/keyboard
      mount.querySelectorAll("[data-trash-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-trash-id");
          selectedTrashId = selectedTrashId === id ? null : id;
          draw();
        });

        btn.addEventListener("dragstart", (e) => {
          selectedTrashId = btn.getAttribute("data-trash-id");
          if (e.dataTransfer) {
            e.dataTransfer.setData("text/plain", selectedTrashId);
          }
        });
      });

      // Event Tap & Drop pada Tong Sampah
      mount.querySelectorAll("[data-bin]").forEach((bin) => {
        const binCat = bin.getAttribute("data-bin");

        bin.addEventListener("click", () => {
          if (!selectedTrashId) {
            showBanner("Ketuk salah satu benda sampah terlebih dahulu sebelum memilih tong.");
            return;
          }
          handleDropToBin(selectedTrashId, binCat);
        });

        bin.addEventListener("dragover", (e) => {
          e.preventDefault();
          bin.classList.add("drag-over");
        });

        bin.addEventListener("dragleave", () => {
          bin.classList.remove("drag-over");
        });

        bin.addEventListener("drop", (e) => {
          e.preventDefault();
          bin.classList.remove("drag-over");
          const draggedId = (e.dataTransfer && e.dataTransfer.getData("text/plain")) || selectedTrashId;
          if (draggedId) {
            handleDropToBin(draggedId, binCat);
          }
        });
      });

      document.getElementById("act5-reset").addEventListener("click", () => {
        remaining = [...KKA_BAB1_DATA.trashItems];
        selectedTrashId = null;
        score = 0;
        mistakes = 0;
        lastFeedback = {
          type: "info",
          text: "Permainan diulang. Ketuk benda sampah lalu ketuk Tong Hijau (Organik) atau Tong Kuning (Anorganik)."
        };
        draw();
      });
    }

    draw();
  }

  /* ---------------------------------------------------------
     VIEW 3: EVALUASI AKHIR & KIRIM KE GURU
     --------------------------------------------------------- */
  function isQuestionAnswered(q) {
    const ans = appState.student.evaluation.answers[q.id];
    if (q.type === "single") return Boolean(ans);
    if (q.type === "multi") return Array.isArray(ans) && ans.length > 0;
    if (q.type === "match") {
      return ans && typeof ans === "object" && q.pairs.every((_, idx) => Boolean(ans[idx]));
    }
    if (q.type === "order") return Array.isArray(ans) && ans.length === q.items.length;
    if (q.type === "essay") return typeof ans === "string" && ans.trim().length > 0;
    return false;
  }

  function gradeEvaluation() {
    const questions = KKA_BAB1_DATA.evaluationQuestions;
    let correctCount = 0;
    let autoTotal = 0;
    const weakTopicsSet = new Set();

    questions.forEach((q) => {
      if (q.type === "essay") return; // Uraian tidak dinilai otomatis
      autoTotal++;
      const ans = appState.student.evaluation.answers[q.id];
      let isCorrect = false;

      if (q.type === "single") {
        isCorrect = ans === q.correct;
      } else if (q.type === "multi") {
        const sortedUser = Array.isArray(ans) ? [...ans].sort() : [];
        const sortedKey = [...q.correct].sort();
        isCorrect =
          sortedUser.length === sortedKey.length &&
          sortedUser.every((v, i) => v === sortedKey[i]);
      } else if (q.type === "match") {
        isCorrect =
          ans &&
          q.pairs.every((pair, idx) => ans[idx] === pair.right);
      } else if (q.type === "order") {
        isCorrect =
          Array.isArray(ans) &&
          q.items.every((item, idx) => ans[idx] === item);
      }

      if (isCorrect) {
        correctCount++;
      } else {
        weakTopicsSet.add(q.topic);
      }
    });

    const scorePct = autoTotal > 0 ? Math.round((correctCount / autoTotal) * 100) : 0;
    appState.student.evaluation.submitted = true;
    appState.student.evaluation.autoCorrectCount = correctCount;
    appState.student.evaluation.autoTotalCount = autoTotal;
    appState.student.evaluation.scorePct = scorePct;
    appState.student.evaluation.weakTopics = Array.from(weakTopicsSet);
    appState.student.evaluation.completedAt = new Date().toLocaleString("id-ID");
    saveState();
  }

  function renderEvaluation() {
    const questions = KKA_BAB1_DATA.evaluationQuestions;
    const total = questions.length;
    activeEvalIndex = Math.max(0, Math.min(activeEvalIndex, total - 1));
    const q = questions[activeEvalIndex];

    const indicator = document.getElementById("eval-question-indicator");
    const typeBadge = document.getElementById("eval-question-type");
    const dotsEl = document.getElementById("eval-dots");
    const qCard = document.getElementById("eval-question-card");
    const summaryCard = document.getElementById("eval-summary-card");
    const viewSummaryBtn = document.getElementById("btn-view-eval-summary");

    if (viewSummaryBtn) {
      viewSummaryBtn.classList.toggle("hidden", !appState.student.evaluation.submitted);
    }

    if (indicator) indicator.textContent = `Soal ${activeEvalIndex + 1} dari ${total}`;
    if (typeBadge) typeBadge.textContent = q.typeLabel;

    if (dotsEl) {
      dotsEl.innerHTML = questions
        .map((item, idx) => {
          const isCurr = idx === activeEvalIndex;
          const isAns = isQuestionAnswered(item);
          return `<button type="button" class="eval-dot ${isCurr ? "active" : ""} ${
            isAns ? "answered" : ""
          }" data-eval-idx="${idx}" aria-label="Buka soal nomor ${idx + 1}">${idx + 1}</button>`;
        })
        .join("");

      dotsEl.querySelectorAll("[data-eval-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeEvalIndex = Number(btn.getAttribute("data-eval-idx"));
          renderEvaluation();
        });
      });
    }

    // Pastikan default array untuk soal mengurutkan
    if (q.type === "order" && !Array.isArray(appState.student.evaluation.answers[q.id])) {
      appState.student.evaluation.answers[q.id] = [q.items[2], q.items[0], q.items[3], q.items[1]];
    }

    const currentAns = appState.student.evaluation.answers[q.id];
    const isSubmitted = appState.student.evaluation.submitted;

    let bodyHtml = `
      <span class="pill" style="margin-bottom: 8px;">${escapeHtml(q.topic)}</span>
      <h3 style="margin-top: 4px;">${activeEvalIndex + 1}. ${escapeHtml(q.question)}</h3>
    `;

    if (q.type === "single") {
      bodyHtml += `<div class="warmup-grid">
        ${q.options
          .map(
            (opt) => `
          <button type="button" class="btn choice-btn ${currentAns === opt.id ? "selected" : ""}" data-single-opt="${opt.id}">
            <strong>${opt.id.toUpperCase()}.</strong> ${escapeHtml(opt.text)}
          </button>
        `
          )
          .join("")}
      </div>`;
    } else if (q.type === "multi") {
      const arr = Array.isArray(currentAns) ? currentAns : [];
      bodyHtml += `<div class="stacked-form">
        ${q.options
          .map(
            (opt) => `
          <label class="order-item" style="cursor: pointer;">
            <input type="checkbox" data-multi-opt="${opt.id}" ${arr.includes(opt.id) ? "checked" : ""} style="width: 20px; height: 20px;">
            <span class="order-item-text">${escapeHtml(opt.text)}</span>
          </label>
        `
          )
          .join("")}
      </div>`;
    } else if (q.type === "match") {
      const mapAns = currentAns && typeof currentAns === "object" ? currentAns : {};
      const rightOptions = q.pairs.map((p) => p.right);
      bodyHtml += `<div>
        ${q.pairs
          .map(
            (pair, idx) => `
          <div class="match-row">
            <strong>${escapeHtml(pair.left)}</strong>
            <select data-match-idx="${idx}" aria-label="Pasangan untuk ${escapeHtml(pair.left)}">
              <option value="">-- Pilih pasangan yang tepat --</option>
              ${rightOptions
                .map(
                  (rText) =>
                    `<option value="${escapeHtml(rText)}" ${mapAns[idx] === rText ? "selected" : ""}>${escapeHtml(rText)}</option>`
                )
                .join("")}
            </select>
          </div>
        `
          )
          .join("")}
      </div>`;
    } else if (q.type === "order") {
      const list = appState.student.evaluation.answers[q.id];
      bodyHtml += `
        <p class="muted small-text">Gunakan tombol ↑ dan ↓ untuk menyusun urutan yang tepat:</p>
        <ul class="order-list">
          ${list
            .map(
              (txt, idx) => `
            <li class="order-item">
              <span class="order-item-text"><strong>${idx + 1}.</strong> ${escapeHtml(txt)}</span>
              <div class="order-actions">
                <button type="button" class="icon-btn" data-eval-up="${idx}" ${idx === 0 ? "disabled" : ""}>↑</button>
                <button type="button" class="icon-btn" data-eval-down="${idx}" ${idx === list.length - 1 ? "disabled" : ""}>↓</button>
              </div>
            </li>
          `
            )
            .join("")}
        </ul>
      `;
    } else if (q.type === "essay") {
      bodyHtml += `
        <div class="notice-box info">
          <strong>Informasi Penilaian Uraian:</strong> Jawaban uraian disimpan di perangkat dan disertakan pada ringkasan untuk guru, namun <strong>tidak dinilai otomatis</strong> oleh sistem.
        </div>
        <label for="eval-essay-input">Tulis jawabanmu di bawah ini:</label>
        <textarea id="eval-essay-input" rows="4" placeholder="Ketik penjelasanmu dengan bahasa sendiri...">${escapeHtml(currentAns || "")}</textarea>
      `;
    }

    // Umpan balik soal jika sudah disubmit atau tombol cek cepat ditekan
    bodyHtml += `
      <div class="button-row" style="justify-content: space-between; margin-top: 18px;">
        <button type="button" id="btn-eval-prev" class="btn btn-secondary" ${activeEvalIndex === 0 ? "disabled" : ""}>&larr; Sebelumnya</button>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <button type="button" id="btn-eval-check-one" class="btn btn-outline">Cek Pembahasan Soal Ini</button>
          ${
            activeEvalIndex < total - 1
              ? `<button type="button" id="btn-eval-next" class="btn btn-primary">Berikutnya &rarr;</button>`
              : `<button type="button" id="btn-eval-submit-all" class="btn btn-success">Selesai &amp; Hitung Skor Akhir</button>`
          }
        </div>
      </div>
      <div id="eval-single-feedback" class="feedback-box ${isSubmitted ? "info" : "hidden"}" role="status">
        ${
          isSubmitted
            ? q.type === "essay"
              ? `<strong>Jawaban tersimpan.</strong> ${escapeHtml(q.rubricHint)}`
              : `<strong>Pembahasan:</strong> ${escapeHtml(q.explanation)}`
            : ""
        }
      </div>
    `;

    qCard.innerHTML = bodyHtml;

    // Event bindings soal
    qCard.querySelectorAll("[data-single-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        appState.student.evaluation.answers[q.id] = btn.getAttribute("data-single-opt");
        saveState();
        renderEvaluation();
      });
    });

    qCard.querySelectorAll("[data-multi-opt]").forEach((cb) => {
      cb.addEventListener("change", () => {
        const val = cb.getAttribute("data-multi-opt");
        const prev = Array.isArray(appState.student.evaluation.answers[q.id])
          ? [...appState.student.evaluation.answers[q.id]]
          : [];
        if (cb.checked && !prev.includes(val)) prev.push(val);
        if (!cb.checked) {
          const idx = prev.indexOf(val);
          if (idx > -1) prev.splice(idx, 1);
        }
        appState.student.evaluation.answers[q.id] = prev;
        saveState();
        renderEvaluation();
      });
    });

    qCard.querySelectorAll("[data-match-idx]").forEach((sel) => {
      sel.addEventListener("change", () => {
        const idx = sel.getAttribute("data-match-idx");
        const prev =
          appState.student.evaluation.answers[q.id] &&
          typeof appState.student.evaluation.answers[q.id] === "object"
            ? { ...appState.student.evaluation.answers[q.id] }
            : {};
        prev[idx] = sel.value;
        appState.student.evaluation.answers[q.id] = prev;
        saveState();
        renderEvaluation();
      });
    });

    qCard.querySelectorAll("[data-eval-up]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.getAttribute("data-eval-up"));
        const arr = [...appState.student.evaluation.answers[q.id]];
        if (i > 0) {
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
          appState.student.evaluation.answers[q.id] = arr;
          saveState();
          renderEvaluation();
        }
      });
    });

    qCard.querySelectorAll("[data-eval-down]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.getAttribute("data-eval-down"));
        const arr = [...appState.student.evaluation.answers[q.id]];
        if (i < arr.length - 1) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          appState.student.evaluation.answers[q.id] = arr;
          saveState();
          renderEvaluation();
        }
      });
    });

    const essayInput = document.getElementById("eval-essay-input");
    if (essayInput) {
      essayInput.addEventListener("input", () => {
        appState.student.evaluation.answers[q.id] = essayInput.value;
        saveState();
      });
    }

    document.getElementById("btn-eval-prev").addEventListener("click", () => {
      activeEvalIndex--;
      renderEvaluation();
    });

    const nextBtn = document.getElementById("btn-eval-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        activeEvalIndex++;
        renderEvaluation();
      });
    }

    document.getElementById("btn-eval-check-one").addEventListener("click", () => {
      const fb = document.getElementById("eval-single-feedback");
      fb.classList.remove("hidden");
      if (q.type === "essay") {
        fb.className = "feedback-box info";
        fb.innerHTML = `<strong>Panduan Jawaban Uraian:</strong> ${escapeHtml(q.rubricHint)}`;
      } else {
        fb.className = "feedback-box info";
        fb.innerHTML = `<strong>Pembahasan:</strong> ${escapeHtml(q.explanation)}`;
      }
    });

    const submitAllBtn = document.getElementById("btn-eval-submit-all");
    if (submitAllBtn) {
      submitAllBtn.addEventListener("click", () => {
        gradeEvaluation();
        renderEvaluation();
        summaryCard.scrollIntoView({ behavior: "smooth" });
      });
    }

    // Render ringkasan jika sudah disubmit
    if (appState.student.evaluation.submitted) {
      summaryCard.classList.remove("hidden");
      renderEvaluationSummary(summaryCard);
    } else {
      summaryCard.classList.add("hidden");
    }
  }

  function parseTeacherCode(rawCode) {
    const cleaned = String(rawCode || "").trim();
    if (!cleaned.startsWith(APP_CONFIG.TEACHER_CODE_PREFIX)) return null;
    const b64 = cleaned.slice(APP_CONFIG.TEACHER_CODE_PREFIX.length);
    try {
      const jsonStr = decodeBase64Unicode(b64);
      const data = JSON.parse(jsonStr);
      if (!data || !data.n || !data.t || !data.c) return null;
      if (data.t !== "whatsapp" && data.t !== "email") return null;
      return {
        name: String(data.n),
        contactType: data.t,
        contactValue: String(data.c)
      };
    } catch (e) {
      return null;
    }
  }

  function buildStudentResultSummaryText(teacherInfo) {
    const ev = appState.student.evaluation;
    const nick = appState.student.nickname || "(Tanpa Nama Panggilan)";
    const unitsDone = Object.values(appState.student.completedUnits).filter(Boolean).length;
    const q10Ans = (ev.answers.q10 || "-").trim() || "-";
    const q11Ans = (ev.answers.q11 || "-").trim() || "-";
    const weakText =
      ev.weakTopics && ev.weakTopics.length > 0
        ? ev.weakTopics.join("; ")
        : "Tidak ada (semua soal objektif benar)";

    const lines = [
      teacherInfo ? `Kepada Yth. ${teacherInfo.name},` : "Hasil Belajar Siswa — Modul KKA Kelas VII",
      "Berikut ringkasan hasil belajar Bab 1: Berpikir Komputasional:",
      `- Nama Panggilan: ${nick}`,
      `- Unit Materi Selesai: ${unitsDone} dari 5 unit`,
      `- Skor Soal Objektif (No. 1–9): ${ev.scorePct}% (${ev.autoCorrectCount} dari ${ev.autoTotalCount} benar)`,
      `- Materi Disarankan untuk Diulang: ${weakText}`,
      `- Jawaban Uraian No. 10 (Debugging): ${q10Ans}`,
      `- Jawaban Uraian No. 11 (Penerapan): ${q11Ans}`,
      `- Waktu Selesai: ${ev.completedAt || "-"}`
    ];
    return lines.join("\n");
  }

  function renderEvaluationSummary(container) {
    const ev = appState.student.evaluation;
    const decodedTeacher = parseTeacherCode(appState.student.linkedTeacherCode);
    const summaryText = buildStudentResultSummaryText(decodedTeacher);

    let sendActionsHtml = "";
    if (decodedTeacher) {
      const encodedBody = encodeURIComponent(summaryText);
      const encodedSubject = encodeURIComponent(
        `Hasil KKA Bab 1 - ${appState.student.nickname || "Siswa Kelas VII"}`
      );

      let externalHref = "";
      let externalLabel = "";
      if (decodedTeacher.contactType === "whatsapp") {
        const waDigits = normalizeWhatsAppNumber(decodedTeacher.contactValue);
        externalHref = `https://wa.me/${waDigits}?text=${encodedBody}`;
        externalLabel = `Kirim melalui WhatsApp (${decodedTeacher.name})`;
      } else {
        externalHref = `mailto:${encodeURIComponent(decodedTeacher.contactValue)}?subject=${encodedSubject}&body=${encodedBody}`;
        externalLabel = `Kirim melalui Email (${decodedTeacher.name})`;
      }

      sendActionsHtml = `
        <div class="feedback-box success" style="margin-top: 10px;">
          <strong>Terhubung dengan Guru:</strong> ${escapeHtml(decodedTeacher.name)} (${
        decodedTeacher.contactType === "whatsapp" ? "WhatsApp" : "Email"
      }: ${escapeHtml(decodedTeacher.contactValue)})
        </div>
        <p class="small-text muted">Tinjau isi pesan di bawah ini sebelum membuka aplikasi. Hasil <strong>belum terkirim</strong> sebelum Anda menekan tombol kirim di aplikasi WhatsApp atau Email Anda sendiri.</p>
        <textarea class="message-preview" rows="9" readonly aria-label="Pratinjau ringkasan hasil untuk dikirim">${escapeHtml(summaryText)}</textarea>
        <div class="button-row">
          <a href="${externalHref}" target="_blank" rel="noopener noreferrer" class="btn btn-success">${escapeHtml(externalLabel)}</a>
          <button type="button" id="btn-copy-eval-summary" class="btn btn-secondary">Salin Ringkasan Hasil</button>
        </div>
      `;
    } else {
      sendActionsHtml = `
        <p class="small-text muted">Belum ada Kode Guru yang terhubung. Anda tetap dapat menyalin ringkasan hasil di bawah ini:</p>
        <textarea class="message-preview" rows="8" readonly aria-label="Ringkasan hasil evaluasi">${escapeHtml(summaryText)}</textarea>
        <button type="button" id="btn-copy-eval-summary" class="btn btn-secondary">Salin Ringkasan Hasil</button>
      `;
    }

    container.innerHTML = `
      <div class="summary-score-banner">
        <span class="pill pill-primary">Ringkasan Hasil Evaluasi</span>
        <h3 style="margin: 8px 0 4px;">Skor Soal Objektif: ${ev.scorePct}% (${ev.autoCorrectCount} dari ${ev.autoTotalCount} soal benar)</h3>
        <p class="small-text" style="margin: 0;">Catatan: Soal nomor 10 dan 11 berbentuk uraian singkat sehingga disimpan sebagai jawaban siswa tanpa penilaian otomatis.</p>
      </div>

      <div>
        <h4>Materi yang Disarankan untuk Diulang:</h4>
        ${
          ev.weakTopics.length > 0
            ? `<ul class="check-list">${ev.weakTopics.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`
            : `<p class="feedback-box success">Hebat! Semua topik pada soal objektif sudah dikuasai dengan baik.</p>`
        }
      </div>

      <div class="share-teacher-box">
        <h4>Hubungkan &amp; Kirim Hasil ke Guru (Opsional)</h4>
        <label for="student-teacher-code-input">Masukkan Kode Guru dari gurumu:</label>
        <div class="inline-form">
          <input type="text" id="student-teacher-code-input" value="${escapeHtml(appState.student.linkedTeacherCode)}" placeholder="Contoh: KKA7-eyJuIjoi..." autocomplete="off">
          <button type="button" id="btn-apply-teacher-code" class="btn btn-primary">Terapkan Kode Guru</button>
        </div>
        ${sendActionsHtml}
      </div>
    `;

    document.getElementById("btn-apply-teacher-code").addEventListener("click", () => {
      const codeInput = document.getElementById("student-teacher-code-input").value.trim();
      if (!codeInput) {
        appState.student.linkedTeacherCode = "";
        saveState();
        renderEvaluationSummary(container);
        return;
      }
      const parsed = parseTeacherCode(codeInput);
      if (!parsed) {
        showBanner("Kode Guru tidak valid atau formatnya rusak. Periksa kembali kode dari gurumu.");
        return;
      }
      appState.student.linkedTeacherCode = codeInput;
      saveState();
      showBanner(`Berhasil terhubung dengan ${parsed.name}.`);
      renderEvaluationSummary(container);
    });

    const copyBtn = document.getElementById("btn-copy-eval-summary");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        copyTextToClipboard(summaryText, "Ringkasan hasil berhasil disalin!");
      });
    }
  }

  /* ---------------------------------------------------------
     VIEW 4: REFLEKSI & HAPUS DATA LOKAL
     --------------------------------------------------------- */
  function renderReflection() {
    const tbody = document.getElementById("reflection-tbody");
    const noteArea = document.getElementById("reflection-note");
    if (!tbody) return;

    tbody.innerHTML = KKA_BAB1_DATA.reflectionItems
      .map((item, idx) => {
        const val = appState.student.reflection.checks[idx] || "";
        return `
          <tr>
            <td>${escapeHtml(item)}</td>
            <td class="text-center">
              <input type="radio" name="refl-${idx}" value="bisa" ${val === "bisa" ? "checked" : ""} aria-label="Sudah bisa: ${escapeHtml(item)}" style="width: 20px; height: 20px;">
            </td>
            <td class="text-center">
              <input type="radio" name="refl-${idx}" value="belajar" ${val === "belajar" ? "checked" : ""} aria-label="Masih perlu belajar: ${escapeHtml(item)}" style="width: 20px; height: 20px;">
            </td>
          </tr>
        `;
      })
      .join("");

    tbody.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        const idx = radio.name.replace("refl-", "");
        appState.student.reflection.checks[idx] = radio.value;
        saveState();
      });
    });

    if (noteArea) {
      noteArea.value = appState.student.reflection.note || "";
    }
  }

  /* ---------------------------------------------------------
     VIEW 5: AREA GURU & GENERATOR KODE GURU
     --------------------------------------------------------- */
  function buildTeacherShareCode(name, contactType, contactValue) {
    const payload = JSON.stringify({
      n: name,
      t: contactType,
      c: contactValue
    });
    return APP_CONFIG.TEACHER_CODE_PREFIX + encodeBase64Unicode(payload);
  }

  function renderTeacherArea() {
    const lockPanel = document.getElementById("teacher-lock-panel");
    const activePanel = document.getElementById("teacher-active-panel");
    const nameInput = document.getElementById("teacher-name");
    const typeSelect = document.getElementById("teacher-contact-type");
    const waGroup = document.getElementById("group-teacher-wa");
    const emailGroup = document.getElementById("group-teacher-email");
    const waInput = document.getElementById("teacher-wa-number");
    const emailInput = document.getElementById("teacher-email-address");
    const codeOutput = document.getElementById("teacher-code-output");
    const codeValueEl = document.getElementById("generated-teacher-code");

    if (!appState.teacher.unlocked) {
      lockPanel.classList.remove("hidden");
      activePanel.classList.add("hidden");
      return;
    }

    lockPanel.classList.add("hidden");
    activePanel.classList.remove("hidden");

    nameInput.value = appState.teacher.name || "";
    typeSelect.value = appState.teacher.contactType || "whatsapp";

    const isWa = typeSelect.value === "whatsapp";
    waGroup.classList.toggle("hidden", !isWa);
    emailGroup.classList.toggle("hidden", isWa);

    if (isWa) {
      waInput.value = appState.teacher.contactValue || "";
    } else {
      emailInput.value = appState.teacher.contactValue || "";
    }

    if (appState.teacher.name && appState.teacher.contactValue) {
      const code = buildTeacherShareCode(
        appState.teacher.name,
        appState.teacher.contactType,
        appState.teacher.contactValue
      );
      codeValueEl.textContent = code;
      codeOutput.classList.remove("hidden");
    } else {
      codeOutput.classList.add("hidden");
    }
  }

  /* ---------------------------------------------------------
     INISIALISASI EVENT LISTENER UTAMA
     --------------------------------------------------------- */
  function initApp() {
    // Navigasi utama
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchView(btn.getAttribute("data-view"));
      });
    });

    document.querySelectorAll("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchView(btn.getAttribute("data-goto"));
      });
    });

    // Tab Unit Materi
    document.querySelectorAll(".unit-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        renderUnit(Number(tab.getAttribute("data-unit")));
      });
    });

    document.getElementById("btn-prev-unit").addEventListener("click", () => {
      if (activeUnitIndex > 0) renderUnit(activeUnitIndex - 1);
    });

    document.getElementById("btn-next-unit").addEventListener("click", () => {
      if (activeUnitIndex < KKA_BAB1_DATA.units.length - 1) {
        renderUnit(activeUnitIndex + 1);
      } else {
        switchView("evaluasi");
      }
    });

    // Kontrol Evaluasi
    document.getElementById("btn-view-eval-summary").addEventListener("click", () => {
      const summaryCard = document.getElementById("eval-summary-card");
      if (summaryCard) summaryCard.scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("btn-reset-eval").addEventListener("click", () => {
      if (!window.confirm("Ulangi evaluasi dari awal? Jawaban evaluasi saat ini akan dihapus.")) return;
      appState.student.evaluation = createDefaultState().student.evaluation;
      activeEvalIndex = 0;
      saveState();
      renderEvaluation();
      showBanner("Evaluasi telah diatur ulang.");
    });

    // Refleksi & Hapus Data Siswa
    document.getElementById("btn-save-reflection").addEventListener("click", () => {
      const noteArea = document.getElementById("reflection-note");
      appState.student.reflection.note = noteArea ? noteArea.value.trim() : "";
      saveState();
      showBanner("Catatan refleksi berhasil disimpan di browser ini.");
    });

    document.getElementById("btn-clear-all-student-data").addEventListener("click", () => {
      const confirmed = window.confirm(
        "Hapus seluruh data progres belajar, skor aktivitas, evaluasi, dan refleksi siswa dari perangkat ini?"
      );
      if (!confirmed) return;
      const preservedTeacher = { ...appState.teacher };
      appState = createDefaultState();
      appState.teacher = preservedTeacher;
      saveState();
      initBeranda();
      renderReflection();
      showBanner("Seluruh data siswa di perangkat ini telah dihapus.");
    });

    // Area Guru: Klaim, Profil, Kunci, Hapus
    document.getElementById("form-teacher-claim").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("teacher-activation-input");
      if (input.value.trim() === APP_CONFIG.DEMO_TEACHER_ACTIVATION_CODE) {
        appState.teacher.unlocked = true;
        input.value = "";
        saveState();
        renderTeacherArea();
        showBanner("Area Guru berhasil diaktifkan.");
      } else {
        showBanner("Kode aktivasi guru tidak cocok. Periksa kembali kode aktivasi.");
      }
    });

    document.getElementById("btn-teacher-lock").addEventListener("click", () => {
      appState.teacher.unlocked = false;
      saveState();
      renderTeacherArea();
      showBanner("Area Guru dikunci kembali.");
    });

    document.getElementById("teacher-contact-type").addEventListener("change", (e) => {
      const isWa = e.target.value === "whatsapp";
      document.getElementById("group-teacher-wa").classList.toggle("hidden", !isWa);
      document.getElementById("group-teacher-email").classList.toggle("hidden", isWa);
    });

    document.getElementById("form-teacher-profile").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("teacher-name").value.trim();
      const contactType = document.getElementById("teacher-contact-type").value;
      const rawWa = document.getElementById("teacher-wa-number").value.trim();
      const rawEmail = document.getElementById("teacher-email-address").value.trim();

      if (!name) {
        showBanner("Nama tampilan guru wajib diisi.");
        return;
      }

      if (contactType === "whatsapp") {
        const waDigits = normalizeWhatsAppNumber(rawWa);
        if (waDigits.length < 9) {
          showBanner("Masukkan nomor WhatsApp yang valid (minimal 9 digit angka).");
          return;
        }
        appState.teacher.contactValue = waDigits;
      } else {
        if (!rawEmail || !rawEmail.includes("@")) {
          showBanner("Masukkan alamat email yang valid.");
          return;
        }
        appState.teacher.contactValue = rawEmail;
      }

      appState.teacher.name = name;
      appState.teacher.contactType = contactType;
      saveState();
      renderTeacherArea();
      showBanner("Profil guru tersimpan dan Kode Guru siap dibagikan.");
    });

    document.getElementById("btn-delete-teacher-profile").addEventListener("click", () => {
      if (!window.confirm("Hapus profil guru dan kode guru dari perangkat ini?")) return;
      appState.teacher = createDefaultState().teacher;
      saveState();
      renderTeacherArea();
      showBanner("Profil guru telah dihapus.");
    });

    document.getElementById("btn-copy-teacher-code").addEventListener("click", () => {
      const code = document.getElementById("generated-teacher-code").textContent;
      if (code) {
        copyTextToClipboard(code, "Kode Guru berhasil disalin! Bagikan kode ini kepada siswa.");
      }
    });

    // Inisialisasi awal
    initBeranda();
    updateGlobalProgress();
  }

  document.addEventListener("DOMContentLoaded", initApp);
})();