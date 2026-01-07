import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Modal for creating/editing a note.
 *
 * Props:
 * - open: boolean
 * - mode: "create" | "edit"
 * - initialNote: note object or null
 * - onSave: ({title, body}) => void
 * - onCancel: () => void
 */
// PUBLIC_INTERFACE
export default function NoteEditorModal({ open, mode, initialNote, onSave, onCancel }) {
  const initialTitle = initialNote?.title ?? "";
  const initialBody = initialNote?.body ?? "";

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [touched, setTouched] = useState(false);

  const titleInputRef = useRef(null);
  const previouslyFocused = useRef(null);

  const titleError = useMemo(() => {
    if (!touched) return "";
    return title.trim() ? "" : "Title is required.";
  }, [title, touched]);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;

    // Reset fields when opening.
    setTitle(initialTitle);
    setBody(initialBody);
    setTouched(false);

    // Focus title input for accessibility.
    window.setTimeout(() => titleInputRef.current?.focus(), 0);

    return () => {
      // Restore focus when closing.
      const el = previouslyFocused.current;
      if (el && typeof el.focus === "function") el.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialNote?.id]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="Modal" role="dialog" aria-modal="true" aria-label="Note editor">
      <button
        type="button"
        className="Modal__backdrop"
        onClick={onCancel}
        aria-label="Close editor"
      />
      <div className="Modal__panel">
        <div className="Modal__header">
          <h2 className="Modal__title">{mode === "edit" ? "Edit note" : "New note"}</h2>
          <button
            type="button"
            className="IconButton"
            onClick={onCancel}
            aria-label="Cancel"
            title="Cancel"
          >
            ×
          </button>
        </div>

        <form
          className="Modal__body"
          onSubmit={(e) => {
            e.preventDefault();
            setTouched(true);
            if (!title.trim()) return;
            onSave({ title, body });
          }}
        >
          <div className="Field">
            <label className="Field__label" htmlFor="note-title">
              Title <span aria-hidden="true" className="Field__required">*</span>
            </label>
            <input
              id="note-title"
              ref={titleInputRef}
              className={`Field__input ${titleError ? "Field__input--error" : ""}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="e.g., Grocery list"
              aria-invalid={Boolean(titleError)}
            />
            {titleError ? <div className="Field__error">{titleError}</div> : null}
          </div>

          <div className="Field">
            <label className="Field__label" htmlFor="note-body">
              Body
            </label>
            <textarea
              id="note-body"
              className="Field__textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your note…"
              rows={8}
            />
          </div>

          <div className="Modal__footer">
            <button type="button" className="Button Button--ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="Button Button--primary" aria-label="Save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
