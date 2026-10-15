"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { placeOrder } from "@/app/actions";

export default function CheckoutClient({ user }) {
  const [cart, setCart] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  async function handlePlaceOrder() {
    setError("");
    setSubmitting(true);
    try {
      const order = await placeOrder(cart);
      localStorage.removeItem("cart");
      router.push(`/orders/${order.id}`);
    } catch (err) {
      setError(err.message || "Failed to place order.");
      setSubmitting(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <p className="text-stone-600">
          Your cart is empty. Add dishes from the menu before checking out.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm text-stone-500">Ordering as</p>
        <p className="font-semibold">
          {user.name} ({user.phone})
        </p>
      </div>

      <div className="divide-y border-t border-b py-2">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between py-2 text-sm">
            <span>
              {item.name} × {item.quantity || 1}
            </span>
            <span className="font-medium">
              {item.price * (item.quantity || 1)} ETB
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-lg font-bold">
        <span>Total Due</span>
        <span>{total} ETB</span>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        disabled={submitting}
        className="w-full rounded-md bg-amber-600 py-3 font-medium text-white hover:bg-amber-700 disabled:opacity-50"
      >
        {submitting ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
} 