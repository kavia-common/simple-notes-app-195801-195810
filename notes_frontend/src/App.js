import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NotesGrid from "./components/NotesGrid";
import FloatingActionButton from "./components/FloatingActionButton";
import NoteEditorModal from "./components/NoteEditorModal";
import { createNote, loadNotes, saveNotes, updateNote } from "./utils/notesStorage";

/**
 * Simple Notes app: local-only CRUD with Ocean Professional theme.
 */
// PUBLIC_INTERFACE
export default function App() {
  const [notes, setNotes] = useState(() => loadNotes());
  const [query, setQuery] = useState("");

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState("create"); // "create" | "edit"
  const [activeNoteId, setActiveNoteId] = useState(null);

  useEffect(() => {
    // Persist notes on every change.
    saveNotes(notes);
  }, [notes]);

  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeNoteId) ?? null,
    [notes, activeNoteId]
  );

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes.slice().sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
    return notes
      .filter((n) => {
        const t = (n.title || "").toLowerCase();
        const b = (n.body || "").toLowerCase();
        return t.includes(q) || b.includes(q);
      })
      .slice()
      .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
  }, [notes, query]);

  // PUBLIC_INTERFACE
  function openCreate() {
    setEditorMode("create");
    setActiveNoteId(null);
    setEditorOpen(true);
  }

  // PUBLIC_INTERFACE
  function openEdit(note) {
    setEditorMode("edit");
    setActiveNoteId(note.id);
    setEditorOpen(true);
  }

  // PUBLIC_INTERFACE
  function closeEditor() {
    setEditorOpen(false);
  }

  // PUBLIC_INTERFACE
  function handleSave({ title, body }) {
    if (!title.trim()) return;

    if (editorMode === "create") {
      const newNote = createNote({ title, body });
      setNotes((prev) => [newNote, ...prev]);
      setEditorOpen(false);
      return;
    }

    if (editorMode === "edit" && activeNote) {
      const next = updateNote(activeNote, { title, body });
      setNotes((prev) => prev.map((n) => (n.id === activeNote.id ? next : n)));
      setEditorOpen(false);
    }
  }

  // PUBLIC_INTERFACE
  function handleDelete(note) {
    const ok = window.confirm(`Delete "${note.title}"? This cannot be undone.`);
    if (!ok) return;
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
    if (activeNoteId === note.id) setActiveNoteId(null);
  }

  return (
    <div className="AppShell">
      <Header
        right={<SearchBar value={query} onChange={(v) => setQuery(v)} />}
      />

      <main className="Main" aria-label="Notes content">
        <div className="Main__inner">
          <div className="Toolbar" aria-label="Notes toolbar">
            <div className="Toolbar__left">
              <span className="Toolbar__count" aria-label="Note count">
                {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
              </span>
              {query.trim() ? (
                <span className="Toolbar__pill" aria-label="Search filter active">
                  Filter: “{query.trim()}”
                </span>
              ) : null}
            </div>

            <div className="Toolbar__right">
              <button
                type="button"
                className="Button Button--secondary"
                onClick={openCreate}
                aria-label="Add note"
              >
                Add note
              </button>
            </div>
          </div>

          <NotesGrid notes={filteredNotes} onEdit={openEdit} onDelete={handleDelete} />
        </div>
      </main>

      <FloatingActionButton onClick={openCreate} />

      <NoteEditorModal
        open={editorOpen}
        mode={editorMode}
        initialNote={editorMode === "edit" ? activeNote : null}
        onSave={handleSave}
        onCancel={closeEditor}
      />
    </div>
  );
}
