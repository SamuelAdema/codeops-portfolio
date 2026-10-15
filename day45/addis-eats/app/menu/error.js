"use client";

export default function Error({ error, reset }) {
  return (
    <main className="space-y-4 py-12">
      <h1 className="text-2xl font-bold text-red-700">Something went wrong</h1>
      <p className="text-sm text-stone-600">{error?.message}</p>
      <button
        onClick={() => reset()}
        className="rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white"
      >
        Try again
      </button>
    </main>
  );
}