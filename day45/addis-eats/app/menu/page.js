import Link from "next/link";
import { getDishes } from "@/lib/data";
import DishImage from "@/components/DishImage";
import AddToCartButton from "@/components/AddToCartButton";
import MenuSearch from "@/components/MenuSearch";

export const metadata = {
  title: "Addis Eats Menu",
  description: "Explore delicious dishes available from Addis Eats.",
  openGraph: {
    title: "Addis Eats Menu",
    description: "Explore delicious dishes available from Addis Eats.",
    images: ["/og-image.png"],
  },
};

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Our Menu</h1>
        <p className="text-stone-600">
          Discover delicious dishes prepared fresh daily.
        </p>
      </div>

      {/* Client-side SWR Search & Pagination */}
      <MenuSearch />

      {/* Server-Rendered Initial Full Menu */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">All Dishes (Server-Rendered)</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, index) => (
            <article
              key={dish.id}
              className="flex flex-col justify-between rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="space-y-3">
                <DishImage dish={dish} priority={index < 2} />
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">
                    <Link
                      href={`/menu/${dish.id}`}
                      className="hover:text-amber-700"
                    >
                      {dish.name}
                    </Link>
                  </h3>
                  <span className="rounded bg-amber-50 px-2 py-0.5 text-sm font-bold text-amber-800">
                    {dish.price} ETB
                  </span>
                </div>
                <p className="text-sm text-stone-600">{dish.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t">
                <Link
                  href={`/menu/${dish.id}`}
                  className="text-sm font-medium text-amber-700 hover:underline"
                >
                  View Details
                </Link>
                <AddToCartButton dish={dish} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}