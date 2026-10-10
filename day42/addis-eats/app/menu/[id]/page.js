export default async function MenuItemPage({ params }) {
  const { id } = await params;

  return (
    <main>
      <h1>Menu Item Details</h1>
      <p>Showing details for menu item: {id}</p>
      <p>
        <a href="/menu">Back to Menu</a>
      </p>
    </main>
  );
}