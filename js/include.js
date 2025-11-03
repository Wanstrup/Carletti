// js/include.js

document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  fetch("nav.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });

  // Load footer
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });
});
