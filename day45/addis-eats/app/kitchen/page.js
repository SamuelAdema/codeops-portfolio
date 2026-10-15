import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrders } from "@/lib/data";
import { updateOrderStatusAction } from "@/app/actions";

export const metadata = {
  title: "Kitchen Dashboard",
};

export default async function KitchenPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/kitchen");
  }

  if (user.role !== "staff") {
    return (
      <main className="py-12">
        <h1 className="text-2xl font-bold text-red-700">Not allowed</h1>
        <p className="mt-2 text-stone-600">
          This area is restricted to Addis Eats kitchen staff.
        </p>
      </main>
    );
  }

  const orders = await getAllOrders();

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Kitchen</h1>
        <p className="text-stone-600">Manage incoming orders.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="space-y-1">
              <p className="font-bold">
                {order.id} — {order.customerName}
              </p>
              <p className="text-sm text-stone-600">
                Current Status:{" "}
                <span className="font-semibold text-amber-800">
                  {order.status}
                </span>
              </p>
              <p className="text-xs text-stone-500">
                Items:{" "}
                {order.items
                  .map((i) => `${i.name} (x${i.quantity || 1})`)
                  .join(", ")}
              </p>
            </div>

            <form action={updateOrderStatusAction} className="flex items-center gap-2">
              <input type="hidden" name="orderId" value={order.id} />
              <select
                name="status"
                defaultValue={order.status}
                className="rounded border px-3 py-1.5 text-sm"
              >
                <option value="Received">Received</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready for Pickup">Ready for Pickup</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                type="submit"
                className="rounded bg-amber-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-amber-700"
              >
                Update Status
              </button>
            </form>
          </article>
        ))}
      </div>
    </main>
  );
}