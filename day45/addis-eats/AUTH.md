# Addis Eats Authentication & Authorization

## Session
The application uses a signed session token stored in a cookie managed by `lib/session.js`.
The cookie is configured with:
- `httpOnly: true` (prevents client-side JavaScript access via `document.cookie`)
- `secure: true` (in production HTTPS environments)
- `sameSite: "lax"` (protects against cross-site request forgery)

## Middleware
`middleware.js` protects private user flows with fast early redirects to `/signin?next=...`:
- `/checkout/:path*`
- `/orders/:path*`

## Page Checks
Every private Server Component page (`checkout`, `orders`, `orders/[id]`, `kitchen`) independently calls `await getSession()` to verify the user identity on the server.

## Actions & Route Handlers
All mutating Server Actions (`placeOrder`, `cancelOrder`, `updateOrderStatusAction`) and private Route Handlers (`/api/orders/[id]/status`) call `getSession()` before executing operations.

## Ownership
Order operations verify that `order.userId === user.id`. A signed-in customer cannot view or cancel an order belonging to another customer.

## Staff
The `/kitchen` route and `updateOrderStatusAction` check `user.role === "staff"` on the server. Normal customer accounts receive a `Not allowed` response.

## Return URL
The `next` query parameter on `/signin` is validated before redirecting (`if (!rawNext.startsWith("/") || rawNext.startsWith("//")) redirect("/")`). External URLs such as `https://example.com` are rejected to prevent open-redirect attacks.

## Security Matrix
| Route / Action | Public? | Protection |
|---|---|---|
| `/` | Yes | None |
| `/menu` | Yes | None |
| `/menu/[id]` | Yes | None |
| `/cart` | Yes | None |
| `/checkout` | No | Middleware + page `getSession()` |
| `/orders` | No | Middleware + page `getSession()` + scoped query `getOrdersFor(user.id)` |
| `/orders/[id]` | No | Middleware + `getSession()` + ownership check |
| `/kitchen` | No | Page `getSession()` + `user.role === "staff"` check |
| `placeOrder` | No | Server Action `getSession()` check |
| `cancelOrder` | No | Server Action `getSession()` + ownership check (`order.userId === user.id`) |
| `updateOrderStatusAction` | No | Server Action `getSession()` + staff role authorization |