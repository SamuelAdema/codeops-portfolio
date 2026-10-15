"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  getSession,
  createSessionCookie,
  clearSessionCookie,
} from "@/lib/session";
import {
  authenticateUser,
  createOrder,
  getOrder,
  markCancelled,
  updateOrderStatusInStore,
} from "@/lib/data";

export async function signInAction(prevState, formData) {
  const phone = formData.get("phone")?.toString().trim();
  const password = formData.get("password")?.toString();
  const rawNext = formData.get("next")?.toString() ?? "/";

  const user = authenticateUser(phone, password);

  if (!user) {
    return { error: "Invalid phone number or password." };
  }

  await createSessionCookie(user);

  // Safe Open-Redirect Protection (Step 17 & Step 34)
  if (!rawNext.startsWith("/") || rawNext.startsWith("//")) {
    redirect("/");
  }

  redirect(rawNext);
}

export async function signOutAction() {
  await clearSessionCookie();
  redirect("/signin");
}

export async function placeOrder(cartItems) {
  const user = await getSession();

  if (!user) {
    throw new Error("Not signed in");
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const order = await createOrder({
    userId: user.id,
    customerName: user.name,
    items: cartItems,
  });

  revalidatePath("/orders");
  revalidatePath("/kitchen");
  return order;
}

export async function cancelOrder(orderId) {
  const user = await getSession();

  if (!user) {
    throw new Error("Not signed in");
  }

  const order = await getOrder(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  // Strict Ownership Verification (Step 15 & Step 32)
  if (order.userId !== user.id) {
    throw new Error("Not allowed: You do not own this order");
  }

  await markCancelled(orderId);
  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/orders");
  revalidatePath("/kitchen");
}

export async function updateOrderStatusAction(formData) {
  const user = await getSession();

  if (!user) {
    throw new Error("Not signed in");
  }

  // Strict Server-Side Staff Authorization (Step 16 & Step 33)
  if (user.role !== "staff") {
    throw new Error("Not allowed: Staff role required");
  }

  const orderId = formData.get("orderId")?.toString();
  const status = formData.get("status")?.toString();

  const order = await getOrder(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  await updateOrderStatusInStore(orderId, status);
  revalidatePath("/kitchen");
  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/orders");
}