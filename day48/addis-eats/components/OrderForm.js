"use client";

import { useState } from "react";

function saveDemoOrder(phone) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ phone, status: "received" });
    }, 1500);
  });
}

export default function OrderForm() {
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (pending) return;

    setPending(true);
    setMessage("");

    try {
      const result = await saveDemoOrder(phone);
      setMessage(`Demo order received for ${result.phone}.`);
    } catch {
      setMessage("Unable to place the order. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-4"
    >
      <div>
        <label htmlFor="phone" className="mb-1 block">
          TeleBirr phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
          disabled={pending}
          className="w-full rounded-lg border p-3"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="min-h-11 rounded-lg bg-purple-700 px-5 py-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Placing order..." : "Place order"}
      </button>
      <p role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}