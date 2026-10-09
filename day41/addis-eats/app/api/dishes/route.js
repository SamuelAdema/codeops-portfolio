// Data inlined directly to match your strict file structure
const dishes = [
  { id: 1, name: "Chicken Tibs", description: "Tender chicken cooked with onions, tomatoes and spices.", price: 450, category: "Tibs" },
  { id: 2, name: "Beef Tibs", description: "Tender beef cooked with Ethiopian spices.", price: 520, category: "Tibs" },
  { id: 3, name: "Kitfo", description: "Traditional Ethiopian minced beef dish.", price: 650, category: "Traditional" },
  { id: 4, name: "Shiro", description: "Traditional chickpea stew served with injera.", price: 280, category: "Vegetarian" },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim().toLowerCase();

  if (!query) {
    return Response.json(dishes);
  }

  const results = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(query)
  );

  return Response.json(results);
}