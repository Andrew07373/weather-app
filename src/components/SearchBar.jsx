import React, { useState } from "react";

export default function SearchBar({ onSearch, defaultValue = "" }) {
  const [q, setQ] = useState(defaultValue);

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
  }

  return (
    <form
      onSubmit={submit}
      className="searchBar"
      aria-label="Search weather by city"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search city (e.g., London)"
        aria-label="City name"
      />
      <button type="submit">Search</button>
    </form>
  );
}
