import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

const orders = [
  { id: "ord-1", userId: "demo-user-1", item: "Doro Wot", status: "Preparing" },
  { id: "ord-2", userId: "demo-user-2", item: "Tibs", status: "Delivered" },
];

function getOrdersFor(userId) {
  return orders.filter((order) => order.userId === userId);
}

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/orders");
  }

  const userOrders = getOrdersFor(session.userId);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>My Orders</h1>
      <p>Signed in as: <strong>{session.userId}</strong> ({session.role})</p>

      <form action="/api/signout" method="post" style={{ marginBottom: "2rem" }}>
        <button type="submit" style={{ padding: "0.5rem 1rem", background: "#cc0000", color: "#fff", border: "none", cursor: "pointer" }}>
          Sign Out
        </button>
      </form>

      {userOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        userOrders.map((order) => (
          <article key={order.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "4px" }}>
            <h2>{order.item}</h2>
            <p>Status: {order.status}</p>
          </article>
        ))
      )}
    </main>
  );
}