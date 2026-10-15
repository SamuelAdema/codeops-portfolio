import { notFound } from "next/navigation";
import Link from "next/link";
import { getDish } from "@/lib/data";
import DishImage from "@/components/DishImage";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return { title: "Dish Not Found" };
  }

  return {
    title: dish.name,
    description: dish.description,
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
      images: [dish.image],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <main className="mx-auto max-w-2xl space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Link href="/menu" className="text-sm text-amber-700 hover:underline">
        ← Back to Menu
      </Link>

      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <DishImage dish={dish} priority />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{dish.name}</h1>
          <p className="text-xl font-bold text-amber-700">{dish.price} ETB</p>
        </div>
        <p className="text-stone-700">{dish.description}</p>
        <div className="pt-4">
          <AddToCartButton dish={dish} />
        </div>
      </div>
    </main>
  );
}