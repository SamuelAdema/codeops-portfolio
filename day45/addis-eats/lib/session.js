import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET || "addis_eats_week9_secret_key_2026";

export function signToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

export function verify(token) {
  if (!token || !token.includes(".")) return null;
  const [data, signature] = token.split(".");
  const expectedSig = crypto
    .createHmac("sha256", SECRET)
    .update(data)
    .digest("base64url");

  if (signature !== expectedSig) return null;

  try {
    return JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  return verify(token);
}

export async function createSessionCookie(user) {
  const token = signToken({
    id: user.id,
    name: user.name,
    phone: user.phone,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}