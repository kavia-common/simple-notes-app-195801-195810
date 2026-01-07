import React, { useMemo } from "react";

function formatTimestamp(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Note card in the list/grid.
 */
// PUBLIC_INTERFACE
export default function NoteCard({ note, onEdit, onDelete }) {
  const created = useMemo(() => formatTimestamp(note.createdAt), [note.createdAt]);
  const updated = useMemo(() => formatTimestamp(note.updatedAt), [note.updatedAt]);

  const showUpdated = note.updatedAt && note.updatedAt !== note.createdAt;

  return (
    <article className="NoteCard">
      <div className="NoteCard__top">
        <h3 className="NoteCard__title" title={note.title}>
          {note.title}
        </h3>

        <div className="NoteCard__actions">
          <button
            type="button"
            className="IconButton"
            onClick={onEdit}
            aria-label="Edit note"
            title="Edit"
          >
            ✎
          </button>
          <button
            type="button"
            className="IconButton IconButton--danger"
            onClick={onDelete}
            aria-label="Delete note"
            title="Delete"
          >
            🗑
          </button>
        </div>
      </div>

      {note.body ? <p className="NoteCard__body">{note.body}</p> : null}

      <div className="NoteCard__meta">
        <span className="NoteCard__metaItem">Created: {created}</span>
        {showUpdated ? <span className="NoteCard__metaItem">Updated: {updated}</span> : null}
      </div>
    </article>
  );
}
