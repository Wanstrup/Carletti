// js/pralines-delegates.js
(() => {
  if (window.__PRALINES_DELEGATES_INIT__) return;
  window.__PRALINES_DELEGATES_INIT__ = true;

  const userSelection = {
    outerPackaging: null,
    blister: null,
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

    userSelection.outerPackaging = packagingBtn.dataset.type;
    updateSummary();
  });

  // --- Blister valg ---
  document.addEventListener("click", (e) => {
    const blisterBtn = e.target.closest("[data-blister]");
    if (!blisterBtn) return;

    // Marker aktiv blister visuelt
    document.querySelectorAll("[data-blister]").forEach(btn => btn.classList.remove("active"));
    blisterBtn.classList.add("active");

    userSelection.blister = blisterBtn.dataset.blister;
    updateSummary();
  });

  // --- Opdater "Order Summary" boksen ---
  function updateSummary() {
    const summaryBox = document.querySelector(".summary-box");
    if (!summaryBox) return;

    // Hvis der intet er valgt
    const hasAnySelection =
      userSelection.outerPackaging ||
      userSelection.blister ||
      Object.keys(userSelection.pralines).length > 0;

    if (!hasAnySelection) {
      summaryBox.innerHTML = `
        <h2>Order Summary</h2>
        <p class="summary-placeholder">No selections yet.</p>
      `;
      return;
    }

    let html = `
      <h2>Order Summary</h2>
      <table class="summary-table">
        <tr><th colspan="2" class="summary-subtitle">Items selected</th></tr>
        <tr>
          <td>Outer packaging</td>
          <td>${userSelection.outerPackaging ? userSelection.outerPackaging.replace(/-/g, " ") : "Not selected"}</td>
        </tr>
        <tr>
          <td>Blister insert</td>
          <td>${userSelection.blister ? userSelection.blister : "Not selected"}</td>
        </tr>
        <tr>
          <td>Pralines</td>
          <td>
    `;

    const items = Object.entries(userSelection.pralines);
    if (items.length === 0) {
      html += `No pralines selected`;
    } else {
      html += items.map(([n, c]) => `${n}: x${c}`).join("<br>");
    }

    html += `</td></tr></table>`;
    summaryBox.innerHTML = html;
  }
})();
