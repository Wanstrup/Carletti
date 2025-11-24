// js/info-panel.js
(() => {
  if (window.__INFO_PANEL_INIT__) return;
  window.__INFO_PANEL_INIT__ = true;

  const panel = document.getElementById("info-panel");
  if (!panel) return;

  const overlay = panel.querySelector(".info-panel-overlay");
  const closeBtn = panel.querySelector(".info-panel-close");
  const titleEl = document.getElementById("info-panel-title");
  const bodyEl = document.getElementById("info-panel-body");
  const imgWrap = document.getElementById("info-panel-image-wrap");
  const imgEl = document.getElementById("info-panel-image");

  // Tekster til overordnede info-ikoner
  const infoContent = {
    packaging: {
      title: "Packaging options",
      body: `
        <p>Here you select the type of outer packaging for your product – giftboxes, boxes or bags.</p>
        <p>Each option has its own capacity and use case. Start by selecting the type that fits your customer and sales channel best.</p>
      `
    },
    giftboxes: {
      title: "Giftboxes",
      body: `
        <p>Our giftboxes are designed for premium presentation and gifting occasions.</p>
        <p>You can choose between different sizes and blister layouts to match the number of pralines.</p>
      `
    },
    boxes: {
      title: "Boxes",
      body: `
        <p>Boxes are suitable for retail and standard gifting. They are defined by weight ranges (e.g. 135 g or 400 g).</p>
        <p>When selecting a box, the configurator tracks the total weight of your chosen pralines.</p>
      `
    },
    bags: {
      title: "Bags",
      body: `
        <p>Bags are ideal for sharing formats, bulk or more casual gifting.</p>
        <p>They are available in different weight ranges – the configurator helps you stay within the selected target weight.</p>
      `
    },
    stepPralines: {
      title: "Pralines",
      body: `
        <p>In this step you select the individual pralines and quantities. Use the plus/minus buttons to adjust the content.</p>
        <p>The tracker at the top shows how far you are from filling the chosen packaging.</p>
      `
    },
    stepDesign: {
      title: "Design",
      body: `
        <p>Here you decide on the visual expression of your packaging – colors, themes, logo and optional text.</p>
        <p>This information will be included in the quote request to our sales team.</p>
      `
    }
  };

  function openInfoPanel({ title, body, image }) {
    if (titleEl) titleEl.textContent = title || "";
    if (bodyEl) bodyEl.innerHTML = body || "";

    if (image) {
      imgWrap.classList.remove("hidden");
      imgEl.src = image.src;
      imgEl.alt = image.alt || title || "";
    } else {
      imgWrap.classList.add("hidden");
      imgEl.src = "";
      imgEl.alt = "";
    }

    panel.classList.add("open");
  }

  function closeInfoPanel() {
    panel.classList.remove("open");
  }

  // Luk via overlay / kryds / ESC
  overlay.addEventListener("click", closeInfoPanel);
  closeBtn.addEventListener("click", closeInfoPanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeInfoPanel();
  });

  // ---- CLICK HANDLER: OVERORDNET INFO-IKONER ----
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".info-trigger");
    if (!trigger) return;

    const key = trigger.dataset.infoKey;
    if (!key || !infoContent[key]) return;

    openInfoPanel({
      title: infoContent[key].title,
      body: infoContent[key].body
    });
  });

  // ---- CLICK HANDLER: PRALINE INFO KNAPPER ----
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".info-btn");
    if (!btn) return;

    const card = btn.closest(".praline-card");
    if (!card) return;

    const title = card.querySelector("h4")?.textContent.trim() || "Praline info";
    const desc = card.querySelector(".desc")?.textContent.trim() || "";
    const img = card.querySelector("img");

    openInfoPanel({
      title,
      body: `<p>${desc}</p>`,
      image: img ? { src: img.src, alt: img.alt } : null
    });
  });

})();
