import React from "react";

export default function SummaryPanel({ summary }) {
  if (!summary) return null;

  return (
    <div>
      <div className="card">
        <h2 className="card-title">AI-Generated Summary</h2>
        <p className="summary-overall">{summary.overall}</p>

        {summary.flagged && summary.flagged.length > 0 ? (
          <div className="flagged-list">
            {summary.flagged.map((f, i) => (
              <div key={i} className={`flagged-item ${f.status.toLowerCase()}`}>
                <div className="flagged-head">
                  <div>
                    <div className="flagged-name">{f.name}</div>
                    <div className="flagged-meta">
                      Measured {f.value} · Reference {f.reference}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className={`pill ${f.status.toLowerCase()}`}>{f.status}</span>
                    <span
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}
                    >
                      <span className={`severity-dot ${f.severity}`} />
                      {f.severity}
                    </span>
                  </div>
                </div>
                <p className="flagged-explanation">{f.explanation}</p>
                <div className="flagged-rec">
                  <span className="rec-label">Recommendation: </span>
                  {f.recommendation}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ marginTop: 14, color: "var(--c-text-muted)" }}>
            No abnormal values detected — keep up your healthy routine.
          </p>
        )}
      </div>

      {summary.recommendations && summary.recommendations.length > 0 && (
        <div className="card">
          <h2 className="card-title">General Recommendations</h2>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6, color: "#334155" }}>
            {summary.recommendations.map((r, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                <strong>{r.topic}:</strong> {r.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="disclaimer" style={{ marginTop: 16 }}>
        <span className="disclaimer-icon">⚠️</span>
        <span>
          This AI Medical Report Summarizer is designed for educational and informational
          purposes only. It does not provide medical diagnosis and should not replace
          consultation with qualified healthcare professionals.
        </span>
      </div>
    </div>
  );
}
