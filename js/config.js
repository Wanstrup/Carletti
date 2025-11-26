
document.addEventListener("DOMContentLoaded", () => {

  // ---- ELEMENTS ----
  const giftboxSection = document.querySelector("#giftbox-section");
  const giftboxButtons = giftboxSection.querySelectorAll(".option-buttons button");

  const blisterSection = document.querySelector("#giftbox-section .blister-section");
  const blisterButtons = blisterSection.querySelectorAll(".blister-options button");

  // Global config object
  window.config = window.config || {};

  // Reset everything when needed
  function resetGiftbox() {
    giftboxButtons.forEach(b => b.classList.remove("active"));
    blisterButtons.forEach(b => b.classList.remove("active"));
    blisterSection.classList.remove("active");
    delete window.config.outerPackaging;
    delete window.config.blister;
  }

  // =========================
  //   GIFTBOX SELECTION
  // =========================
  giftboxButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");

      // Reset all first
      resetGiftbox();

      if (!isActive) {
        btn.classList.add("active");

        // Store selected packaging
        window.config.outerPackaging = btn.dataset.type;

        // Show blister options
        blisterSection.classList.add("active");

        // Send update to tracker + ordersummary
        document.dispatchEvent(new CustomEvent("packagingChanged"));
      }
    });
  });

  // =========================
  //   BLISTER SELECTION
  // =========================
  blisterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      const isActive = btn.classList.contains("active");

      if (isActive) {
        btn.classList.remove("active");
        delete window.config.blister;
      } else {
        blisterButtons.forEach(x => x.classList.remove("active"));
        btn.classList.add("active");
        window.config.blister = btn.dataset.blister;
      }

      // Update summary + tracker
      document.dispatchEvent(new CustomEvent("packagingChanged"));
    });
  });

});
