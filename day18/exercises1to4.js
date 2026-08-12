// --- EXERCISE 1 ---
const pricesETB = [600, 850, 1500, 300, 950];
const finalTotal = pricesETB
  .map(price => price * 1.15)
  .filter(priceWithVat => priceWithVat < 1000)
  .reduce((sum, current) => sum + current, 0);
console.log(`Ex 1 Grand Total: ${finalTotal} ETB\n`);

// --- EXERCISE 2 ---
const customer = { name: "Samuel", city: "Addis Ababa", balance: 12500 };
console.log("Ex 2 Entries:");
for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}
console.log("\n");

// --- EXERCISE 3 ---
const { name, city } = customer; 
function greet({ name }) {
  console.log(`Ex 3: Welcome back, ${name}!\n`);
}
greet(customer);

// --- EXERCISE 4 ---
const updatedCustomer = {
  ...customer,
  city: "Dire Dawa", 
  phone: "+251911000000" 
};
console.log("Ex 4 Updated:", updatedCustomer);
console.log("Ex 4 Original:", customer);