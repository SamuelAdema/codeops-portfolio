import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/checkout");
  }

  return (
    <main className="mx-auto max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <CheckoutClient user={user} />
    </main>
  );
}