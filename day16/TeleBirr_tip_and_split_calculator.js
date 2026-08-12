// 1. Inputs
let bill = Number('200');
let partySize = Number('4'); // Convert this to a number too
let paymentMethod = 'TeleBirr'; // Define your payment method here ('TeleBirr' or 'CBE Birr')

// 2. Calculate Tiered Tip
let tipPercentage = 0;
if (bill > 300) {
    tipPercentage = 0.10; // 10% tip
} else {
    tipPercentage = 0.05; // 5% tip
}
let tipAmount = bill * tipPercentage;

// 3. Calculate Switch Service Fee
let serviceFee = 0;
switch (paymentMethod) {
    case 'TeleBirr':
        serviceFee = 5.00; // Flat fee in ETB
        break;
    case 'CBE Birr':
        serviceFee = 7.00; // Flat fee in ETB
        break;
    default:
        serviceFee = 0.00;
}

// 4. Compute Grand Totals
const total = bill + tipAmount + serviceFee;
const perPerson = total / partySize;

// 5. Output Summary
console.log(`The total amount is ${total.toFixed(2)} ETB and it will be ${perPerson.toFixed(2)} ETB per person.`);
