import { getDishes } from "./data";
import DishList from "./DishList";
import FilterShell from "./FilterShell";
import CategoryBar from "./CategoryBar";

export default async function MenuPage() {
  const dishes = await getDishes();
  
  const categories = [
    "All",
    "Breakfast",
    "Main Course",
    "Vegetarian",
    "Drinks",
  ];

  return (
    <main>
      <h1>Addis Eats</h1>

      <CategoryBar categories={categories} />

      <h2>Today's Menu</h2>

      <FilterShell>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}