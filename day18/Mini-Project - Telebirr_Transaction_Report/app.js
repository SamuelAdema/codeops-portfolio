// app.js
import { transactions } from "./transactions.js";
import { totalByType, generateReceipts } from "./report.js";

console.log("=== TELEBIRR TRANSACTION REPORT ===\n");

// 1. Calculate and log totals
const totalDebits = totalByType(transactions, "debit");
const totalCredits = totalByType(transactions, "credit");

console.log(`Total Debits: ${totalDebits} ETB`);
console.log(`Total Credits: ${totalCredits} ETB\n`);

// 2. Generate and log receipts
console.log("--- Customer Receipts ---");
const receipts = generateReceipts(transactions);
receipts.forEach(receipt => console.log(receipt));
console.log("\n");

// 3. Update a transaction using spread (No Mutation)
console.log("--- Transaction Correction ---");
const originalTransaction = transactions[0]; 

// Create an updated copy, changing the amount, without touching the original
const correctedTransaction = {
  ...originalTransaction,
  amount: 300 
};

console.log("Original:", originalTransaction);
console.log("Corrected:", correctedTransaction);