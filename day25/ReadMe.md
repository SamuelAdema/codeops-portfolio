# Addis Watches ⌚

Addis Watches is a premium e-commerce module project built with vanilla JavaScript, HTML, and CSS. It allows users to browse a collection of luxury timepieces, filter by brand, search by name, manage a shopping cart, and simulate a secure checkout using a local Telebirr payment integration.

## Demo

🎥 Loom Video: [Watch Project Demo]( )

🌐 Live Application: [View Live App]( )

## Features

* **Dynamic Rendering:** Products are loaded asynchronously from a local JSON file (`fetch()`) and rendered directly to the DOM.
* **Search & Filter:** Users can search watches by text and filter by brand simultaneously.
* **Smart Shopping Cart:** Users can add items, adjust quantities (+/-), and the total price dynamically recalculates using array reduction.
* **Custom Form Validation:** The checkout form uses strict JavaScript Regular Expressions (Regex) to ensure names contain no numbers and phone numbers match the exact `+251` Ethiopian format.
* **Responsive Premium UI:** The layout utilizes CSS Grid and Flexbox for a responsive experience, complete with a sticky cart, custom variables, and elegant hover animations.

## Technologies Used

* **HTML5:** Semantic architecture (`<main>`, `<section>`, `<aside>`) and native input constraints (`maxlength`).
* **CSS3:** Custom variables (`:root`), Grid, Flexbox, and state-driven error styling.
* **Vanilla JavaScript (ES6+):** 
  * Async/Await & Fetch API
  * Functional Array Methods (`.map()`, `.filter()`, `.reduce()`)
  * DOM Manipulation & Event Delegation
  * Custom Regex Form Validation

