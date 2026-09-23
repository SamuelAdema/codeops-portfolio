import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.id} style={{ marginBottom: "0.5rem" }}>
          <Link href={`/menu/${dish.id}`}>
            {dish.name}
          </Link>
          {" - "}
          {dish.price} ETB
        </li>
      ))}
    </ul>
  );
}