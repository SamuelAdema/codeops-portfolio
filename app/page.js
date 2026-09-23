import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Addis Eats</h1>
      <p>Order your favorite food in Addis Ababa.</p>
      <Link href="/menu">View Menu</Link>
    </main>
  );
}