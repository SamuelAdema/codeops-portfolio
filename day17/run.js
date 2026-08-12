// run.js (Example usage)
const { subtotal, discountBy, withVat, toETB, makeReceiptMaker } = require('./order.js');

// Initialize the receipt maker closure
const printReceipt = makeReceiptMaker();

// Create a specific discount function (e.g., 10% member discount)
const applyMemberDiscount = discountBy(0.10);

// Order 1: Doro Wot (350) and Injera (50)
const order1Subtotal = subtotal(350, 50);
const order1Discounted = applyMemberDiscount(order1Subtotal);
const order1WithVat = withVat(order1Discounted);
const order1Final = toETB(order1WithVat);

console.log(printReceipt(order1Final)); 
// Output: #1: 414.00 ETB

// Order 2: Tibs (250)
// You can also compose them all in one line!
console.log(
    printReceipt(
        toETB(
            withVat(
                applyMemberDiscount(
                    subtotal(250)
                )
            )
        )
    )
); 
// Output: #2: 258.75 ETB