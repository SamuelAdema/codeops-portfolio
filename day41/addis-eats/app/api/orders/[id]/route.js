// Data inlined directly to match your strict file structure
const orders = {
  "1001": { id: "1001", customer: "Abebe", status: "Preparing", total: 1250 },
  "1002": { id: "1002", customer: "Marta", status: "Ready", total: 850 },
};

export async function GET(request, { params }) {
  const { id } = await params;
  const order = orders[id];

  if (!order) {
    return Response.json({ message: "Order not found" }, { status: 404 });
  }
  return Response.json(order);
}