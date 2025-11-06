// js/include.js
document.addEventListener("DOMContentLoaded", async () => {
  // Indlæs navbar og footer parallelt
  await Promise.all([
    fetch("nav.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("navbar-placeholder").innerHTML = html;
      }),
    fetch("footer.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("footer-placeholder").innerHTML = html;
      })
  ]);

  console.log("✅ Nav og footer indlæst");

  // Når navbaren er klar, indlæs language.js dynamisk
  const script = document.createElement("script");
  script.src = "js/language.js";
  document.body.appendChild(script);
});
