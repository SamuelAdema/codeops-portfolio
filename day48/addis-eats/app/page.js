"use client";

export default function HomePage() {
  function handleWelcome() {
    alert("Welcome to Addis Eats!");
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">
        Addis Eats
      </h1>
      <p className="my-4">
        Discover delicious meals and place your order.
      </p>
      <button
        type="button"
        onClick={handleWelcome}
        className="rounded-lg bg-purple-700 px-5 py-3 text-white"
      >
        Welcome
      </button>
    </main>
  );
}