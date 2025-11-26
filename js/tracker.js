// js/tracker.js
(() => {
  if (window.__TRACKER_INIT__) return;
  window.__TRACKER_INIT__ = true;

  const trackerEl = document.getElementById("tracker");

  const MAX_COUNT = {
    "giftbox-small": 20,
    "giftbox-medium": 40,
    "giftbox-large": 60
  };

  const MAX_GRAMS = {
    20: 275,
    40: 325,
    60: 500
  };

  const MIN_GRAMS = {
    20: 225,
    40: 275,
    60: 400
  };

  function updateButtonLock(totalCount, totalWeight, maxCount, maxGram) {
    document.querySelectorAll(".praline-card").forEach(card => {
      const plus = card.querySelector(".plus");
      const name = card.querySelector("h4").textContent.trim();
      const weight = window._PRALINE_WEIGHTS[name] || 0;

      if (totalCount >= maxCount || totalWeight + weight > maxGram) {
        plus.style.opacity = "0.4";
        plus.style.pointerEvents = "none";
      } else {
        plus.style.opacity = "1";
        plus.style.pointerEvents = "auto";
      }
    });
  }

  function updateTracker() {
    const pkg = window.config.outerPackaging;

    if (!pkg) {
      trackerEl.textContent = "Select a gift box";
      return;
    }

    const maxCount = MAX_COUNT[pkg];
    const maxGram = MAX_GRAMS[maxCount];
    const minGram = MIN_GRAMS[maxCount];

    let totalCount = 0;
    let totalWeight = 0;

    for (const [name, qty] of Object.entries(window.config.pralines || {})) {
      totalCount += qty;
      totalWeight += qty * (window._PRALINE_WEIGHTS[name] || 0);
    }

    // Lås knapper hvis nødvendigt
    updateButtonLock(totalCount, totalWeight, maxCount, maxGram);

    trackerEl.innerHTML = `
      <strong>${totalCount} of ${maxCount} pralines</strong><br>
      ${totalWeight.toFixed(1)} g total<br>
      Allowed: ${minGram}–${maxGram} g
    `;
  }

  document.addEventListener("pralinesChanged", updateTracker);
  document.addEventListener("packagingChanged", updateTracker);

  updateTracker();
})();
