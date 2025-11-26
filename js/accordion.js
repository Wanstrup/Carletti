document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");

   header.addEventListener("click", () => {
  const wasActive = item.classList.contains("active");

  // Luk kun andre – ikke åben ting automatisk
  accordionItems.forEach(i => {
    if (i !== item) {
      i.classList.remove("active");
      const content = i.querySelector(".accordion-content");
      if (content) content.style.maxHeight = null;
    }
  });

  if (!wasActive) {
    item.classList.add("active");
    const content = item.querySelector(".accordion-content");
    if (content) {
      // forskyd beregning til efter fetch-load
      setTimeout(() => {
        content.style.maxHeight = content.scrollHeight + "px";
      }, 50);
    }
  } else {
    // klik igen → luk
    item.classList.remove("active");
    const content = item.querySelector(".accordion-content");
    if (content) content.style.maxHeight = null;
  }
});
  });
});
