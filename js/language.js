document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".lang-dropdown");
  const btn = dropdown.querySelector(".lang-btn");
  const menu = dropdown.querySelector(".lang-menu");
  const flag = btn.querySelector(".lang-flag");

  // Åbn/luk dropdown
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");
  });

  // Luk dropdown, hvis man klikker udenfor
  document.addEventListener("click", () => {
    dropdown.classList.remove("active");
  });

  // Skift flag + evt. sprog
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const newFlag = link.querySelector("img").src;
      flag.src = newFlag;

      const lang = link.dataset.lang;
      console.log("Sprog valgt:", lang);

      // Hvis du bruger forskellige sider per sprog:
      // if (lang === "da") window.location.href = "index_da.html";
      // if (lang === "en") window.location.href = "index.html";
      // if (lang === "de") window.location.href = "index_de.html";

      dropdown.classList.remove("active");
    });
  });
});
