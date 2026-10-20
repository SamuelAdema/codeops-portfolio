"use client";

export default function EventsDemoPage() {
  function handleClick(event) {
    console.log("Target:", event.target);
    console.log("Current target:", event.currentTarget);
    console.log("Native event:", event.nativeEvent);
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Event Object Demo
      </h1>
      <button
        type="button"
        onClick={handleClick}
        className="rounded bg-purple-700 px-4 py-3 text-white"
      >
        <span>Click this text</span>
      </button>
    </main>
  );
}