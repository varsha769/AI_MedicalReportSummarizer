import React from "react";

export default function Sidebar({ view, setView, hasReport }) {
  const items = [
    { id: "upload", label: "Upload Report", icon: "↑" },
    { id: "preview", label: "Report Preview", icon: "📄", disabled: !hasReport },
    { id: "results", label: "Analysis Results", icon: "🩺", disabled: !hasReport },
    { id: "dashboard", label: "Analytics Dashboard", icon: "📊", disabled: !hasReport },
    { id: "summary", label: "AI Summary", icon: "✨", disabled: !hasReport },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">+</div>
        <div>
          <div className="brand-name">MediScan AI</div>
          <div className="brand-tag">Report Summarizer</div>
        </div>
      </div>

      <nav className="nav">
        {items.map((it) => (
          <button
            key={it.id}
            className={`nav-item ${view === it.id ? "active" : ""}`}
            onClick={() => !it.disabled && setView(it.id)}
            disabled={it.disabled}
            style={it.disabled ? { opacity: 0.4, cursor: "not-allowed" } : undefined}
          >
            <span className="nav-icon">{it.icon}</span>
            <span>{it.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        Educational tool only. Not a substitute for professional medical advice.
      </div>
    </aside>
  );
}
