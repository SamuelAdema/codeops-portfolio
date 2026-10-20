"use client";

import { useState } from "react";

export default function FormEventDemo() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(`Welcome, ${name}!`);
  }

  return (
    <main className="max-w-lg p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Form Event Demo
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="my-3 block w-full rounded border p-3"
        />
        <button
          type="submit"
          className="rounded bg-purple-700 px-4 py-3 text-white"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}