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

  // Funktion til at nulstille alt
  function resetAll() {
    allSections.forEach(sec => (sec.style.display = "block"));
    [blisterSection, ...wrapperSections].forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".option-buttons button").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".blister-options button").forEach(btn => btn.classList.remove("active"));
  }

  // ---------- GIFTBOX ----------
  giftboxButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");

      resetAll(); // nulstil alt først

      if (!isActive) {
        btn.classList.add("active");

        // Skjul de andre sektioner
        boxSection.style.display = "none";
        bagSection.style.display = "none";

        // Vis blister
        blisterSection.classList.add("active");

        // Fjern evt. wrapper-sektion for giftbox (de må ikke vises)
        const giftWrapper = giftboxSection.querySelector(".wrapper-section");
        if (giftWrapper) giftWrapper.classList.remove("active");
      }
    });
  });

  // ---------- BOX ----------
  boxButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");

      resetAll();

      if (!isActive) {
        btn.classList.add("active");

        // Skjul de andre
        giftboxSection.style.display = "none";
        bagSection.style.display = "none";

        // Vis wrapper direkte
        const wrapper = boxSection.querySelector(".wrapper-section");
        wrapper.classList.add("active");
      }
    });
  });

  // ---------- BAG ----------
  bagButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");

      resetAll();

      if (!isActive) {
        btn.classList.add("active");

        // Skjul de andre
        giftboxSection.style.display = "none";
        boxSection.style.display = "none";

        // Vis wrapper direkte
        const wrapper = bagSection.querySelector(".wrapper-section");
        wrapper.classList.add("active");
      }
    });
  });

  // ---------- BLISTER ----------
  const blisterButtons = document.querySelectorAll(".blister-options button");
  blisterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");

      // Hvis man klikker på samme blister igen → fjern valget
      if (isActive) {
        btn.classList.remove("active");
        window.config = window.config || {};
        delete window.config.blister;
        return;
      }

      // Fjern active fra andre
      blisterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Gem valget
      window.config = window.config || {};
      window.config.blister = btn.dataset.blister;

      // Sæt automatisk "unwrapped" for giftbox
      window.config.wrapType = "unwrapped";
      console.log("Giftbox blister selected:", window.config.blister, "| wrapType:", window.config.wrapType);
    });
  });

  // ---------- WRAPPER ----------
  const wrapperButtons = document.querySelectorAll(".wrapper-options button");
  wrapperButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");

      // Klik på samme → fjern valget
      if (isActive) {
        btn.classList.remove("active");
        window.config = window.config || {};
        delete window.config.wrapType;
        return;
      }

      wrapperButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const wrapType = btn.dataset.wrap;
      window.config = window.config || {};
      window.config.wrapType = wrapType;
      console.log("User selected praline type:", wrapType);
    });
  });
});

window.addEventListener("load", () => {
  // Nulstil hele design-steppet ved reload
  sessionStorage.removeItem("designColor");
  sessionStorage.removeItem("designTheme");
  sessionStorage.removeItem("designLogoName");      // 👈 vigtig
  sessionStorage.removeItem("designLogoUploaded");  // 👈 vigtig
  sessionStorage.removeItem("designText");
});
