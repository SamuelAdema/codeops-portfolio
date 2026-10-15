import Link from "next/link";

export default function NotFound() {
  return (
    <main className="space-y-4 py-16 text-center">
      <h1 className="text-3xl font-bold">404 — Page or Dish Not Found</h1>
      <p className="text-stone-600">
        We couldn&apos;t find the resource you were looking for.
      </p>
      <Link
        href="/menu"
        className="inline-block rounded-md bg-amber-600 px-5 py-2.5 text-sm font-medium text-white"
      >
        Return to Menu
      </Link>
    </main>
  );
}