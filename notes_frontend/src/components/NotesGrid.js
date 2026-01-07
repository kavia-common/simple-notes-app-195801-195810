import React from "react";
import NoteCard from "./NoteCard";

/**
 * Responsive notes grid.
 */
// PUBLIC_INTERFACE
export default function NotesGrid({ notes, onEdit, onDelete }) {
  if (!notes.length) {
    return (
      <div className="EmptyState" role="status" aria-live="polite">
        <div className="EmptyState__card">
          <h2 className="EmptyState__title">No notes yet</h2>
          <p className="EmptyState__text">
            Create your first note using the “New” button.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="NotesGrid" role="list" aria-label="Notes">
      {notes.map((n) => (
        <div key={n.id} role="listitem">
          <NoteCard note={n} onEdit={() => onEdit(n)} onDelete={() => onDelete(n)} />
        </div>
      ))}
    </div>
  );
}
