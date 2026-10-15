"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartClient() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  function removeItem(id) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="rounded-lg border border-stone-200 p-6 text-center">
          <p className="text-stone-600 mb-4">Your cart is empty.</p>
          <Link
            href="/menu"
            className="inline-block rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-stone-600">
                    {item.price} ETB × {item.quantity || 1}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-lg font-bold">Total: {total} ETB</p>
            <div className="space-x-3">
              <button
                onClick={clearCart}
                className="rounded-md border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="inline-block rounded-md bg-amber-600 px-5 py-2 text-sm font-medium text-white hover:bg-amber-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}