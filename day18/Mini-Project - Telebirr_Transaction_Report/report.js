// report.js

// Uses filter and reduce to calculate totals
export const totalByType = (txns, type) =>
  txns.filter(t => t.type === type)
      .reduce((sum, { amount }) => sum + amount, 0);

// Uses map and parameter destructuring to generate formatted strings
export const generateReceipts = (txns) =>
  txns.map(({ customer, amount }) => 
    `TeleBirr Receipt: ${customer} transacted ${amount} ETB.`
  );