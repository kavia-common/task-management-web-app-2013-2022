import React from 'react';

// PUBLIC_INTERFACE
export default function StatusBar() {
  /** iOS-like status bar using provided SVG structures and tokens */
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  return (
    <div className="status-bar" role="region" aria-label="Status bar">
      <div className="status-time">{time}</div>
      <div className="status-icons" aria-hidden="true" title="Status">
        {/* Cellular Tower / Dark */}
        <svg className="icon-tower" width="20" height="14" viewBox="0 0 20 14" role="img" aria-label="Cellular signal" shapeRendering="crispEdges" focusable="false" aria-hidden="true">
          {/* Base (style_8: color_d1d1d6) */}
          <rect x="2" y="7.5" width="3" height="4.5" fill="var(--color-d1d1d6)"></rect>
          <rect x="6.5" y="6" width="3" height="6" fill="var(--color-d1d1d6)"></rect>
          <rect x="11" y="4" width="3" height="8" fill="var(--color-d1d1d6)"></rect>
          {/* Empty bar (style_9: color_ebebf5) */}
          <rect x="15.5" y="2" width="3" height="10" fill="var(--color-ebebf5)"></rect>
          {/* Overlay (style_0: color_ffffff) */}
          <rect x="2" y="7.5" width="3" height="4.5" fill="var(--color-ffffff)"></rect>
          <rect x="6.5" y="6" width="3" height="6" fill="var(--color-ffffff)"></rect>
          <rect x="11" y="4" width="3" height="8" fill="var(--color-ffffff)"></rect>
        </svg>
        {/* Wi‑Fi placeholder */}
        <span title="Wi‑Fi" aria-hidden="true">📡</span>
        {/* Battery */}
        <svg className="icon-battery" width="25" height="12" viewBox="0 0 25 12" role="img" aria-label="Battery 100%" shapeRendering="crispEdges">
          <rect x="0.5" y="0.5" width="22" height="11" rx="2" fill="none" stroke="var(--color-ebebf5)"></rect>
          <rect x="2" y="2" width="19" height="8" rx="1" fill="var(--color-ffffff)"></rect>
          <rect x="24" y="4" width="1" height="4" fill="var(--color-ebebf5)"></rect>
        </svg>
        <span className="status-dot"></span>
      </div>
    </div>
  );
}
