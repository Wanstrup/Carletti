// js/design.js
(() => {
  if (window.__DESIGN_INIT__) return;
  window.__DESIGN_INIT__ = true;

  function triggerSummaryUpdate() {
    // pralines-delegates.js kan lytte på denne event
    document.dispatchEvent(new Event("design-updated"));
  }

  // ---------- COLOR SELECT ----------
  document.addEventListener("click", (e) => {
    const dot = e.target.closest(".color-dot");
    if (!dot) return;

    // Nulstil tema hvis man vælger farve
    sessionStorage.removeItem("designTheme");

    // Marker valgt farve
    document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("selected"));
    dot.classList.add("selected");

    sessionStorage.setItem("designColor", dot.dataset.color);

    triggerSummaryUpdate();
  });

  // ---------- THEME SELECT ----------
  document.addEventListener("change", (e) => {
    if (e.target.id !== "theme-select") return;

    const val = e.target.value;

    // Nulstil farve hvis man vælger tema
    sessionStorage.removeItem("designColor");
    document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("selected"));

    sessionStorage.setItem("designTheme", val);

    triggerSummaryUpdate();
  });

  // ---------- FILE UPLOAD ----------
  document.addEventListener("click", (e) => {
    if (e.target.id !== "upload-btn") return;
    const fileInput = document.getElementById("file-input");
    if (fileInput) fileInput.click();
  });

  document.addEventListener("change", (e) => {
    if (e.target.id !== "file-input") return;

    const fileInput = e.target;
    const uploadArea = document.getElementById("upload-area");

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      sessionStorage.setItem("designLogoName", file.name);
      sessionStorage.setItem("designLogoUploaded", "yes");

      if (uploadArea) {
        uploadArea.innerHTML = `<strong>${file.name}</strong><p>uploaded successfully</p>`;
      }
      triggerSummaryUpdate();
    }
  });

  // ---------- DRAG & DROP ----------
  document.addEventListener("dragover", (e) => {
    const area = e.target.closest("#upload-area");
    if (!area) return;
    e.preventDefault();
    area.style.borderColor = "#e42d2d";
  });

  document.addEventListener("dragleave", (e) => {
    const area = e.target.closest("#upload-area");
    if (!area) return;
    area.style.borderColor = "#ccc";
  });

  document.addEventListener("drop", (e) => {
    const area = e.target.closest("#upload-area");
    if (!area) return;

    e.preventDefault();
    area.style.borderColor = "#ccc";

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      // ikke alle browsere tillader at sætte FileList, men vi gemmer bare navnet
    }

    sessionStorage.setItem("designLogoName", file.name);
    sessionStorage.setItem("designLogoUploaded", "yes");

    area.innerHTML = `<strong>${file.name}</strong><p>uploaded successfully</p>`;
    triggerSummaryUpdate();
  });

  // ---------- TEXT INPUT ----------
  document.addEventListener("input", (e) => {
    if (e.target.id !== "design-text") return;

    sessionStorage.setItem("designText", e.target.value.trim());
    triggerSummaryUpdate();
  });
})();

