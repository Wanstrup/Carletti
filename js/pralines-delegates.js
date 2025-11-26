// js/pralines-delegates.js
(() => {
  if (window.__PRALINES_DELEGATES_INIT__) return;
  window.__PRALINES_DELEGATES_INIT__ = true;

  // GLOBAL vægt-map til tracker.js
  window._PRALINE_WEIGHTS = {
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
    "White chocolate with strawberry-yoghurt taste filling": 10.2,
    "Dubai style praline": 9.1
  };

  window.config = window.config || {};
  if (!window.config.pralines) window.config.pralines = {};

  // PLUS / MINUS
  document.addEventListener("click", (e) => {
    const plus = e.target.closest(".plus");
    const minus = e.target.closest(".minus");
    if (!plus && !minus) return;

    const card = e.target.closest(".praline-card");
    if (!card) return;

    const name = card.querySelector("h4").textContent.trim();
    const countEl = card.querySelector(".count");

    let count = parseInt(countEl.textContent, 10) || 0;

    if (plus) count++;
    if (minus && count > 0) count--;

    countEl.textContent = count;

    if (count > 0) window.config.pralines[name] = count;
    else delete window.config.pralines[name];

    document.dispatchEvent(new Event("pralinesChanged"));
  });

  // FILTER
  document.addEventListener("change", (e) => {
    if (e.target.id !== "filter-select") return;
    const value = e.target.value;

    document.querySelectorAll(".praline-card").forEach(card => {
      const cat = card.dataset.category || "all";
      card.style.display = (value === "all" || value === cat) ? "" : "none";
    });
  });

})();
