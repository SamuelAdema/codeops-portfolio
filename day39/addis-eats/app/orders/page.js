import { orders } from "@/lib/orders";

export default function OrdersPage() {
  return (
    <main>
      <h1>Orders</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <article key={order.id} style={{ borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
          <h2>{order.name}</h2>
          <p>Phone: {order.phone}</p>
          <p>
            Total: {order.total} {order.currency}
          </p>
        </article>
      ))}
    </main>
  );
}