import { dishes } from "@/lib/dishes";

export async function GET(request) {
  const category = request.nextUrl.searchParams.get("category");

  const filteredDishes = category
    ? dishes.filter((dish) => dish.category === category)
    : dishes;

  return Response.json(filteredDishes);
}