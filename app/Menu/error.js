"use client";

export default function Error({ reset }) {
  return (
    <main>
      <h1>Something went wrong.</h1>
      <button onClick={() => reset()}>Try Again</button>
    </main>
  );
}