import { dishes } from "@/lib/dishes";

export default function HomePage() {
  return (
    <main>
      <h1>Addis Eats</h1>

      <h2>Today's Menu</h2>

      {dishes.map((dish) => (
        <article key={dish.id} style={{ marginBottom: "1rem" }}>
          <h3>{dish.name}</h3>
          <p>{dish.category}</p>
          <p>{dish.price} ETB</p>
        </article>
      ))}
    </main>
  );
}