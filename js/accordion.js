document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Luk alle andre
      accordionItems.forEach(i => {
        i.classList.remove("active");
        // nulstil max-height for at sikre korrekt animation
        const content = i.querySelector(".accordion-content");
        if (content) content.style.maxHeight = null;
      });

      // Hvis den ikke allerede var åben, åbn den
      if (!isActive) {
        item.classList.add("active");
        const content = item.querySelector(".accordion-content");
        if (content) content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
