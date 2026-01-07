import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "../utils/debounce";

/**
 * Controlled search input with debounce.
 */
// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange }) {
  const [draft, setDraft] = useState(value ?? "");

  useEffect(() => {
    setDraft(value ?? "");
  }, [value]);

  const debounced = useMemo(() => debounce(onChange, 200), [onChange]);

  useEffect(() => {
    return () => debounced.cancel();
  }, [debounced]);

  return (
    <div className="SearchBar">
      <label className="SearchBar__label" htmlFor="notes-search">
        Search notes
      </label>
      <div className="SearchBar__control">
        <span className="SearchBar__icon" aria-hidden="true">
          ⌕
        </span>
        <input
          id="notes-search"
          className="SearchBar__input"
          type="search"
          value={draft}
          placeholder="Search by title or body…"
          onChange={(e) => {
            const next = e.target.value;
            setDraft(next);
            debounced(next);
          }}
        />
        {draft ? (
          <button
            type="button"
            className="SearchBar__clear"
            onClick={() => {
              setDraft("");
              onChange("");
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        ) : null}
      </div>
    </div>
  );
}
