import OrderStatus from "./OrderStatus";

// Data inlined to allow server-side fallbackData without extra lib files
const orders = {
  "1001": { id: "1001", customer: "Abebe", status: "Preparing", total: 1250 },
  "1002": { id: "1002", customer: "Marta", status: "Ready", total: 850 },
};

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = orders[id] || null;

  if (!order) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-bold">Order not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Order Status</h1>
      <OrderStatus id={id} initialOrder={order} />
    </main>
  );
}