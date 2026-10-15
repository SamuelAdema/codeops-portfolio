import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/data";

export const metadata = {
  title: "My Orders",
};

export default async function OrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/orders");
  }

  const orders = await getOrdersFor(user.id);

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-stone-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="space-y-1">
                <p className="font-semibold">Order: {order.id}</p>
                <p className="text-sm text-stone-600">
                  Status: <span className="font-medium text-amber-800">{order.status}</span>
                </p>
                <p className="text-xs text-stone-500">Total: {order.total} ETB</p>
              </div>
              <Link
                href={`/orders/${order.id}`}
                className="rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
              >
                Track Status
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}