"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <section>
      <button onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? "Hide Menu" : "Show Menu"}
      </button>

      {showMenu && children}
    </section>
  );
}