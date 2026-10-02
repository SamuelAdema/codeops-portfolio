"use client";

import { useState } from "react";

export default function CategoryBar({ categories }) {
  const [selected, setSelected] = useState("All");

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
        >
          {category}
        </button>
      ))}

      <p>Selected: {selected}</p>
    </div>
  );
}