import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session")?.value;

  if (!userId) {
    return null;
  }

  return {
    userId,
    role: userId === "demo-staff-1" ? "staff" : "customer",
  };
}