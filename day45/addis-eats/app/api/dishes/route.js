import { NextResponse } from "next/server";
import { queryDishes, getDishes } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const page = searchParams.get("page");

  if (q !== null && !page) {
    const result = await queryDishes({ q, page: 1, limit: 20 });
    return NextResponse.json(result.dishes);
  }

  if (page !== null) {
    const result = await queryDishes({ q: q || "", page: Number(page), limit: 3 });
    return NextResponse.json(result);
  }

  const dishes = await getDishes();
  return NextResponse.json(dishes);
}