// js/language.js
console.log("✅ language.js loaded");

const dropdown = document.querySelector(".lang-dropdown");
if (!dropdown) {
  console.error("❌ Kunne ikke finde .lang-dropdown – tjek at nav.html er korrekt indlæst");
}

const btn = dropdown.querySelector(".lang-btn");
const menu = dropdown.querySelector(".lang-menu");
const flag = btn.querySelector(".lang-flag");

// Klik på knappen åbner/lukker menuen
btn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("active");
});

// Klik udenfor lukker menuen
document.addEventListener("click", () => {
  dropdown.classList.remove("active");
});

// Klik på et sprog
menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const newFlag = link.querySelector("img").src;
    flag.src = newFlag;

    const lang = link.dataset.lang;
    console.log("Skift til sprog:", lang);

    dropdown.classList.remove("active");
  });
});
