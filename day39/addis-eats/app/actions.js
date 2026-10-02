"use server";

import { orderSchema } from "@/lib/schema";
import { dishes } from "@/lib/dishes";
import { orders } from "@/lib/orders";
import { revalidatePath } from "next/cache";

export async function placeOrder(previousState, formData) {
  const result = orderSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    dishId: formData.get("dishId"),
  });

  if (!result.success) {
    return {
      error: "Validation failed",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const dish = dishes.find((dish) => dish.id === result.data.dishId);

  if (!dish) {
    return {
      error: "Dish not found",
      fieldErrors: {},
    };
  }

  const order = {
    id: `ord-${Date.now()}`,
    userId: "mock-user-123", // Assigned for testing authorization later
    name: result.data.name,
    phone: result.data.phone,
    dishId: dish.id,
    total: dish.price,
    currency: "ETB",
  };

  orders.push(order);
  revalidatePath("/orders");

  return {
    success: true,
    orderId: order.id,
    error: "",
    fieldErrors: {},
  };
}

export async function cancelOrder(orderId) {
  // Mocking an authenticated user session for the exercise
  const user = { id: "mock-user-123" }; 

  if (!user) {
    return { error: "Not signed in" };
  }

  const orderIndex = orders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return { error: "Order not found" };
  }

  const order = orders[orderIndex];

  if (order.userId !== user.id) {
    return { error: "You are not allowed to cancel this order" };
  }

  orders.splice(orderIndex, 1);
  revalidatePath("/orders");

  return { success: true };
}