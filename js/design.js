// Color selection
document.querySelectorAll(".color-dot").forEach(dot => {
  dot.addEventListener("click", () => {
    document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("selected"));
    dot.classList.add("selected");
    sessionStorage.setItem("designColor", dot.dataset.color);
  });
});

// Theme selection
document.getElementById("theme-select").addEventListener("change", (e) => {
  sessionStorage.setItem("designTheme", e.target.value);
});

// File upload
const fileInput = document.getElementById("file-input");
const uploadBtn = document.getElementById("upload-btn");
const uploadArea = document.getElementById("upload-area");

uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    sessionStorage.setItem("designLogo", fileInput.files[0].name);
    uploadArea.innerHTML = `<strong>${fileInput.files[0].name}</strong><p>uploaded successfully</p>`;
  }
});

// Drag & drop
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = "#e42d2d";
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.style.borderColor = "#ccc";
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = "#ccc";

  const file = e.dataTransfer.files[0];
  sessionStorage.setItem("designLogo", file.name);

  uploadArea.innerHTML = `<strong>${file.name}</strong><p>uploaded successfully</p>`;
});
