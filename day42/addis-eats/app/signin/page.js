export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = params.next || "/";

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Sign in</h1>

      <form action="/api/signin" method="post" style={{ display: "flex", flexDirection: "column", maxWidth: "300px", gap: "1rem" }}>
        <div>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            style={{ width: "100%", padding: "0.5rem" }}
            defaultValue="user@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem" }}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            style={{ width: "100%", padding: "0.5rem" }}
            defaultValue="password123"
          />
        </div>

        <input type="hidden" name="next" value={next} />

        <button type="submit" style={{ padding: "0.75rem", background: "#000", color: "#fff", border: "none", cursor: "pointer" }}>
          Sign in
        </button>
      </form>
    </main>
  );
}