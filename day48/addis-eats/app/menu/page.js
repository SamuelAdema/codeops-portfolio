const dishes = [
  { id: 1, name: "Doro Wat", price: 450 },
  { id: 2, name: "Shiro", price: 180 },
  { id: 3, name: "Tibs", price: 380 },
];

export default function MenuPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Addis Eats Menu
      </h1>
      <ul className="space-y-4">
        {dishes.map((dish) => (
          <li
            key={dish.id}
            className="flex items-center justify-between gap-4 rounded-lg border p-4"
          >
            <div>
              <h2 className="font-semibold">
                {dish.name}
              </h2>
              <p>{dish.price} ETB</p>
            </div>
            <button
              type="button"
              className="min-h-11 min-w-11 rounded-lg bg-purple-700 px-4 py-3 text-white hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
      <a
        href="/checkout"
        className="mt-6 inline-block rounded-lg border px-4 py-3 underline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Go to checkout
      </a>
    </main>
  );
}