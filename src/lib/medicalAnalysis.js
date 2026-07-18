// Abnormality detection + scoring + summary generation.
import { MEDICAL_DB } from "../data/medicalDB.js";

export function classifyParameters(parameters) {
  return parameters.map((p) => {
    let status = "Normal";
    if (p.value < p.refLow) status = "Low";
    else if (p.value > p.refHigh) status = "High";

    const severity = severityLevel(p, status);

    return {
      ...p,
      status,
      severity,
      deviationPct:
        status === "Normal"
          ? 0
          : status === "High"
          ? Math.round(((p.value - p.refHigh) / p.refHigh) * 100)
          : Math.round(((p.refLow - p.value) / p.refLow) * 100),
    };
  });
}

function severityLevel(p, status) {
  if (status === "Normal") return "none";
  const span = Math.max(p.refHigh - p.refLow, 0.0001);
  const overshoot =
    status === "High" ? (p.value - p.refHigh) / span : (p.refLow - p.value) / span;
  if (overshoot <= 0.1) return "mild";
  if (overshoot <= 0.3) return "moderate";
  return "severe";
}

export function computeHealthScore(parameters) {
  if (!parameters.length) return 0;
  // Start from 100; deduct based on severity of each abnormal parameter.
  let score = 100;
  for (const p of parameters) {
    if (p.status === "Normal") continue;
    if (p.severity === "mild") score -= 5;
    else if (p.severity === "moderate") score -= 12;
    else if (p.severity === "severe") score -= 20;
  }
  return Math.max(0, Math.min(100, score));
}

export function statusCounts(parameters) {
  const counts = { Normal: 0, High: 0, Low: 0 };
  parameters.forEach((p) => {
    counts[p.status] = (counts[p.status] || 0) + 1;
  });
  return counts;
}

export function generateSummary(parameters) {
  if (!parameters.length) {
    return {
      overall: "No parameters were detected in the uploaded report. Try a different PDF or use the sample report.",
      flagged: [],
      recommendations: [],
    };
  }

  const abnormal = parameters.filter((p) => p.status !== "Normal");
  const counts = statusCounts(parameters);
  const score = computeHealthScore(parameters);

  const overall =
    abnormal.length === 0
      ? `Great news — all ${parameters.length} detected parameters fall within normal reference ranges. Your overall health score is ${score}/100. Keep up your current habits and continue routine check-ups.`
      : `We analysed ${parameters.length} parameters and found ${abnormal.length} value${abnormal.length > 1 ? "s" : ""} outside the reference range (${counts.High} high, ${counts.Low} low). Your overall health score is ${score}/100. Below is a plain-language explanation of each flagged value, along with general suggestions. These are educational only — please discuss them with a qualified healthcare professional.`;

  const flagged = abnormal.map((p) => {
    const entry = MEDICAL_DB[p.key];
    const explanation = entry?.explanation?.[p.status.toLowerCase()] || "";
    const recommendation = entry?.recommendations?.[p.status.toLowerCase()] || "";
    return {
      name: p.name,
      status: p.status,
      value: `${p.value} ${p.unit}`,
      reference: `${p.refLow} - ${p.refHigh} ${p.unit}`,
      severity: p.severity,
      explanation,
      recommendation,
    };
  });

  // Deduplicate recommendations by text.
  const recs = [];
  const seen = new Set();
  abnormal.forEach((p) => {
    const entry = MEDICAL_DB[p.key];
    const r = entry?.recommendations?.[p.status.toLowerCase()];
    if (r && !seen.has(r)) {
      seen.add(r);
      recs.push({ topic: p.name, text: r });
    }
  });

  return { overall, flagged, recommendations: recs };
}

export const DISCLAIMER =
  "This AI Medical Report Summarizer is designed for educational and informational purposes only. It does not provide medical diagnosis and should not replace consultation with qualified healthcare professionals. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.";
