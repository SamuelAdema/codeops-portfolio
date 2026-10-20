"use client";

import { useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount((previousCount) => previousCount + 1);
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Click Counter
      </h1>
      <p className="mb-4">
        Count: {count}
      </p>
      <button
        type="button"
        onClick={increaseCount}
        className="rounded bg-purple-700 px-4 py-3 text-white"
      >
        Increase
      </button>
    </main>
  );
}