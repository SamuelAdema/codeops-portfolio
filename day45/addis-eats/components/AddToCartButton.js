"use client";

import { useState } from "react";

export default function AddToCartButton({ dish }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    const saved = localStorage.getItem("cart");
    const cart = saved ? JSON.parse(saved) : [];

    const existingIndex = cart.findIndex((item) => item.id === dish.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAddToCart}
      className="rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition"
    >
      {added ? "Added to Cart!" : "Add to Cart"}
    </button>
  );
}