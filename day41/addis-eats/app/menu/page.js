import SearchBox from "./SearchBox";

export default function MenuPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-2 text-4xl font-bold">Addis Eats Menu</h1>
      <p className="mb-8 text-gray-600">Search for your favorite Ethiopian dishes.</p>
      <SearchBox />
    </main>
  );
}