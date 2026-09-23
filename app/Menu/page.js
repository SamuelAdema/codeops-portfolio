import { notFound } from "next/navigation";

// We redefine the data here so the dynamic page knows what dishes exist
const dishes = [
  { id: "kitfo", name: "Kitfo", price: 250 },
  { id: "shiro", name: "Shiro", price: 150 },
  { id: "tibs", name: "Tibs", price: 300 },
];

export default function DishPage({ params }) {
  const dish = dishes.find((dish) => dish.id === params.id);

  if (!dish) {
    notFound(); // Triggers app/not-found.js if the user types a bad ID
  }

  return (
    <main>
      <h1>{dish.name}</h1>
      <p>Price: {dish.price} ETB</p>
      <p>Dish ID: {params.id}</p>
    </main>
  );
}