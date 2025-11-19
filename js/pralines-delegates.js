// js/pralines-delegates.js
(() => {
  if (window.__PRALINES_DELEGATES_INIT__) return;
  window.__PRALINES_DELEGATES_INIT__ = true;

  const userSelection = {
    outerPackaging: null,
    blister: null,
    wrapType: null,
    pralines: {},
    designColor: null,
    designTheme: null,
    designLogo: null,
    designText: ""
  };

  // --- PLUS / MINUS tæller ---
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button.plus, button.minus");
    if (!btn) return;

    const card = btn.closest(".praline-card");
    if (!card) return;

    const name = card.querySelector("h4")?.textContent.trim() || "";
    const countEl = card.querySelector(".count");
    let count = parseInt(countEl.textContent || "0", 10);

    if (btn.classList.contains("plus")) count++;
    else if (btn.classList.contains("minus") && count > 0) count--;

    countEl.textContent = count;

    if (count > 0) userSelection.pralines[name] = count;
    else delete userSelection.pralines[name];

    updateSummary();
  });

  // --- Filter ---
  document.addEventListener("change", (e) => {
    if (e.target.id !== "filter-select") return;
    const value = e.target.value;
    document.querySelectorAll(".praline-card").forEach((card) => {
      const cat = card.dataset.category || "";
      card.style.display = (value === "all" || value === cat) ? "" : "none";
    });
  });

  // --- Outer packaging valg ---
  document.addEventListener("click", (e) => {
    const packagingBtn = e.target.closest("[data-type]");
    if (!packagingBtn) return;

    const type = packagingBtn.dataset.type.toLowerCase();
    userSelection.outerPackaging = type;

    userSelection.blister = null;
    userSelection.wrapType = null;

    updateSummary();
  });

  // --- Blister valg ---
  document.addEventListener("click", (e) => {
    const blisterBtn = e.target.closest("[data-blister]");
    if (!blisterBtn) return;

    const typeStr = (userSelection.outerPackaging || "").toLowerCase();
    const isGiftbox = /\bgiftbox\b/.test(typeStr);
    if (!isGiftbox) return;

    document.querySelectorAll("[data-blister]").forEach(btn => btn.classList.remove("active"));
    blisterBtn.classList.add("active");

    userSelection.blister = blisterBtn.dataset.blister;

    updateSummary();
  });

  // --- Wrapped / Unwrapped ---
  document.addEventListener("click", (e) => {
    const wrapBtn = e.target.closest("[data-wrap]");
    if (!wrapBtn) return;

    const typeStr = (userSelection.outerPackaging || "").toLowerCase();
    const isBoxOrBag = /\b(?:box|bag)\b/.test(typeStr) && !/\bgiftbox\b/.test(typeStr);
    if (!isBoxOrBag) return;

    document.querySelectorAll("[data-wrap]").forEach(btn => btn.classList.remove("active"));
    wrapBtn.classList.add("active");

    userSelection.wrapType = wrapBtn.dataset.wrap;

    updateSummary();
  });

  document.addEventListener("design-updated", () => {
  updateSummary();
});


  // --- Order Summary ---
  function updateSummary() {
    const summaryBox = document.querySelector(".summary-box");
    if (!summaryBox) return;

    // Hent design-data fra sessionStorage
    userSelection.designColor = sessionStorage.getItem("designColor") || null;
    userSelection.designTheme = sessionStorage.getItem("designTheme") || null;
    userSelection.designLogo = sessionStorage.getItem("designLogoName") || null;
    userSelection.designText = sessionStorage.getItem("designText") || "";

    const hasAnySelection =
      userSelection.outerPackaging ||
      userSelection.blister ||
      userSelection.wrapType ||
      Object.keys(userSelection.pralines).length > 0 ||
      userSelection.designColor ||
      userSelection.designTheme ||
      userSelection.designLogo ||
      userSelection.designText;

    if (!hasAnySelection) {
      summaryBox.innerHTML = `
        <h2>Order Summary</h2>
        <p class="summary-placeholder">No selections yet.</p>
      `;
      return;
    }

    const typeStr = (userSelection.outerPackaging || "").toLowerCase();
    const isGiftbox = /\bgiftbox\b/.test(typeStr);
    const isBoxOrBag = /\b(?:box|bag)\b/.test(typeStr) && !isGiftbox;

    let html = `
      <h2>Order Summary</h2>
      <table class="summary-table">
        <tr><th colspan="2" class="summary-subtitle">Items selected</th></tr>

        <tr>
          <td>Outer packaging</td>
          <td>${userSelection.outerPackaging?.replace(/-/g, " ") || "Not selected"}</td>
        </tr>
    `;

    // --- Blister ---
    if (isGiftbox) {
      html += `
        <tr>
          <td>Blister</td>
          <td>${userSelection.blister || "Not selected"}</td>
        </tr>
      `;
    }

    // --- Wrapped/Unwrapped ---
    if (isBoxOrBag) {
      html += `
        <tr>
          <td>Pralines type</td>
          <td>${userSelection.wrapType || "Not selected"}</td>
        </tr>
      `;
    }

    // --- Pralines ---
    html += `
      <tr>
        <td>Pralines</td>
        <td>
    `;

    const pralineItems = Object.entries(userSelection.pralines);
    html += pralineItems.length === 0
      ? "No pralines selected"
      : pralineItems.map(([n, c]) => `${n}: x${c}`).join("<br>");

    html += `</td></tr>`;

    // --- DESIGN SECTION ---
    if (userSelection.designColor || userSelection.designTheme || userSelection.designLogo || userSelection.designText) {
      html += `<tr><th colspan="2" class="summary-subtitle">Design</th></tr>`;
    }

    if (userSelection.designColor) {
      html += `
        <tr>
          <td>Color</td>
          <td><div style="width:20px;height:20px;border-radius:50%;background:${userSelection.designColor};"></div></td>
        </tr>`;
    }

    if (userSelection.designTheme) {
      html += `
        <tr>
          <td>Theme</td>
          <td>${userSelection.designTheme}</td>
        </tr>`;
    }

    if (userSelection.designLogo) {
      html += `
        <tr>
          <td>Logo</td>
          <td>${userSelection.designLogo}</td>
        </tr>`;
    }

    if (userSelection.designText) {
      html += `
        <tr>
          <td>Text</td>
          <td>${userSelection.designText}</td>
        </tr>`;
    }

    html += `</table>`;
    summaryBox.innerHTML = html;
  }
})();
