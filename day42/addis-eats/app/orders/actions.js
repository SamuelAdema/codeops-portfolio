"use server";

import { getSession } from "@/lib/session";

const orders = [
  { id: "ord-1", userId: "demo-user-1", item: "Doro Wot", status: "Preparing" },
  { id: "ord-2", userId: "demo-user-2", item: "Tibs", status: "Delivered" },
];

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    throw new Error("Not signed in");
  }

  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== session.userId) {
    throw new Error("You are not allowed to cancel this order");
  }

  // Database update simulation goes here
  return { success: true };
}