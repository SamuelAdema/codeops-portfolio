# Addis Eats Performance Decisions

## Server Components
By default, pages (`/`, `/menu`, `/menu/[id]`, `/orders`, `/kitchen`) are React Server Components. Initial data fetching happens on the server, minimizing the JavaScript bundle sent to the browser.

## Client Components
`"use client"` is restricted to leaf components that require browser APIs (`localStorage` in `CartClient` and `AddToCartButton`) or interactive React hooks (`MenuSearch`, `OrderStatus`, `CheckoutClient`).

## SWR
SWR powers client-side search, pagination, and 5-second order status polling with `fallbackData` and `keepPreviousData: true` to eliminate loading flicker.

## Debounce
Menu search inputs are debounced by **300ms** (`useDebounce.js`) to prevent redundant API calls while typing.

## Images
`components/DishImage.js` uses `next/image` with explicit `width`, `height`, `priority` on above-the-fold items, and descriptive `alt` attributes.

## Fonts
`app/layout.js` loads the `Geist` font using `next/font/google` for zero-layout-shift, self-hosted font optimization at build time.

## Environment
Backend configuration is managed through `process.env.API_URL` in `.env.local`, keeping server secrets out of `NEXT_PUBLIC_*`.