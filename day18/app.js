import { VAT, addVat } from './money.js';

const basePrice = 500;
const finalPrice = addVat(basePrice);

console.log(`\nEx 5: Applying a VAT rate of ${VAT * 100}%`);
console.log(`Ex 5 Final price: ${finalPrice} ETB`);