import React, { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import UploadPanel from "./components/UploadPanel.jsx";
import StatCards from "./components/StatCards.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import Charts from "./components/Charts.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import { extractTextFromPDF, cleanText } from "./lib/pdfParser.js";
import { extractParameters } from "./lib/parameterExtractor.js";
import { classifyParameters, computeHealthScore, statusCounts, generateSummary } from "./lib/medicalAnalysis.js";
import { SAMPLE_REPORT_TEXT } from "./data/sampleReport.js";

export default function App() {
  const [view, setView] = useState("upload");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [rawText, setRawText] = useState("");
  const [parameters, setParameters] = useState([]);

  const classified = useMemo(() => classifyParameters(parameters), [parameters]);
  const counts = useMemo(() => statusCounts(classified), [classified]);
  const score = useMemo(() => computeHealthScore(classified), [classified]);
  const summary = useMemo(() => generateSummary(classified), [classified]);
  const hasReport = parameters.length > 0 || !!rawText;

  async function handleFile(file) {
    setError("");
    setLoading(true);
    setFileName(file.name);
    try {
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        throw new Error("Please upload a PDF file.");
      }
      const text = await extractTextFromPDF(file);
      const cleaned = cleanText(text);
      if (!cleaned || cleaned.length < 20) {
        throw new Error("Could not extract readable text from this PDF. It may be a scanned image — text-based PDFs work best.");
      }
      setRawText(cleaned);
      const params = extractParameters(cleaned);
      if (!params.length) {
        setError("Text was extracted, but no recognised lab parameters were found. You can still view the raw text in Report Preview.");
      }
      setParameters(params);
      setView("results");
    } catch (e) {
      setError(e.message || "Failed to process the PDF.");
      setParameters([]);
      setRawText("");
    } finally {
      setLoading(false);
    }
  }

  function handleUseSample() {
    setError("");
    setFileName("sample_medical_report.txt");
    setRawText(SAMPLE_REPORT_TEXT);
    setParameters(extractParameters(SAMPLE_REPORT_TEXT));
    setView("results");
  }

  return (
    <div className="app-shell">
      <Sidebar view={view} setView={setView} hasReport={hasReport} />

      <main className="main">
        <div className="page-header">
          <h1 className="page-title">
            {view === "upload" && "Upload Your Medical Report"}
            {view === "preview" && "Report Preview"}
            {view === "results" && "Analysis Results"}
            {view === "dashboard" && "Analytics Dashboard"}
            {view === "summary" && "AI Health Summary"}
          </h1>
          <p className="page-subtitle">
            Upload a PDF lab report to extract parameters, detect abnormalities, and get
            plain-language insights.
          </p>
        </div>

        {view === "upload" && (
          <UploadPanel
            onFile={handleFile}
            onUseSample={handleUseSample}
            loading={loading}
            error={error}
            fileName={fileName}
          />
        )}

        {view === "preview" && (
          <div className="card">
            <h2 className="card-title">Extracted Text</h2>
            {rawText ? (
              <pre className="preview-text">{rawText}</pre>
            ) : (
              <p style={{ color: "var(--c-text-muted)" }}>No report loaded yet.</p>
            )}
          </div>
        )}

        {view === "results" && (
          <>
            <StatCards parameters={classified} counts={counts} score={score} />
            <div style={{ height: 16 }} />
            <ResultsTable parameters={classified} />
            {!classified.length && (
              <div className="card" style={{ marginTop: 16 }}>
                <p style={{ color: "var(--c-text-muted)", margin: 0 }}>
                  No recognised parameters were detected in this report. You can view the raw
                  text in the Report Preview tab, or try the sample report.
                </p>
                <div style={{ marginTop: 12 }}>
                  <button className="btn btn-primary" onClick={handleUseSample}>
                    Load sample report
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {view === "dashboard" && (
          <>
            <StatCards parameters={classified} counts={counts} score={score} />
            <div style={{ height: 16 }} />
            {classified.length ? (
              <Charts parameters={classified} counts={counts} />
            ) : (
              <div className="card">
                <p style={{ color: "var(--c-text-muted)" }}>
                  No data to visualise yet. Upload a report or try the sample.
                </p>
              </div>
            )}
          </>
        )}

        {view === "summary" && <SummaryPanel summary={summary} />}

        <div style={{ marginTop: 28 }}>
          <div className="disclaimer">
            <span className="disclaimer-icon">⚠️</span>
            <span>
              This AI Medical Report Summarizer is designed for educational and informational
              purposes only. It does not provide medical diagnosis and should not replace
              consultation with qualified healthcare professionals.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
