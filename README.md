# MediScan AI — Medical Report Summarizer

An AI-powered web application that turns complex PDF medical reports into simple,
patient-friendly health insights. Upload a lab report PDF and get:

- Automatic extraction of medical parameters (test name, value, unit, reference range)
- Abnormality detection with **Normal / High / Low** classification and severity
- A plain-language AI summary explaining each flagged value
- General lifestyle & dietary recommendations
- An interactive analytics dashboard with Plotly charts
- A health score (0-100) based on detected abnormalities

> ⚠️ **Educational use only.** This tool does not provide a medical diagnosis and does
> not replace consultation with qualified healthcare professionals.

---

## Features

### 1. PDF Report Parser
Upload a PDF lab report. Text is extracted in the browser using `pdfjs-dist`
(no server needed), cleaned, and passed to the analysis engine.

### 2. Medical Parameter Extraction
Pattern matching against a built-in knowledge base of common lab tests
(haematology, lipids, metabolic, renal, electrolytes, thyroid, vitamins, liver)
identifies test name, value, unit, and reference range.

### 3. Abnormality Detection
Each parameter is classified as **Normal**, **High**, or **Low** against its
reference range, with a severity level (mild / moderate / severe) based on how
far outside the range the value falls.

### 4. AI Summary Generator
For every abnormal value, the app produces a plain-language explanation and a
general recommendation drawn from the knowledge base. A top-level summary
describes the overall picture and the health score.

### 5. Analytics Dashboard
- Stat cards: total parameters, normal / high / low counts, health score
- Plotly charts: measured-vs-reference bar, status distribution donut,
  abnormal-parameters deviation bar

### 6. UI
Healthcare-themed teal/white design with sidebar navigation, drag-and-drop
upload, color-coded results (green = normal, red = high, orange = low),
and a persistent safety disclaimer.

---

## Tech Stack

- **React 18 + Vite** — frontend
- **pdfjs-dist** — client-side PDF text extraction
- **Plotly (react-plotly.js)** — interactive charts
- **Vanilla CSS** — healthcare-themed design system

> The original spec called for Streamlit/Python. This implementation delivers the
> same feature set as a Vite + React app so it runs in any browser without a
> Python runtime.

---

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
```

Then open the printed local URL in your browser.

### Try without a PDF
On the Upload screen, click **"Try a sample report"** to load a built-in demo
report (CBC + lipid + metabolic + thyroid + vitamins + liver panel) and explore
every feature instantly.

---

## Project Structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── global.css
    ├── data/
    │   ├── medicalDB.js        # test reference ranges, explanations, recommendations
    │   └── sampleReport.js     # in-app demo report
    ├── lib/
    │   ├── pdfParser.js         # PDF text extraction + cleaning
    │   ├── parameterExtractor.js # regex-based lab parameter extraction
    │   └── medicalAnalysis.js   # classification, scoring, summary generation
    └── components/
        ├── Sidebar.jsx
        ├── UploadPanel.jsx
        ├── StatCards.jsx
        ├── ResultsTable.jsx
        ├── Charts.jsx
        └── SummaryPanel.jsx
```

---

## Workflow

1. User uploads a PDF (or loads the sample report)
2. `pdfParser` extracts and cleans text
3. `parameterExtractor` identifies lab parameters and reference ranges
4. `medicalAnalysis` classifies each value (Normal / High / Low) and assigns severity
5. `generateSummary` produces plain-language explanations + recommendations
6. Dashboard renders stat cards, table, and Plotly charts
7. AI Summary view presents flagged values with explanations and the disclaimer

---

## Supported Lab Tests (knowledge base)

Haemoglobin, RBC, WBC, Platelets, Fasting Glucose, HbA1c, Total Cholesterol, LDL,
HDL, Triglycerides, Creatinine, Urea (BUN), Sodium, Potassium, TSH, Vitamin D,
Vitamin B12, ALT (SGPT), AST (SGOT), Bilirubin.

Each entry includes adult reference ranges, plain-language explanations for
high/low results, and general recommendations.

---

## Disclaimer

This AI Medical Report Summarizer is designed for educational and informational
purposes only. It does not provide medical diagnosis and should not replace
consultation with qualified healthcare professionals. Always seek the advice of
your physician or other qualified health provider with any questions you may have
regarding a medical condition.
