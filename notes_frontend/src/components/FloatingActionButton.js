import React from "react";

/**
 * Floating action button (FAB) used for "Add note".
 */
// PUBLIC_INTERFACE
export default function FloatingActionButton({ onClick }) {
  return (
    <button
      type="button"
      className="FAB"
      onClick={onClick}
      aria-label="Add note"
      title="Add note"
    >
      <span className="FAB__plus" aria-hidden="true">
        +
      </span>
      <span className="FAB__text">New</span>
    </button>
  );
}
