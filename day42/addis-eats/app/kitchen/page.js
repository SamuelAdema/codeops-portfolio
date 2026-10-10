import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/kitchen");
  }

  if (session.role !== "staff") {
    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Forbidden</h1>
        <p>This page is available only to staff members.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Kitchen Dashboard</h1>
      <p>Staff order management and fulfillment queue.</p>
    </main>
  );
}