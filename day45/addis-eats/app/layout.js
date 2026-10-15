import { Geist } from "next/font/google";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { signOutAction } from "@/app/actions";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "Addis Eats",
    template: "%s | Addis Eats",
  },
  description: "Order delicious food in Addis Ababa from Addis Eats.",
  openGraph: {
    title: "Addis Eats",
    description: "Order delicious food in Addis Ababa.",
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({ children }) {
  const user = await getSession();

  return (
    <html lang="en">
      <body className={`${geist.className} bg-stone-50 text-stone-900 min-h-screen`}>
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-amber-700">
                Addis Eats
              </Link>
              <Link href="/menu" className="text-sm font-medium hover:text-amber-700">
                Menu
              </Link>
              <Link href="/cart" className="text-sm font-medium hover:text-amber-700">
                Cart
              </Link>
              {user && (
                <Link href="/orders" className="text-sm font-medium hover:text-amber-700">
                  Orders
                </Link>
              )}
              {user?.role === "staff" && (
                <Link
                  href="/kitchen"
                  className="rounded bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800"
                >
                  Kitchen
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-600">
                    {user.name} ({user.role})
                  </span>
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="rounded border border-stone-300 px-3 py-1 text-xs font-medium hover:bg-stone-100"
                    >
                      Sign Out
                    </button>
                  </form>
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="rounded bg-amber-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-amber-700"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
      </body>
    </html>
  );
}