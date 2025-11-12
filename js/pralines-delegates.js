// js/pralines-delegates.js
(() => {
  if (window.__PRALINES_DELEGATES_INIT__) return;
  window.__PRALINES_DELEGATES_INIT__ = true;

  const userSelection = {
    outerPackaging: null,
    blister: null,
    wrapType: null,
    pralines: {}
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

  // --- Filter (dropdown) ---
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

    // Nulstil når man vælger ny packaging
    userSelection.blister = null;
    userSelection.wrapType = null;

    updateSummary();
  });

  // --- Blister valg (kun for giftbox) ---
  document.addEventListener("click", (e) => {
    const blisterBtn = e.target.closest("[data-blister]");
    if (!blisterBtn) return;

    const typeStr = (userSelection.outerPackaging || "").toLowerCase();
    const isGiftbox = /\bgiftbox\b/.test(typeStr);
    if (!isGiftbox) return; // ignorér hvis ikke giftbox

    document.querySelectorAll("[data-blister]").forEach(btn => btn.classList.remove("active"));
    blisterBtn.classList.add("active");

    userSelection.blister = blisterBtn.dataset.blister;
    updateSummary();
  });

  // --- Wrapped/Unwrapped valg (kun for box/bag) ---
  document.addEventListener("click", (e) => {
    const wrapBtn = e.target.closest("[data-wrap]");
    if (!wrapBtn) return;

    const typeStr = (userSelection.outerPackaging || "").toLowerCase();
    const isBoxOrBag = /\b(?:box|bag)\b/.test(typeStr) && !/\bgiftbox\b/.test(typeStr);
    if (!isBoxOrBag) return; // ignorér hvis ikke box/bag

    document.querySelectorAll("[data-wrap]").forEach(btn => btn.classList.remove("active"));
    wrapBtn.classList.add("active");

    userSelection.wrapType = wrapBtn.dataset.wrap;
    updateSummary();
  });

  // --- Opdater Order Summary ---
  function updateSummary() {
    const summaryBox = document.querySelector(".summary-box");
    if (!summaryBox) return;

    const hasAnySelection =
      userSelection.outerPackaging ||
      userSelection.blister ||
      userSelection.wrapType ||
      Object.keys(userSelection.pralines).length > 0;

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
          <td>${userSelection.outerPackaging ? userSelection.outerPackaging.replace(/-/g, " ") : "Not selected"}</td>
        </tr>
    `;

    // --- Blister for Giftbox ---
    if (isGiftbox) {
      html += `
        <tr>
          <td>Blister insert</td>
          <td>${userSelection.blister ? userSelection.blister : "Not selected"}</td>
        </tr>
      `;
    }

    // --- Wrapped/Unwrapped for Box/Bag ---
    if (isBoxOrBag) {
      html += `
        <tr>
          <td>Pralines type</td>
          <td>${userSelection.wrapType ? userSelection.wrapType : "Not selected"}</td>
        </tr>
      `;
    }

    // --- Pralines valgt ---
    html += `
      <tr>
        <td>Pralines</td>
        <td>
    `;

    const pralineItems = Object.entries(userSelection.pralines);
    if (pralineItems.length === 0) {
      html += `No pralines selected`;
    } else {
      html += pralineItems.map(([n, c]) => `${n}: x${c}`).join("<br>");
    }

    html += `</td></tr></table>`;
    summaryBox.innerHTML = html;
  }
})();
