import React from "react";

function StatusPill({ status }) {
  const cls = status === "High" ? "high" : status === "Low" ? "low" : "normal";
  return <span className={`pill ${cls}`}>{status}</span>;
}

export default function ResultsTable({ parameters }) {
  if (!parameters.length) {
    return (
      <div className="card">
        <h2 className="card-title">Detected Parameters</h2>
        <p style={{ color: "var(--c-text-muted)" }}>No parameters detected.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Detected Parameters</h2>
      <div className="table-wrap">
        <table className="params">
          <thead>
            <tr>
              <th>Test</th>
              <th>Category</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Reference Range</th>
              <th>Status</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((p) => (
              <tr key={p.key} className={`row-${p.status.toLowerCase()}`}>
                <td>{p.name}</td>
                <td style={{ color: "var(--c-text-muted)", fontSize: 13 }}>{p.category}</td>
                <td className="value-cell">{p.value}</td>
                <td>{p.unit}</td>
                <td style={{ color: "var(--c-text-muted)" }}>
                  {p.refLow} – {p.refHigh} {p.unit}
                </td>
                <td>
                  <StatusPill status={p.status} />
                </td>
                <td>
                  {p.severity === "none" ? (
                    <span style={{ color: "var(--c-text-soft)" }}>—</span>
                  ) : (
                    <span
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}
                    >
                      <span className={`severity-dot ${p.severity}`} />
                      {p.severity}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
