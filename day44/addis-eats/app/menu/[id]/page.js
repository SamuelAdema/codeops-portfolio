import { notFound } from "next/navigation";
import { getDish } from "@/app/lib/dishes";

// Deliberately blocking the route because the page requires the dynamic 'id' 
// to fetch dish details at request-time, and there is no meaningful static shell to render first.
export const instant = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return {
      title: "Dish not found",
      description: "The requested dish could not be found."
    };
  }

  return {
    title: dish.name,
    description: `${dish.name} — ${dish.price} ETB. ${dish.summary}`,
    alternates: {
      canonical: `/menu/${dish.id}`
    },
    openGraph: {
      title: `${dish.name} · Addis Eats`,
      description: `${dish.name} — ${dish.price} ETB. ${dish.summary}`,
      images: [dish.image],
      type: "website"
    }
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.summary,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB"
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{dish.name}</h1>
      <p>{dish.summary}</p>
      <p>{dish.price} ETB</p>
    </main>
  );
}