document.addEventListener("DOMContentLoaded", () => {
  const giftboxSection = document.querySelector("#giftbox-section");
  const boxSection = document.querySelector("#box-section");
  const bagSection = document.querySelector("#bag-section");
  const allSections = [giftboxSection, boxSection, bagSection];

  const giftboxButtons = giftboxSection.querySelectorAll(".option-buttons button");
  const boxButtons = boxSection.querySelectorAll(".option-buttons button");
  const bagButtons = bagSection.querySelectorAll(".option-buttons button");

  const blisterSection = document.querySelector("#giftbox-section .blister-section");
  const wrapperSections = document.querySelectorAll(".wrapper-section");

  window.config = window.config || {};

  // -----------------------------
  // RESET FUNCTION
  // -----------------------------
  function resetAll() {
    allSections.forEach(sec => (sec.style.display = "block"));
    [blisterSection, ...wrapperSections].forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".option-buttons button").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".blister-options button").forEach(btn => btn.classList.remove("active"));
  }

  // -----------------------------
  // GIFTBOX
  // -----------------------------
  giftboxButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");
      resetAll();

      if (!isActive) {
        btn.classList.add("active");

        // Find størrelse i knap-tekst
        let size = "small";
        if (btn.dataset.type.includes("medium")) size = "medium";
        if (btn.dataset.type.includes("large")) size = "large";

        // 🔥 TRACKER UPDATE
        window.config.selectedPackaging = "giftbox";
        window.config.selectedSize = size;
        document.dispatchEvent(new Event("packagingChanged"));

        boxSection.style.display = "none";
        bagSection.style.display = "none";

        blisterSection.classList.add("active");

        const giftWrapper = giftboxSection.querySelector(".wrapper-section");
        if (giftWrapper) giftWrapper.classList.remove("active");
      }
    });
  });

  // -----------------------------
  // BOX
  // -----------------------------
  boxButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");
      resetAll();

      if (!isActive) {
        btn.classList.add("active");

        let size = "small";
        if (btn.dataset.type.includes("medium")) size = "medium";

        // 🔥 TRACKER UPDATE
        window.config.selectedPackaging = "box";
        window.config.selectedSize = size;
        document.dispatchEvent(new Event("packagingChanged"));

        giftboxSection.style.display = "none";
        bagSection.style.display = "none";

        const wrapper = boxSection.querySelector(".wrapper-section");
        wrapper.classList.add("active");
      }
    });
  });

  // -----------------------------
  // BAG
  // -----------------------------
  bagButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");
      resetAll();

      if (!isActive) {
        btn.classList.add("active");

        let size = "small";
        if (btn.dataset.type.includes("medium")) size = "medium";
        if (btn.dataset.type.includes("large")) size = "large";

        // 🔥 TRACKER UPDATE
        window.config.selectedPackaging = "bag";
        window.config.selectedSize = size;
        document.dispatchEvent(new Event("packagingChanged"));

        giftboxSection.style.display = "none";
        boxSection.style.display = "none";

        const wrapper = bagSection.querySelector(".wrapper-section");
        wrapper.classList.add("active");
      }
    });
  });

  // -----------------------------
  // BLISTER (GIFTBOX ONLY)
  // -----------------------------
  const blisterButtons = document.querySelectorAll(".blister-options button");
  blisterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");

      if (isActive) {
        btn.classList.remove("active");
        delete window.config.blister;
        return;
      }

      blisterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      window.config.blister = btn.dataset.blister;
      window.config.wrapType = "unwrapped";

      console.log("Giftbox blister:", window.config.blister);
    });
  });

  // -----------------------------
  // WRAPPER (BOX/BAG)
  // -----------------------------
  const wrapperButtons = document.querySelectorAll(".wrapper-options button");
  wrapperButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");

      if (isActive) {
        btn.classList.remove("active");
        delete window.config.wrapType;
        return;
      }

      wrapperButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      window.config.wrapType = btn.dataset.wrap;
      console.log("Praline type:", window.config.wrapType);
    });
  });
});

// -----------------------------
// RESET DESIGN STEP ON PAGE LOAD
// -----------------------------
window.addEventListener("load", () => {
  sessionStorage.removeItem("designColor");
  sessionStorage.removeItem("designTheme");
  sessionStorage.removeItem("designLogoName");
  sessionStorage.removeItem("designLogoUploaded");
  sessionStorage.removeItem("designText");
});
