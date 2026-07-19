// Extracts medical parameters from raw report text using pattern matching
// against the known test aliases in MEDICAL_DB. Each result is structured as:
// { name, key, value, unit, refLow, refHigh, sourceRangeText }

import { MEDICAL_DB } from "../data/medicalDB.js";

const NUMBER = "(-?\\d+(?:\\.\\d+)?)";

// Build a single alternation of all aliases, longest first so "haemoglobin"
// wins over "hb" when both could match.
const allAliases = Object.values(MEDICAL_DB)
  .flatMap((e) => e.aliases)
  .sort((a, b) => b.length - a.length)
  .map(escapeRegex);

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Match: <test name> <number> <unit?> [Ref: ...]
// Tolerates ":" separators, dashes, and "Ref" / "Reference" markers.
const LINE_REGEX = new RegExp(
  `\\b(${allAliases.join("|")})\\b[^\\d]{0,40}?${NUMBER}\\s*([a-zA-Z%µ/]+)?`,
  "gi"
);

// Capture an explicit reference range that follows, e.g. "Ref: 13.0 - 17.0" or "( 4.0 - 5.5 )"
const REF_REGEX = /(?:ref(?:erence)?|normal(?:\s+range)?)?\s*[:\-]?\s*\(?\s*(\d+(?:\.\d+)?)\s*(?:-|to|–|—)\s*(\d+(?:\.\d+)?)\s*\)?/i;

export function extractParameters(text) {
  if (!text) return [];
  const found = new Map();

  let match;
  LINE_REGEX.lastIndex = 0;
  while ((match = LINE_REGEX.exec(text)) !== null) {
    const rawName = match[1];
    const value = parseFloat(match[2]);
    const rawUnit = (match[3] || "").trim();
    if (Number.isNaN(value)) continue;

    const entry = lookupByAlias(rawName);
    if (!entry) continue;

    // Look ahead within the same line / nearby window for an explicit ref range.
    const window = text.slice(match.index, match.index + 80);
    const refMatch = window.match(REF_REGEX);
    let refLow = entry.range.low;
    let refHigh = entry.range.high;
    let sourceRangeText = `${entry.range.low} - ${entry.range.high}`;
    if (refMatch) {
      refLow = parseFloat(refMatch[1]);
      refHigh = parseFloat(refMatch[2]);
      sourceRangeText = `${refLow} - ${refHigh}`;
    }

    // Prefer a unit explicitly in the report, otherwise the DB default.
    const unit = rawUnit && looksLikeUnit(rawUnit) ? normaliseUnit(rawUnit) : entry.unit;

    const key = entry.key;
    // Keep the first occurrence per test to avoid duplicates.
    if (!found.has(key)) {
      found.set(key, {
        key,
        name: titleCase(entry.aliases[0]),
        value,
        unit,
        refLow,
        refHigh,
        sourceRangeText,
        category: entry.category,
      });
    }
  }

  return Array.from(found.values());
}

function lookupByAlias(alias) {
  const a = alias.toLowerCase().trim();
  for (const [key, entry] of Object.entries(MEDICAL_DB)) {
    if (entry.aliases.some((al) => a === al || a.includes(al))) {
      return { key, ...entry };
    }
  }
  return null;
}

function looksLikeUnit(s) {
  return /^(mg\/dL|g\/dL|mmol\/L|mIU\/L|ng\/mL|pg\/mL|U\/L|%|million\/µL|cells\/µL|µg\/dL)$/i.test(s);
}

function normaliseUnit(s) {
  return s.replace(/\s+/g, "");
}

function titleCase(s) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}
