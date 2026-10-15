# Addis Eats Data Architecture

## Server Data
The initial menu (`/menu`) and individual dish details (`/menu/[id]`) are fetched on the server using Server Components and `lib/data.js` (`revalidate: 300`). This ensures fast initial page loads and full SEO indexability without requiring client-side state for static browsing.

## SWR
SWR is used selectively in Client Components where browser-side interaction or real-time updates require revalidation (`components/MenuSearch.js` and `components/OrderStatus.js`).

## Search
Menu search uses the custom `useDebounce` hook (`app/menu/useDebounce.js`) with a **300ms** delay to avoid firing an HTTP request on every keystroke.
- An empty search term passes `null` as the SWR key so no unnecessary network request is sent.
- `keepPreviousData: true` keeps existing dishes visible while the next search query loads.

## Order Status
The initial order state is fetched on the server in `app/orders/[id]/page.js` and passed into `<OrderStatus initialOrder={order} />` via SWR's `fallbackData`. SWR then revalidates `/api/orders/[id]/status` every **5 seconds** (`refreshInterval: 5000`).

## Pagination
The page number is included directly in the SWR key (`/api/dishes?page=${page}`). Changing from `page=1` to `page=2` updates the SWR key and caches each page independently while retaining previous data during transitions.

## Why
Server rendering provides fast, SEO-friendly initial HTML, while SWR handles interactive browser-side updates without converting the entire application into a client-rendered SPA.