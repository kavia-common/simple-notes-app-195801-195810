import React from "react";

/**
 * App header with title and optional right-side content (e.g., SearchBar).
 */
// PUBLIC_INTERFACE
export default function Header({ right }) {
  return (
    <header className="Header">
      <div className="Header__inner">
        <div className="Header__brand" aria-label="Simple Notes">
          <div className="Header__logoMark" aria-hidden="true">
            <span className="Header__logoDot" />
            <span className="Header__logoDot Header__logoDot--amber" />
          </div>
          <div className="Header__titles">
            <h1 className="Header__title">Simple Notes</h1>
            <p className="Header__subtitle">Ocean Professional</p>
          </div>
        </div>

        <div className="Header__right">{right}</div>
      </div>
    </header>
  );
}
