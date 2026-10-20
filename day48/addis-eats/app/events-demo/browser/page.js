"use client";

import { useEffect, useState } from "react";

export default function BrowserDemoPage() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Browser Width
      </h1>
      <p className="mt-4">
        {width === null
          ? "Reading screen width..."
          : `Window width: ${width}px`}
      </p>
    </main>
  );
}