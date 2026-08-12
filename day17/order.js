// order.js

/**
 * 1. Calculate the subtotal of an order using a reduce callback.
 * Takes any number of prices as arguments using the rest operator (...).
 */
const subtotal = (...prices) => {
    return prices.reduce((total, currentPrice) => total + currentPrice, 0);
};

/**
 * 2. Factory function that returns an arrow function for calculating discounts.
 * For example, discountBy(0.10) returns a function that takes 10% off an amount.
 */
const discountBy = (rate) => {
    return (amount) => amount * (1 - rate);
};

/**
 * 3. Small pure helpers for VAT and formatting.
 * Assuming a standard 15% VAT for this module.
 */
const withVat = (amount) => {
    return amount * 1.15;
};

const toETB = (amount) => {
    // Formats the number to 2 decimal places and adds the currency
    return `${amount.toFixed(2)} ETB`;
};

/**
 * 4. Closure-based receipt maker with a private order number.
 * The orderNumber variable is protected and increments every time the returned function is called.
 */
const makeReceiptMaker = () => {
    let orderNumber = 0; // Private state
    
    return (formattedAmount) => {
        orderNumber++;
        return `#${orderNumber}: ${formattedAmount}`;
    };
};

// Export the functions so they can be imported and composed in run.js
module.exports = {
    subtotal,
    discountBy,
    withVat,
    toETB,
    makeReceiptMaker
};