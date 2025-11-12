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
