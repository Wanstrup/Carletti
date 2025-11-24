document.addEventListener("DOMContentLoaded", async () => {
  // Alle sektioner der skal hente indhold
  const stepSections = [
    { id: "pralines", file: "pralines.html" },
    { id: "design", file: "design.html" },
    { id: "quote", file: "quote.html" }
  ];

  // Gennemgå alle steps og hent deres HTML
  for (const step of stepSections) {
    const section = document.querySelector(`#${step.id} .accordion-content`);
    if (!section) continue;

    try {
      const response = await fetch(`steps/${step.file}`);
      if (!response.ok) throw new Error(`Fejl ved indlæsning af ${step.file}`);
      const html = await response.text();
      section.innerHTML = html;
      console.log(`✅ Indlæst: ${step.file}`);
    } catch (err) {
      console.error(`Kunne ikke hente ${step.file}:`, err);
      section.innerHTML = `<p style="color:red;">Kunne ikke indlæse ${step.file}</p>`;
    }
  }
});


document.addEventListener("click", (e) => {

    // --- Continue button ---
    const nextBtn = e.target.closest(".continue-link");
    if (nextBtn) {
        e.preventDefault();
        const nextFile = nextBtn.dataset.next;
        openStepByFile(nextFile);
    }

    // --- Back button ---
    const backBtn = e.target.closest(".back-link");
    if (backBtn) {
        e.preventDefault();
        const prevFile = backBtn.dataset.prev;
        openStepByFile(prevFile);
    }
});


// Helper: Åbn det accordion-item som matcher en step-fil
function openStepByFile(filename) {
    // Find accordion-id ud fra filnavn:
    // pralines.html → pralines
    // design.html → design
    // quote.html → quote
    const stepId = filename.replace(".html", "");

    const targetAcc = document.querySelector(`#${stepId}`);
    if (!targetAcc) return;

    // Luk alle andre accordions
    document.querySelectorAll(".accordion-item").forEach(item => {
        item.classList.remove("active");
        const c = item.querySelector(".accordion-content");
        if (c) c.style.maxHeight = null;
    });

    // Åbn den rigtige accordion
    targetAcc.classList.add("active");
    const content = targetAcc.querySelector(".accordion-content");
    if (content) content.style.maxHeight = content.scrollHeight + "px";
}

