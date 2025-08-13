import React from 'react';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function AppBar({ title, showBack = false, showCalendar = false }) {
  /**
   * Top app bar that matches the design assets.
   * - title: string to display
   * - showBack: renders a back button
   * - showCalendar: renders calendar icon button (on home)
   */
  const navigate = useNavigate();
  return (
    <header className="app-bar" role="banner" aria-label="App Bar">
      {showBack && (
        <button
          className="back-btn"
          aria-label="Go back"
          title="Back"
          onClick={() => navigate(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
      )}
      <h1 className="app-title typo-8">{title}</h1>
      {showCalendar && (
        <button
          className="calendar-btn"
          aria-label="Calendar"
          title="Calendar"
          onClick={() => {}}
        >
          <span aria-hidden="true">🗓</span>
        </button>
      )}
    </header>
  );
}
