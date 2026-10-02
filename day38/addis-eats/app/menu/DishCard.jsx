import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <article>
      <h3>{dish.name}</h3>
      <p>{dish.price} ETB</p>
      <AddToCartButton />
    </article>
  );
}