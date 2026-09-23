# Addis Eats Next.js Routing Project

This project demonstrates Next.js App Router file-based routing.

## Route Map

| URL Route | File that produces it |
| :--- | :--- |
| `/` | `app/page.js` |
| `/menu` | `app/menu/page.js` |
| `/menu/:id` (Dynamic) | `app/menu/[id]/page.js` |
| `/cart` | `app/cart/page.js` |
| `/checkout` | `app/checkout/page.js` |

## Special UI Files
* **Loading State:** `app/menu/loading.js` (Displays while the menu route loads)
* **Error State:** `app/menu/error.js` (Client component that catches menu errors)
* **404 / Not Found:** `app/not-found.js` (Triggered on bad URLs or by calling `notFound()`)

## Colocated Components
* `app/menu/DishList.jsx` is successfully hidden from the router. It acts purely as a UI component and cannot be accessed via a URL.