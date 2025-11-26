// js/order-summary.js

(() => {
  if (window.__ORDER_SUMMARY_INIT__) return;
  window.__ORDER_SUMMARY_INIT__ = true;

  // Vægte fra din unwrapped.json (gram pr. praline)
  const pralineWeights = {
    "Milk chocolate cone": 8.5,
    "Dark chocolate cup": 10.0,
    "Marzipan ML SCHUBERT": 10.5,
    "Crispy toffee (bulk)": 10.0,
    "Almond chocolate": 8.0,
    "Double nougat": 9.2,
    "White frog": 11.5,
    "Milk chocolate with nougat filling frogs": 11.8,
    "White chocolate with nougat filling frogs": 11.6,
    "Mint frogs": 12.0,
    "Caramel frogs": 12.0,
    "Dark chocolate with mint filling praline": 13.6,
    "Creme brulée taste praline": 7.3,
    "Crème brulée taste praline": 7.3,
    "Mint truffle in dark chocolate praline": 10.2,
    "Dark chocolate with mint filling": 9.0,
    "Rum taste truffle praline": 9.4,
    "Cherry praline": 11.0,
    "Orange truffle": 7.5,
    "Milk chocolate with toffee filling": 13.6,
    "Salty toffee praline": 9.3,
    "Toffee praline": 11.5,
    "Toffee praline 1": 11.5,
    "Toffee praline 2": 9.3,
    "Toffee praline 3": 8.5,
    "Twin hazelnut": 10.9,
    "Hazelnut nougat": 11.0,
    "Almond nougat": 8.2,
    "Hazelnut in milk chocolate": 8.7,
    "Coconut": 11.0,
    "White tear shape praline": 8.2,
    "Cappuccino praline": 8.2,
    "Milky praline": 8.8,
    "Crunchy hazelnut": 11.0,
    "White heart J - Lemon taste": 10.2,
    "Milk chocolate with strawberry-yoghurt taste filling": 10.2,
    "Milk chocolate with strawberry-yoghurt filling": 10.2,
    "White chocolate with strawberry-yoghurt taste filling": 10.2,
    "White chocolate with strawberry-yoghurt filling": 10.2,
    "Dubai style praline": 9.1
  };

  // Hjælper: beregn total antal & gram
  function calculateTotals() {
    const cfg = window.config || {};
    const pralines = cfg.pralines || {};
    let totalCount = 0;
    let totalWeight = 0;

    Object.entries(pralines).forEach(([name, count]) => {
      const w = pralineWeights[name] || 0;
      totalCount += count;
      totalWeight += count * w;
    });

    return { totalCount, totalWeight };
  }

  function formatPackaging(type) {
    if (!type) return "Not selected";

    const lower = type.toLowerCase();
    if (lower.includes("small"))  return "Giftbox small (20 pralines)";
    if (lower.includes("medium")) return "Giftbox medium (40 pralines)";
    if (lower.includes("large"))  return "Giftbox large (60 pralines)";

    return type.replace(/-/g, " ");
  }

  function formatDesign() {
    const color = sessionStorage.getItem("designColor");
    const theme = sessionStorage.getItem("designTheme");
    const text  = sessionStorage.getItem("designText");
    const logo  = sessionStorage.getItem("designLogoName");

    return { color, theme, text, logo };
  }

  function updateSummary() {
    const summaryBox = document.querySelector(".summary-box");
    if (!summaryBox) return;

    window.config = window.config || {};
    const packaging = window.config.outerPackaging || null;
    const blister   = window.config.blister || null;
    const pralines  = window.config.pralines || {};

    const { totalCount, totalWeight } = calculateTotals();
    const design = formatDesign();

    const hasPackaging = !!packaging;
    const hasBlister   = !!blister;
    const hasPralines  = Object.keys(pralines).length > 0;
    const hasDesign    = design.color || design.theme || design.text || design.logo;

    // Hvis der ikke er valgt noget som helst
    if (!hasPackaging && !hasBlister && !hasPralines && !hasDesign) {
      summaryBox.innerHTML = `
        <h2>Order Summary</h2>
        <p class="summary-placeholder">No selections yet.</p>
      `;
      return;
    }

    let html = `
      <h2>Order Summary</h2>
      <table class="summary-table">
        <tr>
          <th colspan="2" class="summary-subtitle">Items selected</th>
        </tr>
        <tr>
          <td>Outer packaging</td>
          <td>${formatPackaging(packaging)}</td>
        </tr>
        <tr>
          <td>Blister insert</td>
          <td>${blister ? blister : "Not selected"}</td>
        </tr>
        <tr>
          <td>Pralines</td>
          <td>
    `;

    if (!hasPralines) {
      html += `No pralines selected`;
    } else {
      html += Object.entries(pralines)
        .map(([n, c]) => `${n}: x${c}`)
        .join("<br>");
    }

    html += `
          </td>
        </tr>
    `;

    // Design / logo / tekst
    html += `
      <tr>
        <td>Design</td>
        <td>
    `;

    const designParts = [];
    if (design.color) {
      designParts.push(`Color: <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${design.color};border:1px solid #ccc;margin-right:4px;"></span>${design.color}`);
    }
    if (design.theme) {
      designParts.push(`Theme: ${design.theme}`);
    }
    if (!designParts.length) {
      html += `No design selected`;
    } else {
      html += designParts.join("<br>");
    }

    html += `
        </td>
      </tr>
      <tr>
        <td>Logo</td>
        <td>${design.logo ? `Logo uploaded: ${design.logo}` : "No logo uploaded"}</td>
      </tr>
      <tr>
        <td>Text</td>
        <td>${design.text ? design.text : "No text entered"}</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>${totalCount} pcs ≈ ${totalWeight.toFixed(1)} g</td>
      </tr>
      </table>
    `;

    summaryBox.innerHTML = html;
  }

  // Eksport (hvis du vil kalde den manuelt)
  window.updateSummaryFromOutside = updateSummary;

  // Lyt efter ændringer
  document.addEventListener("packagingChanged", updateSummary);
  document.addEventListener("pralinesChanged", updateSummary);
  document.addEventListener("designChanged", updateSummary);

  // Kør én gang ved load
  document.addEventListener("DOMContentLoaded", updateSummary);
})();
