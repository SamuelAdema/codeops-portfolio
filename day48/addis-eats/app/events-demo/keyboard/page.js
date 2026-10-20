"use client";

import { useState } from "react";

export default function KeyboardDemo() {
  const [message, setMessage] = useState("Press a key.");

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setMessage("Escape was pressed.");
    }
    if (event.key === "Enter") {
      setMessage("Enter was pressed.");
    }
    if (event.key === "ArrowDown") {
      setMessage("Down arrow was pressed.");
    }
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Keyboard Event Demo
      </h1>
      <label htmlFor="keyboard-input">
        Focus this field and press a key
      </label>
      <input
        id="keyboard-input"
        onKeyDown={handleKeyDown}
        className="my-3 block w-full max-w-sm rounded border p-3"
      />
      <p aria-live="polite">{message}</p>
    </main>
  );
}