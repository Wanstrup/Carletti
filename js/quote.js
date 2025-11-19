// js/quote.js
(() => {
  if (window.__QUOTE_INIT__) return;
  window.__QUOTE_INIT__ = true;

 function updateQuoteBoxVisibility() {
  const box = document.getElementById("quote-form-box");
  const cbQuote = document.getElementById("rq-quote");
  const cbSpec = document.getElementById("rq-spec");
  if (!box || !cbQuote || !cbSpec) return;

  if (cbQuote.checked || cbSpec.checked) {
    box.classList.remove("hidden");
  } else {
    box.classList.add("hidden");
  }

  // --- NYT: Justér accordion indholdets højde ---
  const accContent = box.closest(".accordion-content");
  if (accContent && accContent.style.maxHeight) {
    accContent.style.maxHeight = accContent.scrollHeight + "px";
  }
}


  // Lyt efter ændringer på checkboksene – også selvom de først kommer senere
  document.addEventListener("change", (e) => {
    if (e.target.id === "rq-quote" || e.target.id === "rq-spec") {
      updateQuoteBoxVisibility();
    }
  });

  // Hvis man loader siden og der allerede er noget checked (fx ved udvikling)
  window.addEventListener("load", updateQuoteBoxVisibility);
})();

