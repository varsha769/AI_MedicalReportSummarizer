// PDF text extraction using pdfjs-dist (client-side, no server needed).
// Returns the concatenated text of every page.

export async function extractTextFromPDF(file) {
  const pdfjs = await import("pdfjs-dist");
  // Use the bundled worker via Vite's ?url import.
  const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => item.str)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (pageText) fullText += pageText + "\n";
  }
  return fullText.trim();
}

// Light text cleaning: collapse whitespace, strip repeated headers/page numbers.
export function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/page\s+\d+\s+of\s+\d+/gi, " ")
    .replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, " ") // strip some dates
    .replace(/[ \t]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
