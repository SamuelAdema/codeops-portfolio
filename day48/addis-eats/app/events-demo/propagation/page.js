"use client";

import { useState } from "react";

export default function PropagationDemo() {
  const [message, setMessage] = useState("Choose an action.");

  function openDish() {
    setMessage("Dish details opened.");
  }

  function addToCart(event) {
    event.stopPropagation();
    setMessage("Dish added to cart.");
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Event Propagation
      </h1>
      <div
        onClick={openDish}
        className="max-w-sm rounded-lg border p-5"
      >
        <h2 className="text-xl font-semibold">
          Doro Wat
        </h2>
        <p className="my-3">Price: 450 ETB</p>
        <button
          type="button"
          onClick={addToCart}
          className="rounded bg-purple-700 px-4 py-3 text-white"
        >
          Add to cart
        </button>
      </div>
      <p className="mt-4" aria-live="polite">
        {message}
      </p>
    </main>
  );
}