import React, { useRef, useState } from "react";

export default function UploadPanel({ onFile, onUseSample, loading, error, fileName }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }

  return (
    <div className="card">
      <h2 className="card-title">Upload Medical Report</h2>

      <div
        className={`upload-zone ${dragging ? "dragging" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <div className="upload-icon">⬆</div>
        <div className="upload-title">Drop your PDF report here</div>
        <div className="upload-hint">or click to browse — PDF files up to ~10 MB</div>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </div>

      {fileName && (
        <div className="file-chip">
          <span>📄</span>
          <span>{fileName}</span>
        </div>
      )}

      {error && <div className="alert-error">{error}</div>}

      <div className="upload-actions">
        <button className="btn btn-primary" onClick={onUseSample} disabled={loading}>
          {loading ? "Processing…" : "Try a sample report"}
        </button>
        <span className="btn btn-ghost" style={{ color: "var(--c-text-muted)" }}>
          No real upload required to explore the app.
        </span>
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="disclaimer">
          <span className="disclaimer-icon">⚠️</span>
          <span>
            This AI Medical Report Summarizer is designed for educational and informational
            purposes only. It does not provide medical diagnosis and should not replace
            consultation with qualified healthcare professionals.
          </span>
        </div>
      </div>
    </div>
  );
}
