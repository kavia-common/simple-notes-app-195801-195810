/**
 * Notes persistence wrapper around localStorage.
 *
 * Stores an array of note objects under a namespaced key.
 * A note has: { id, title, body, createdAt, updatedAt }.
 */

const STORAGE_KEY = "simple-notes-app:ocean-professional:notes";

// PUBLIC_INTERFACE
export function loadNotes() {
  /** Load notes from localStorage; returns [] on any error. */
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotes(notes) {
  /** Save notes to localStorage. */
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// PUBLIC_INTERFACE
export function createNote({ title, body }) {
  /** Create a new note object. Does not persist. */
  const now = new Date().toISOString();
  return {
    id: cryptoSafeId(),
    title: title.trim(),
    body: body ?? "",
    createdAt: now,
    updatedAt: now,
  };
}

// PUBLIC_INTERFACE
export function updateNote(existing, { title, body }) {
  /** Return an updated copy of a note. Does not persist. */
  const now = new Date().toISOString();
  return {
    ...existing,
    title: title.trim(),
    body: body ?? "",
    updatedAt: now,
  };
}

function cryptoSafeId() {
  // Prefer crypto.randomUUID when available; otherwise fallback.
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `note_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
