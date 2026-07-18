import React from "react";

export default function StatCards({ parameters, counts, score }) {
  const cards = [
    { label: "Parameters Detected", value: parameters.length, sub: "Total parsed from report", cls: "teal" },
    { label: "Normal", value: counts.Normal, sub: "Within reference range", cls: "green" },
    { label: "High", value: counts.High, sub: "Above reference range", cls: "red" },
    { label: "Low", value: counts.Low, sub: "Below reference range", cls: "orange" },
  ];

  return (
    <div className="stat-grid">
      {cards.map((c) => (
        <div key={c.label} className={`stat-card ${c.cls}`}>
          <div className="stat-label">{c.label}</div>
          <div className="stat-value">{c.value}</div>
          <div className="stat-sub">{c.sub}</div>
        </div>
      ))}
      <div className="stat-card teal" style={{ gridColumn: "span 4" }}>
        <div className="stat-label">Overall Health Score</div>
        <div className="stat-value">
          {score}
          <span style={{ fontSize: 16, color: "var(--c-text-muted)", fontWeight: 500 }}> / 100</span>
        </div>
        <div className="stat-sub">
          {score >= 85 ? "Excellent" : score >= 70 ? "Good — a few items to review" : score >= 50 ? "Needs attention" : "Several concerns — consult a clinician"}
        </div>
      </div>
    </div>
  );
}
