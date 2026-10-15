import CartClient from "@/components/CartClient";

export const metadata = {
  title: "Cart",
  description: "Review the dishes in your Addis Eats shopping cart.",
};

export default function CartPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Cart</h1>
      <CartClient />
    </main>
  );
}