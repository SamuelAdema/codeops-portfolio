import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { getOrder } from "@/lib/data";
import OrderStatus from "@/components/OrderStatus";
import CancelOrderButton from "@/components/CancelOrderButton";

export default async function OrderDetailsPage({ params }) {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/orders");
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  // Ownership check (Customers can only view their own orders)
  if (order.userId !== user.id && user.role !== "staff") {
    return (
      <main className="space-y-4 py-8">
        <h1 className="text-2xl font-bold text-red-700">Not allowed</h1>
        <p className="text-stone-600">
          You do not have permission to view or modify this order.
        </p>
        <Link href="/orders" className="text-sm text-amber-700 hover:underline">
          ← Back to My Orders
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6">
      <Link href="/orders" className="text-sm text-amber-700 hover:underline">
        ← Back to My Orders
      </Link>

      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold">Order {order.id}</h1>
            <p className="text-xs text-stone-500">Customer: {order.customerName}</p>
          </div>
          <p className="text-lg font-bold">{order.total} ETB</p>
        </div>

        {/* Step 12: Server initial data + SWR 5-second polling */}
        <OrderStatus orderId={order.id} initialOrder={order} />

        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-stone-700">Items</h3>
          <ul className="divide-y text-sm">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex justify-between py-2">
                <span>
                  {item.name} × {item.quantity || 1}
                </span>
                <span>{item.price * (item.quantity || 1)} ETB</span>
              </li>
            ))}
          </ul>
        </div>

        {order.status !== "Cancelled" && order.status !== "Delivered" && (
          <div className="border-t pt-4">
            <CancelOrderButton orderId={order.id} />
          </div>
        )}
      </div>
    </main>
  );
}