"use client";

import { useState } from "react";
import { cancelOrder } from "@/app/actions";

export default function CancelOrderButton({ orderId, disabled }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    setLoading(true);
    setMessage("");
    try {
      await cancelOrder(orderId);
      setMessage("Order cancelled.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleCancel}
        disabled={disabled || loading}
        className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-40"
      >
        {loading ? "Cancelling..." : "Cancel Order"}
      </button>
      {message && <p className="text-xs text-stone-600">{message}</p>}
    </div>
  );
}