import Link from "next/link";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Addis Eats",
    description: "Food ordering application for Addis Eats in Addis Ababa.",
    servesCuisine: "Ethiopian",
  };

  return (
    <main className="space-y-12 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Modern Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-amber-950 to-amber-900 px-8 py-16 text-white shadow-xl sm:px-12">
        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="inline-block rounded-full bg-amber-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 border border-amber-400/30">
            Authentic Ethiopian Cuisine · Addis Ababa
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Fresh Flavors Delivered to Your Doorstep
          </h1>

          <p className="text-lg leading-relaxed text-amber-100/90">
            From sizzling Shekla Tibs and rich Doro Wat to vibrant vegan
            Beyaynetu platters—order online and track your kitchen status in
            real time.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/menu"
              className="rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-bold text-stone-950 shadow-md hover:bg-amber-400 transition"
            >
              Explore Full Menu →
            </Link>
            <Link
              href="/cart"
              className="rounded-xl border border-amber-300/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition"
            >
              View Your Cart
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid gap-6 sm:grid-cols-3">
        <article className="p-6 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            01 · Fast Search
          </div>
          <h2 className="text-lg font-bold">Instant Menu Filtering</h2>
          <p className="text-sm text-stone-600">
            Debounced SWR search and pagination help you find your favorite
            traditional dishes without page reloads.
          </p>
        </article>

        <article className="p-6 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            02 · Live Polling
          </div>
          <h2 className="text-lg font-bold">Real-Time Order Status</h2>
          <p className="text-sm text-stone-600">
            Watch your order progress from Received to Preparing and Out for
            Delivery with 5-second automatic updates.
          </p>
        </article>

        <article className="p-6 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            03 · Protected Accounts
          </div>
          <h2 className="text-lg font-bold">Secure Session & Roles</h2>
          <p className="text-sm text-stone-600">
            Protected customer orders and a dedicated Kitchen dashboard for
            Addis Eats staff members.
          </p>
        </article>
      </section>
    </main>
  );
}