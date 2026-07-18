import React from "react";
import Plot from "react-plotly.js";

export default function Charts({ parameters, counts }) {
  if (!parameters.length) return null;

  const colorMap = { High: "#dc2626", Low: "#d97706", Normal: "#16a34a" };

  // Bar chart of all parameters, color by status, y = value vs reference midpoint.
  const barColors = parameters.map((p) => colorMap[p.status]);
  const refMid = parameters.map((p) => (p.refLow + p.refHigh) / 2);

  const bar = {
    data: [
      {
        x: parameters.map((p) => p.name),
        y: parameters.map((p) => p.value),
        type: "bar",
        marker: { color: barColors },
        name: "Measured",
        text: parameters.map((p) => `${p.value} ${p.unit}`),
        textposition: "outside",
        textfont: { size: 10 },
      },
      {
        x: parameters.map((p) => p.name),
        y: refMid,
        type: "scatter",
        mode: "markers",
        name: "Ref midpoint",
        marker: { color: "#0f766e", size: 8, symbol: "diamond" },
      },
    ],
    layout: {
      title: { text: "Measured vs Reference Midpoint", font: { size: 13 } },
      margin: { t: 36, r: 16, b: 80, l: 48 },
      xaxis: { tickangle: -35, tickfont: { size: 10 } },
      yaxis: { tickfont: { size: 10 }, gridcolor: "#eef2f7" },
      legend: { font: { size: 11 }, orientation: "h", y: -0.5 },
      plot_bgcolor: "#fff",
      paper_bgcolor: "#fff",
      showlegend: true,
    },
    config: { displayModeBar: false, responsive: true },
  };

  // Donut: status distribution.
  const donut = {
    data: [
      {
        labels: ["Normal", "High", "Low"],
        values: [counts.Normal, counts.High, counts.Low],
        type: "pie",
        hole: 0.6,
        marker: { colors: ["#16a34a", "#dc2626", "#d97706"] },
        textinfo: "label+percent",
        textfont: { size: 12 },
      },
    ],
    layout: {
      title: { text: "Status Distribution", font: { size: 13 } },
      margin: { t: 36, r: 16, b: 24, l: 16 },
      showlegend: false,
      plot_bgcolor: "#fff",
      paper_bgcolor: "#fff",
    },
    config: { displayModeBar: false, responsive: true },
  };

  // Abnormal-only bar with deviation %.
  const abnormal = parameters.filter((p) => p.status !== "Normal");
  const deviationBar = abnormal.length
    ? {
        data: [
          {
            x: abnormal.map((p) => p.name),
            y: abnormal.map((p) => (p.status === "High" ? p.deviationPct : -p.deviationPct)),
            type: "bar",
            marker: { color: abnormal.map((p) => colorMap[p.status]) },
            text: abnormal.map((p) => `${p.deviationPct}% ${p.status.toLowerCase()}`),
            textposition: "outside",
            textfont: { size: 10 },
          },
        ],
        layout: {
          title: { text: "Abnormal Parameters — Deviation %", font: { size: 13 } },
          margin: { t: 36, r: 16, b: 80, l: 48 },
          xaxis: { tickangle: -35, tickfont: { size: 10 } },
          yaxis: {
            title: { text: "% above (+) / below (−) range", font: { size: 10 } },
            tickfont: { size: 10 },
            gridcolor: "#eef2f7",
            zeroline: true,
            zerolinecolor: "#cbd5e1",
          },
          plot_bgcolor: "#fff",
          paper_bgcolor: "#fff",
        },
        config: { displayModeBar: false, responsive: true },
      }
    : null;

  return (
    <div className="chart-grid">
      <div className="chart-card">
        <h3 className="chart-title">Parameter Values</h3>
        <Plot {...bar} style={{ width: "100%", height: 340 }} />
      </div>
      <div className="chart-card">
        <h3 className="chart-title">Health Status Distribution</h3>
        <Plot {...donut} style={{ width: "100%", height: 340 }} />
      </div>
      {deviationBar && (
        <div className="chart-card" style={{ gridColumn: "span 2" }}>
          <h3 className="chart-title">Abnormal Parameters</h3>
          <Plot {...deviationBar} style={{ width: "100%", height: 320 }} />
        </div>
      )}
    </div>
  );
}
