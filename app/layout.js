import Link from "next/link";
// Make sure to import your globals.css if you have one, or remove this line
import "./globals.css"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc", marginBottom: "2rem" }}>
          <Link href="/">Home</Link>
          {" | "}
          <Link href="/menu">Menu</Link>
          {" | "}
          <Link href="/cart">Cart</Link>
          {" | "}
          <Link href="/checkout">Checkout</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}