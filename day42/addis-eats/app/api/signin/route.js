import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const next = formData.get("next") || "/";

  const validEmail = "user@example.com";
  const validPassword = "password123";

  if (email !== validEmail || password !== validPassword) {
    return new Response("Invalid credentials", { status: 401 });
  }

  // Prevent open redirect vulnerabilities
  if (typeof next !== "string" || !next.startsWith("/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const cookieStore = await cookies();

  // Issue session cookie (use demo-user-1 for customers, demo-staff-1 for staff testing)
  const userId = email === "staff@example.com" ? "demo-staff-1" : "demo-user-1";

  cookieStore.set("session", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.redirect(new URL(next, request.url));
}